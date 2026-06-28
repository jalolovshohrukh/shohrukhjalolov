import type { Metadata } from "next";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import { Onest, JetBrains_Mono } from "next/font/google";
import "../globals.css";

import { locales, getDictionary, isLocale } from "@/lib/i18n";
import { siteConfig } from "@/lib/siteConfig";
import { personSchema, websiteSchema, refreshSchema } from "@/lib/seo";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";

// General Sans (Fontshare) — self-hosted; carries the Halston Latin grotesk look.
const generalSans = localFont({
  variable: "--font-general",
  display: "swap",
  src: [
    { path: "../../public/fonts/general-sans-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/general-sans-500.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/general-sans-600.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/general-sans-700.woff2", weight: "700", style: "normal" },
  ],
});

// Onest carries Cyrillic (General Sans has no Cyrillic) for the Russian locale.
const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const jbMono = JetBrains_Mono({
  variable: "--font-jbmono",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  robots: { index: true, follow: true },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    <html
      lang={locale}
      dir={dict.dir}
      className={`${generalSans.variable} ${onest.variable} ${jbMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-bone"
        >
          Skip to content
        </a>
        <JsonLd data={[personSchema(locale), websiteSchema(locale), refreshSchema()]} />
        <Nav locale={locale} dict={dict} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer locale={locale} dict={dict} />
      </body>
    </html>
  );
}
