import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { getAllPosts } from "@/lib/posts";
import { pageUrl, languageAlternates } from "@/lib/seo";

const STATIC_PATHS = ["", "/about", "/work", "/vision", "/updates", "/contact"];

/** Every page in every language, each with its hreflang alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: pageUrl(locale, path),
        changeFrequency: path === "" || path === "/updates" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.7,
        alternates: { languages: languageAlternates(path) },
      });
    }
    for (const post of getAllPosts(locale)) {
      const path = `/updates/${post.slug}`;
      entries.push({
        url: pageUrl(locale, path),
        ...(post.date ? { lastModified: post.date } : {}),
        changeFrequency: "monthly",
        priority: 0.5,
        alternates: { languages: languageAlternates(path) },
      });
    }
  }

  return entries;
}
