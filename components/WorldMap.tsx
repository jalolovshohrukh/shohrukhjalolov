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

  const markers: Marker[] = visited.flatMap((country) =>
    country.cities.flatMap((c) => {
      const pin = map.getPin({ lat: c.lat, lng: c.lng });
      if (!pin) return [];
      return [
        {
          name: locale === "ru" ? c.ru : c.en,
          country: locale === "ru" ? country.ru : country.en,
          tz: c.tz,
          x: pin.x,
          y: pin.y,
          home: Boolean(country.home || c.home),
        },
      ];
    }),
  );

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
