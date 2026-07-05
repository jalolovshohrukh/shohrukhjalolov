/**
 * Low-precision solar position — enough to shade a dotted map's night side.
 * Based on the standard NOAA / "Astronomical Almanac" approximation; accurate
 * to a hundredth of a degree, which is far finer than a dot. No dependencies,
 * safe to run on the client.
 */

const RAD = Math.PI / 180;

/**
 * Sun altitude (degrees above the horizon) at a given lat/lng and moment.
 * Positive means the sun is up (daytime); negative means below the horizon.
 */
export function sunAltitudeDeg(lat: number, lng: number, date: Date): number {
  // Julian day, then days since the J2000.0 epoch.
  const jd = date.getTime() / 86_400_000 + 2_440_587.5;
  const n = jd - 2_451_545.0;

  // Sun's mean longitude and mean anomaly.
  const L = (280.46 + 0.985_647_4 * n) % 360;
  const g = ((357.528 + 0.985_600_3 * n) % 360) * RAD;

  // Ecliptic longitude (apparent) and obliquity of the ecliptic.
  const lambda = (L + 1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g)) * RAD;
  const epsilon = 23.439 * RAD;

  // Declination and right ascension of the sun.
  const decl = Math.asin(Math.sin(epsilon) * Math.sin(lambda));
  const alpha = Math.atan2(
    Math.cos(epsilon) * Math.sin(lambda),
    Math.cos(lambda),
  );

  // Greenwich mean sidereal time → local hour angle of the sun.
  const gmst = (280.460_618_37 + 360.985_647_366_29 * n) % 360;
  const lst = (gmst + lng) * RAD;
  const H = lst - alpha;

  const altitude = Math.asin(
    Math.sin(lat * RAD) * Math.sin(decl) +
      Math.cos(lat * RAD) * Math.cos(decl) * Math.cos(H),
  );
  return altitude / RAD;
}

/**
 * Is it night at this point right now? A small negative threshold (civil
 * twilight is -6°) softens the terminator so the band's edge reads as dusk
 * rather than a hard line. Default 0 = the geometric horizon.
 */
export function isNight(
  lat: number,
  lng: number,
  date: Date,
  threshold = 0,
): boolean {
  return sunAltitudeDeg(lat, lng, date) < threshold;
}
