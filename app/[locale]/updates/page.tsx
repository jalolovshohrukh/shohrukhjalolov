import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { getAllPosts } from "@/lib/posts";
import { Reveal } from "@/components/Reveal";
import { UpdateCard } from "@/components/UpdateCard";
import { JsonLd } from "@/components/JsonLd";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    path: "/updates",
    title: dict.meta.updates.title,
    description: dict.meta.updates.description,
  });
}

export default async function UpdatesPage({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc: Locale = locale;
  const dict = getDictionary(loc);
  const posts = getAllPosts(loc);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(loc, [
          { name: dict.nav.home, path: "" },
          { name: dict.nav.updates, path: "/updates" },
        ])}
      />

      <section>
        <div className="mx-auto max-w-4xl px-6 pb-10 pt-20 md:pt-28">
          <Reveal>
            <p className="eyebrow">{dict.updatesPage.eyebrow}</p>
            <h1 className="display mt-6 text-[length:var(--text-h1)] text-ink">
              {dict.updatesPage.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {dict.updatesPage.lead}
            </p>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-4xl px-6 pb-24">
          {posts.length === 0 ? (
            <p className="border-t border-line pt-10 text-ink-soft">
              {dict.updatesPage.empty}
            </p>
          ) : (
            <div className="mt-6">
              {posts.map((post, i) => (
                <Reveal key={post.slug} delay={i * 50}>
                  <UpdateCard
                    post={post}
                    locale={loc}
                    readLabel={dict.updatesPage.readMore}
                  />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
