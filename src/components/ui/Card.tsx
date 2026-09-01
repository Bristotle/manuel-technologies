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
  /* mt-lift and mt-spot only when the card actually goes somewhere. A hover
     affordance on a static panel promises an interaction that is not there. */
  const cls = `block rounded-[18px] border border-mt-border bg-white p-7 transition-colors duration-150 ${
    href ? "mt-lift mt-spot hover:border-mt-purple" : ""
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
