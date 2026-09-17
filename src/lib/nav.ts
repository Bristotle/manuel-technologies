import { TOOLS } from "@/lib/free-tools";
import { PILLARS } from "@/lib/site";

/* Primary navigation. The four menus with children, and the plain links.
   Shared by the desktop header and the mobile panel so they cannot drift. */
export const MENUS = [
  ...PILLARS.map((p) => ({
    name: p.name,
    href: `/${p.slug}`,
    items: p.services.map((s) => ({ name: s.name, href: s.href, blurb: s.blurb })),
    footer: { label: `All ${p.name.toLowerCase()} services`, href: `/${p.slug}` },
  })),
  {
    name: "Free tools",
    href: "/free-tools",
    items: TOOLS.map((t) => ({ name: t.title, href: t.href, blurb: t.label })),
    footer: { label: "All twelve tools", href: "/free-tools" },
  },
];

export const PLAIN = [
  { name: "Work", href: "/work" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];
