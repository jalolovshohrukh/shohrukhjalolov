import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
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
      className="group block border-t border-line py-7 transition-colors duration-300 hover:border-ink/20"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between md:gap-10">
        <div className="md:max-w-2xl">
          <time className="font-mono text-xs text-ink-faint">
            {formatDate(post.date, locale)}
          </time>
          <h3 className="mt-2 font-serif text-2xl text-ink transition-colors group-hover:text-accent-ink">
            {post.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            {post.summary}
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 text-sm text-accent">
          {readLabel}
          <ArrowRight
            size={15}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
