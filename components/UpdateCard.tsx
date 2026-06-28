import Link from "next/link";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import { formatDate } from "@/lib/format";
import type { Locale } from "@/lib/i18n";
import type { PostMeta } from "@/lib/posts";

export function UpdateCard({
  post,
  locale,
  readLabel,
}: {
  post: PostMeta;
  locale: Locale;
  readLabel: string;
}) {
  return (
    <Link
      href={`/${locale}/updates/${post.slug}`}
      className="group block border-t border-line py-8 transition-colors duration-300 hover:border-ink/30"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between md:gap-10">
        <div className="md:max-w-2xl">
          <time className="font-mono text-xs uppercase tracking-[0.18em] text-ink-faint">
            {formatDate(post.date, locale)}
          </time>
          <h3 className="mt-2 font-display text-2xl font-semibold text-ink transition-colors group-hover:text-accent">
            {post.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            {post.summary}
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-accent">
          {readLabel}
          <Plus size={13} className="transition-transform duration-300 group-hover:rotate-90" />
        </span>
      </div>
    </Link>
  );
}
