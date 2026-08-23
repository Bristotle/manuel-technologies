import Link from "next/link";

type Variant = "primary" | "secondary";

const STYLES: Record<Variant, string> = {
  primary:
    "bg-mt-purple text-white hover:bg-mt-purple-light",
  secondary:
    "border border-mt-border text-mt-ink hover:border-mt-purple hover:text-mt-purple",
};

export function Button({
  href,
  children,
  variant = "primary",
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  external?: boolean;
}) {
  const cls = `inline-flex items-center justify-center rounded-[10px] px-6 py-3.5 text-base font-semibold transition-colors duration-150 ${STYLES[variant]}`;

  if (external || href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a href={href} rel="noopener" className={cls}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
