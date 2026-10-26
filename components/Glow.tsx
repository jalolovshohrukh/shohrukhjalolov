/**
 * Still ember light for the dark bands, and the hero's fallback until (or
 * instead of) the EmberField shader. Pure CSS (see .glow in globals.css).
 * The parent must be `relative isolate overflow-hidden`.
 */
export function Glow({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`glow -z-10 ${className}`.trim()}>
      <div className="glow-blob glow-deep" />
      <div className="glow-blob glow-hot" />
      <div className="glow-blob glow-fold" />
    </div>
  );
}
