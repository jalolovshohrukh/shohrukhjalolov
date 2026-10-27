// Tells IndexNow engines (Bing, which feeds ChatGPT search, plus Yandex,
// Seznam and Naver) that the site's pages changed, so they recrawl them now.
// Run after a content deploy:  node scripts/indexnow.mjs https://<live site>
// It reads every <loc> in the live sitemap and proves ownership with the key
// file in public/ (a 32-hex-character name whose content is the same key).
import { readdirSync, readFileSync } from "node:fs";

const site = (process.argv[2] ?? "").replace(/\/+$/, "");
if (!/^https:\/\/[^/]+$/.test(site)) {
  throw new Error("usage: node scripts/indexnow.mjs https://<live site origin>");
}

const keyFile = readdirSync("public").find((name) => /^[0-9a-f]{32}\.txt$/.test(name));
if (!keyFile) throw new Error("no IndexNow key file (public/<32 hex>.txt) found");
const key = readFileSync(`public/${keyFile}`, "utf8").trim();
if (`${key}.txt` !== keyFile) throw new Error(`${keyFile} must contain exactly its own key`);

const sitemap = await fetch(`${site}/sitemap.xml`);
if (!sitemap.ok) throw new Error(`could not fetch ${site}/sitemap.xml (${sitemap.status})`);
const urlList = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => url);
if (urlList.length === 0) throw new Error("the sitemap lists no URLs");

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(site).host,
    key,
    keyLocation: `${site}/${keyFile}`,
    urlList,
  }),
});
// 200 = accepted; 202 = accepted while the key is being verified (first use).
console.log(`IndexNow: ${response.status} for ${urlList.length} URLs`);
if (!response.ok) process.exitCode = 1;
