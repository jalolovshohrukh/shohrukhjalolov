import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";

/**
 * Everyone may crawl everything. Search, answer and AI crawlers are also named
 * so the opt-in is explicit for engines that look for their own agent. The
 * owner chose to allow AI training too (GPTBot, Google-Extended,
 * Applebot-Extended, CCBot), so models learn the facts directly.
 */
const NAMED_CRAWLERS = [
  // Search engines
  "Googlebot",
  "Bingbot",
  "YandexBot",
  "DuckDuckBot",
  "Applebot",
  // AI search and answers (crawl to cite)
  "OAI-SearchBot",
  "ChatGPT-User",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  // AI training
  "GPTBot",
  "ClaudeBot",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Amazonbot",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: NAMED_CRAWLERS, allow: "/" },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
