"use client";

import { useEffect } from "react";

type UAData = { brands?: { brand: string }[] };

/** Chromium is the engine that renders SVG filters inside backdrop-filter. */
function supportsRefraction(): boolean {
  const ua = (navigator as Navigator & { userAgentData?: UAData }).userAgentData;
  return Boolean(ua?.brands?.some((b) => b.brand === "Chromium"));
}

/** Moves a .liquid button's inner light (--lx/--ly) to the pointer. */
function onPointerMove(event: PointerEvent) {
  const glass = (event.target as Element | null)?.closest?.<HTMLElement>(".liquid");
  if (!glass) return;
  const box = glass.getBoundingClientRect();
  glass.style.setProperty("--lx", `${((event.clientX - box.left) / box.width) * 100}%`);
  glass.style.setProperty("--ly", `${((event.clientY - box.top) / box.height) * 100}%`);
}

/** When the pointer leaves a button, its light drifts on its own again. */
function onPointerOut(event: PointerEvent) {
  const glass = (event.target as Element | null)?.closest?.<HTMLElement>(".liquid");
  if (!glass || glass.contains(event.relatedTarget as Node | null)) return;
  glass.style.removeProperty("--lx");
  glass.style.removeProperty("--ly");
}

/**
 * Site-wide helper for the liquid-glass buttons (.liquid in globals.css):
 * one delegated pointer listener for every button, the refraction filter the
 * glass bends its backdrop through, and the class that turns refraction on
 * where the browser can render it (elsewhere the glass keeps a plain blur).
 */
export function LiquidGlass() {
  useEffect(() => {
    if (supportsRefraction()) document.documentElement.classList.add("liquid-refract");
    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerout", onPointerOut, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerout", onPointerOut);
    };
  }, []);

  return (
    <svg aria-hidden="true" width="0" height="0" className="absolute">
      <filter id="liquid-refract" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.009 0.024" numOctaves="2" seed="7" result="flow" />
        <feDisplacementMap in="SourceGraphic" in2="flow" scale="16" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}
