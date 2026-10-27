/** The site's asterisk (Phosphor "Asterisk", bold) on a 256 × 256 grid. */
const ASTERISK =
  "M218.29,182.17a12,12,0,0,1-16.47,4.12L140,149.19V216a12,12,0,0,1-24,0V149.19l-61.82,37.1a12,12,0,1,1-12.35-20.58L104.68,128,41.83,90.29A12,12,0,1,1,54.18,69.71L116,106.81V40a12,12,0,0,1,24,0v66.81l61.82-37.1a12,12,0,1,1,12.35,20.58L151.32,128l62.85,37.71A12,12,0,0,1,218.29,182.17Z";

/**
 * App icon artwork for ImageResponse (inline styles only): the ember asterisk
 * from the site's buttons on the dark canvas, in a rounded square.
 */
export function BrandMark({ size }: { size: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0b0a09",
        borderRadius: size * 0.22,
      }}
    >
      <svg width={size * 0.72} height={size * 0.72} viewBox="0 0 256 256">
        <path d={ASTERISK} fill="#ff4d1f" />
      </svg>
    </div>
  );
}
