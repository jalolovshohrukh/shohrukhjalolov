import Link from "next/link";
import {
  InstagramLogo,
  LinkedinLogo,
  FacebookLogo,
} from "@phosphor-icons/react/dist/ssr";
import { siteConfig } from "@/lib/siteConfig";
import type { Locale, Dictionary } from "@/lib/i18n";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const base = `/${locale}`;
  const year = 2026;

  const nav = [
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

  const label = "font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-faint";

  return (
    <footer className="mt-auto border-t border-line bg-bone">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Info row */}
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link
              href={base}
              className="font-display text-lg font-semibold uppercase tracking-[0.16em] text-ink"
            >
              Shohrukh Jalolov
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
              {dict.footer.tagline}
            </p>
          </div>

          <div>
            <p className={label}>{dict.contact.officeLabel}</p>
            <p className="mt-3 text-sm text-ink">{dict.contact.office}</p>
          </div>

          <div>
            <p className={label}>{dict.contact.emailLabel}</p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-3 block text-sm text-ink transition-colors hover:text-accent"
            >
              {siteConfig.email}
            </a>
          </div>

          <div>
            <p className={label}>{dict.footer.connect}</p>
            <ul className="mt-3 space-y-2">
              {socials.map(({ href, label: l, Icon }) => (
                <li key={l}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-ink"
                  >
                    <Icon size={16} />
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Nav row */}
        <nav className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-8">
          {nav.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-mono text-xs uppercase tracking-[0.15em] text-ink-soft transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. {dict.footer.rights}
          </p>
          <p className="font-mono uppercase tracking-[0.15em]">
            {dict.footer.builtWith}
          </p>
        </div>
      </div>
    </footer>
  );
}
