export type Stat = { value: string; label: string };

/**
 * Mogaa-style numbers row: big figures with a short label under each, centred
 * in their columns and split by hairlines. Three stats sit in one row at every
 * width; four go 2 × 2 on phones and one row from `lg`.
 */
export function StatRow({ stats }: { stats: readonly Stat[] }) {
  const threeUp = stats.length === 3;

  return (
    <dl className={`grid gap-y-12 ${threeUp ? "grid-cols-3" : "grid-cols-2 lg:grid-cols-4"}`}>
      {stats.map((s, i) => {
        // A hairline before every figure that does not start a row.
        const rule = threeUp ? i > 0 : i % 2 === 1;
        return (
          <div
            key={s.label}
            className={`flex flex-col-reverse items-center justify-end gap-3 px-2 text-center sm:px-6 ${
              rule ? "border-l border-line" : ""
            } ${!threeUp && i > 0 ? "lg:border-l lg:border-line" : ""}`}
          >
            <dt className="text-sm text-ink-soft md:text-base">{s.label}</dt>
            <dd className="text-[clamp(2.6rem,8vw,6rem)] font-semibold leading-[0.9] tracking-[-0.055em] tabular-nums">
              {s.value}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
