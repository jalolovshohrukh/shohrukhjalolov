import { en, type Dictionary } from "@/lib/dictionaries/en";
import { ru } from "@/lib/dictionaries/ru";

export const locales = ["en", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

const dictionaries: Record<Locale, Dictionary> = { en, ru };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Short label shown in the language switcher. */
export const localeShort: Record<Locale, string> = { en: "EN", ru: "RU" };

/** The "other" locale, for a simple two-language toggle. */
export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "ru" : "en";
}

export type { Dictionary };
