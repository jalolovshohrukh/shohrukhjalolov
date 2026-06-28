import DottedMap from "dotted-map";
import { visited } from "@/lib/places";

export const MAP_HOME = "#583939"; // home (aubergine)
export const MAP_VISITED = "#2f8f57"; // visited (green)

/**
 * Dotted world map (server-rendered SVG, zero client JS). Every visited city
 * is a green dot; home (Dushanbe) is an aubergine dot.
 */
export function WorldMap() {
  const map = new DottedMap({ height: 52, grid: "diagonal" });

  for (const country of visited) {
    for (const c of country.cities) {
      map.addPin({
        lat: c.lat,
        lng: c.lng,
        svgOptions: {
          color: country.home ? MAP_HOME : MAP_VISITED,
          radius: 0.55,
        },
      });
    }
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
