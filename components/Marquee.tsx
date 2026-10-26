import type { Company } from "@/lib/companies";
import { Wordmark } from "@/components/Wordmark";

/**
 * Vivid Motion-style strip of company wordmarks that drifts sideways forever.
 * The list is rendered twice and slid by half its width for a seamless loop;
 * the second copy is hidden from assistive tech. With reduced motion it
 * stands still and wraps (see .marquee in globals.css).
 */
export function Marquee({ items, label }: { items: Company[]; label: string }) {
  const word =
    "whitespace-nowrap px-7 font-sans text-2xl font-semibold tracking-[-0.02em] text-ink-soft transition-colors duration-300 md:px-12 md:text-[2rem]";

  return (
    <div className="marquee" role="region" aria-label={label}>
      <ul className="marquee-track py-2">
        {items.map((c) => (
          <li key={c.name} className={`${word} ${c.hoverClass}`}>
            <Wordmark company={c} />
          </li>
        ))}
        {items.map((c) => (
          <li
            key={`copy-${c.name}`}
            aria-hidden="true"
            className={`marquee-copy ${word} ${c.hoverClass}`}
          >
            <Wordmark company={c} />
          </li>
        ))}
      </ul>
    </div>
  );
}
