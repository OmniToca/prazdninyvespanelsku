import type { Metadata } from "next";
import { photos } from "@/content/media";
import { routing, type Locale } from "@/i18n/routing";

const ogLocale: Record<Locale, string> = {
  cs: "cs_CZ",
  en: "en_GB",
  es: "es_ES",
  de: "de_DE",
  fr: "fr_FR",
};

export function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://prazdninyvespanelsku.cz").replace(/\/$/, "");
}

export function localizedPath(locale: Locale, path: string) {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  if (!path || path === "/") return prefix || "/";
  return `${prefix}${path}`;
}

export function absoluteUrl(locale: Locale, path: string) {
  const loc = localizedPath(locale, path);
  return loc === "/" ? siteUrl() : `${siteUrl()}${loc}`;
}

export function languageAlternates(path: string) {
  const languages: Record<string, string> = {
    "x-default": absoluteUrl("cs", path),
  };
  for (const locale of routing.locales) {
    languages[locale] = absoluteUrl(locale, path);
  }
  return languages;
}

export function pageMeta({
  locale,
  path,
  title,
  description,
  image = photos.hero,
  index = true,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image?: string;
  index?: boolean;
}): Metadata {
  const url = absoluteUrl(locale, path);
  const imageUrl = image.startsWith("http") ? image : `${siteUrl()}${image}`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    robots: index ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      type: "website",
      locale: ogLocale[locale],
      url,
      siteName: "Prázdniny ve Španělsku",
      title,
      description,
      images: [{ url: imageUrl, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
