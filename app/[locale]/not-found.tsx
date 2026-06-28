import Link from "next/link";

export default function NotFound() {
  return (
    <section>
      <div className="mx-auto flex max-w-6xl flex-col items-start px-6 py-32 md:py-40">
        <p className="eyebrow">404</p>
        <h1 className="mt-6 text-[length:var(--text-h1)] text-ink">
          Page not found
        </h1>
        <p className="mt-4 max-w-md text-ink-soft">
          The page you’re looking for doesn’t exist or has moved.
        </p>
        <div className="mt-8 flex gap-4 font-mono text-sm">
          <Link href="/en" className="text-accent hover:text-accent-ink">
            English →
          </Link>
          <Link href="/ru" className="text-accent hover:text-accent-ink">
            Русский →
          </Link>
        </div>
      </div>
    </section>
  );
}
