import { defineRouting } from "next-intl/routing";

export const locales = ["cs", "en", "es", "de", "fr"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "cs",
  localePrefix: "as-needed",
});

export const localeNames: Record<Locale, string> = {
  cs: "CS",
  en: "EN",
  es: "ES",
  de: "DE",
  fr: "FR",
};
