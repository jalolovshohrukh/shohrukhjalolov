import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
  arrow?: boolean;
};

export function Cta({
  href,
  children,
  variant = "primary",
  external = false,
  arrow = true,
}: Props) {
  const base =
    "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md px-5 py-3 text-sm font-medium transition-all duration-200 active:scale-[0.98]";
  const look =
    variant === "primary"
      ? "bg-ink text-bone hover:bg-accent-ink"
      : "border border-line bg-paper text-ink hover:border-ink/25";
  const cls = `${base} ${look}`;

  const inner = (
    <>
      {children}
      {arrow && (
        <ArrowRight
          size={15}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
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
