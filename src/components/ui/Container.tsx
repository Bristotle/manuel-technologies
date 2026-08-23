export function Container({
  children,
  className = "",
  size = "default",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "prose";
}) {
  const width = size === "prose" ? "max-w-[680px]" : "max-w-5xl";
  return (
    <div className={`mx-auto w-full ${width} px-6 ${className}`}>{children}</div>
  );
}
