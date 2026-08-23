/* Bracket syntax from REF-002. ( LABEL ) in mono, wide tracking, purple.
   The single cheapest thing that makes the site look designed. */

export function SectionLabel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.18em] text-mt-purple ${className}`}
    >
      ( {children} )
    </span>
  );
}
