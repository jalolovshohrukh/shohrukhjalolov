import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import { buildMetadata, breadcrumbSchema, articleSchema } from "@/lib/seo";
import { getPost, getPostSlugs } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";

type Params = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const slug of getPostSlugs(locale)) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const post = getPost(locale, slug);
  if (!post) return {};
  return buildMetadata({
    locale,
    path: `/updates/${slug}`,
    title: `${post.title} — Shohrukh Jalolov`,
    description: post.summary,
  });
}

export default async function UpdatePostPage({ params }: Params) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const loc: Locale = locale;
  const dict = getDictionary(loc);
  const post = getPost(loc, slug);
  if (!post) notFound();

  return (
    <article>
      <JsonLd
        data={[
          articleSchema(loc, {
            title: post.title,
            description: post.summary,
            date: post.date,
            slug: post.slug,
          }),
          breadcrumbSchema(loc, [
            { name: dict.nav.home, path: "" },
            { name: dict.nav.updates, path: "/updates" },
            { name: post.title, path: `/updates/${post.slug}` },
          ]),
        ]}
      />

      <div className="mx-auto max-w-2xl px-6 pb-24 pt-20 md:pt-28">
        <Reveal>
          <Link
            href={`/${loc}/updates`}
            className="inline-flex items-center gap-1.5 font-mono text-xs text-ink-faint transition-colors hover:text-ink"
          >
            <ArrowLeft size={14} />
            {dict.updatesPage.backToList}
          </Link>

          <p className="mt-8 font-mono text-xs text-ink-faint">
            {dict.updatesPage.published} · {formatDate(post.date, loc)}
          </p>
          <h1 className="mt-4 text-[length:var(--text-h1)] text-ink">
            {post.title}
          </h1>
          {post.summary && (
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              {post.summary}
            </p>
          )}
        </Reveal>

        <Reveal delay={80}>
          <div className="prose mt-12 border-t border-line pt-10">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </Reveal>
      </div>
    </article>
  );
}
