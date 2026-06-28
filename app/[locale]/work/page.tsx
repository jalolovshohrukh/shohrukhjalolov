import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { prettyDomain } from "@/lib/format";
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
    path: "/work",
    title: dict.meta.work.title,
    description: dict.meta.work.description,
  });
}

export default async function WorkPage({ params }: Params) {
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
          { name: dict.nav.work, path: "/work" },
        ])}
      />

      <section>
        <div className="mx-auto max-w-6xl px-6 pb-12 pt-20 md:pt-28">
          <Reveal>
            <p className="eyebrow">{dict.ventures.eyebrow}</p>
            <h1 className="mt-6 max-w-3xl text-[length:var(--text-h1)] text-ink">
              {dict.ventures.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {dict.ventures.lead}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 pb-20">
          <div className="border-t border-line">
            {dict.ventures.items.map((item, i) => {
              const hasUrl = Boolean(item.url);
              const Row = (
                <div className="grid gap-4 py-9 md:grid-cols-[auto_1fr_auto] md:items-baseline md:gap-10">
                  <div className="flex items-baseline gap-4 md:w-64">
                    <span className="font-mono text-sm text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h2 className="font-serif text-2xl text-ink md:text-3xl">
                        {item.name}
                      </h2>
                      <p className="mt-1 text-sm font-medium text-accent">
                        {item.role}
                      </p>
                    </div>
                  </div>
                  <p className="max-w-xl text-ink-soft md:pt-1">{item.blurb}</p>
                  <div className="md:pt-1">
                    {hasUrl ? (
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs text-ink-faint transition-colors group-hover:text-accent">
                        {prettyDomain(item.url)}
                        <ArrowUpRight size={14} />
                      </span>
                    ) : (
                      <span className="font-mono text-xs text-ink-faint">
                        {item.tag}
                      </span>
                    )}
                  </div>
                </div>
              );

              return (
                <Reveal key={item.id} delay={i * 60}>
                  {hasUrl ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block border-b border-line transition-colors hover:border-ink/20"
                    >
                      {Row}
                    </a>
                  ) : (
                    <div className="group border-b border-line">{Row}</div>
                  )}
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <div className="mt-12 flex flex-wrap items-center gap-3">
              <Cta href={`${base}/contact`}>{dict.contact.ctaEmail}</Cta>
              <Cta href={`${base}/vision`} variant="ghost">
                {dict.nav.vision}
              </Cta>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
