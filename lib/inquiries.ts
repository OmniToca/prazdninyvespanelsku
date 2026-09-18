import type { InquiryRow } from "./db";
import { getSupabase } from "./supabase";

function asInquiry(row: InquiryRow & { start_date?: string; end_date?: string }): InquiryRow {
  return {
    ...row,
    start: String(row.start_date ?? row.start).slice(0, 10),
    end: String(row.end_date ?? row.end).slice(0, 10),
    transfer: Boolean(row.transfer),
  };
}

export async function listInquiries(): Promise<InquiryRow[]> {
  const { data, error } = await getSupabase()
    .from("inquiries")
    .select("*")
    .order("id", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(asInquiry);
}

export async function getInquiry(id: number): Promise<InquiryRow | undefined> {
  const { data, error } = await getSupabase().from("inquiries").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? asInquiry(data) : undefined;
}

export async function createInquiry(input: {
  name: string;
  email: string;
  guests: number;
  start: string;
  end: string;
  transfer: boolean;
  message: string;
  locale: string;
  nights: number;
  stayCents: number;
  cleaningCents: number;
  transferCents: number;
  discountCents: number;
  totalCents: number;
  depositCents: number;
  remainderCents: number;
}): Promise<number> {
  const { data, error } = await getSupabase()
    .from("inquiries")
    .insert({
      name: input.name,
      email: input.email,
      guests: input.guests,
      start_date: input.start,
      end_date: input.end,
      transfer: input.transfer,
      message: input.message,
      locale: input.locale,
      status: "new",
      nights: input.nights,
      stay_cents: input.stayCents,
      cleaning_cents: input.cleaningCents,
      transfer_cents: input.transferCents,
      discount_cents: input.discountCents,
      total_cents: input.totalCents,
      deposit_cents: input.depositCents,
      remainder_cents: input.remainderCents,
    })
    .select("id")
    .single();
  if (error) throw error;
  return Number(data.id);
}

export async function updateInquiry(
  id: number,
  patch: Partial<Pick<InquiryRow, "status" | "stripe_deposit_id" | "stripe_remainder_id">>,
) {
  const { error } = await getSupabase().from("inquiries").update(patch).eq("id", id);
  if (error) throw error;
}
