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
  visitLabel,
}: {
  item: Venture;
  visitLabel: string;
}) {
  const hasUrl = Boolean(item.url);

  return (
    <article className="group flex h-full flex-col justify-between rounded-xl border border-line bg-paper p-7 transition-colors duration-300 hover:border-ink/15">
      <div>
        <div className="flex items-start justify-between gap-4">
          <span className="eyebrow">{item.tag}</span>
          {hasUrl && (
            <ArrowUpRight
              size={18}
              className="shrink-0 text-ink-faint transition-colors duration-300 group-hover:text-accent"
            />
          )}
        </div>
        <h3 className="mt-5 font-serif text-2xl text-ink">{item.name}</h3>
        <p className="mt-1 text-sm font-medium text-accent">{item.role}</p>
        <p className="mt-4 text-sm leading-relaxed text-ink-soft">{item.blurb}</p>
      </div>

      {hasUrl && (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs text-ink-faint transition-colors hover:text-ink"
        >
          {visitLabel} {prettyDomain(item.url)}
        </a>
      )}
    </article>
  );
}
