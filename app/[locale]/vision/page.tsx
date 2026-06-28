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
    <>
      <JsonLd
        data={breadcrumbSchema(loc, [
          { name: dict.nav.home, path: "" },
          { name: dict.nav.vision, path: "/vision" },
        ])}
      />

      <article>
        <section>
          <div className="mx-auto max-w-3xl px-6 pb-12 pt-20 md:pt-28">
            <Reveal>
              <p className="eyebrow">{dict.vision.eyebrow}</p>
              <h1 className="display mt-6 text-[length:var(--text-h1)] text-ink">
                {dict.vision.title}
              </h1>
            </Reveal>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-3xl px-6 pb-8">
            <div className="space-y-7 text-lg leading-relaxed text-ink-soft">
              {dict.vision.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 60}>
                  <p className={i === 0 ? "text-xl text-ink" : undefined}>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-3xl px-6 py-12">
            <Reveal>
              <blockquote className="border-l-2 border-accent pl-6 font-display text-2xl italic leading-snug text-accent-ink md:text-3xl">
                “{dict.vision.pullquote}”
              </blockquote>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-line">
          <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
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
    </>
  );
}
