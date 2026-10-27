"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeShort, type Locale } from "@/lib/i18n";

/** Two-language liquid-glass switch (no stroke) that keeps the current path. */
export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? `/${locale}`;

  function hrefFor(target: Locale) {
    const segments = pathname.split("/");
    segments[1] = target; // replace the locale segment
    return segments.join("/") || `/${target}`;
  }

  return (
    <div className="liquid liquid-clear inline-flex h-10 shrink-0 items-center rounded-full p-1 text-xs">
      {locales.map((l) => (
        <Link
          key={l}
          href={hrefFor(l)}
          aria-current={l === locale ? "true" : undefined}
          // The glass pill clips its contents, so the focus ring sits inside the segment.
          className={`flex h-8 items-center rounded-full px-3 transition-colors focus-visible:outline-offset-[-2px] ${
            l === locale ? "liquid-thumb text-ink" : "text-ink-faint hover:text-ink"
          }`}
        >
          {localeShort[l]}
        </Link>
      ))}
    </div>
  );
}
