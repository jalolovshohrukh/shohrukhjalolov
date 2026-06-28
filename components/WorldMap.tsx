import DottedMap from "dotted-map";
import { places } from "@/lib/places";

export const MAP_HOME = "#583939"; // home (aubergine)
export const MAP_VISITED = "#2f8f57"; // visited (green)

/**
 * Dotted world map (server-rendered SVG, zero client JS). Visited countries
 * are green dots; home (Dushanbe) is an aubergine dot.
 */
export function WorldMap() {
  const map = new DottedMap({ height: 52, grid: "diagonal" });

  for (const p of places) {
    map.addPin({
      lat: p.lat,
      lng: p.lng,
      svgOptions: { color: p.home ? MAP_HOME : MAP_VISITED, radius: 0.62 },
    });
  }

  const svg = map.getSVG({
    radius: 0.3,
    color: "#c2bbae", // base dots — muted greige
    shape: "circle",
    backgroundColor: "transparent",
  });

  return (
    <div
      className="[&>svg]:h-auto [&>svg]:w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
