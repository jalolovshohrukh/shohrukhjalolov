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
};

/**
 * Per-page metadata with canonical + hreflang alternates (en/ru/x-default),
 * OpenGraph, and Twitter cards. Central to AI SEO / GEO.
 */
export function buildMetadata({
  locale,
  path = "",
  title,
  description,
}: MetaInput): Metadata {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = pageUrl(l, path);
  languages["x-default"] = pageUrl("en", path);

  const url = pageUrl(locale, path);

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      type: "website",
      url,
      siteName: siteConfig.name,
      title,
      description,
      locale: OG_LOCALE[locale],
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}

/** schema.org Person — the core entity signal AI engines resolve. */
export function personSchema(locale: Locale) {
  const dict = getDictionary(locale);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: siteConfig.name,
    url: pageUrl(locale),
    email: `mailto:${siteConfig.email}`,
    jobTitle: "Business Developer",
    description: dict.meta.home.description,
    worksFor: { "@type": "Organization", name: "CifarX", url: siteConfig.ventureLinks.cifarx },
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
    knowsLanguage: ["en", "ru", "tg"],
    sameAs,
  };
}

/** schema.org Organization for Refresh (co-founded). */
export function refreshSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.ventureLinks.refresh}/#org`,
    name: "Refresh",
    url: siteConfig.ventureLinks.refresh,
    founder: { "@id": `${siteConfig.url}/#person` },
    foundingLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressCountry: "TJ" },
    },
  };
}

export function websiteSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    inLanguage: locale,
    publisher: { "@id": `${siteConfig.url}/#person` },
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
    author: { "@id": `${siteConfig.url}/#person` },
    publisher: { "@id": `${siteConfig.url}/#person` },
  };
}
