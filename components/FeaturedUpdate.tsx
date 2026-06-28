import Image from "next/image";
import Link from "next/link";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import { photos } from "@/lib/images";
import { formatDate } from "@/lib/format";
import type { Locale } from "@/lib/i18n";
import type { PostMeta } from "@/lib/posts";

/** Halston "journal" feature: warm image with a frosted card overlay. */
export function FeaturedUpdate({
  post,
  locale,
  label,
  readLabel,
}: {
  post: PostMeta;
  locale: Locale;
  label: string;
  readLabel: string;
}) {
  return (
    <Link
      href={`/${locale}/updates/${post.slug}`}
      className="group relative block h-[60vh] min-h-[440px] w-full overflow-hidden"
    >
      <Image
        src={photos.journal.src}
        alt={photos.journal.alt}
        fill
        sizes="100vw"
        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-ink/15" />

      <div className="absolute bottom-0 left-0 m-5 max-w-md bg-bone/85 p-7 backdrop-blur-md md:m-8 md:p-9">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-faint">
          {label} · {formatDate(post.date, locale)}
        </p>
        <h3 className="mt-3 font-display text-2xl font-semibold leading-tight text-ink md:text-3xl">
          {post.title}
        </h3>
        <span className="mt-5 inline-flex items-center justify-between gap-6 border border-ink/20 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-ink transition-colors group-hover:border-ink">
          {readLabel}
          <Plus size={13} className="transition-transform duration-300 group-hover:rotate-90" />
        </span>
      </div>
    </Link>
  );
}
