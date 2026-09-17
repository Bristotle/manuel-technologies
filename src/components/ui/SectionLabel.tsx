import { ACCENT, type Accent } from "@/lib/accent";

/* Bracket syntax from REF-002. ( LABEL ) in mono, wide tracking. Purple by
   default; a Grow page passes teal, a Scale page amber, the proof layer
   pink, so the label colour says where you are. The single cheapest thing
   that makes the site look designed. */

export function SectionLabel({
  children,
  accent = "purple",
  className = "",
}: {
  children: React.ReactNode;
  accent?: Accent;
  className?: string;
}) {
  return (
    <span
      className={`font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.18em] ${ACCENT[accent].text} ${className}`}
    >
      ( {children} )
    </span>
  );
}
