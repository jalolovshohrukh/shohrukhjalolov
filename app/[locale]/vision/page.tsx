import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import { Cta } from "@/components/Cta";
import { Glow } from "@/components/Glow";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    path: "/vision",
    title: dict.meta.vision.title,
    description: dict.meta.vision.description,
  });
}

export default async function VisionPage({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc: Locale = locale;
  const dict = getDictionary(loc);
  const base = `/${loc}`;

  return (
    <article>
      <JsonLd
        data={breadcrumbSchema(loc, [
          { name: dict.nav.home, path: "" },
          { name: dict.nav.vision, path: "/vision" },
        ])}
      />

      <PageHero eyebrow={dict.vision.eyebrow} title={dict.vision.title} />

      <section className="border-t border-line">
        <div className="shell py-24 md:py-32">
          <div className="max-w-3xl space-y-8 text-lg leading-relaxed text-ink-soft">
            {dict.vision.paragraphs.map((p, i) => (
              <Reveal key={p} delay={i * 70}>
                <p
                  className={
                    i === 0
                      ? "text-[clamp(1.4rem,2.2vw,1.9rem)] font-medium leading-[1.3] tracking-[-0.03em] text-ink"
                      : undefined
                  }
                >
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Rudaki — dark ember band in both themes */}
      <section className="tone-dark relative isolate overflow-hidden bg-canvas text-ink">
        <Glow className="rotate-180" />
        <div className="shell py-28 text-center md:py-40">
          <Reveal>
            <blockquote className="mx-auto max-w-5xl text-[clamp(2rem,4.6vw,4.1rem)] font-semibold leading-[1.06] tracking-[-0.045em]">
              “{dict.vision.pullquote}”
            </blockquote>
            <p className="mx-auto mt-8 max-w-3xl text-lg leading-snug text-ink-soft md:text-xl">
              {dict.vision.pullquoteOriginal}
            </p>
            <p className="eyebrow mt-6">— {dict.vision.pullquoteSource}</p>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="shell py-20 md:py-28">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <Cta href={`${base}/updates`}>{dict.vision.cta}</Cta>
              <Cta href={`${base}/work`} variant="ghost">
                {dict.nav.work}
              </Cta>
            </div>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
