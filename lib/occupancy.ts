import { eachDayOfInterval, format, parseISO, subDays } from "date-fns";
import type { OccupancyRow } from "./db";
import { getSupabase, hasSupabase } from "./supabase";

function asOccupancy(row: {
  id: number;
  start_date: string;
  end_date: string;
  type: OccupancyRow["type"];
  inquiry_id: number | null;
  note: string | null;
}): OccupancyRow {
  return {
    id: row.id,
    start: String(row.start_date).slice(0, 10),
    end: String(row.end_date).slice(0, 10),
    type: row.type,
    inquiry_id: row.inquiry_id,
    note: row.note,
  };
}

export async function listOccupancy(): Promise<OccupancyRow[]> {
  if (!hasSupabase()) return [];
  const { data, error } = await getSupabase()
    .from("occupancy")
    .select("id, start_date, end_date, type, inquiry_id, note")
    .in("type", ["hold", "booked", "blocked"])
    .order("start_date");
  if (error) throw error;
  return (data ?? []).map(asOccupancy);
}

export async function occupiedDays(): Promise<string[]> {
  const rows = await listOccupancy();
  const days = new Set<string>();
  for (const row of rows) {
    const start = parseISO(row.start);
    const end = parseISO(row.end);
    if (!(start < end)) continue;
    const interval = eachDayOfInterval({
      start,
      end: subDays(end, 1),
    });
    for (const d of interval) {
      days.add(format(d, "yyyy-MM-dd"));
    }
  }
  return [...days];
}

export async function rangeFree(start: string, end: string, ignoreInquiryId?: number) {
  if (!hasSupabase()) return true;
  let query = getSupabase()
    .from("occupancy")
    .select("id")
    .in("type", ["hold", "booked", "blocked"])
    .lt("start_date", end)
    .gt("end_date", start);
  if (ignoreInquiryId != null) {
    query = query.or(`inquiry_id.is.null,inquiry_id.neq.${ignoreInquiryId}`);
  }
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []).length === 0;
}

export async function addOccupancy(input: {
  start: string;
  end: string;
  type: OccupancyRow["type"];
  inquiryId?: number | null;
  note?: string | null;
}) {
  const { data, error } = await getSupabase()
    .from("occupancy")
    .insert({
      start_date: input.start,
      end_date: input.end,
      type: input.type,
      inquiry_id: input.inquiryId ?? null,
      note: input.note ?? null,
    })
    .select("id")
    .single();
  if (error) throw error;
  return Number(data.id);
}

export async function deleteOccupancy(id: number) {
  const { error } = await getSupabase().from("occupancy").delete().eq("id", id);
  if (error) throw error;
}

export async function occupancyForInquiry(inquiryId: number) {
  const { data, error } = await getSupabase()
    .from("occupancy")
    .select("id")
    .eq("inquiry_id", inquiryId);
  if (error) throw error;
  return data ?? [];
}

export async function setOccupancyTypeForInquiry(inquiryId: number, type: OccupancyRow["type"]) {
  const { error } = await getSupabase()
    .from("occupancy")
    .update({ type })
    .eq("inquiry_id", inquiryId);
  if (error) throw error;
}

export async function clearOccupancyForInquiry(inquiryId: number) {
  const { error } = await getSupabase().from("occupancy").delete().eq("inquiry_id", inquiryId);
  if (error) throw error;
}
