import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import { Cta } from "@/components/Cta";
import { JsonLd } from "@/components/JsonLd";

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

      <section>
        <div className="mx-auto max-w-6xl px-6 pb-16 pt-20 md:pt-28">
          <Reveal>
            <p className="eyebrow">{dict.about.eyebrow}</p>
            <h1 className="display mt-6 text-[length:var(--text-h1)] text-ink">
              {dict.about.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {dict.about.lead}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1fr_2fr] md:py-20">
          <Reveal className="md:sticky md:top-24 md:self-start">
            <p className="eyebrow">{dict.nav.about}</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
              {dict.footer.tagline}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="space-y-6 text-[1.075rem] leading-relaxed text-ink-soft">
              {dict.about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Education */}
      <section className="border-t border-line bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <Reveal>
            <h2 className="text-[length:var(--text-h2)] text-ink">
              {dict.about.educationTitle}
            </h2>
          </Reveal>
          <div className="mt-10 border-t border-line">
            {dict.about.education.map((e, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="flex flex-col gap-1 border-b border-line py-6 md:flex-row md:items-baseline md:justify-between md:gap-8">
                  <div>
                    <h3 className="font-display text-xl text-ink">
                      {e.institution}
                    </h3>
                    <p className="mt-1 text-sm text-ink-soft">{e.degree}</p>
                  </div>
                  <p className="font-mono text-xs text-ink-faint">{e.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
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
