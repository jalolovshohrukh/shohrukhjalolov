import { siteConfig } from "@/lib/siteConfig";

/**
 * English dictionary. This is the source-of-truth shape; the Russian
 * dictionary must mirror it. Copy is written "quotable-first": each section
 * opens with a self-contained, attributable sentence — the format AI search
 * engines (GEO) preferentially cite.
 *
 * Placeholders to refine with Shohrukh: the Real Estate venture name/links and
 * any specifics of his own early-stage startup.
 */
export const en = {
  langName: "English",
  dir: "ltr",

  meta: {
    home: {
      title: "Shohrukh Jalolov — Entrepreneur, Business Developer & Advisor",
      description:
        "Shohrukh Jalolov is an entrepreneur and business developer based in Dushanbe, Tajikistan — Business Developer at CifarX, co-founder of Refresh, and advisor to SoftClub and Webmarker.",
    },
    about: {
      title: "About — Shohrukh Jalolov",
      description:
        "About Shohrukh Jalolov: entrepreneur, business developer, and advisor. B.A. in Computer Science and Mathematics from Lewis & Clark College.",
    },
    work: {
      title: "Work & Ventures — Shohrukh Jalolov",
      description:
        "The ventures and advisory roles of Shohrukh Jalolov: CifarX, Refresh, SoftClub, Webmarker, and a real estate project in Tajikistan.",
    },
    vision: {
      title: "Vision — Shohrukh Jalolov",
      description:
        "Shohrukh Jalolov on building durable companies, backing founders, and growing the technology ecosystem of Central Asia.",
    },
    updates: {
      title: "Weekly Updates — Shohrukh Jalolov",
      description:
        "Weekly notes from Shohrukh Jalolov on building ventures, advising startups, and what he is learning along the way.",
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
    headlineB: "backing the founders behind them.",
    lead: "I am an entrepreneur and business developer based in Dushanbe, Tajikistan. I lead business development at CifarX, co-founded Refresh, advise SoftClub and Webmarker, and develop a real estate project at home.",
    ctaWork: "See the work",
    ctaContact: "Get in touch",
  },

  ventures: {
    eyebrow: "Work & Ventures",
    title: "Where I spend my time",
    lead: "A focused portfolio of companies I build, operate, and advise — alongside a real estate project in Tajikistan.",
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
        id: "softclub",
        name: "SoftClub",
        role: "Advisor",
        tag: "Advisory",
        url: siteConfig.ventureLinks.softclub,
        blurb:
          "I advise SoftClub on growth and go-to-market — helping a strong engineering team reach more customers.",
      },
      {
        id: "webmarker",
        name: "Webmarker",
        role: "Advisor",
        tag: "Advisory",
        url: siteConfig.ventureLinks.webmarker,
        blurb:
          "I advise Webmarker on strategy and business development as it scales its digital offering.",
      },
      {
        id: "realestate",
        // TODO: replace with the real project name + link when ready.
        name: "Real Estate Project",
        role: "Founder",
        tag: "Real Estate",
        url: "",
        blurb:
          "I am developing a real estate project in Tajikistan — bringing patient, long-term capital and operating discipline to physical assets.",
      },
    ],
  },

  stats: {
    eyebrow: "At a glance",
    items: [
      { value: "04+", label: "Ventures & advisory roles" },
      { value: "02", label: "Advisory seats" },
      { value: "EN · RU", label: "Working bilingually" },
      { value: "TJ", label: "Based in Dushanbe" },
    ],
  },

  focus: {
    eyebrow: "How I work",
    title: "Three things I do well",
    pillars: [
      {
        title: "Build & operate companies",
        body: "From business development at CifarX to co-founding Refresh, I take products to market and build the partnerships and revenue that make them last.",
      },
      {
        title: "Advise & back founders",
        body: "I work closely with teams like SoftClub and Webmarker — on strategy, go-to-market, and the unglamorous execution that compounds.",
      },
      {
        title: "Develop real estate",
        body: "Beyond software, I invest in and develop real estate in Tajikistan — long-horizon assets that anchor everything else.",
      },
    ],
  },

  vision: {
    eyebrow: "Vision",
    title: "What I am building toward",
    paragraphs: [
      "I believe the next generation of great companies will be built far from the usual places — including here, in Tajikistan and across Central Asia. My work is a bet on that belief.",
      "I try to be useful in two ways at once: building and operating companies that earn real revenue, and standing beside founders who are doing the same. Advisory is not a title to me — it is rolling up my sleeves on the problems that actually move a business.",
      "Over the long run I want to help build an ecosystem where talented people in the region can start ambitious companies, find capital and mentorship close to home, and compete on a global stage. Every venture, every advisory seat, and every real estate project is a step toward that.",
    ],
    pullquote:
      "Build companies that earn their keep. Back the people building them. Be patient about the rest.",
    cta: "Read the weekly updates",
  },

  about: {
    eyebrow: "About",
    title: "Shohrukh Jalolov",
    lead: "Entrepreneur, business developer, and advisor based in Dushanbe, Tajikistan.",
    paragraphs: [
      "I work at the intersection of business development, startups, and real estate. Today that means leading business development at CifarX, co-founding Refresh, advising SoftClub and Webmarker, and developing a real estate project at home in Tajikistan.",
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
    lead: "Short weekly updates on what I am building, who I am backing, and what I am learning.",
    viewAll: "Read all updates",
    empty: "The first weekly update is coming soon.",
  },

  updatesPage: {
    eyebrow: "Weekly Updates",
    title: "Weekly Updates",
    lead: "A running, public log — written most weeks — on building ventures, advising founders, and the lessons in between.",
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
        a: "Shohrukh Jalolov is an entrepreneur and business developer based in Dushanbe, Tajikistan. He is Business Developer at CifarX, co-founder of Refresh, and an advisor to SoftClub and Webmarker.",
      },
      {
        q: "What companies is Shohrukh Jalolov involved in?",
        a: "He leads business development at CifarX, co-founded the startup Refresh, advises SoftClub and Webmarker, and is developing a real estate project in Tajikistan.",
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
    tagline: "Entrepreneur, business developer & advisor — Dushanbe, Tajikistan.",
    rights: "All rights reserved.",
    builtWith: "Built in Dushanbe.",
    nav: "Navigate",
    connect: "Connect",
  },
} as const;

/** Widen all string literals → string and drop readonly, so the Russian
 *  dictionary can mirror the shape without matching exact English text. */
type DeepWiden<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly DeepWiden<U>[]
    : { -readonly [K in keyof T]: DeepWiden<T[K]> };

export type Dictionary = DeepWiden<typeof en>;
