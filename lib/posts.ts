import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "@/lib/i18n";

const ROOT = path.join(process.cwd(), "content", "updates");

export type PostMeta = {
  slug: string;
  title: string;
  date: string; // ISO (YYYY-MM-DD)
  summary: string;
  locale: Locale;
};

export type Post = PostMeta & { content: string };

function localeDir(locale: Locale) {
  return path.join(ROOT, locale);
}

export function getPostSlugs(locale: Locale): string[] {
  const dir = localeDir(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.mdx?$/.test(f))
    .map((f) => f.replace(/\.mdx?$/, ""));
}

export function getPost(locale: Locale, slug: string): Post | null {
  for (const ext of [".md", ".mdx"]) {
    const fp = path.join(localeDir(locale), slug + ext);
    if (fs.existsSync(fp)) {
      const raw = fs.readFileSync(fp, "utf8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: String(data.title ?? slug),
        date: String(data.date ?? ""),
        summary: String(data.summary ?? ""),
        locale,
        content,
      };
    }
  }
  return null;
}

export function getAllPosts(locale: Locale): PostMeta[] {
  return getPostSlugs(locale)
    .map((slug) => getPost(locale, slug))
    .filter((p): p is Post => p !== null)
    .map(
      (p): PostMeta => ({
        slug: p.slug,
        title: p.title,
        date: p.date,
        summary: p.summary,
        locale: p.locale,
      }),
    )
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
