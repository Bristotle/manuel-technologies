export function Container({
  children,
  className = "",
  size = "default",
}: {
  children: React.ReactNode;
  className?: string;
  /* "wide" is a deliberate container break, not a general option. CLAUDE.md
     section 4 allows one, and a four across schematic followed by a six across
     grid is the case for it: at max-w-5xl each stage card falls to about 230px
     and every label wraps to two lines, which is what made the first pass read
     as cramped. Use it only for grids that genuinely need the measure. */
  size?: "default" | "prose" | "wide";
}) {
  const width =
    size === "prose"
      ? "max-w-[680px]"
      : size === "wide"
        ? "max-w-7xl"
        : "max-w-5xl";
  return (
    <div className={`mx-auto w-full ${width} px-6 ${className}`}>{children}</div>
  );
}
