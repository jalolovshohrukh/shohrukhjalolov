import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata, faqSchema } from "@/lib/seo";
import { getAllPosts } from "@/lib/posts";
import { allCompanies } from "@/lib/companies";
import { visited } from "@/lib/places";
import { Reveal } from "@/components/Reveal";
import { Cta } from "@/components/Cta";
import { Glow } from "@/components/Glow";
import { EmberField } from "@/components/EmberField";
import { Marquee } from "@/components/Marquee";
import { StatRow } from "@/components/StatRow";
import { VentureShowcase } from "@/components/VentureShowcase";
import { CompanyGrid } from "@/components/CompanyGrid";
import { UpdateCard } from "@/components/UpdateCard";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { WorldMap, MAP_HOME, MAP_VISITED } from "@/components/WorldMap";

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
  const companies = allCompanies(dict);
  const [firstName, ...lastName] = dict.hero.name.split(" ");

  return (
    <>
      <JsonLd data={faqSchema(loc)} />

      {/* Hero — huge name over ember smoke that answers the pointer (the CSS
          glow shows until the shader takes over, or instead of it without
          WebGL); slides under the header */}
      <section className="relative isolate -mt-16 overflow-hidden pt-16 md:-mt-20 md:pt-20">
        <Glow />
        <EmberField />
        <div className="shell flex min-h-[calc(100svh-9rem)] flex-col justify-between gap-14 pb-12 pt-12 md:pt-20">
          <div>
            <Reveal>
              <p className="eyebrow">{dict.hero.eyebrow}</p>
            </Reveal>
            <Reveal delay={90}>
              <h1 className="display mt-6 text-[length:var(--text-hero)] leading-[0.86] tracking-[-0.055em]">
                <span className="block">{firstName}</span>
                <span className="block">{lastName.join(" ")}</span>
              </h1>
            </Reveal>
          </div>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <Reveal delay={200}>
              <p className="text-[clamp(1.6rem,2.8vw,2.3rem)] font-semibold leading-[1.1] tracking-[-0.035em]">
                {dict.hero.headlineA} <span className="text-accent">{dict.hero.headlineB}</span>
              </p>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
                {dict.hero.lead}
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="flex flex-wrap gap-3">
                <Cta href={`${base}/work`}>{dict.hero.ctaWork}</Cta>
                <Cta href={`${base}/contact`} variant="ghost">
                  {dict.hero.ctaContact}
                </Cta>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={420}>
          <div className="pb-12">
            <Marquee items={companies} label={dict.clients.label} />
          </div>
        </Reveal>
      </section>

      {/* Ventures — cristianoronaldo.com "brands" stage, dark in both themes */}
      <section className="tone-dark relative isolate overflow-hidden bg-canvas text-ink">
        <div className="shell py-24 md:py-32">
          <Reveal>
            <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
              <div>
                <p className="eyebrow">{dict.ventures.eyebrow}</p>
                <h2 className="display mt-5 text-[length:var(--text-h1)]">
                  {dict.ventures.title}
                </h2>
              </div>
              <p className="max-w-md text-lg leading-relaxed text-ink-soft lg:justify-self-end">
                {dict.ventures.lead}
              </p>
            </div>
          </Reveal>
          <div className="mt-14 md:mt-20">
            <VentureShowcase
              items={dict.ventures.items}
              visitLabel={dict.ventures.visit}
              listLabel={dict.ventures.eyebrow}
            />
          </div>
        </div>
      </section>

      {/* By the numbers */}
      <section>
        <div className="shell py-24 md:py-36">
          <Reveal>
            <p className="eyebrow">{dict.stats.eyebrow}</p>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-12 md:mt-16">
              <StatRow stats={dict.stats.items} />
            </div>
          </Reveal>
          <Reveal delay={200}>
            <ul className="mt-14 flex flex-wrap gap-2.5 md:mt-20">
              {dict.hero.tags.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* How I work */}
      <section className="border-t border-line">
        <div className="shell grid gap-12 py-24 md:py-36 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow">{dict.focus.eyebrow}</p>
            <h2 className="display mt-5 text-[length:var(--text-h1)]">
              {dict.focus.title}
            </h2>
          </Reveal>
          <div className="border-t border-line">
            {dict.focus.pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <div className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-line py-9 md:grid-cols-[3.5rem_1fr] md:py-11">
                  <span className="pt-2 text-xs font-medium tabular-nums text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[1.75rem] font-semibold leading-[1.08] tracking-[-0.035em] md:text-[2.25rem]">
                      {p.title}
                    </h3>
                    <p className="mt-4 max-w-xl leading-relaxed text-ink-soft">{p.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Companies — cristianoronaldo.com partner grid */}
      <section className="border-t border-line">
        <div className="shell py-24 md:py-36">
          <Reveal>
            <CompanyGrid
              items={companies}
              label={dict.clients.label}
              emphasis={dict.clients.emphasis}
            />
          </Reveal>
        </div>
      </section>

      {/* Where I've been — dotted world map */}
      <section className="border-t border-line">
        <div className="shell py-24 md:py-36">
          <Reveal>
            <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
              <div>
                <p className="eyebrow">{dict.places.eyebrow}</p>
                <h2 className="display mt-5 text-[length:var(--text-h1)]">
                  {dict.places.title}
                </h2>
              </div>
              <p className="max-w-md text-lg leading-relaxed text-ink-soft lg:justify-self-end">
                {dict.places.caption}
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-14">
              <WorldMap locale={loc} />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-10 flex flex-wrap gap-6 caps text-ink-soft">
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: MAP_HOME }} />
                {dict.places.home}
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: MAP_VISITED }} />
                {dict.places.visited}
              </span>
            </div>

            {/* Place list grouped by country (also feeds search/GEO) */}
            <ul className="mt-10 grid grid-cols-1 gap-x-10 gap-y-7 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-3">
              {visited.map((country) => (
                <li key={country.en}>
                  <div className="flex items-center gap-2">
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: country.home ? MAP_HOME : MAP_VISITED }}
                    />
                    <span className="caps text-ink">
                      {loc === "ru" ? country.ru : country.en}
                    </span>
                  </div>
                  <p className="mt-2 pl-3.5 text-sm leading-relaxed text-ink-soft">
                    {country.cities.map((c) => (loc === "ru" ? c.ru : c.en)).join(", ")}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Lewis & Clark College tribute */}
      <section className="border-t border-line">
        <div className="shell py-24 md:py-36">
          <Reveal>
            <p className="eyebrow">{dict.college.eyebrow}</p>
            {/* Official Lewis & Clark College logo — the mark already includes
                the name, so it stands in for the wordmark here. */}
            <img
              src="/lewis-clark-logo.svg"
              alt="Lewis & Clark College"
              className="mt-8 h-24 w-auto md:h-32"
            />
          </Reveal>
          <Reveal delay={90}>
            <div className="mt-14 grid gap-12 lg:grid-cols-[1.7fr_1fr] lg:gap-20">
              <p className="text-[clamp(1.5rem,2.4vw,2.1rem)] font-medium leading-[1.25] tracking-[-0.035em]">
                {dict.college.body}
              </p>
              <div className="lg:pt-2">
                <p className="eyebrow">{dict.college.thanksLabel}</p>
                <p className="mt-4 leading-relaxed text-ink">
                  {dict.college.thanksNames}{" "}
                  <span className="text-ink-faint">{dict.college.thanksMore}</span>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Vision — Rudaki, on a dark ember band in both themes */}
      <section className="tone-dark relative isolate overflow-hidden bg-canvas text-ink">
        <Glow className="rotate-180" />
        <div className="shell py-28 text-center md:py-44">
          <Reveal>
            <p className="eyebrow">{dict.vision.eyebrow}</p>
            <blockquote className="mx-auto mt-10 max-w-5xl text-[clamp(2rem,4.8vw,4.25rem)] font-semibold leading-[1.06] tracking-[-0.045em]">
              “{dict.vision.pullquote}”
            </blockquote>
            <p className="mx-auto mt-8 max-w-3xl text-lg leading-snug text-ink-soft md:text-xl">
              {dict.vision.pullquoteOriginal}
            </p>
            <p className="eyebrow mt-6">— {dict.vision.pullquoteSource}</p>
            <div className="mt-12 flex justify-center">
              <Cta href={`${base}/vision`} variant="ghost">
                {dict.nav.vision}
              </Cta>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Weekly updates */}
      {posts.length > 0 && (
        <section>
          <div className="shell py-24 md:py-36">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <p className="eyebrow">{dict.updatesTeaser.eyebrow}</p>
                  <h2 className="display mt-5 text-[length:var(--text-h1)]">
                    {dict.updatesTeaser.title}
                  </h2>
                </div>
                <Cta href={`${base}/updates`} variant="ghost">
                  {dict.updatesTeaser.viewAll}
                </Cta>
              </div>
            </Reveal>
            <div className="mt-14 border-b border-line">
              {posts.map((post, i) => (
                <Reveal key={post.slug} delay={i * 80}>
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
      <section className="border-t border-line">
        <div className="shell grid gap-12 py-24 md:py-36 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <h2 className="display text-[length:var(--text-h1)]">{dict.faq.title}</h2>
          </Reveal>
          <Reveal delay={100}>
            <Faq items={dict.faq.items} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
