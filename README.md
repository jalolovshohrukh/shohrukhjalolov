# Shohrukh Jalolov — Personal Website

Bilingual (English / Russian) personal site for Shohrukh Jalolov — entrepreneur,
business developer, and advisor. Built for strong **AI SEO / GEO** (discoverability
by AI answer engines), not just classic search.

- **Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4
- **Content:** Markdown files (no CMS, no login)
- **Font:** Inter only (variable, with the optical-size axis for the display cut; Latin + Cyrillic, incl. Tajik letters)
- **Design:** dark editorial, fully typographic (no photography), checked against the `no-ai-slop-web` skill — near-black canvas, warm white ink, a single ember red-orange accent, big bold tight Inter headlines, ember smoke in the hero that swirls and warms around the pointer (Vivid Motion; WebGL shader in `components/EmberField.tsx`), a partner grid and venture stage (cristianoronaldo.com), a numbers row (Mogaa) and a giant-wordmark footer (Orlive). Dark by default with a light theme switch; colours are CSS variables per theme in `app/globals.css`, set before paint by `components/ThemeScript.tsx`

## Develop

```bash
npm install
npm run dev      # http://localhost:3000  (redirects to /en)
npm run build    # production build
npm start        # serve the production build
```

## Structure

```
app/
  [locale]/            # en | ru — the locale layout is the root (<html lang>)
    page.tsx           # Home
    about | work | vision | contact / page.tsx
    updates/           # Weekly Updates index + [slug] post template
  sitemap.ts robots.ts opengraph-image.tsx icon.tsx apple-icon.tsx
  llms.txt/route.ts    # /llms.txt, generated from the dictionaries (lib/llms.ts)
content/updates/{en,ru}/*.md   # weekly update posts
lib/                   # i18n, dictionaries, posts loader, SEO/structured-data
components/            # Nav, Footer, cards, Reveal motion, JsonLd
scripts/indexnow.mjs   # ping Bing/Yandex (IndexNow) after a deploy
proxy.ts               # locale redirect (Next 16 "proxy", was "middleware")
```

## Add a weekly update

Create the same-named file in **both** languages so the language switcher maps
between them:

```
content/updates/en/my-slug.md
content/updates/ru/my-slug.md
```

Frontmatter:

```md
---
title: "Your title"
date: "2026-07-04"      # YYYY-MM-DD, controls ordering
summary: "One-line summary shown in lists and meta description."
---

Markdown body…
```

The post appears automatically at `/en/updates/my-slug` and in the index.

## AI SEO / GEO

- **Address:** `siteConfig.url` comes from Vercel's `VERCEL_PROJECT_PRODUCTION_URL`
  (the production domain), falling back to `shohrukhjalolov.vercel.app`. Connecting a
  custom domain in Vercel moves every canonical, sitemap entry and JSON-LD id over on
  the next deploy, with no code change.
- **Structured data** (`lib/seo.ts`): one `Person` (with the Russian spelling as
  `alternateName`, `sameAs` = his own profiles only), an `Organization` per venture
  linked back to him (founder of Refresh, Makon and Spendly; employee of CifarX),
  `WebSite`, `ProfilePage` (About), `FAQPage`, `BlogPosting`, `BreadcrumbList`.
- **Per-page metadata:** canonical + `hreflang` (en/ru, x-default = the root for the
  home page, English elsewhere), Open Graph (`article` for weekly updates) + Twitter.
- **Crawlers:** `robots.txt` names search, AI-answer and AI-training crawlers (training
  allowed by choice); `sitemap.xml` carries hreflang and post dates.
- **`/llms.txt`** is generated from the dictionaries at build time, so it can't drift;
  it never includes the email address.
- **IndexNow:** `public/<key>.txt` proves ownership; after a content deploy run
  `node scripts/indexnow.mjs https://shohrukhjalolov.vercel.app` (use the live origin).
- Copy is written "quotable-first" so AI engines can cite self-contained sentences.

## Still to fill in

- [ ] Exact **LinkedIn** and **Facebook** profile URLs in `lib/siteConfig.ts`
      (currently best guesses; they feed `sameAs`).

## Deploy (Vercel)

1. Push to GitHub; Vercel builds `main` automatically.
2. Optional: add a custom domain in Vercel; the site's URLs follow it (see above).
3. Register the site in Google Search Console and Bing Webmaster Tools and submit
   `/sitemap.xml` (Bing feeds ChatGPT search).
