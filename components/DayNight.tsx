"use client";

import { useEffect, useState } from "react";
import { isNight } from "@/lib/sun";

/** Packed base dot: [x, y, lat, lng]. */
type Dot = [number, number, number, number];

/**
 * Real-time day/night terminator over the dotted map. For every base dot that
 * is currently on the night side of the earth, we draw a translucent dark dot
 * on top of the grey one, so the dot field itself appears shaded. The band
 * creeps as the earth turns (recomputed each minute).
 */
export function DayNight({ dots, viewBox }: { dots: Dot[]; viewBox: string }) {
  const [now, setNow] = useState<Date>(() => new Date());

  // The terminator moves ~0.25°/min, so a minute tick is smooth and cheap.
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
    >
      {dots.map(([x, y, lat, lng], i) =>
        isNight(lat, lng, now) ? (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={0.5}
            className="fill-ink opacity-30 transition-opacity duration-1000 motion-reduce:transition-none"
          />
        ) : null,
      )}
    </svg>
  );
}
