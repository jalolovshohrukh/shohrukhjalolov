import DottedMap from "dotted-map";
import proj4 from "proj4";
import { visited } from "@/lib/places";
import { getDictionary, type Locale } from "@/lib/i18n";
import { WorldMapMarkers, type Marker } from "@/components/WorldMapMarkers";
import { DayNight } from "@/components/DayNight";

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

  // Invert every base dot back to lat/lng (Mercator) so the client can shade
  // the night side in real time. dotted-map stores only x/y per dot but exposes
  // the projection + bounds, so we replicate its own inverse exactly.
  const proj = map as unknown as {
    proj4String: string;
    X_MIN: number;
    Y_MAX: number;
    X_RANGE: number;
    Y_RANGE: number;
    width: number;
    height: number;
    getPoints: () => { x: number; y: number }[];
  };
  const r1 = (n: number) => Math.round(n * 10) / 10;
  const r2 = (n: number) => Math.round(n * 100) / 100;
  const nightDots: [number, number, number, number][] = proj
    .getPoints()
    .map((p) => {
      const [lng, lat] = proj4(proj.proj4String, "WGS84", [
        (p.x / proj.width) * proj.X_RANGE + proj.X_MIN,
        proj.Y_MAX - (p.y / proj.height) * proj.Y_RANGE,
      ]) as [number, number];
      return [r2(p.x), r2(p.y), r1(lat), r1(lng)];
    });

  // Cities that snap to the same dot are merged into one marker so none get
  // hidden behind another and there is a single clean hover target per point.
  const byPoint = new Map<
    string,
    {
      names: string[];
      country: string;
      tz: string;
      home: boolean;
      x: number;
      y: number;
      lat: number;
      lng: number;
    }
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
          // Prefer the home city's own coordinates for its weather lookup.
          existing.lat = c.lat;
          existing.lng = c.lng;
        }
      } else {
        byPoint.set(key, {
          names: [name],
          country: locale === "ru" ? country.ru : country.en,
          tz: c.tz,
          home: isHome,
          x: pin.x,
          y: pin.y,
          lat: c.lat,
          lng: c.lng,
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
      lat: p.lat,
      lng: p.lng,
      home: p.home,
    }));

  const dict = getDictionary(locale);

  return (
    <div className="relative">
      <div
        className="[&>svg]:h-auto [&>svg]:w-full"
        dangerouslySetInnerHTML={{ __html: baseSvg }}
      />
      <DayNight dots={nightDots} viewBox={viewBox} />
      <WorldMapMarkers
        viewBox={viewBox}
        markers={markers}
        homeColor={MAP_HOME}
        visitedColor={MAP_VISITED}
        homeLabel={dict.places.myHome}
        weatherLabels={dict.places.weather}
      />
    </div>
  );
}
