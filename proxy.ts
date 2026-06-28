import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale, type Locale } from "@/lib/i18n";

function preferredLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language")?.toLowerCase() ?? "";
  // Lightweight negotiation: prefer Russian if it ranks before English.
  const ru = header.indexOf("ru");
  const en = header.indexOf("en");
  if (ru !== -1 && (en === -1 || ru < en)) return "ru";
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return NextResponse.next();

  const locale = preferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API routes, the generated OG image, and any file with
  // an extension (sitemap.xml, robots.txt, llms.txt, favicon.ico, images, etc.)
  matcher: ["/((?!_next|api|opengraph-image|.*\\.).*)"],
};
