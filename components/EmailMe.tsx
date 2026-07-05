"use client";

import type { ReactNode } from "react";

/**
 * Click-to-email that keeps the address out of the page entirely.
 *
 * The address lives only as character codes and is reassembled in the browser
 * at click time, so it never appears in the HTML source, never as a scrapable
 * "name@host" string, and never as a mailto: href — and the visible label
 * can't be selected or copied. A human can click it; a bot reading the page
 * source finds nothing.
 *
 * Not bulletproof against a scraper that executes JavaScript (the address has
 * to exist somewhere for the click to work), but it defeats the overwhelming
 * majority that just read the HTML or regex for an email pattern.
 */
const USER = [
  106, 97, 108, 111, 108, 111, 118, 115, 104, 111, 104, 114, 117, 107, 104,
]; // "jalolovshohrukh"
const HOST = [103, 109, 97, 105, 108, 46, 99, 111, 109]; // "gmail.com"

export function EmailMe({
  className,
  children,
  subject,
}: {
  className?: string;
  children: ReactNode;
  subject?: string;
}) {
  const send = () => {
    const addr =
      String.fromCharCode(...USER) + "@" + String.fromCharCode(...HOST);
    const query = subject ? `?subject=${encodeURIComponent(subject)}` : "";
    window.location.href = `mailto:${addr}${query}`;
  };

  return (
    <button
      type="button"
      onClick={send}
      className={className}
      style={{ userSelect: "none" }}
    >
      {children}
    </button>
  );
}
