"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "@phosphor-icons/react/dist/ssr";
import { THEME_STORAGE_KEY } from "@/components/ThemeScript";

type Theme = "dark" | "light";

/** The theme lives on <html> (set before paint by ThemeScript); watch it there. */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function currentTheme(): Theme {
  return document.documentElement.classList.contains("theme-light")
    ? "light"
    : "dark";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement.classList;
  root.remove("theme-dark", "theme-light");
  root.add(`theme-${theme}`);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be blocked (private mode); the class still applies.
  }
}

/** Dark / light switch. */
export function ThemeToggle({
  labels,
}: {
  labels: { toLight: string; toDark: string };
}) {
  const theme = useSyncExternalStore(subscribe, currentTheme, () => "dark");
  const next: Theme = theme === "dark" ? "light" : "dark";
  const label = next === "light" ? labels.toLight : labels.toDark;

  return (
    <button
      type="button"
      onClick={() => applyTheme(next)}
      aria-label={label}
      title={label}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface text-ink transition-colors hover:bg-surface-2"
    >
      {theme === "dark" ? <Sun size={18} weight="fill" /> : <Moon size={18} weight="fill" />}
    </button>
  );
}
