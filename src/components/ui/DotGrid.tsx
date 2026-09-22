/* Dot grid background layer. REF-008, dillionverma dot-pattern.
   ---------------------------------------------------------------------------
   Server component. No hooks, no client boundary, no dependencies.

   The reference builds an SVG <pattern> with a useId() generated id so that
   multiple instances do not collide. That is a real problem for SVG patterns
   and a sensible fix, but it forces "use client" on every page that uses a
   background. The CSS radial-gradient in globals.css has no id to collide,
   so the whole problem disappears along with the JavaScript.

   Usage. The parent must be `relative` and content must sit above it:

     <section className="relative overflow-hidden">
       <DotGrid fade="center" />
       <Container className="relative">...</Container>
     </section>
   -------------------------------------------------------------------------- */

type DotGridProps = {
  /* Where the grid dissolves. Always pick one. An unfaded grid reads as a
     texture laid over the section rather than as depth behind it. */
  fade?: "center" | "top" | "bottom" | "none";
  /* Grid rhythm. Default 16px matches the 8px spacing scale. */
  density?: "tight" | "default" | "loose";
  /* A soft glow under the dots. Off by default since 22 September 2026:
     dots plus an orb on 35 heroes was the template look, not a style. The
     homepage hero passes glow so the site keeps one signature. */
  glow?: boolean;
  /* Hex for the glow. Defaults to purple; pillar pages pass their band. */
  glowColor?: string;
  className?: string;
};

const FADE = {
  center: "mt-dots-fade-center",
  top: "mt-dots-fade-top",
  bottom: "mt-dots-fade-bottom",
  none: "",
} as const;

const DENSITY = {
  tight: "mt-dots-tight",
  default: "",
  loose: "mt-dots-loose",
} as const;

export function DotGrid({
  fade = "center",
  density = "default",
  glow = false,
  glowColor,
  className = "",
}: DotGridProps) {
  return (
    <>
      {glow ? <div aria-hidden="true" className="mt-bg mt-glow mt-glow-hero" style={glowColor ? ({ "--glow-c": glowColor } as React.CSSProperties) : undefined} /> : null}
      <div
        aria-hidden="true"
        className={`mt-dots ${DENSITY[density]} ${FADE[fade]} pointer-events-none absolute inset-0 ${className}`}
      />
    </>
  );
}
