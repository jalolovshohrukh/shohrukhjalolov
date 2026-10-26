"use client";

import { useSyncExternalStore } from "react";
import { isNight } from "@/lib/sun";

/** Packed base dot: [x, y, lat, lng]. */
type Dot = [number, number, number, number];

const MINUTE = 60_000;

// The terminator moves ~0.25°/min, so a minute tick is smooth and cheap.
function subscribeMinute(onTick: () => void) {
  const id = setInterval(onTick, MINUTE);
  return () => clearInterval(id);
}
const currentMinute = () => Math.floor(Date.now() / MINUTE);
// The page is prerendered at build time, so any shading in its HTML would be
// frozen at the build's clock and disagree with the visitor's, breaking
// hydration. The server renders none; the client fills it in on hydration.
const noMinute = () => null;

/**
 * Real-time day/night terminator over the dotted map. For every base dot that
 * is currently on the night side of the earth, we draw a translucent dark dot
 * on top of the grey one, so the dot field itself appears shaded. The band
 * creeps as the earth turns (recomputed each minute).
 */
export function DayNight({ dots, viewBox }: { dots: Dot[]; viewBox: string }) {
  const minute = useSyncExternalStore(subscribeMinute, currentMinute, noMinute);
  const now = minute === null ? null : new Date(minute * MINUTE);

  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
    >
      {now &&
        dots.map(([x, y, lat, lng], i) =>
          isNight(lat, lng, now) ? (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={0.5}
              className="fill-[var(--map-night)]"
            />
          ) : null,
        )}
    </svg>
  );
}
