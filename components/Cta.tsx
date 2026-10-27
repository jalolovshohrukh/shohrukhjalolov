import Link from "next/link";
import { ArrowUpRight, Asterisk } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  /** `sm` (40px) matches the other header controls; `md` (48px) everywhere else. */
  size?: "md" | "sm";
  external?: boolean;
};

// Transitions come from .liquid (globals.css); a Tailwind transition class
// here would override its springy transform.
const BASE = "group inline-flex items-center gap-3 whitespace-nowrap rounded-full caps";

const SIZE = {
  md: "h-12 px-6",
  sm: "h-10 px-5",
} as const;

const LOOK = {
  primary: "liquid liquid-ember",
  ghost: "liquid liquid-clear",
} as const;

/**
 * Liquid-glass pill button (iOS 26 style, no stroke). Primary is ember glass
 * with an arrow that nudges on hover; ghost is clear glass led by an ember asterisk.
 */
export function Cta({
  href,
  children,
  variant = "primary",
  size = "md",
  external = false,
}: Props) {
  const cls = `${BASE} ${SIZE[size]} ${LOOK[variant]}`;
  const inner =
    variant === "primary" ? (
      <>
        <span>{children}</span>
        <ArrowUpRight
          size={15}
          weight="bold"
          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </>
    ) : (
      <>
        <Asterisk
          size={15}
          weight="bold"
          className="text-accent transition-transform duration-500 group-hover:rotate-90"
        />
        <span>{children}</span>
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
