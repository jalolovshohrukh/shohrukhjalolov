import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  InstagramLogo,
  LinkedinLogo,
  FacebookLogo,
  ArrowUpRight,
} from "@phosphor-icons/react/dist/ssr";

import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/siteConfig";
import { Reveal } from "@/components/Reveal";
import { EmailMe } from "@/components/EmailMe";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    path: "/contact",
    title: dict.meta.contact.title,
    description: dict.meta.contact.description,
  });
}

export default async function ContactPage({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc: Locale = locale;
  const dict = getDictionary(loc);

  const socials = [
    { href: siteConfig.socials.instagram, label: "Instagram", handle: "@jalolovshohrukh", Icon: InstagramLogo },
    { href: siteConfig.socials.linkedin, label: "LinkedIn", handle: "Shohrukh Jalolov", Icon: LinkedinLogo },
    { href: siteConfig.socials.facebook, label: "Facebook", handle: "Shohrukh Jalolov", Icon: FacebookLogo },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(loc, [
          { name: dict.nav.home, path: "" },
          { name: dict.nav.contact, path: "/contact" },
        ])}
      />

      <PageHero
        eyebrow={dict.contact.eyebrow}
        title={dict.contact.title}
        lead={dict.contact.lead}
      />

      <section className="border-t border-line">
        <div className="shell grid gap-16 py-24 md:py-32 lg:grid-cols-2 lg:gap-20">
          {/* Email + Office */}
          <Reveal className="space-y-14">
            <div>
              <p className="eyebrow">{dict.contact.emailLabel}</p>
              <EmailMe className="group mt-5 inline-flex cursor-pointer items-center gap-4 text-left text-[clamp(2.6rem,6vw,4.5rem)] font-bold leading-none tracking-[-0.05em] text-ink transition-colors hover:text-accent">
                {dict.contact.ctaEmail}
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-on-accent transition-transform duration-300 group-hover:rotate-45 md:h-14 md:w-14">
                  <ArrowUpRight size={22} weight="bold" />
                </span>
              </EmailMe>
            </div>
            <div>
              <p className="eyebrow">{dict.contact.officeLabel}</p>
              <p className="mt-5 max-w-sm text-xl leading-relaxed text-ink-soft">
                {dict.contact.office}
              </p>
            </div>
          </Reveal>

          {/* Socials */}
          <Reveal delay={90}>
            <p className="eyebrow">{dict.contact.followLabel}</p>
            <ul className="mt-5 border-t border-line">
              {socials.map(({ href, label, handle, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 border-b border-line py-6"
                  >
                    <span className="flex items-center gap-4">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-surface text-ink-soft transition-colors group-hover:text-accent">
                        <Icon size={20} weight="fill" />
                      </span>
                      <span>
                        <span className="block text-lg text-ink">{label}</span>
                        <span className="block text-xs text-ink-faint">
                          {handle}
                        </span>
                      </span>
                    </span>
                    <ArrowUpRight
                      size={18}
                      className="text-ink-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
