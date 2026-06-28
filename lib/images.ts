/**
 * Placeholder photography (Unsplash) — warm, architectural/workspace mood to
 * match the Halston reference. ALL of these are temporary stand-ins; Shohrukh
 * can swap each `src` for his own photos (portrait, real-estate projects,
 * office) later without touching any component.
 */
const U = (id: string, w = 1600, q = 80) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;

export const photos = {
  // Architect/founder at a desk — warm, moody (mirrors the Halston hero)
  hero: {
    src: U("1503387762-592deb58ef4e", 2000),
    alt: "Working at a desk over plans in warm light",
  },
  // Pillar 1 — build & operate companies
  build: {
    src: U("1524758631624-e2822e304c36"),
    alt: "Bright modern studio workspace",
  },
  // Pillar 2 — advise & back founders
  advise: {
    src: U("1542744173-8e7e53415bb0"),
    alt: "A team meeting around a table",
  },
  // Pillar 3 — develop real estate
  realEstate: {
    src: U("1600585154340-be6161a56a0c"),
    alt: "A modern house at dusk with warm interior light",
  },
  // Weekly Updates / journal feature
  journal: {
    src: U("1600607687939-ce8a6c25118c"),
    alt: "Warm contemporary living interior with wood accents",
  },
  // About context
  about: {
    src: U("1600607687939-ce8a6c25118c"),
    alt: "Warm contemporary interior",
  },
  // Contact CTA
  contact: {
    src: U("1503387762-592deb58ef4e", 2000),
    alt: "Hands working over plans at a wooden desk",
  },
} as const;

export type Photo = { src: string; alt: string };
