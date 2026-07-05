import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  EnvelopeSimple,
  MapPin,
  InstagramLogo,
  LinkedinLogo,
  FacebookLogo,
  ArrowUpRight,
  Plus,
} from "@phosphor-icons/react/dist/ssr";

import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/siteConfig";
import { Reveal } from "@/components/Reveal";
import { EmailMe } from "@/components/EmailMe";
import { JsonLd } from "@/components/JsonLd";

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

      <section>
        <div className="mx-auto max-w-6xl px-6 pb-12 pt-20 md:pt-28">
          <Reveal>
            <p className="eyebrow">{dict.contact.eyebrow}</p>
            <h1 className="display mt-6 text-[length:var(--text-h1)] text-ink">
              {dict.contact.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {dict.contact.lead}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2 md:py-20">
          {/* Email + Office */}
          <Reveal className="space-y-10">
            <div>
              <p className="eyebrow">{dict.contact.emailLabel}</p>
              <EmailMe className="mt-3 inline-flex cursor-pointer items-center gap-2 font-display text-2xl text-ink transition-colors hover:text-accent md:text-3xl">
                <EnvelopeSimple size={24} className="text-accent" />
                {dict.contact.ctaEmail}
              </EmailMe>
            </div>
            <div>
              <p className="eyebrow">{dict.contact.officeLabel}</p>
              <p className="mt-3 inline-flex items-start gap-2 text-lg text-ink-soft">
                <MapPin size={22} className="mt-0.5 shrink-0 text-accent" />
                {dict.contact.office}
              </p>
            </div>
            <EmailMe className="group inline-flex cursor-pointer items-center justify-between gap-6 whitespace-nowrap border border-ink bg-ink px-5 py-3 font-mono text-xs uppercase tracking-[0.15em] text-bone transition-colors duration-200 hover:border-accent-ink hover:bg-accent-ink">
              <span>{dict.contact.ctaEmail}</span>
              <Plus
                size={14}
                className="transition-transform duration-300 group-hover:rotate-90"
              />
            </EmailMe>
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
                    className="group flex items-center justify-between gap-4 border-b border-line py-5 transition-colors hover:border-ink/20"
                  >
                    <span className="flex items-center gap-3">
                      <Icon size={22} className="text-ink-soft" />
                      <span>
                        <span className="block text-ink">{label}</span>
                        <span className="block font-mono text-xs text-ink-faint">
                          {handle}
                        </span>
                      </span>
                    </span>
                    <ArrowUpRight
                      size={18}
                      className="text-ink-faint transition-colors group-hover:text-accent"
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
