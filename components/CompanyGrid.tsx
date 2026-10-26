import type { Company } from "@/lib/companies";
import { Wordmark } from "@/components/Wordmark";

/**
 * cristianoronaldo.com-style partner grid: wordmarks in cells divided by fine
 * ember hairlines that fade out towards the edges. Heading in wide-tracked
 * capitals with one phrase set bold.
 */
export function CompanyGrid({
  items,
  label,
  emphasis,
}: {
  items: Company[];
  label: string;
  emphasis: string;
}) {
  const at = emphasis ? label.indexOf(emphasis) : -1;
  const heading =
    at < 0 ? (
      label
    ) : (
      <>
        {label.slice(0, at)}
        <strong className="font-bold text-ink">{emphasis}</strong>
        {label.slice(at + emphasis.length)}
      </>
    );

  // A count that splits into threes but not fours (e.g. 9) reads best 3 × n
  // from tablet up; otherwise four across on desktop. Phones stay two across.
  const threeUp = items.length % 3 === 0 && items.length % 4 !== 0;
  const wide = threeUp ? 3 : 4;
  const rows = {
    "--rows-sm": Math.ceil(items.length / 2),
    "--rows-wide": Math.ceil(items.length / wide),
  } as React.CSSProperties;
  const columns = threeUp
    ? "max-w-4xl sm:grid-cols-3 sm:[--cols:3] sm:[--rows:var(--rows-wide)]"
    : "max-w-5xl lg:grid-cols-4 lg:[--cols:4] lg:[--rows:var(--rows-wide)]";

  const cell =
    "flex aspect-[4/3] items-center justify-center px-4 text-center font-sans text-[1.35rem] font-semibold tracking-[-0.03em] text-ink-soft transition-colors duration-300 sm:text-[1.7rem]";

  return (
    <div>
      <h2 className="spaced text-center font-sans text-sm text-ink-soft md:text-lg">
        {heading}
      </h2>
      <div
        className={`relative mx-auto mt-12 grid grid-cols-2 [--cols:2] [--rows:var(--rows-sm)] md:mt-16 ${columns}`}
        style={rows}
      >
        <div className="grid-lines" aria-hidden="true" />
        {items.map((c) =>
          c.url ? (
            <a
              key={c.name}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${cell} ${c.hoverClass}`}
            >
              <Wordmark company={c} />
            </a>
          ) : (
            <div key={c.name} className={cell}>
              <Wordmark company={c} />
            </div>
          ),
        )}
      </div>
    </div>
  );
}
