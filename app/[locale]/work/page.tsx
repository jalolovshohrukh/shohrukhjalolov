import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { prettyDomain } from "@/lib/format";
import { allCompanies } from "@/lib/companies";
import { Reveal } from "@/components/Reveal";
import { Cta } from "@/components/Cta";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { CompanyGrid } from "@/components/CompanyGrid";

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

      <PageHero
        eyebrow={dict.ventures.eyebrow}
        title={dict.ventures.title}
        lead={dict.ventures.lead}
      />

      {/* Ventures — one large row each */}
      <section className="shell pb-24 md:pb-32">
        <div className="border-t border-line">
          {dict.ventures.items.map((item, i) => {
            const row = (
              <div className="grid gap-5 py-10 md:py-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
                <div>
                  <p className="caps text-ink-faint">
                    <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>
                    {"  ·  "}
                    {item.tag}
                  </p>
                  <h2 className="display mt-4 text-[clamp(3.25rem,8vw,7rem)] transition-colors duration-300 group-hover:text-accent">
                    {item.name}
                  </h2>
                </div>
                <div className="lg:pb-3">
                  <p className="max-w-xl text-lg leading-relaxed text-ink-soft">{item.blurb}</p>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <span className="chip text-ink">{item.role}</span>
                    {item.url && (
                      <span className="inline-flex items-center gap-1.5 caps text-ink-soft transition-colors group-hover:text-accent">
                        {prettyDomain(item.url)}
                        <ArrowUpRight size={14} weight="bold" />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );

            return (
              <Reveal key={item.id} delay={i * 70}>
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block border-b border-line"
                  >
                    {row}
                  </a>
                ) : (
                  <div className="border-b border-line">{row}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Companies — partner grid */}
      <section className="border-t border-line">
        <div className="shell py-24 md:py-32">
          <Reveal>
            <CompanyGrid
              items={allCompanies(dict)}
              label={dict.clients.label}
              emphasis={dict.clients.emphasis}
            />
          </Reveal>
          <Reveal>
            <div className="mt-20 flex flex-wrap items-center justify-center gap-3">
              <Cta href={`${base}/contact`}>{dict.hero.ctaContact}</Cta>
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
