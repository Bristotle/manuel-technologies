import Link from "next/link";

/* Border and surface, never a shadow. Depth comes from overlap, not blur. */

export function Card({
  href,
  children,
  className = "",
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const cls = `block rounded-[18px] border border-mt-border bg-white p-7 transition-colors duration-150 ${
    href ? "hover:border-mt-purple" : ""
  } ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return <div className={cls}>{children}</div>;
}
