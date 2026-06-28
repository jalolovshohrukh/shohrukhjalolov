import Link from "next/link";
import {
  InstagramLogo,
  LinkedinLogo,
  FacebookLogo,
  EnvelopeSimple,
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
    { href: `mailto:${siteConfig.email}`, label: "Email", Icon: EnvelopeSimple },
  ];

  return (
    <footer className="mt-auto border-t border-line bg-bone">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Link href={base} className="font-serif text-xl tracking-tight text-ink">
              Shohrukh Jalolov
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
              {dict.footer.tagline}
            </p>
          </div>

          <div>
            <h2 className="eyebrow">{dict.footer.nav}</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {nav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-ink-soft transition-colors hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="eyebrow">{dict.footer.connect}</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-ink-soft transition-colors hover:text-ink"
                  >
                    <Icon size={16} weight="regular" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. {dict.footer.rights}
          </p>
          <p className="font-mono">{dict.footer.builtWith}</p>
        </div>
      </div>
    </footer>
  );
}
