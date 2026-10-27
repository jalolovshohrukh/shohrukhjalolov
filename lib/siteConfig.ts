/**
 * Canonical, locale-independent facts about Shohrukh Jalolov.
 * These power both the visible UI and the JSON-LD structured data that AI
 * search engines (GEO) read to identify the person entity.
 *
 * NOTE: LinkedIn/Facebook URLs are best-guess slugs; confirm the exact
 * profile URLs and adjust.
 */

/**
 * The production address every canonical link, sitemap entry and JSON-LD id
 * points at. Vercel sets VERCEL_PROJECT_PRODUCTION_URL at build time to the
 * project's production domain (a connected custom domain, else the vercel.app
 * one), so connecting a domain later moves everything over with no code change.
 */
const productionHost =
  process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "shohrukhjalolov.vercel.app";

export const siteConfig = {
  name: "Shohrukh Jalolov",
  url: `https://${productionHost}`,
  office: "Regus, Buston City, Dushanbe, Tajikistan",
  locality: "Dushanbe",
  country: "Tajikistan",

  socials: {
    instagram: "https://instagram.com/jalolovshohrukh",
    // TODO: confirm exact LinkedIn / Facebook profile URLs
    linkedin: "https://www.linkedin.com/in/shohrukh-jalolov",
    facebook: "https://www.facebook.com/shohrukh.jalolov",
  },

  /** Ventures + companies worked with — links also used as `sameAs` signals. */
  ventureLinks: {
    cifarx: "https://cifarx.com/",
    refresh: "https://refresh.tj/en",
    makon: "https://makon.online/ru",
    spendly: "https://spendly.mobi/en/",
    softclub: "https://www.softclub.tj/en",
    laklak: "https://laklakmarket.tj/",
    webmarket: "https://webmarket.tj/",
    asiaprint: "https://asiaprint.tj/",
    exabyte: "https://exabyte.com.pk/",
  },
} as const;

/**
 * `sameAs` — other profiles that ARE this person, which lets AI engines and
 * Google Knowledge Graph resolve "Shohrukh Jalolov" to one entity. Companies
 * are not the person: they link to him as founder/employer in lib/seo.ts.
 */
export const sameAs: string[] = [
  siteConfig.socials.instagram,
  siteConfig.socials.linkedin,
  siteConfig.socials.facebook,
];

export const educationFacts = [
  {
    institution: "Lewis & Clark College",
    url: "https://www.lclark.edu",
    locality: "Portland, Oregon, USA",
  },
  {
    institution: "Dushanbe International School",
    url: "",
    locality: "Dushanbe, Tajikistan",
  },
] as const;
