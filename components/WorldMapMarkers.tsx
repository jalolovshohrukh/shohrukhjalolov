"use client";

import { useEffect, useRef, useState } from "react";
import {
  fetchCurrentWeather,
  WEATHER_EMOJI,
  type WeatherKey,
} from "@/lib/weather";

export type Marker = {
  name: string;
  country: string;
  tz: string;
  x: number;
  y: number;
  lat: number;
  lng: number;
  home: boolean;
};

type WeatherState = {
  status: "loading" | "ok" | "error";
  tempC?: number;
  key?: WeatherKey;
};

export function WorldMapMarkers({
  viewBox,
  markers,
  homeColor,
  visitedColor,
  homeLabel,
  weatherLabels,
}: {
  viewBox: string;
  markers: Marker[];
  homeColor: string;
  visitedColor: string;
  homeLabel: string;
  weatherLabels: Record<WeatherKey, string>;
}) {
  const [active, setActive] = useState<number | null>(null);
  const [now, setNow] = useState<Date>(() => new Date());
  const [weather, setWeather] = useState<Record<number, WeatherState>>({});
  const controllers = useRef<Map<number, AbortController>>(new Map());

  // Keep the displayed local time fresh while the page is open.
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  // Abort any in-flight weather requests on unmount.
  useEffect(() => {
    const map = controllers.current;
    return () => map.forEach((c) => c.abort());
  }, []);

  // Fetch (once, then cache) the current weather for a hovered/focused city.
  // Guard on the controllers ref so a given city is only ever requested once,
  // even under React's development double-invocation.
  const loadWeather = (i: number) => {
    if (controllers.current.has(i)) return;
    const controller = new AbortController();
    controllers.current.set(i, controller);
    setWeather((p) => ({ ...p, [i]: { status: "loading" } }));
    fetchCurrentWeather(markers[i].lat, markers[i].lng, controller.signal)
      .then((w) =>
        setWeather((p) => ({
          ...p,
          [i]: { status: "ok", tempC: w.tempC, key: w.key },
        })),
      )
      .catch((err) => {
        if (err?.name === "AbortError") return;
        setWeather((p) => ({ ...p, [i]: { status: "error" } }));
      });
  };

  const activate = (i: number) => {
    setActive(i);
    loadWeather(i);
  };

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
  const w = active !== null ? weather[active] : undefined;

  return (
    <>
      <svg
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        {markers.map((mk, i) => (
          <g
            key={i}
            tabIndex={0}
            role="button"
            aria-label={mk.name}
            className="cursor-pointer outline-none"
            onMouseEnter={() => activate(i)}
            onMouseLeave={() => setActive((p) => (p === i ? null : p))}
            onFocus={() => activate(i)}
            onBlur={() => setActive((p) => (p === i ? null : p))}
          >
            {/* Invisible hit area — kept modest so dense clusters don't
                steal each other's hovers */}
            <circle
              cx={mk.x}
              cy={mk.y}
              r={0.9}
              fill="transparent"
              style={{ pointerEvents: "all" }}
            />
            {/* Visible dot — same size as the base dots, grows on hover */}
            <circle
              cx={mk.x}
              cy={mk.y}
              r={active === i ? 0.75 : 0.34}
              fill={mk.home ? homeColor : visitedColor}
              className="pointer-events-none transition-[r] duration-200"
            />
          </g>
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
            {timeIn(m.tz)} · {m.home ? homeLabel : m.country}
          </div>
          {w?.status === "ok" && w.key !== undefined && w.tempC !== undefined && (
            <div className="mt-0.5 font-mono text-[0.7rem] text-ink-soft">
              {WEATHER_EMOJI[w.key]} {Math.round(w.tempC)}° · {weatherLabels[w.key]}
            </div>
          )}
        </div>
      )}
    </>
  );
}
