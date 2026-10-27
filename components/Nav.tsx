"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { List, X } from "@phosphor-icons/react/dist/ssr";
import type { Locale, Dictionary } from "@/lib/i18n";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Cta } from "@/components/Cta";

function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}
const isScrolled = () => window.scrollY > 8;

export function Nav({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname() ?? `/${locale}`;
  const [open, setOpen] = useState(false);
  const scrolled = useSyncExternalStore(subscribeScroll, isScrolled, () => false);
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

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const themeLabels = {
    toLight: dict.nav.themeToLight,
    toDark: dict.nav.themeToDark,
  };
  const solid = scrolled || open;

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-canvas shadow-[0_1px_0_var(--line)]" : "bg-transparent"
      }`}
    >
      <nav className="shell flex h-16 items-center justify-between gap-4 md:h-20">
        <Link
          href={base}
          onClick={() => setOpen(false)}
          className="flex h-10 items-center text-[1.05rem] font-semibold tracking-[-0.025em] text-ink md:text-[1.15rem]"
        >
          Shohrukh Jalolov
        </Link>

        <div className="hidden items-center gap-3 lg:flex">
          <ul className="mr-5 flex items-center gap-8">
            {links.slice(1, -1).map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`caps transition-colors ${
                    isActive(l.href) ? "nav-active" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle labels={themeLabels} />
          <LocaleSwitcher locale={locale} />
          <Cta href={`${base}/contact`} variant="ghost" size="sm">
            {dict.hero.ctaContact}
          </Cta>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle labels={themeLabels} />
          <button
            type="button"
            aria-label={open ? dict.nav.close : dict.nav.menu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="liquid liquid-clear flex h-10 w-10 items-center justify-center rounded-full"
          >
            {open ? <X size={18} weight="bold" /> : <List size={18} weight="bold" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu — opens top → bottom, items stagger in */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        inert={!open}
        className={`overflow-hidden bg-canvas transition-[max-height] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none lg:hidden ${
          open ? "max-h-[640px]" : "max-h-0"
        }`}
      >
        <ul className="shell flex flex-col pb-8 pt-2">
          {[...links, null].map((l, i) => {
            const delay = open ? 120 + i * 55 : 0;
            const itemCls = `transition-all duration-500 ease-out motion-reduce:transition-none ${
              open
                ? "translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-2 opacity-0"
            }`;

            if (l === null) {
              return (
                <li
                  key="locale"
                  style={{ transitionDelay: `${delay}ms` }}
                  className={`pt-6 ${itemCls}`}
                >
                  <LocaleSwitcher locale={locale} />
                </li>
              );
            }
            const active = isActive(l.href, l.exact);
            return (
              <li
                key={l.href}
                style={{ transitionDelay: `${delay}ms` }}
                className={`border-b border-line ${itemCls}`}
              >
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center justify-between py-3 text-[clamp(2.25rem,11vw,3.25rem)] font-bold leading-tight tracking-[-0.045em] ${
                    active ? "text-ink" : "text-ink-soft"
                  }`}
                >
                  {l.label}
                  {active && <span className="h-2 w-2 rounded-full bg-accent" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
