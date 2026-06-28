"use client";

import { useEffect, useState } from "react";

export type Marker = {
  name: string;
  country: string;
  tz: string;
  x: number;
  y: number;
  home: boolean;
};

export function WorldMapMarkers({
  viewBox,
  markers,
  homeColor,
  visitedColor,
}: {
  viewBox: string;
  markers: Marker[];
  homeColor: string;
  visitedColor: string;
}) {
  const [active, setActive] = useState<number | null>(null);
  const [now, setNow] = useState<Date>(() => new Date());

  // Keep the displayed local time fresh while the page is open.
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const [, , vbW, vbH] = viewBox.split(" ").map(Number);

  const timeIn = (tz: string) => {
    try {
      return new Intl.DateTimeFormat(undefined, {
        timeZone: tz,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(now);
    } catch {
      return "";
    }
  };

  const m = active !== null ? markers[active] : null;

  return (
    <>
      <svg
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        {markers.map((mk, i) => (
          <circle
            key={i}
            cx={mk.x}
            cy={mk.y}
            r={active === i ? 1.2 : 0.8}
            fill={mk.home ? homeColor : visitedColor}
            tabIndex={0}
            role="button"
            aria-label={mk.name}
            className="cursor-pointer outline-none transition-[r] duration-200"
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive((p) => (p === i ? null : p))}
            onFocus={() => setActive(i)}
            onBlur={() => setActive((p) => (p === i ? null : p))}
          />
        ))}
      </svg>

      {m && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+12px)] whitespace-nowrap rounded-md border border-line bg-paper px-3 py-2 text-center shadow-[0_2px_12px_rgba(0,0,0,0.07)]"
          style={{ left: `${(m.x / vbW) * 100}%`, top: `${(m.y / vbH) * 100}%` }}
        >
          <div className="font-display text-sm font-semibold leading-tight text-ink">
            {m.name}
          </div>
          <div className="mt-0.5 font-mono text-[0.7rem] text-ink-soft">
            {timeIn(m.tz)} · {m.country}
          </div>
        </div>
      )}
    </>
  );
}
