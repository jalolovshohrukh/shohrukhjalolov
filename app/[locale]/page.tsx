import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";

import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata, faqSchema } from "@/lib/seo";
import { getAllPosts } from "@/lib/posts";
import { photos } from "@/lib/images";
import { Reveal } from "@/components/Reveal";
import { Cta } from "@/components/Cta";
import { StatRow } from "@/components/StatRow";
import { ImagePanel } from "@/components/ImagePanel";
import { VentureCard } from "@/components/VentureCard";
import { FeaturedUpdate } from "@/components/FeaturedUpdate";
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

const PILLAR_PHOTOS = [photos.build, photos.advise, photos.realEstate];

export default async function HomePage({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc: Locale = locale;
  const dict = getDictionary(loc);
  const base = `/${loc}`;
  const posts = getAllPosts(loc);
  const [featured, ...rest] = posts;

  return (
    <>
      <JsonLd data={faqSchema(loc)} />

      {/* Hero — statement + meta row */}
      <section>
        <div className="mx-auto max-w-6xl px-6 pb-12 pt-16 md:pt-20">
          <Reveal>
            <p className="eyebrow">{dict.hero.eyebrow}</p>
            <h1 className="display mt-6 max-w-5xl text-[length:var(--text-display)] text-ink">
              {dict.hero.headlineA} {dict.hero.headlineB}
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-10 grid gap-8 border-t border-line pt-8 md:grid-cols-[1fr_auto] md:items-center">
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
        </div>

        {/* Full-bleed hero image with translucent wordmark */}
        <div className="relative h-[62vh] min-h-[420px] w-full overflow-hidden">
          <Image
            src={photos.hero.src}
            alt={photos.hero.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-ink/20" />
          <span className="display pointer-events-none absolute inset-0 flex items-center justify-center px-4 text-center text-[clamp(2rem,9vw,7rem)] leading-none text-white/25">
            Shohrukh Jalolov
          </span>
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

      {/* Focus / disciplines — image panels */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 pt-16 md:pt-20">
          <Reveal>
            <p className="eyebrow">{dict.focus.eyebrow}</p>
            <h2 className="display mt-4 max-w-3xl text-[length:var(--text-h1)] text-ink">
              {dict.focus.title}
            </h2>
          </Reveal>
        </div>
        <div className="mt-12 flex flex-col gap-6">
          {dict.focus.pillars.map((p, i) => (
            <Reveal key={i}>
              <ImagePanel
                photo={PILLAR_PHOTOS[i]}
                title={p.title}
                label={String(i + 1).padStart(2, "0")}
                index={`0${i + 1} / 03`}
              />
              <div className="mx-auto max-w-6xl px-6 pt-5">
                <p className="max-w-2xl text-ink-soft">{p.body}</p>
              </div>
            </Reveal>
          ))}
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
              <Reveal
                key={item.id}
                delay={i * 60}
                className={`h-full ${i === 0 ? "md:col-span-2" : ""}`}
              >
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

      {/* Weekly updates — journal */}
      {featured && (
        <section className="border-t border-line">
          <div className="mx-auto max-w-6xl px-6 pt-16 md:pt-20">
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
          </div>

          <Reveal className="mt-10">
            <FeaturedUpdate
              post={featured}
              locale={loc}
              label={dict.updatesTeaser.eyebrow}
              readLabel={dict.updatesPage.readMore}
            />
          </Reveal>

          {rest.length > 0 && (
            <div className="mx-auto max-w-6xl px-6 pb-4">
              {rest.slice(0, 2).map((post) => (
                <UpdateCard
                  key={post.slug}
                  post={post}
                  locale={loc}
                  readLabel={dict.updatesPage.readMore}
                />
              ))}
            </div>
          )}
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

      {/* Contact CTA — full-bleed */}
      <section className="relative h-[56vh] min-h-[380px] w-full overflow-hidden border-t border-line">
        <Image
          src={photos.contact.src}
          alt={photos.contact.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/55" />
        <div className="absolute inset-0 mx-auto flex max-w-6xl flex-col justify-center px-6">
          <h2 className="display max-w-2xl text-[length:var(--text-h1)] text-white">
            {dict.contact.title}
          </h2>
          <p className="mt-4 max-w-md text-white/80">{dict.contact.lead}</p>
          <div className="mt-8">
            <Cta href={`${base}/contact`} variant="onDark">
              {dict.contact.ctaEmail}
            </Cta>
          </div>
        </div>
      </section>
    </>
  );
}
