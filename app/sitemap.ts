import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { locales } from "@/lib/i18n";
import { getPostSlugs } from "@/lib/posts";

const STATIC_PATHS = ["", "/about", "/work", "/vision", "/updates", "/contact"];

function languagesFor(path: string): Record<string, string> {
  const langs: Record<string, string> = {};
  for (const l of locales) langs[l] = `${siteConfig.url}/${l}${path}`;
  langs["x-default"] = `${siteConfig.url}/en${path}`;
  return langs;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: `${siteConfig.url}/${locale}${path}`,
        changeFrequency: path === "" || path === "/updates" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.7,
        alternates: { languages: languagesFor(path) },
      });
    }
    for (const slug of getPostSlugs(locale)) {
      const path = `/updates/${slug}`;
      entries.push({
        url: `${siteConfig.url}/${locale}${path}`,
        changeFrequency: "monthly",
        priority: 0.5,
        alternates: { languages: languagesFor(path) },
      });
    }
  }

  return entries;
}
