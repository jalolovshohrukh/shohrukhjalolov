"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeShort, type Locale } from "@/lib/i18n";

/** Two-language toggle that preserves the current path. */
export function LocaleSwitcher({
  locale,
  tone = "light",
}: {
  locale: Locale;
  tone?: "light" | "dark";
}) {
  const pathname = usePathname() ?? `/${locale}`;

  function hrefFor(target: Locale) {
    const segments = pathname.split("/");
    segments[1] = target; // replace the locale segment
    return segments.join("/") || `/${target}`;
  }

  const active = tone === "dark" ? "text-bone" : "text-ink";
  const inactive =
    tone === "dark"
      ? "text-bone/50 transition-colors hover:text-bone"
      : "text-ink-faint transition-colors hover:text-ink";
  const divider = tone === "dark" ? "text-bone/40" : "text-ink-faint/50";

  return (
    <div className="flex items-center gap-0.5 font-mono text-xs">
      {locales.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className={`px-1 ${divider}`}>/</span>}
          <Link
            href={hrefFor(l)}
            aria-current={l === locale ? "true" : undefined}
            className={l === locale ? active : inactive}
          >
            {localeShort[l]}
          </Link>
        </span>
      ))}
    </div>
  );
}
