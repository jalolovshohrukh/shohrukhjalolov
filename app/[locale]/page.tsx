import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata, faqSchema } from "@/lib/seo";
import { getAllPosts } from "@/lib/posts";
import { Reveal } from "@/components/Reveal";
import { Cta } from "@/components/Cta";
import { StatRow } from "@/components/StatRow";
import { VentureCard } from "@/components/VentureCard";
import { UpdateCard } from "@/components/UpdateCard";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { WorldMap, MAP_VISITED } from "@/components/WorldMap";
import { places } from "@/lib/places";

type Params = { params: Promise<{ locale: string }> };

/** Per-company hover text colour for the "worked with" strip (text only). */
const CLIENT_HOVER: Record<string, string> = {
  SoftClub: "hover:text-[#5fa8dd]", // baby blue
  LakLak: "hover:text-[#1f4e9b]", // darker blue
  Webmarket: "hover:text-[#e06a1f]", // orange
  "Flora Park": "hover:text-[#2f8f57]", // green
};

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

      {/* Hero — pure typography */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-6 pb-16 pt-16 md:pb-24 md:pt-24">
          <Reveal>
            <p className="eyebrow">{dict.hero.eyebrow}</p>
            <h1 className="display mt-6 max-w-5xl text-[length:var(--text-display)] text-ink">
              {dict.hero.headlineA} {dict.hero.headlineB}
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-12 grid gap-8 border-t border-line pt-8 md:grid-cols-[1fr_auto] md:items-center">
              <p className="max-w-2xl text-lg leading-relaxed text-ink-soft">
                {dict.hero.lead}
              </p>
              <div className="flex flex-wrap gap-3">
                <Cta href={`${base}/work`}>{dict.hero.ctaWork}</Cta>
                <Cta href={`${base}/contact`} variant="ghost">
                  {dict.hero.ctaContact}
                </Cta>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
              {dict.hero.tags.map((t) => (
                <span
                  key={t}
                  className="font-mono text-xs uppercase tracking-[0.18em] text-ink-faint"
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-line bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <Reveal>
            <span className="pill">{dict.stats.eyebrow}</span>
            <div className="mt-10">
              <StatRow stats={dict.stats.items} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Where I've been — dotted world map */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <Reveal>
            <p className="eyebrow">{dict.places.eyebrow}</p>
            <h2 className="display mt-4 text-[length:var(--text-h1)] text-ink">
              {dict.places.title}
            </h2>
            <p className="mt-4 max-w-xl text-ink-soft">{dict.places.caption}</p>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-12">
              <WorldMap />
            </div>
          </Reveal>

          <Reveal delay={120}>
            {/* Legend */}
            <div className="mt-8 flex flex-wrap gap-6 font-mono text-xs uppercase tracking-[0.15em] text-ink-soft">
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent" />
                {dict.places.home}
              </span>
              <span className="inline-flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: MAP_VISITED }}
                />
                {dict.places.visited}
              </span>
            </div>

            {/* Place list (also feeds search/GEO) */}
            <ul className="mt-8 grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3 md:grid-cols-4">
              {places.map((p) => (
                <li key={p.countryEn} className="flex items-baseline gap-2">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: p.home ? "var(--color-accent)" : MAP_VISITED }}
                  />
                  <span className="text-sm text-ink">
                    {loc === "ru" ? p.cityRu : p.cityEn}
                    <span className="text-ink-faint">
                      , {loc === "ru" ? p.countryRu : p.countryEn}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Focus — typographic numbered blocks */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <Reveal>
            <p className="eyebrow">{dict.focus.eyebrow}</p>
            <h2 className="display mt-4 max-w-3xl text-[length:var(--text-h1)] text-ink">
              {dict.focus.title}
            </h2>
          </Reveal>
          <div className="mt-12 border-t border-line">
            {dict.focus.pillars.map((p, i) => (
              <Reveal key={i} delay={i * 70}>
                <div className="grid gap-4 border-b border-line py-9 md:grid-cols-[auto_1fr] md:gap-12 md:py-12">
                  <span className="font-display text-5xl font-bold text-ink-faint md:text-7xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-semibold uppercase tracking-tight text-ink md:text-3xl">
                      {p.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-ink-soft">{p.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Companies I have worked with */}
      <section className="border-t border-line bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <Reveal>
            <span className="pill">{dict.clients.label}</span>
            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line md:grid-cols-4">
              {dict.clients.items.map((c) => {
                const cls =
                  "flex items-center justify-center bg-paper py-12 font-display text-2xl font-semibold tracking-tight text-ink transition-colors md:text-3xl";
                const hover = CLIENT_HOVER[c.name] ?? "hover:text-accent";
                return c.url ? (
                  <a
                    key={c.name}
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${cls} ${hover}`}
                  >
                    {c.name}
                  </a>
                ) : (
                  <div key={c.name} className={cls}>
                    {c.name}
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Ventures */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <Reveal>
            <p className="eyebrow">{dict.ventures.eyebrow}</p>
            <h2 className="display mt-4 max-w-3xl text-[length:var(--text-h1)] text-ink">
              {dict.ventures.title}
            </h2>
            <p className="mt-5 max-w-xl text-ink-soft">{dict.ventures.lead}</p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {dict.ventures.items.map((item, i) => (
              <Reveal key={item.id} delay={i * 60} className="h-full">
                <VentureCard
                  item={item}
                  index={String(i + 1).padStart(2, "0")}
                  visitLabel={dict.ventures.visit}
                />
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

      {/* Vision band — deep aubergine */}
      <section className="border-t border-accent-ink bg-accent text-bone">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
          <Reveal>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-bone/60">
              {dict.vision.eyebrow}
            </p>
            <blockquote className="mx-auto mt-8 max-w-3xl font-display text-3xl font-medium leading-tight text-bone md:text-4xl">
              “{dict.vision.pullquote}”
            </blockquote>
            <div className="mt-10 flex justify-center">
              <Cta href={`${base}/vision`} variant="onDark">
                {dict.nav.vision}
              </Cta>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Weekly updates — list */}
      {posts.length > 0 && (
        <section className="border-t border-line">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="eyebrow">{dict.updatesTeaser.eyebrow}</p>
                  <h2 className="display mt-4 text-[length:var(--text-h1)] text-ink">
                    {dict.updatesTeaser.title}
                  </h2>
                </div>
                <Cta href={`${base}/updates`} variant="ghost">
                  {dict.updatesTeaser.viewAll}
                </Cta>
              </div>
            </Reveal>
            <div className="mt-10">
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
          </div>
        </section>
      )}

      {/* FAQ — GEO */}
      <section className="border-t border-line bg-paper">
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
          <Reveal>
            <h2 className="display text-[length:var(--text-h2)] text-ink">
              {dict.faq.title}
            </h2>
            <div className="mt-10">
              <Faq items={dict.faq.items} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact CTA — charcoal band */}
      <section className="border-t border-line bg-ink text-bone">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <Reveal>
            <h2 className="display max-w-3xl text-[length:var(--text-h1)] text-bone">
              {dict.contact.title}
            </h2>
            <p className="mt-4 max-w-md text-bone/70">{dict.contact.lead}</p>
            <div className="mt-8">
              <Cta href={`${base}/contact`} variant="onDark">
                {dict.contact.ctaEmail}
              </Cta>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
