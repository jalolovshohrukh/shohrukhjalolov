import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata, faqSchema } from "@/lib/seo";
import { getAllPosts } from "@/lib/posts";
import { Reveal } from "@/components/Reveal";
import { Cta } from "@/components/Cta";
import { VentureCard } from "@/components/VentureCard";
import { UpdateCard } from "@/components/UpdateCard";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    path: "",
    title: dict.meta.home.title,
    description: dict.meta.home.description,
  });
}

export default async function HomePage({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc: Locale = locale;
  const dict = getDictionary(loc);
  const base = `/${loc}`;
  const posts = getAllPosts(loc).slice(0, 3);

  return (
    <>
      <JsonLd data={faqSchema(loc)} />

      {/* Hero */}
      <section>
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-20 md:pb-28 md:pt-28">
          <Reveal>
            <p className="eyebrow">{dict.hero.eyebrow}</p>
          </Reveal>
          <Reveal delay={70}>
            <h1 className="mt-6 max-w-4xl text-[length:var(--text-display)] text-ink">
              {dict.hero.headlineA}{" "}
              <span className="italic text-accent-ink">{dict.hero.headlineB}</span>
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {dict.hero.lead}
            </p>
          </Reveal>
          <Reveal delay={210}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Cta href={`${base}/work`}>{dict.hero.ctaWork}</Cta>
              <Cta href={`${base}/contact`} variant="ghost" arrow={false}>
                {dict.hero.ctaContact}
              </Cta>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Focus — three pillars as editorial columns (not boxed cards) */}
      <section className="border-t border-line bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <Reveal>
            <p className="eyebrow">{dict.focus.eyebrow}</p>
            <h2 className="mt-4 max-w-2xl text-[length:var(--text-h2)] text-ink">
              {dict.focus.title}
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
            {dict.focus.pillars.map((p, i) => (
              <Reveal
                key={i}
                delay={i * 90}
                className="flex flex-col bg-paper p-8"
              >
                <span className="font-mono text-sm text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-serif text-xl text-ink">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {p.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ventures — bento (first card spans 2 cols, fills exactly) */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <Reveal>
            <p className="eyebrow">{dict.ventures.eyebrow}</p>
            <h2 className="mt-4 max-w-2xl text-[length:var(--text-h2)] text-ink">
              {dict.ventures.title}
            </h2>
            <p className="mt-4 max-w-xl text-ink-soft">{dict.ventures.lead}</p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {dict.ventures.items.map((item, i) => (
              <Reveal
                key={item.id}
                delay={i * 70}
                className={`h-full ${i === 0 ? "md:col-span-2" : ""}`}
              >
                <VentureCard item={item} visitLabel={dict.ventures.visit} />
              </Reveal>
            ))}
          </div>
          <div className="mt-10">
            <Cta href={`${base}/work`} variant="ghost">
              {dict.hero.ctaWork}
            </Cta>
          </div>
        </div>
      </section>

      {/* Vision teaser — quiet accent band with pullquote */}
      <section className="border-t border-line bg-accent-soft">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
          <Reveal>
            <p className="eyebrow">{dict.vision.eyebrow}</p>
            <blockquote className="mx-auto mt-8 max-w-3xl font-serif text-3xl italic leading-tight text-accent-ink md:text-4xl">
              “{dict.vision.pullquote}”
            </blockquote>
            <div className="mt-10 flex justify-center">
              <Cta href={`${base}/vision`} variant="ghost">
                {dict.nav.vision}
              </Cta>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Weekly updates teaser */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">{dict.updatesTeaser.eyebrow}</p>
                <h2 className="mt-4 text-[length:var(--text-h2)] text-ink">
                  {dict.updatesTeaser.title}
                </h2>
                <p className="mt-4 max-w-xl text-ink-soft">
                  {dict.updatesTeaser.lead}
                </p>
              </div>
              <Cta href={`${base}/updates`} variant="ghost">
                {dict.updatesTeaser.viewAll}
              </Cta>
            </div>
          </Reveal>

          <div className="mt-12">
            {posts.length === 0 ? (
              <p className="border-t border-line pt-8 text-ink-soft">
                {dict.updatesTeaser.empty}
              </p>
            ) : (
              posts.map((post, i) => (
                <Reveal key={post.slug} delay={i * 60}>
                  <UpdateCard
                    post={post}
                    locale={loc}
                    readLabel={dict.updatesPage.readMore}
                  />
                </Reveal>
              ))
            )}
          </div>
        </div>
      </section>

      {/* FAQ — GEO surface, mirrors FAQPage schema */}
      <section className="border-t border-line bg-paper">
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-24">
          <Reveal>
            <h2 className="text-[length:var(--text-h2)] text-ink">
              {dict.faq.title}
            </h2>
            <div className="mt-10">
              <Faq items={dict.faq.items} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Reveal>
            <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
              <h2 className="max-w-xl text-[length:var(--text-h2)] text-ink">
                {dict.contact.title}
              </h2>
              <Cta href={`${base}/contact`}>{dict.contact.ctaEmail}</Cta>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
