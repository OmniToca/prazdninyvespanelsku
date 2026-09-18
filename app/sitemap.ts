import type { MetadataRoute } from "next";
import { placePath, places } from "@/content/places";
import { routing } from "@/i18n/routing";
import { absoluteUrl, languageAlternates } from "@/lib/seo";

const pages: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] =
  [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/apartman", changeFrequency: "monthly", priority: 0.9 },
    { path: "/santa-pola", changeFrequency: "monthly", priority: 0.8 },
    ...places.map((place) => ({
      path: placePath(place.slug),
      changeFrequency: "monthly" as const,
      priority: 0.55,
    })),
    { path: "/cenik", changeFrequency: "monthly", priority: 0.8 },
    { path: "/rezervace", changeFrequency: "weekly", priority: 0.9 },
    { path: "/kontakt", changeFrequency: "yearly", priority: 0.6 },
    { path: "/vop", changeFrequency: "yearly", priority: 0.3 },
  ];

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) =>
    pages.map((page) => ({
      url: absoluteUrl(locale, page.path),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: { languages: languageAlternates(page.path) },
    })),
  );
}
