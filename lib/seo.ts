import type { Metadata } from "next";
import { siteConfig, sameAs, educationFacts } from "@/lib/siteConfig";
import { getDictionary, locales, type Locale } from "@/lib/i18n";

const OG_LOCALE: Record<Locale, string> = { en: "en_US", ru: "ru_RU" };

/** Absolute URL for a locale + path (path WITHOUT locale prefix, e.g. "/about"). */
export function pageUrl(locale: Locale, path = ""): string {
  const clean = path === "/" ? "" : path;
  return `${siteConfig.url}/${locale}${clean}`;
}

type MetaInput = {
  locale: Locale;
  path?: string; // without locale prefix
  title: string;
  description: string;
  /** ISO date; set for articles (weekly updates) so they are typed as articles. */
  publishedTime?: string;
};

/**
 * hreflang alternates for one path (path WITHOUT locale prefix). x-default is
 * the bare root for the home page, because "/" picks a language per visitor
 * (proxy.ts); pointing it at /en makes Google treat /en as a duplicate of "/".
 */
export function languageAlternates(path = ""): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = pageUrl(l, path);
  languages["x-default"] = path === "" || path === "/" ? `${siteConfig.url}/` : pageUrl("en", path);
  return languages;
}

/**
 * Per-page metadata with canonical + hreflang alternates (en/ru/x-default),
 * OpenGraph, and Twitter cards. Central to AI SEO / GEO.
 */
export function buildMetadata({
  locale,
  path = "",
  title,
  description,
  publishedTime,
}: MetaInput): Metadata {
  const languages = languageAlternates(path);
  const url = pageUrl(locale, path);
  const shared = {
    url,
    siteName: siteConfig.name,
    title,
    description,
    locale: OG_LOCALE[locale],
    alternateLocale: locales.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: siteConfig.name }],
  };

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    alternates: { canonical: url, languages },
    // A dated page (a weekly update) is an article; everything else is the site.
    openGraph: publishedTime
      ? { ...shared, type: "article", publishedTime, authors: [pageUrl(locale, "/about")] }
      : { ...shared, type: "website" },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}

/** One id for Shohrukh across every page, so engines merge them into one entity. */
export const PERSON_ID = `${siteConfig.url}/#person`;

/** Ventures (dictionary ids) that Shohrukh founded or co-founded; CifarX is his employer. */
const FOUNDED = new Set(["refresh", "makon", "spendly"]);
const EMPLOYER = "cifarx";

/** Stable entity id for a company: its site origin, not a localized page. */
function orgId(url: string): string {
  return `${new URL(url).origin}/#org`;
}

/** schema.org Person — the core entity signal AI engines resolve. */
export function personSchema(locale: Locale) {
  const dict = getDictionary(locale);
  const employer = dict.ventures.items.find((v) => v.id === EMPLOYER);
  // Every spelling of the name the site uses (Latin + Cyrillic), minus the main one.
  const alternateName = [
    ...new Set(locales.map((l) => getDictionary(l).hero.name)),
  ].filter((name) => name !== siteConfig.name);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: siteConfig.name,
    alternateName,
    url: pageUrl(locale),
    jobTitle: "Business Developer",
    description: dict.bioLong,
    disambiguatingDescription: dict.meta.home.description,
    knowsAbout: [
      "Business development",
      "Startups",
      "Product development",
      "Fintech",
      "Real estate",
      "Entrepreneurship",
      "Central Asia technology ecosystem",
    ],
    nationality: { "@type": "Country", name: "Tajikistan" },
    ...(employer?.url ? { worksFor: { "@id": orgId(employer.url) } } : {}),
    alumniOf: educationFacts.map((e) => ({
      "@type": "EducationalOrganization",
      name: e.institution,
      ...(e.url ? { url: e.url } : {}),
    })),
    homeLocation: {
      "@type": "Place",
      name: siteConfig.office,
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.locality,
        addressCountry: "TJ",
      },
    },
    knowsLanguage: ["tg", "ru", "en", "tr", "uz"],
    sameAs,
  };
}

/**
 * schema.org Organization for each venture, linked back to the Person: founder
 * of the ones he founded or co-founded, employer for CifarX (via worksFor).
 */
export function venturesSchema(locale: Locale) {
  const dict = getDictionary(locale);
  return dict.ventures.items
    .filter((v) => v.url)
    .map((v) => ({
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": orgId(v.url),
      name: v.name,
      url: v.url,
      description: v.blurb,
      ...(FOUNDED.has(v.id) ? { founder: { "@id": PERSON_ID } } : {}),
      ...(v.id === EMPLOYER ? { employee: { "@id": PERSON_ID } } : {}),
    }));
}

export function websiteSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    inLanguage: locale,
    about: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
  };
}

/** schema.org ProfilePage — tells search engines the About page is about one person. */
export function profilePageSchema(locale: Locale) {
  const dict = getDictionary(locale);
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${pageUrl(locale, "/about")}#profile`,
    url: pageUrl(locale, "/about"),
    name: dict.meta.about.title,
    inLanguage: locale,
    mainEntity: { "@id": PERSON_ID },
    isPartOf: { "@id": `${siteConfig.url}/#website` },
  };
}

export function faqSchema(locale: Locale) {
  const dict = getDictionary(locale);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function breadcrumbSchema(
  locale: Locale,
  trail: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: pageUrl(locale, t.path),
    })),
  };
}

export function articleSchema(
  locale: Locale,
  post: { title: string; description: string; date: string; slug: string },
) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: locale,
    url: pageUrl(locale, `/updates/${post.slug}`),
    mainEntityOfPage: pageUrl(locale, `/updates/${post.slug}`),
    image: `${siteConfig.url}/opengraph-image`,
    author: { "@type": "Person", "@id": PERSON_ID, name: siteConfig.name, url: pageUrl(locale) },
    publisher: { "@id": PERSON_ID },
  };
}
