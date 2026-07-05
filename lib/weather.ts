/**
 * Current-weather lookup via Open-Meteo — free, keyless, CORS-friendly.
 * Fetched on demand (on hover) so the map stays uncluttered.
 * https://open-meteo.com/en/docs
 */

export type WeatherKey =
  | "clear"
  | "cloudy"
  | "fog"
  | "drizzle"
  | "rain"
  | "snow"
  | "showers"
  | "thunder";

/** A small emoji per condition bucket, for the tooltip. */
export const WEATHER_EMOJI: Record<WeatherKey, string> = {
  clear: "☀️",
  cloudy: "☁️",
  fog: "🌫️",
  drizzle: "🌦️",
  rain: "🌧️",
  snow: "❄️",
  showers: "🌦️",
  thunder: "⛈️",
};

/** Bucket a WMO weather code into one of our condition keys. */
export function weatherConditionKey(code: number): WeatherKey {
  if (code === 0 || code === 1) return "clear";
  if (code === 2 || code === 3) return "cloudy";
  if (code === 45 || code === 48) return "fog";
  if (code >= 51 && code <= 57) return "drizzle";
  if (code >= 61 && code <= 67) return "rain";
  if (code >= 71 && code <= 77) return "snow";
  if (code >= 80 && code <= 82) return "showers";
  if (code >= 85 && code <= 86) return "snow";
  if (code >= 95) return "thunder";
  return "cloudy";
}

/** Fetch the current temperature (°C) and condition for a coordinate. */
export async function fetchCurrentWeather(
  lat: number,
  lng: number,
  signal?: AbortSignal,
): Promise<{ tempC: number; key: WeatherKey }> {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}` +
    `&current=temperature_2m,weather_code`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`weather ${res.status}`);
  const data = await res.json();
  const tempC = data?.current?.temperature_2m;
  const code = data?.current?.weather_code;
  if (typeof tempC !== "number" || typeof code !== "number") {
    throw new Error("weather: unexpected response");
  }
  return { tempC, key: weatherConditionKey(code) };
}
