import Link from "next/link";
import {
  ArrowUpRight,
  InstagramLogo,
  LinkedinLogo,
  FacebookLogo,
} from "@phosphor-icons/react/dist/ssr";
import { siteConfig } from "@/lib/siteConfig";
import type { Locale, Dictionary } from "@/lib/i18n";
import { EmailMe } from "@/components/EmailMe";

/**
 * Orlive-style footer: a dark rounded panel (dark in both themes) with the
 * call to talk, link columns, and a giant serif wordmark fading into its foot.
 */
export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const base = `/${locale}`;
  const year = 2026;

  const nav = [
    { href: base, label: dict.nav.home },
    { href: `${base}/about`, label: dict.nav.about },
    { href: `${base}/work`, label: dict.nav.work },
    { href: `${base}/vision`, label: dict.nav.vision },
    { href: `${base}/updates`, label: dict.nav.updates },
    { href: `${base}/contact`, label: dict.nav.contact },
  ];

  const socials = [
    { href: siteConfig.socials.instagram, label: "Instagram", Icon: InstagramLogo },
    { href: siteConfig.socials.linkedin, label: "LinkedIn", Icon: LinkedinLogo },
    { href: siteConfig.socials.facebook, label: "Facebook", Icon: FacebookLogo },
  ];

  const label = "eyebrow";
  const link = "text-ink-soft transition-colors hover:text-ink";

  return (
    <footer className="mt-auto p-2 sm:p-3">
      <div className="tone-dark overflow-hidden rounded-[28px] bg-surface text-ink">
        <div className="px-6 pt-14 sm:px-10 md:pt-20 lg:px-14">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <div>
              <h2 className="display text-[length:var(--text-h1)]">
                {dict.footer.headline}
              </h2>
              <p className="mt-5 max-w-sm text-ink-soft">{dict.footer.tagline}</p>
              <EmailMe className="liquid liquid-ember group mt-8 inline-flex h-12 cursor-pointer items-center gap-3 rounded-full px-6 caps">
                <span>{dict.contact.ctaEmail}</span>
                <ArrowUpRight
                  size={15}
                  weight="bold"
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </EmailMe>
            </div>

            <div>
              <p className={label}>{dict.footer.nav}</p>
              <ul className="mt-5 space-y-2.5">
                {nav.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={link}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className={label}>{dict.footer.connect}</p>
              <ul className="mt-3">
                {socials.map(({ href, label: name, Icon }) => (
                  <li key={name}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex h-10 items-center gap-2.5 ${link}`}
                    >
                      <Icon size={17} weight="fill" />
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className={label}>{dict.contact.officeLabel}</p>
              <p className="mt-5 max-w-[16rem] text-ink-soft">{dict.contact.office}</p>
            </div>
          </div>

          <div className="mt-16 h-px bg-line md:mt-24" />

          {/* Decorative wordmark — the name is already the site's logo and title.
              Sized in container units so the word spans the panel's full width. */}
          <div className="@container">
            <p
              aria-hidden="true"
              className="wordmark-fade select-none pb-[0.04em] pt-[0.06em] text-center text-[33cqw] font-extrabold leading-[0.8] tracking-[-0.06em] text-ink"
            >
              Jalolov
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 px-6 pb-7 pt-2 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-14">
          <p>
            © {year} {siteConfig.name}. {dict.footer.rights}
          </p>
          <p className="caps">
            {dict.footer.builtWith}
          </p>
        </div>
      </div>
    </footer>
  );
}
