"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeShort, type Locale } from "@/lib/i18n";

/** Two-language segmented switch (filled, no stroke) that keeps the current path. */
export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? `/${locale}`;

  function hrefFor(target: Locale) {
    const segments = pathname.split("/");
    segments[1] = target; // replace the locale segment
    return segments.join("/") || `/${target}`;
  }

  return (
    <div className="inline-flex h-10 shrink-0 items-center rounded-full bg-surface p-1 text-xs">
      {locales.map((l) => (
        <Link
          key={l}
          href={hrefFor(l)}
          aria-current={l === locale ? "true" : undefined}
          className={`flex h-8 items-center rounded-full px-3 transition-colors ${
            l === locale
              ? "bg-surface-2 text-ink"
              : "text-ink-faint hover:text-ink"
          }`}
        >
          {localeShort[l]}
        </Link>
      ))}
    </div>
  );
}
