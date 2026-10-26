"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { prettyDomain } from "@/lib/format";

type Venture = {
  id: string;
  name: string;
  role: string;
  tag: string;
  url: string;
  blurb: string;
};

/** Where the ember light sits behind each venture, so switching feels like a new scene. */
const GLOW_POSITION = [
  "left-[34%] top-[8%]",
  "left-[52%] top-[22%]",
  "left-[18%] top-[14%]",
];

/**
 * cristianoronaldo.com "brands" layout without photography: a dark stage with
 * a vertical list of ventures (tabs) and, for the selected one, a giant serif
 * name as the backdrop, its category, name, role and story. Every panel is in
 * the HTML for search engines; inactive ones are faded out and inert.
 *
 * The scene light and backdrop name are positioned against the enclosing
 * section, which must be `relative isolate overflow-hidden`.
 */
export function VentureShowcase({
  items,
  visitLabel,
  listLabel,
}: {
  items: readonly Venture[];
  visitLabel: string;
  listLabel: string;
}) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[
      event.key as "ArrowDown"
    ];
    if (!step) return;
    event.preventDefault();
    const next = (active + step + items.length) % items.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[13rem_1fr] lg:gap-16">
      <div
        role="tablist"
        aria-label={listLabel}
        aria-orientation="vertical"
        onKeyDown={onKey}
        className="relative z-10 flex flex-wrap gap-2 self-start lg:flex-col lg:flex-nowrap lg:gap-0 lg:self-end lg:border-l lg:border-line"
      >
        {items.map((v, i) => {
          const selected = i === active;
          // Phones: filled chips that wrap. Desktop: a vertical list with an ember rule.
          return (
            <button
              key={v.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`venture-tab-${v.id}`}
              aria-selected={selected}
              aria-controls={`venture-panel-${v.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={`spaced relative text-left font-sans text-xs transition-colors max-lg:flex max-lg:h-10 max-lg:items-center max-lg:rounded-full max-lg:px-4 lg:py-5 lg:pl-6 lg:text-sm ${
                selected
                  ? "font-semibold text-ink max-lg:bg-accent max-lg:text-on-accent"
                  : "text-ink-faint hover:text-ink-soft max-lg:bg-surface"
              }`}
            >
              {v.name}
              <span
                aria-hidden="true"
                className={`absolute bg-accent transition-opacity duration-300 max-lg:hidden lg:inset-y-3 lg:-left-px lg:w-px ${
                  selected ? "opacity-100" : "opacity-0"
                }`}
              />
            </button>
          );
        })}
      </div>

      <div className="grid">
        {items.map((v, i) => {
          const selected = i === active;
          return (
            <div
              key={v.id}
              role="tabpanel"
              id={`venture-panel-${v.id}`}
              aria-labelledby={`venture-tab-${v.id}`}
              inert={!selected}
              className={`[grid-area:1/1] flex flex-col justify-end transition-opacity duration-700 ease-out ${
                selected ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Scene light for this venture */}
              <div aria-hidden="true" className="glow -z-10">
                <div className={`glow-blob glow-hot ${GLOW_POSITION[i % GLOW_POSITION.length]}`} />
              </div>

              {/* Giant name as the backdrop, bleeding off the bottom-right edge */}
              <p
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-[0.12em] -right-[0.04em] -z-10 select-none whitespace-nowrap text-[26vw] font-extrabold leading-none tracking-[-0.06em] text-ink/[0.06] lg:text-[18vw]"
              >
                {v.name}
              </p>

              <div
                className={`relative max-w-xl transition-transform duration-700 ease-out ${
                  selected ? "translate-y-0" : "translate-y-6"
                }`}
              >
                <p className="spaced font-sans text-2xl font-normal text-ink-soft md:text-4xl">
                  {v.tag}
                </p>
                <h3 className="spaced mt-1 font-sans text-4xl font-bold text-ink md:text-6xl">
                  {v.name}
                </h3>
                <p className="mt-6 text-lg leading-relaxed text-ink-soft">{v.blurb}</p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <span className="chip bg-surface-2 text-ink">{v.role}</span>
                  {v.url && (
                    <a
                      href={v.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex h-10 items-center gap-2 rounded-full px-4 caps text-ink-soft transition-colors hover:text-accent"
                    >
                      {visitLabel} {prettyDomain(v.url)}
                      <ArrowUpRight
                        size={14}
                        weight="bold"
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
