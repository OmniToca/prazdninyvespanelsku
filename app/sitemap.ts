import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const site = process.env.NEXT_PUBLIC_SITE_URL || "https://prazdninyvespanelsku.cz";
const paths = ["", "/apartman", "/santa-pola", "/cenik", "/rezervace", "/kontakt", "/vop"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${site}${locale === "cs" ? "" : `/${locale}`}${path || "/"}`,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [
            l,
            `${site}${l === "cs" ? "" : `/${l}`}${path || "/"}`,
          ]),
        ),
      },
    })),
  );
}
