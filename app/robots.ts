import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const site = siteUrl();
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api", "/welcome", "/*/welcome", "/platba", "/*/platba"],
      },
    ],
    sitemap: `${site}/sitemap.xml`,
  };
}
