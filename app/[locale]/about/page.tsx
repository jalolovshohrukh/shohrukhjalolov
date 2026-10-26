import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import { Cta } from "@/components/Cta";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    path: "/about",
    title: dict.meta.about.title,
    description: dict.meta.about.description,
  });
}

export default async function AboutPage({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc: Locale = locale;
  const dict = getDictionary(loc);
  const base = `/${loc}`;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(loc, [
          { name: dict.nav.home, path: "" },
          { name: dict.nav.about, path: "/about" },
        ])}
      />

      <PageHero
        eyebrow={dict.about.eyebrow}
        title={dict.about.title}
        lead={dict.about.lead}
      />

      <section className="border-t border-line">
        <div className="shell grid gap-12 py-24 md:py-32 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow">{dict.nav.about}</p>
            <p className="mt-4 max-w-xs leading-relaxed text-ink-soft">
              {dict.footer.tagline}
            </p>
          </Reveal>
          <div className="space-y-7 text-lg leading-relaxed text-ink-soft">
            {dict.about.paragraphs.map((p, i) => (
              <Reveal key={p} delay={i * 80}>
                <p className={i === 0 ? "text-xl text-ink md:text-2xl md:leading-snug" : undefined}>
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="border-t border-line">
        <div className="shell py-24 md:py-32">
          <Reveal>
            <h2 className="display text-[length:var(--text-h1)]">
              {dict.about.educationTitle}
            </h2>
          </Reveal>
          <div className="mt-12 border-t border-line md:mt-16">
            {dict.about.education.map((e, i) => (
              <Reveal key={e.institution} delay={i * 80}>
                <div className="grid gap-2 border-b border-line py-8 md:grid-cols-[1.2fr_1fr_auto] md:items-baseline md:gap-10 md:py-10">
                  <h3 className="text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.035em] md:text-[2.2rem]">
                    {e.institution}
                  </h3>
                  <p className="text-ink-soft">{e.degree}</p>
                  <p className="caps text-ink-faint">
                    {e.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-16 flex flex-wrap items-center gap-3">
              <Cta href={`${base}/work`}>{dict.hero.ctaWork}</Cta>
              <Cta href={`${base}/contact`} variant="ghost">
                {dict.hero.ctaContact}
              </Cta>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
