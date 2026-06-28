/**
 * Canonical, locale-independent facts about Shohrukh Jalolov.
 * These power both the visible UI and the JSON-LD structured data that AI
 * search engines (GEO) read to identify the person entity.
 *
 * NOTE: Update `url` to the final domain before deploy. LinkedIn/Facebook URLs
 * are best-guess slugs — confirm the exact profile URLs and adjust.
 */
export const siteConfig = {
  name: "Shohrukh Jalolov",
  // Final production domain — change at deploy time.
  url: "https://shohrukhjalolov.com",
  email: "jalolovshohrukh@gmail.com",
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
    cifarx: "https://cifarx.com",
    refresh: "https://refresh.tj",
    softclub: "https://www.softclub.tj/",
    laklak: "https://laklakmarket.tj/",
    webmarket: "https://webmarket.tj/",
    florapark: "https://florapark.tj/",
  },
} as const;

/**
 * `sameAs` — the cross-reference graph that lets AI engines and Google
 * Knowledge Graph resolve "Shohrukh Jalolov" to one entity.
 */
export const sameAs: string[] = [
  siteConfig.socials.instagram,
  siteConfig.socials.linkedin,
  siteConfig.socials.facebook,
  siteConfig.ventureLinks.cifarx,
  siteConfig.ventureLinks.refresh,
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
