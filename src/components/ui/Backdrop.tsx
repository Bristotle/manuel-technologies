import type { CSSProperties } from "react";

/* Section backdrop layer. Server component. See the "Section backdrops"
   block in globals.css for what each kind is and where it came from. The
   parent must be relative and overflow-hidden, and content must be
   relative so it sits above this layer.

   "glow" takes its position and strength from CSS variables passed in
   style: --gx, --gy (position), --gw, --gh (size), --ga (0 to 1). */

type Kind = "glow" | "blueprint" | "sonar" | "mesh" | "rays" | "aurora";

export function Backdrop({ kind, className = "", style }: { kind: Kind; className?: string; style?: CSSProperties }) {
  return <div aria-hidden="true" className={`mt-bg mt-${kind} ${className}`} style={style} />;
}
