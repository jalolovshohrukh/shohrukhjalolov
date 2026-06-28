import { Plus } from "@phosphor-icons/react/dist/ssr";

type Item = { q: string; a: string };

/**
 * Native <details> accordion: content stays in the DOM (good for SEO/GEO and
 * accessibility) while collapsing visually. Mirrors the FAQPage JSON-LD.
 */
export function Faq({ items }: { items: readonly Item[] }) {
  return (
    <div className="border-t border-line">
      {items.map((item, i) => (
        <details key={i} className="group border-b border-line py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
            <span className="font-display text-lg font-medium text-ink md:text-xl">
              {item.q}
            </span>
            <Plus
              size={18}
              className="shrink-0 text-ink-faint transition-transform duration-300 group-open:rotate-45"
            />
          </summary>
          <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-ink-soft">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
