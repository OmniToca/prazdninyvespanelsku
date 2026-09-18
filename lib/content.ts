import { cache } from "react";
import { fields, SHARED_LOCALE } from "@/content/fields";
import { seedTexts } from "@/content/seed";
import type { Locale } from "@/i18n/routing";
import { getSupabase } from "./supabase";
export { t } from "./copy";

function hasSupabase() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function contentFromSeed(locale: Locale): Record<string, string> {
  const out: Record<string, string> = {};
  for (const field of fields) {
    const seeded = seedTexts[field.key] ?? {};
    if (field.shared) {
      out[field.key] = seeded[SHARED_LOCALE] ?? seeded.cs ?? "";
    } else {
      out[field.key] = seeded[locale] ?? seeded.cs ?? "";
    }
  }
  return out;
}

let seeding: Promise<void> | null = null;

async function ensureSeeded() {
  if (seeding) return seeding;
  seeding = (async () => {
    const db = getSupabase();
    const { count, error } = await db
      .from("content_fields")
      .select("*", { count: "exact", head: true });
    if (error) throw error;
    if ((count ?? 0) > 0) return;

    const rows: { key: string; locale: string; value: string }[] = [];
    for (const field of fields) {
      const pack = seedTexts[field.key];
      if (!pack) continue;
      if (field.shared) {
        const value = pack[SHARED_LOCALE] ?? pack.cs ?? "";
        rows.push({ key: field.key, locale: SHARED_LOCALE, value });
      } else {
        for (const locale of ["cs", "en", "es", "de", "fr"] as const) {
          const value = pack[locale];
          if (value != null) rows.push({ key: field.key, locale, value });
        }
      }
    }

    for (let i = 0; i < rows.length; i += 200) {
      const chunk = rows.slice(i, i + 200);
      const { error: insertError } = await db.from("content_fields").upsert(chunk, {
        onConflict: "key,locale",
      });
      if (insertError) throw insertError;
    }
  })().finally(() => {
    seeding = null;
  });
  return seeding;
}

export const getContent = cache(async (locale: Locale): Promise<Record<string, string>> => {
  if (!hasSupabase()) return contentFromSeed(locale);
  await ensureSeeded();
  const db = getSupabase();
  const { data, error } = await db
    .from("content_fields")
    .select("key, locale, value")
    .in("locale", [locale, "cs", SHARED_LOCALE]);
  if (error) throw error;

  const byKey: Record<string, Record<string, string>> = {};
  for (const row of data ?? []) {
    byKey[row.key] ??= {};
    byKey[row.key][row.locale] = row.value;
  }

  const out: Record<string, string> = {};
  for (const field of fields) {
    const stored = byKey[field.key] ?? {};
    const seeded = seedTexts[field.key] ?? {};
    if (field.shared) {
      out[field.key] = stored[SHARED_LOCALE] ?? seeded[SHARED_LOCALE] ?? "";
    } else {
      out[field.key] =
        stored[locale] ?? seeded[locale] ?? stored.cs ?? seeded.cs ?? "";
    }
  }
  return out;
});

export async function saveContent(locale: string, values: Record<string, string>) {
  const db = getSupabase();
  const rows: { key: string; locale: string; value: string }[] = [];
  for (const [key, value] of Object.entries(values)) {
    const field = fields.find((f) => f.key === key);
    if (!field) continue;
    rows.push({ key, locale: field.shared ? SHARED_LOCALE : locale, value });
  }
  if (!rows.length) return;
  const { error } = await db.from("content_fields").upsert(rows, { onConflict: "key,locale" });
  if (error) throw error;
}
