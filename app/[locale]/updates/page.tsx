import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { getAllPosts } from "@/lib/posts";
import { Reveal } from "@/components/Reveal";
import { UpdateCard } from "@/components/UpdateCard";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";

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

      <PageHero
        eyebrow={dict.updatesPage.eyebrow}
        title={dict.updatesPage.title}
        lead={dict.updatesPage.lead}
      />

      <section>
        <div className="shell pb-24 md:pb-32">
          {posts.length === 0 ? (
            <p className="border-t border-line pt-10 text-ink-soft">
              {dict.updatesPage.empty}
            </p>
          ) : (
            <div className="border-b border-line">
              {posts.map((post, i) => (
                <Reveal key={post.slug} delay={i * 60}>
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
