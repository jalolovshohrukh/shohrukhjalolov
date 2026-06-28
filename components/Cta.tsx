import Link from "next/link";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "onDark";
  external?: boolean;
  icon?: boolean;
};

/** Halston-style button: rectangular, uppercase, letter-spaced, with a "+". */
export function Cta({
  href,
  children,
  variant = "primary",
  external = false,
  icon = true,
}: Props) {
  const base =
    "group inline-flex items-center justify-between gap-6 whitespace-nowrap border px-5 py-3 font-mono text-xs uppercase tracking-[0.15em] transition-colors duration-200";
  const look =
    variant === "primary"
      ? "border-ink bg-ink text-bone hover:bg-accent-ink hover:border-accent-ink"
      : variant === "onDark"
        ? "border-white/40 text-white hover:bg-white hover:text-ink"
        : "border-line text-ink hover:border-ink";
  const cls = `${base} ${look}`;

  const inner = (
    <>
      <span>{children}</span>
      {icon && (
        <Plus
          size={14}
          className="transition-transform duration-300 group-hover:rotate-90"
        />
      )}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
