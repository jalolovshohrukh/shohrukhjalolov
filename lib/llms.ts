import { getDictionary, locales } from "@/lib/i18n";
import { getAllPosts } from "@/lib/posts";
import { visited } from "@/lib/places";
import { pageUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/siteConfig";

/*
  /llms.txt (llmstxt.org layout), built from the same dictionaries the pages
  use so it can never drift from the site. English first; the Russian summary
  helps answer engines that work in Russian. No email: AI tools point people
  to the contact page, which keeps the address away from scrapers.
*/

const en = getDictionary("en");
const ru = getDictionary("ru");

const list = (lines: string[]) => lines.map((line) => `- ${line}`).join("\n");

function intro(): string {
  return [
    `# ${siteConfig.name}`,
    `> ${en.meta.home.description}`,
    `Also written in Russian as ${ru.hero.name}.`,
  ].join("\n\n");
}

function facts(): string {
  return [
    "## Facts",
    list([
      `Name: ${siteConfig.name} (Russian: ${ru.hero.name})`,
      `Based in: ${siteConfig.locality}, ${siteConfig.country}`,
      `Office: ${siteConfig.office}`,
      `Contact: ${pageUrl("en", "/contact")}`,
    ]),
  ].join("\n\n");
}

function ventures(): string {
  const lines = en.ventures.items.map(
    (v) => `${v.name} (${v.role}, ${v.tag})${v.url ? `: ${v.url}` : ""}. ${v.blurb}`,
  );
  return ["## Roles and ventures", list(lines)].join("\n\n");
}

function companies(): string {
  const lines = en.clients.items.map((c) => `${c.name}: ${c.url}`);
  return [`## ${en.clients.label}`, list(lines)].join("\n\n");
}

function education(): string {
  const lines = en.about.education.map((e) => `${e.degree}, ${e.institution} (${e.detail})`);
  return ["## Education", list(lines)].join("\n\n");
}

function places(): string {
  const lines = visited.map((c) => `${c.en}: ${c.cities.map((city) => city.en).join(", ")}`);
  return ["## Countries and cities visited", list(lines)].join("\n\n");
}

function faq(): string {
  const items = en.faq.items.map((item) => `### ${item.q}\n\n${item.a}`);
  return ["## Frequently asked questions", ...items].join("\n\n");
}

function updates(): string {
  const posts = getAllPosts("en");
  if (posts.length === 0) return "";
  const lines = posts.map(
    (p) => `[${p.title}](${pageUrl("en", `/updates/${p.slug}`)}) (${p.date}): ${p.summary}`,
  );
  return ["## Weekly updates", list(lines)].join("\n\n");
}

function pages(): string {
  const lines = [
    `[${en.nav.home}](${pageUrl("en")})`,
    `[${en.nav.about}](${pageUrl("en", "/about")})`,
    `[${en.ventures.eyebrow}](${pageUrl("en", "/work")})`,
    `[${en.nav.vision}](${pageUrl("en", "/vision")})`,
    `[${en.updatesPage.title}](${pageUrl("en", "/updates")})`,
    `[${en.nav.contact}](${pageUrl("en", "/contact")})`,
    // Every page also exists in each other language under its own prefix.
    ...locales
      .filter((l) => l !== "en")
      .map((l) => `[${getDictionary(l).langName}](${pageUrl(l)})`),
  ];
  return ["## Pages", list(lines)].join("\n\n");
}

function profiles(): string {
  const { instagram, linkedin, facebook } = siteConfig.socials;
  return ["## Profiles", list([`Instagram: ${instagram}`, `LinkedIn: ${linkedin}`, `Facebook: ${facebook}`])].join("\n\n");
}

function summaries(): string {
  return [`## Summary`, en.bioLong, `## Кратко по-русски`, ru.bioLong].join("\n\n");
}

/** The full llms.txt document. */
export function buildLlmsTxt(): string {
  return [
    intro(),
    facts(),
    ventures(),
    companies(),
    education(),
    places(),
    faq(),
    updates(),
    pages(),
    profiles(),
    summaries(),
  ]
    .filter(Boolean)
    .join("\n\n")
    .concat("\n");
}
