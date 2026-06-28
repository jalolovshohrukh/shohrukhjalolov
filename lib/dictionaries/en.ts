import { siteConfig } from "@/lib/siteConfig";

/**
 * English dictionary — source-of-truth shape; Russian must mirror it.
 * Copy is "quotable-first" for AI search engines (GEO).
 *
 * Facts: Shohrukh is Business Developer at CifarX, co-founder of Refresh, and
 * software developer of Makon (a real estate project). He has worked with
 * SoftClub, LakLak, and Webmarker. He is NOT an advisor/investor.
 */
export const en = {
  langName: "English",
  dir: "ltr",

  meta: {
    home: {
      title: "Shohrukh Jalolov — Entrepreneur, Business & Software Developer",
      description:
        "Shohrukh Jalolov is an entrepreneur, business developer, and software developer based in Dushanbe, Tajikistan — Business Developer at CifarX, co-founder of Refresh, and software developer of Makon, a real estate project.",
    },
    about: {
      title: "About — Shohrukh Jalolov",
      description:
        "About Shohrukh Jalolov: entrepreneur, business developer, and software developer. B.A. in Computer Science and Mathematics from Lewis & Clark College.",
    },
    work: {
      title: "Work & Ventures — Shohrukh Jalolov",
      description:
        "The work of Shohrukh Jalolov: business development at CifarX, co-founding Refresh, and software development for Makon — plus the companies he has worked with.",
    },
    vision: {
      title: "Vision — Shohrukh Jalolov",
      description:
        "Shohrukh Jalolov on building durable companies, building software, and growing the technology ecosystem of Central Asia.",
    },
    updates: {
      title: "Weekly Updates — Shohrukh Jalolov",
      description:
        "Weekly notes from Shohrukh Jalolov on building ventures, writing software, and what he is learning along the way.",
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
    headlineA: "Building ventures and",
    headlineB: "the software behind them.",
    lead: "I am an entrepreneur, business developer, and software developer based in Dushanbe, Tajikistan. I lead business development at CifarX, co-founded Refresh, and build the software for Makon, a real estate project.",
    ctaWork: "See the work",
    ctaContact: "Get in touch",
    tags: ["Business development", "Software development", "Startups", "Real estate"],
  },

  clients: {
    label: "Companies I have worked with",
    items: [
      { name: "SoftClub", url: siteConfig.ventureLinks.softclub },
      { name: "LakLak", url: "" },
      { name: "Webmarker", url: siteConfig.ventureLinks.webmarker },
    ],
  },

  stats: {
    eyebrow: "At a glance",
    items: [
      { value: "03", label: "Companies & ventures" },
      { value: "EN · RU", label: "Working bilingually" },
      { value: "TJ", label: "Based in Dushanbe" },
      { value: "B.A.", label: "CS & Mathematics" },
    ],
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
        title: "Software development",
        body: "I build software, including Makon — a real estate project — turning real-world problems into working products.",
      },
    ],
  },

  vision: {
    eyebrow: "Vision",
    title: "What I am building toward",
    paragraphs: [
      "I believe the next generation of great companies will be built far from the usual places — including here, in Tajikistan and across Central Asia. My work is a bet on that belief.",
      "I try to be useful in two ways at once: developing companies on the business side, and building the software that makes them real. The work that compounds is rarely glamorous — it is the partnerships, the products, and the execution that quietly add up.",
      "Over the long run I want to help build an ecosystem where talented people in the region can start ambitious companies, find opportunity close to home, and compete on a global stage. Every company I help develop and every product I build is a step toward that.",
    ],
    pullquote:
      "Build companies that earn their keep. Build the software that powers them. Be patient about the rest.",
    cta: "Read the weekly updates",
  },

  ventures: {
    eyebrow: "Work & Ventures",
    title: "Where I spend my time",
    lead: "A focused set of companies I build and develop — from business development to software.",
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
        role: "Software Developer",
        tag: "Real Estate",
        // TODO: add Makon's URL if it has a public site.
        url: "",
        blurb:
          "Makon is a real estate project in Tajikistan. I am its software developer — building the product and platform behind it.",
      },
    ],
  },

  about: {
    eyebrow: "About",
    title: "Shohrukh Jalolov",
    lead: "Entrepreneur, business developer, and software developer based in Dushanbe, Tajikistan.",
    paragraphs: [
      "I work at the intersection of business development, startups, and software. Today that means leading business development at CifarX, co-founding Refresh, and building the software for Makon, a real estate project in Tajikistan.",
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
    lead: "A running, public log — written most weeks — on building ventures, writing software, and the lessons in between.",
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
        q: "Who is Shohrukh Jalolov?",
        a: "Shohrukh Jalolov is an entrepreneur, business developer, and software developer based in Dushanbe, Tajikistan. He is Business Developer at CifarX, co-founder of Refresh, and the software developer of Makon, a real estate project.",
      },
      {
        q: "What companies is Shohrukh Jalolov involved in?",
        a: "He leads business development at CifarX, co-founded the startup Refresh, and builds the software for Makon, a real estate project. He has also worked with SoftClub, LakLak, and Webmarker.",
      },
      {
        q: "What is Shohrukh Jalolov's educational background?",
        a: "He holds a B.A. in Computer Science and Mathematics from Lewis & Clark College in the United States, and completed high school at Dushanbe International School.",
      },
      {
        q: "Where is Shohrukh Jalolov based?",
        a: "He is based in Dushanbe, Tajikistan, with an office at Regus, Buston City.",
      },
    ],
  },

  footer: {
    tagline:
      "Entrepreneur, business developer & software developer — Dushanbe, Tajikistan.",
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
