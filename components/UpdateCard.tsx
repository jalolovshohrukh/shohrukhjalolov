import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { formatDate } from "@/lib/format";
import type { Locale } from "@/lib/i18n";
import type { PostMeta } from "@/lib/posts";

/** One weekly update as a hairline-separated row with a serif title. */
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
      className="group grid gap-3 border-t border-line py-9 md:grid-cols-[11rem_1fr_auto] md:items-baseline md:gap-10"
    >
      <time
        dateTime={post.date}
        className="caps text-ink-faint"
      >
        {formatDate(post.date, locale)}
      </time>
      <div className="max-w-2xl">
        <h3 className="text-[1.6rem] font-semibold leading-[1.12] tracking-[-0.035em] text-ink transition-colors group-hover:text-accent md:text-[2rem]">
          {post.title}
        </h3>
        <p className="mt-3 leading-relaxed text-ink-soft">{post.summary}</p>
      </div>
      <span className="inline-flex items-center gap-2 caps text-ink-soft transition-colors group-hover:text-accent">
        {readLabel}
        <ArrowUpRight
          size={14}
          weight="bold"
          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  );
}
