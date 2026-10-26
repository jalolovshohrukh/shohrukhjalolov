import Link from "next/link";

export default function NotFound() {
  const pill =
    "inline-flex h-12 items-center rounded-full bg-surface px-6 caps text-ink transition-colors hover:bg-surface-2";

  return (
    <section>
      <div className="shell flex flex-col items-start py-28 md:py-40">
        <p className="eyebrow">404</p>
        <h1 className="display mt-6 text-[length:var(--text-display)]">
          Page not found
        </h1>
        <p className="mt-6 max-w-md text-lg text-ink-soft">
          The page you’re looking for doesn’t exist or has moved.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/en" className={pill}>
            English
          </Link>
          <Link href="/ru" className={pill}>
            Русский
          </Link>
        </div>
      </div>
    </section>
  );
}
