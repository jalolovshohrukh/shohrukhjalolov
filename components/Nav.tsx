"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { List, X } from "@phosphor-icons/react/dist/ssr";
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

  const linkCls = "font-mono text-xs uppercase tracking-[0.15em]";

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bone/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:h-20">
        <Link
          href={base}
          onClick={() => setOpen(false)}
          className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-ink"
        >
          Shohrukh Jalolov
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          <ul className="flex items-center gap-6">
            {links.slice(1).map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`${linkCls} ${
                    isActive(l.href) ? "text-ink" : "text-ink-soft hover:text-ink"
                  } transition-colors`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <span className="h-4 w-px bg-line" />
          <LocaleSwitcher locale={locale} />
        </div>

        <button
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center text-ink md:hidden"
        >
          {open ? <X size={20} /> : <List size={20} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-bone md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-6 py-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`block py-3 ${linkCls} ${
                    isActive(l.href, l.exact) ? "text-ink" : "text-ink-soft"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="py-3">
              <LocaleSwitcher locale={locale} />
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
