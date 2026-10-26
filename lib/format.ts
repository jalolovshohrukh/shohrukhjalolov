import type { Locale } from "@/lib/i18n";

const LOCALE_TAG: Record<Locale, string> = { en: "en-US", ru: "ru-RU" };

export function formatDate(date: string, locale: Locale): string {
  if (!date) return "";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return new Intl.DateTimeFormat(LOCALE_TAG[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(d);
}

/** "https://www.softclub.tj/en" -> "softclub.tj" (host only, for link labels) */
export function prettyDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
