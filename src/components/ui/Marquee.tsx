/* Infinite rail. Track is duplicated in markup and translated exactly -50%,
   so the loop has no visible join. Pure CSS, zero JavaScript.
   Animation is disabled by the prefers-reduced-motion block in globals.css. */

export function Marquee({ items }: { items: readonly string[] }) {
  const track = (
    <ul
      className="flex shrink-0 items-center gap-8 pr-8"
      aria-hidden="true"
    >
      {items.map((item) => (
        <li
          key={item}
          className="whitespace-nowrap font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.18em] text-mt-muted"
        >
          ( {item} ) <span className="text-mt-purple">+</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="overflow-hidden border-y border-mt-border bg-white py-4">
      <div className="mt-marquee">
        {track}
        {track}
      </div>
      <span className="sr-only">
        Capabilities: {items.join(", ")}
      </span>
    </div>
  );
}
