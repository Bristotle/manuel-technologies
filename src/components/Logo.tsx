/* MT monogram. Inline SVG, never an image file.
   Inherits colour from the parent via currentColor. */

export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="6.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label="Manuel Technologies"
    >
      <path d="M8 14 H56" />
      <path d="M32 14 V52" />
      <path d="M8 52 V24 L32 44" />
      <path d="M56 52 V24 L32 44" />
    </svg>
  );
}
