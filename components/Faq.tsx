import { Plus } from "@phosphor-icons/react/dist/ssr";

type Item = { q: string; a: string };

/**
 * Native <details> accordion: content stays in the DOM (good for SEO/GEO and
 * accessibility) while collapsing visually. Mirrors the FAQPage JSON-LD.
 */
export function Faq({ items }: { items: readonly Item[] }) {
  return (
    <div className="border-t border-line">
      {items.map((item) => (
        <details key={item.q} className="group border-b border-line">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
            <span className="text-lg font-medium text-ink md:text-xl">{item.q}</span>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface text-ink-soft transition-colors group-open:bg-accent group-open:text-on-accent">
              <Plus
                size={16}
                weight="bold"
                className="transition-transform duration-300 group-open:rotate-45"
              />
            </span>
          </summary>
          <p className="-mt-1 max-w-2xl pb-7 leading-relaxed text-ink-soft">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
