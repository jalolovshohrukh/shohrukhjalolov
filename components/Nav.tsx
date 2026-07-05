"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  List,
  X,
  InstagramLogo,
  LinkedinLogo,
  FacebookLogo,
} from "@phosphor-icons/react/dist/ssr";
import { siteConfig } from "@/lib/siteConfig";
import type { Locale, Dictionary } from "@/lib/i18n";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";

export function Nav({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname() ?? `/${locale}`;
  const [open, setOpen] = useState(false);
  const base = `/${locale}`;

  const links = [
    { href: base, label: dict.nav.home, exact: true },
    { href: `${base}/about`, label: dict.nav.about },
    { href: `${base}/work`, label: dict.nav.work },
    { href: `${base}/vision`, label: dict.nav.vision },
    { href: `${base}/updates`, label: dict.nav.updates },
    { href: `${base}/contact`, label: dict.nav.contact },
  ];

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  // Lock body scroll + close on Escape while the overlay is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const socials = [
    { href: siteConfig.socials.instagram, label: "Instagram", Icon: InstagramLogo },
    { href: siteConfig.socials.linkedin, label: "LinkedIn", Icon: LinkedinLogo },
    { href: siteConfig.socials.facebook, label: "Facebook", Icon: FacebookLogo },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bone/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:h-20">
        <div className="flex items-center gap-3 md:gap-5">
          <Link
            href={base}
            className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-ink"
          >
            Shohrukh Jalolov
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={open}
            className="inline-flex items-center gap-2 rounded-md bg-accent px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-bone transition-colors hover:bg-accent-ink"
          >
            <List size={14} weight="bold" />
            {dict.nav.menu}
          </button>
          <span className="hidden font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-faint sm:inline">
            {dict.hero.eyebrow}
          </span>
        </div>

        <div className="hidden items-center gap-7 md:flex">
          <ul className="flex items-center gap-6">
            {links.slice(1).map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`font-mono text-xs uppercase tracking-[0.15em] transition-colors ${
                    isActive(l.href) ? "text-ink" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <span className="h-4 w-px bg-line" />
          <LocaleSwitcher locale={locale} />
        </div>
      </nav>

      {/* Full-screen overlay menu */}
      <div
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={`fixed inset-0 z-[60] flex flex-col bg-accent text-bone transition-opacity duration-300 ease-out ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-bone/15 px-6 md:h-20">
          <Link
            href={base}
            onClick={() => setOpen(false)}
            className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-bone"
          >
            Shohrukh Jalolov
          </Link>
          <div className="flex items-center gap-4">
            <LocaleSwitcher locale={locale} tone="dark" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 rounded-md border border-bone/30 px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-bone transition-colors hover:bg-bone hover:text-accent"
            >
              <X size={14} weight="bold" />
              {dict.nav.close}
            </button>
          </div>
        </div>

        <div className="mx-auto grid w-full max-w-6xl flex-1 content-center gap-12 px-6 py-10 md:grid-cols-[1.6fr_1fr] md:gap-16 md:py-16">
          {/* Links */}
          <nav>
            <ul className="grid gap-x-12 sm:grid-cols-2">
              {links.map((l, i) => (
                <li
                  key={l.href}
                  style={{ transitionDelay: open ? `${120 + i * 50}ms` : "0ms" }}
                  className={`transition-all duration-500 ease-out motion-reduce:transition-none ${
                    open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                  }`}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`block py-2 font-display text-3xl transition-colors md:text-4xl ${
                      isActive(l.href, l.exact)
                        ? "text-bone"
                        : "text-bone/70 hover:text-bone"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Get in touch */}
          <div
            style={{ transitionDelay: open ? "320ms" : "0ms" }}
            className={`space-y-8 transition-all duration-500 ease-out motion-reduce:transition-none ${
              open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            <div>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-bone/50">
                {dict.hero.ctaContact}
              </p>
              <a
                href={`mailto:${siteConfig.email}`}
                onClick={() => setOpen(false)}
                className="mt-3 block font-display text-xl text-bone transition-colors hover:text-bone/70"
              >
                {siteConfig.email}
              </a>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-bone/60">
                {dict.contact.office}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-bone/25 text-bone transition-colors hover:bg-bone hover:text-accent"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
