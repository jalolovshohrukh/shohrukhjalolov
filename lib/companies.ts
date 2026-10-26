import type { Dictionary } from "@/lib/i18n";

/** A typeset logo: the name as the brand writes it, optionally with a coloured square full stop. */
export type Mark = { text: string; dot?: string };

export type Company = { name: string; url: string; hoverClass: string; mark?: Mark };

/**
 * Per-company hover text colour (text only). Written out as literal class
 * names so Tailwind generates them; companies not listed hover to the accent.
 */
const HOVER_CLASS: Record<string, string> = {
  Spendly: "hover:text-[#3d8eff]", // Spendly blue
  SoftClub: "hover:text-[#5fa8dd]", // baby blue
  LakLak: "hover:text-[#3f74c9]", // blue, lifted from #1f4e9b to read on black
  Webmarket: "hover:text-[#e06a1f]", // orange
};

/** Companies whose logo is close enough to set in type. */
const MARKS: Record<string, Mark> = {
  Spendly: { text: "spendly", dot: "#3d8eff" }, // lowercase + blue square
  Exabyte: { text: "exabyte" }, // lowercase wordmark
};

/** Every company on the site — own ventures first, then those worked with. */
export function allCompanies(dict: Dictionary): Company[] {
  return [...dict.ventures.items, ...dict.clients.items].map(({ name, url }) => ({
    name,
    url,
    hoverClass: HOVER_CLASS[name] ?? "hover:text-accent",
    ...(MARKS[name] ? { mark: MARKS[name] } : {}),
  }));
}
