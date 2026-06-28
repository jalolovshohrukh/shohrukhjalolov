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

export function VentureCard({
  item,
  index,
  visitLabel,
}: {
  item: Venture;
  index?: string;
  visitLabel: string;
}) {
  const hasUrl = Boolean(item.url);

  return (
    <article className="group flex h-full flex-col justify-between border border-line bg-paper p-7 transition-colors duration-300 hover:border-ink/30">
      <div>
        <div className="flex items-start justify-between gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink-faint">
            {index ? `${index} · ` : ""}
            {item.tag}
          </span>
          {hasUrl && (
            <ArrowUpRight
              size={18}
              className="shrink-0 text-ink-faint transition-colors duration-300 group-hover:text-accent"
            />
          )}
        </div>
        <h3 className="mt-6 font-display text-2xl font-semibold text-ink">
          {item.name}
        </h3>
        <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-accent">
          {item.role}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-ink-soft">{item.blurb}</p>
      </div>

      {hasUrl && (
        <span className="mt-6 font-mono text-xs text-ink-faint transition-colors group-hover:text-ink">
          {visitLabel} {prettyDomain(item.url)}
        </span>
      )}
    </article>
  );
}
