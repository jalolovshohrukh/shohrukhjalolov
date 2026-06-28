"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeShort, type Locale } from "@/lib/i18n";

/** Two-language toggle that preserves the current path. */
export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? `/${locale}`;

  function hrefFor(target: Locale) {
    const segments = pathname.split("/");
    segments[1] = target; // replace the locale segment
    return segments.join("/") || `/${target}`;
  }

  return (
    <div className="flex items-center gap-0.5 font-mono text-xs">
      {locales.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="px-1 text-ink-faint/50">/</span>}
          <Link
            href={hrefFor(l)}
            aria-current={l === locale ? "true" : undefined}
            className={
              l === locale
                ? "text-ink"
                : "text-ink-faint transition-colors hover:text-ink"
            }
          >
            {localeShort[l]}
          </Link>
        </span>
      ))}
    </div>
  );
}
