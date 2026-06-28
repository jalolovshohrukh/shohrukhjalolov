export type Stat = { value: string; label: string };

/** Halston-style achievements row: bold number + light label, hairline rules. */
export function StatRow({ stats }: { stats: readonly Stat[] }) {
  return (
    <div className="border-t border-line">
      {stats.map((s, i) => (
        <div
          key={i}
          className="flex items-center gap-6 border-b border-line py-6 md:gap-10 md:py-8"
        >
          <span className="w-24 shrink-0 font-display text-3xl font-bold tabular-nums text-ink md:w-44 md:text-6xl">
            {s.value}
          </span>
          <span className="border-l border-line pl-6 font-display text-xl font-medium text-ink-faint md:pl-10 md:text-4xl">
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}
