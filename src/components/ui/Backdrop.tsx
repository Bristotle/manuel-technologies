/* Section backdrop layer. Server component, no props beyond the kind.
   See the "Section backdrops" block in globals.css for what each one is
   and where it came from. The parent must be relative and overflow-hidden,
   and content must be relative so it sits above this layer. */

type Kind = "blueprint" | "sonar" | "mesh" | "hatch" | "rays" | "aurora";

export function Backdrop({ kind, className = "" }: { kind: Kind; className?: string }) {
  return <div aria-hidden="true" className={`mt-bg mt-${kind} ${className}`} />;
}
