# Shohrukh Jalolov — Personal Website

Bilingual (English / Russian) personal site for Shohrukh Jalolov — entrepreneur,
business developer, and advisor. Built for strong **AI SEO / GEO** (discoverability
by AI answer engines), not just classic search.

- **Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4
- **Content:** Markdown files (no CMS, no login)
- **Fonts:** General Sans (display, self-hosted in `public/fonts`) · Onest (carries Cyrillic for Russian) · JetBrains Mono (labels)
- **Design:** Halston-inspired, fully typographic (no photography) — warm greige canvas, charcoal ink, a single deep-aubergine accent, big uppercase display type, hairline rules, and a charcoal/maroon section rhythm

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
  sitemap.ts robots.ts opengraph-image.tsx
content/updates/{en,ru}/*.md   # weekly update posts
lib/                   # i18n, dictionaries, posts loader, SEO/structured-data
components/            # Nav, Footer, cards, Reveal motion, JsonLd
public/llms.txt        # machine-readable summary for AI crawlers
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

- `Person` / `Organization` / `WebSite` / `FAQPage` / `BlogPosting` / `BreadcrumbList`
  JSON-LD (see `lib/seo.ts`) — including a `sameAs` entity graph.
- Per-page metadata with canonical + `hreflang` (en/ru/x-default), OpenGraph + Twitter.
- `robots.txt` explicitly allows AI crawlers; `sitemap.xml` carries hreflang;
  `public/llms.txt` gives a clean factual summary.
- Copy is written "quotable-first" so AI engines can cite self-contained sentences.

## Before deploy — fill these in

Edit `lib/siteConfig.ts`:

- [ ] `url` → the final production domain (currently `https://shohrukhjalolov.com`).
- [ ] Confirm exact **LinkedIn** and **Facebook** profile URLs.

Edit the dictionaries (`lib/dictionaries/en.ts` and `ru.ts`):

- [ ] Real estate venture — replace the `realestate` item's name / link / blurb.
- [ ] Any specifics of your own early-stage startup.
- [ ] Confirm the "Companies I have worked with" list and add LakLak's URL if it has a site.

## Deploy (Vercel)

1. Push to GitHub.
2. Import the repo at vercel.com → it auto-detects Next.js.
3. Add your custom domain and update `siteConfig.url` to match.
