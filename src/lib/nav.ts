import { TOOLS } from "@/lib/free-tools";
import { PILLARS } from "@/lib/site";

/* Primary navigation. The four menus with children, and the plain links.
   Shared by the desktop header and the mobile panel so they cannot drift. */
/* The featured tile in each panel: a real delivered site, or for the
   tools, the audit. Visual evidence in the menu itself. */
const FEATURE = {
  build: { src: "/work/getfold.webp", alt: "Fold church management app", eyebrow: "Latest build", title: "Fold, a church management PWA", body: "Members, giving and attendance for Ghanaian congregations.", href: "/pricing#custom" },
  grow: { src: "/work/dementia-in-home.webp", alt: "Dementia In Home city pages", eyebrow: "Programmatic SEO", title: "1,067 pages live for one client", body: "Twenty cities, each page built on real local data.", href: "/work/dementia-in-home" },
  scale: { src: "/work/cgt-experts.webp", alt: "Capital Gains Tax Experts calculators", eyebrow: "Custom software", title: "Nine tax calculators in production", body: "Each on its own URL, in a regulated domain.", href: "/work/cgt-experts" },
} as const;

export const MENUS = [
  ...PILLARS.map((p) => ({
    name: p.name,
    href: `/${p.slug}`,
    items: p.services.map((s) => ({ name: s.name, href: s.href, blurb: s.blurb })),
    footer: { label: `All ${p.name.toLowerCase()} services`, href: `/${p.slug}` },
    feature: FEATURE[p.slug] as typeof FEATURE[keyof typeof FEATURE] | null,
  })),
  {
    name: "Free tools",
    href: "/free-tools",
    items: TOOLS.map((t) => ({ name: t.title, href: t.href, blurb: t.label })),
    footer: { label: "All twelve tools", href: "/free-tools" },
    feature: null as typeof FEATURE[keyof typeof FEATURE] | null,
  },
];

export const PLAIN = [
  { name: "Work", href: "/work" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];
