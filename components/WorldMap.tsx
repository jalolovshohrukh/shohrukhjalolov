import DottedMap from "dotted-map";
import { visited } from "@/lib/places";
import { getDictionary, type Locale } from "@/lib/i18n";
import { WorldMapMarkers, type Marker } from "@/components/WorldMapMarkers";

export const MAP_HOME = "#583939"; // home (aubergine)
export const MAP_VISITED = "#2f8f57"; // visited (green)

/**
 * Dotted world map. The base dots are a static server-rendered SVG; each
 * visited city is an interactive marker overlaid at the same projection, so
 * hovering shows the city name and its current local time.
 */
export function WorldMap({ locale }: { locale: Locale }) {
  const map = new DottedMap({ height: 52, grid: "diagonal" });

  // Base dots first (before getPin), so they carry no coloured pins.
  const baseSvg = map.getSVG({
    radius: 0.3,
    color: "#c2bbae",
    shape: "circle",
    backgroundColor: "transparent",
  });
  const viewBox = baseSvg.match(/viewBox="([^"]+)"/)?.[1] ?? "0 0 103 52";

  // Cities that snap to the same dot are merged into one marker so none get
  // hidden behind another and there is a single clean hover target per point.
  const byPoint = new Map<
    string,
    { names: string[]; country: string; tz: string; home: boolean; x: number; y: number }
  >();

  for (const country of visited) {
    for (const c of country.cities) {
      const pin = map.getPin({ lat: c.lat, lng: c.lng });
      if (!pin) continue;
      const key = `${pin.x}:${pin.y}`;
      const name = locale === "ru" ? c.ru : c.en;
      const isHome = Boolean(country.home || c.home);
      const existing = byPoint.get(key);
      if (existing) {
        if (!existing.names.includes(name)) existing.names.push(name);
        if (isHome) {
          existing.home = true;
          existing.tz = c.tz;
        }
      } else {
        byPoint.set(key, {
          names: [name],
          country: locale === "ru" ? country.ru : country.en,
          tz: c.tz,
          home: isHome,
          x: pin.x,
          y: pin.y,
        });
      }
    }
  }

  const markers: Marker[] = [...byPoint.values()]
    // Home dots render last, so they sit on top of any nearby green dots.
    .sort((a, b) => Number(a.home) - Number(b.home))
    .map((p) => ({
      name: p.names.join(" · "),
      country: p.country,
      tz: p.tz,
      x: p.x,
      y: p.y,
      home: p.home,
    }));

  const dict = getDictionary(locale);

  return (
    <div className="relative">
      <div
        className="[&>svg]:h-auto [&>svg]:w-full"
        dangerouslySetInnerHTML={{ __html: baseSvg }}
      />
      <WorldMapMarkers
        viewBox={viewBox}
        markers={markers}
        homeColor={MAP_HOME}
        visitedColor={MAP_VISITED}
        homeLabel={dict.places.myHome}
      />
    </div>
  );
}
