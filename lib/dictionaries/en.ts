import { siteConfig } from "@/lib/siteConfig";

/**
 * English dictionary — source-of-truth shape; Russian must mirror it.
 * Copy is "quotable-first" for AI search engines (GEO).
 *
 * Facts: Shohrukh is an entrepreneur and business developer — Business
 * Developer at CifarX, co-founder of Refresh, and founder of Makon (his own
 * real estate product). He has worked with SoftClub, LakLak, Webmarket, and
 * Flora Park. He is NOT a software developer / advisor / investor.
 */
export const en = {
  langName: "English",
  dir: "ltr",

  // Longer bio for structured data / AI search only — not rendered on the page.
  bioLong:
    "Shohrukh Jalolov is an entrepreneur, business developer, and founder based in Dushanbe, Tajikistan. He leads business development at CifarX, co-founded the startup Refresh, and founded Makon, his own real estate product. He has worked with SoftClub, LakLak, Webmarket, and Flora Park. He studied Computer Science and Mathematics at Lewis & Clark College in Portland, Oregon, and completed high school at Dushanbe International School. He speaks Tajik, Russian, English, Turkish, and Uzbek, and has traveled across the United States, Canada, Russia, Romania, Türkiye, China, Uzbekistan, and Kazakhstan. His work centers on building durable companies and helping grow the technology ecosystem of Central Asia.",

  meta: {
    home: {
      title: "Shohrukh Jalolov — Entrepreneur, Business Developer & Founder",
      description:
        "Shohrukh Jalolov is an entrepreneur and business developer based in Dushanbe, Tajikistan — Business Developer at CifarX, co-founder of Refresh, and founder of Makon, a real estate product.",
    },
    about: {
      title: "About — Shohrukh Jalolov",
      description:
        "About Shohrukh Jalolov: entrepreneur, business developer, and founder. B.A. in Computer Science and Mathematics from Lewis & Clark College.",
    },
    work: {
      title: "Work & Ventures — Shohrukh Jalolov",
      description:
        "The work of Shohrukh Jalolov: business development at CifarX, co-founding Refresh, and founding Makon — plus the companies he has worked with.",
    },
    vision: {
      title: "Vision — Shohrukh Jalolov",
      description:
        "Shohrukh Jalolov on building durable companies and products, and growing the technology ecosystem of Central Asia.",
    },
    updates: {
      title: "Weekly Updates — Shohrukh Jalolov",
      description:
        "Weekly notes from Shohrukh Jalolov on building ventures and products, and what he is learning along the way.",
    },
    contact: {
      title: "Contact — Shohrukh Jalolov",
      description:
        "Get in touch with Shohrukh Jalolov. Office at Regus, Buston City, Dushanbe.",
    },
  },

  nav: {
    home: "Home",
    about: "About",
    work: "Work",
    vision: "Vision",
    updates: "Updates",
    contact: "Contact",
  },

  hero: {
    eyebrow: "Dushanbe · Tajikistan",
    name: "Shohrukh Jalolov",
    headlineA: "Entrepreneur, operator,",
    headlineB: "builder.",
    lead: "I am an entrepreneur and business developer based in Dushanbe, Tajikistan. I lead business development at CifarX, co-founded Refresh, and founded Makon, a real estate product of my own.",
    ctaWork: "See the work",
    ctaContact: "Get in touch",
    tags: ["Business development", "Startups", "Products", "Real estate"],
  },

  clients: {
    label: "Companies I have worked with",
    items: [
      { name: "SoftClub", url: siteConfig.ventureLinks.softclub },
      { name: "LakLak", url: siteConfig.ventureLinks.laklak },
      { name: "Webmarket", url: siteConfig.ventureLinks.webmarket },
      { name: "Flora Park", url: siteConfig.ventureLinks.florapark },
    ],
  },

  stats: {
    eyebrow: "By the numbers",
    items: [
      { value: "03", label: "Ventures & roles" },
      { value: "07", label: "Companies worked with" },
      { value: "05", label: "Languages spoken" },
      { value: "08", label: "Countries visited" },
    ],
  },

  places: {
    eyebrow: "Around the world",
    title: "Where I've been",
    caption: "Eight countries and dozens of cities — a snapshot of where the work and curiosity have taken me.",
    home: "Home",
    visited: "Visited",
    myHome: "My Home",
  },

  focus: {
    eyebrow: "How I work",
    title: "Three things I do well",
    pillars: [
      {
        title: "Business development",
        body: "I open markets, build partnerships, and turn early traction into durable revenue — today as Business Developer at CifarX.",
      },
      {
        title: "Co-founding startups",
        body: "I co-founded Refresh and help take a modern product from idea to market in Tajikistan.",
      },
      {
        title: "Building my own products",
        body: "I build products of my own, including Makon — a real estate product in Tajikistan.",
      },
    ],
  },

  vision: {
    eyebrow: "Vision",
    title: "What I am building toward",
    paragraphs: [
      "I believe the next generation of great companies will be built far from the usual places — including here, in Tajikistan and across Central Asia. My work is a bet on that belief.",
      "I try to be useful in two ways at once: developing companies on the business side, and building products of my own. The work that compounds is rarely glamorous — it is the partnerships, the products, and the execution that quietly add up.",
      "Over the long run I want to help build an ecosystem where talented people in the region can start ambitious companies, find opportunity close to home, and compete on a global stage. Every company I help develop and every product I build is a step toward that.",
    ],
    pullquote:
      "Build companies that earn their keep. Build products people actually use. Be patient about the rest.",
    cta: "Read the weekly updates",
  },

  ventures: {
    eyebrow: "Work & Ventures",
    title: "Where I spend my time",
    lead: "A focused set of companies I develop and build — from business development to products of my own.",
    visit: "Visit",
    items: [
      {
        id: "cifarx",
        name: "CifarX",
        role: "Business Developer",
        tag: "Business Development",
        url: siteConfig.ventureLinks.cifarx,
        blurb:
          "I lead business development at CifarX, opening markets, building partnerships, and turning early traction into durable revenue.",
      },
      {
        id: "refresh",
        name: "Refresh",
        role: "Co-founder",
        tag: "Startup",
        url: siteConfig.ventureLinks.refresh,
        blurb:
          "Refresh is a startup I co-founded in Tajikistan — building a modern product for a market that has been waiting for one.",
      },
      {
        id: "makon",
        name: "Makon",
        role: "Founder",
        tag: "Real Estate",
        url: "",
        blurb:
          "Makon is my own product — a real estate platform in Tajikistan that I founded and continue to build.",
      },
    ],
  },

  about: {
    eyebrow: "About",
    title: "Shohrukh Jalolov",
    lead: "Entrepreneur, business developer, and founder based in Dushanbe, Tajikistan.",
    paragraphs: [
      "I work at the intersection of business development, startups, and real estate. Today that means leading business development at CifarX, co-founding Refresh, and building my own product, Makon, a real estate platform in Tajikistan.",
      "I studied Computer Science and Mathematics at Lewis & Clark College in the United States, and finished high school at Dushanbe International School. That mix — rigorous technical training and a global education brought back home — shapes how I build: analytically, but always close to the market.",
      "I care about durable businesses over hype, about partnerships over transactions, and about the long, quiet work of helping a region produce companies that matter.",
    ],
    educationTitle: "Education",
    education: [
      {
        degree: "B.A., Computer Science & Mathematics",
        institution: "Lewis & Clark College",
        detail: "Portland, Oregon, USA",
      },
      {
        degree: "High School Diploma",
        institution: "Dushanbe International School",
        detail: "Dushanbe, Tajikistan",
      },
    ],
  },

  updatesTeaser: {
    eyebrow: "Weekly Updates",
    title: "Notes from the work",
    lead: "Short weekly updates on what I am building and what I am learning.",
    viewAll: "Read all updates",
    empty: "The first weekly update is coming soon.",
  },

  updatesPage: {
    eyebrow: "Weekly Updates",
    title: "Weekly Updates",
    lead: "A running, public log — written most weeks — on building ventures and products, and the lessons in between.",
    readMore: "Read",
    empty: "The first weekly update is coming soon. Check back shortly.",
    backToList: "All updates",
    published: "Published",
  },

  contact: {
    eyebrow: "Contact",
    title: "Let's talk",
    lead: "Whether you are a founder, a potential partner, or just want to compare notes — I read every message.",
    emailLabel: "Email",
    officeLabel: "Office",
    office: siteConfig.office,
    followLabel: "Elsewhere",
    ctaEmail: "Email me",
  },

  faq: {
    title: "Frequently asked",
    items: [
      {
        q: "What do you do?",
        a: "I'm an entrepreneur and business developer based in Dushanbe, Tajikistan. I lead business development at CifarX, co-founded Refresh, and founded Makon, my own real estate product.",
      },
      {
        q: "What companies are you involved in?",
        a: "I lead business development at CifarX, co-founded the startup Refresh, and founded Makon, a real estate product. I've also worked with SoftClub, LakLak, Webmarket, and Flora Park.",
      },
      {
        q: "What's your background?",
        a: "I studied Computer Science and Mathematics at Lewis & Clark College in the United States, and finished high school at Dushanbe International School.",
      },
      {
        q: "What languages do you speak?",
        a: "Tajik, Russian, English, Turkish, and Uzbek.",
      },
      {
        q: "Where are you based?",
        a: "Dushanbe, Tajikistan, with an office at Regus, Buston City.",
      },
      {
        q: "How can I reach you?",
        a: "The fastest way is email — jalolovshohrukh@gmail.com. I'm also on Instagram, LinkedIn, and Facebook.",
      },
    ],
  },

  footer: {
    tagline:
      "Entrepreneur, business developer & founder — Dushanbe, Tajikistan.",
    rights: "All rights reserved.",
    builtWith: "Built in Dushanbe.",
    nav: "Navigate",
    connect: "Connect",
  },
} as const;

/** Widen string literals → string and drop readonly so the Russian dictionary
 *  can mirror the shape without matching exact English text. */
type DeepWiden<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly DeepWiden<U>[]
    : { -readonly [K in keyof T]: DeepWiden<T[K]> };

export type Dictionary = DeepWiden<typeof en>;
