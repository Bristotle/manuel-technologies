import type { StatementPill } from "@/components/PillarStatement";
import { INTEGRATIONS } from "@/lib/integrations";

/* --------------------------------------------------------------------------
   The sentence and the pills for each PillarStatement. Every href is a page
   that exists; the build fails on a broken internal link long before a
   visitor finds one, but check anyway when adding a pill.

   The hub headings are the h1 of each pillar page, so they name the work in
   the words a buyer searches with, not the tagline.
   -------------------------------------------------------------------------- */

type Statement = { label: string; heading: string; muted?: string; intro?: string; pills: StatementPill[] };

/* Homepage, under the work reel. Search only, six SEO services. */
export const HOME_SEARCH: Statement = {
  label: "Search",
  heading: "We get businesses found on Google and named by AI search, from the code crawlers read to",
  muted: "the pages people click.",
  pills: [
    { label: "Technical SEO", href: "/grow/technical-seo", icon: "code" },
    { label: "On-page SEO", href: "/grow/on-page-seo", icon: "page" },
    { label: "Programmatic SEO", href: "/grow/programmatic-seo", icon: "grid" },
    { label: "Link building", href: "/grow/link-building", icon: "link" },
    { label: "AI search (GEO)", href: "/grow/geo", icon: "search" },
    { label: "Content", href: "/grow/content-branding", icon: "pen" },
  ],
};

export const HUB_STATEMENTS: Record<"build" | "grow" | "scale", Statement> = {
  build: {
    label: "Build",
    heading: "Websites, software and apps, built to a performance standard,",
    muted: "not to a template.",
    intro: "The site, the application and the systems underneath, scoped, written and shipped by the person you speak to.",
    pills: [
      { label: "Website development", href: "/build/website-development", icon: "code" },
      { label: "Web design", href: "/build/web-design", icon: "layout" },
      { label: "Custom software", href: "/build/custom-software", icon: "app" },
      { label: "Mobile apps", href: "/build/mobile-apps", icon: "phone" },
      { label: "Systems and integrations", href: "/build/systems-integrations", icon: "plug" },
    ],
  },
  grow: {
    label: "Grow",
    heading: "More of the right people finding you, on Google and in",
    muted: "the answers AI gives.",
    intro: "Search visibility across Google and the AI engines that now answer before Google does, plus the content and ads that feed it.",
    pills: [
      { label: "Technical SEO", href: "/grow/technical-seo", icon: "code" },
      { label: "On-page SEO", href: "/grow/on-page-seo", icon: "page" },
      { label: "Programmatic SEO", href: "/grow/programmatic-seo", icon: "grid" },
      { label: "Link building", href: "/grow/link-building", icon: "link" },
      { label: "AI search (GEO)", href: "/grow/geo", icon: "search" },
      { label: "Content", href: "/grow/content-branding", icon: "pen" },
      { label: "Social media", href: "/grow/social-media", icon: "share" },
      { label: "Paid ads", href: "/grow/paid-ads", icon: "ad" },
    ],
  },
  scale: {
    label: "Scale",
    heading: "Automation and AI agents that let a business handle more",
    muted: "without hiring more.",
    intro: "The repetitive work moved into software that runs on its own, connected to the tools the business already uses.",
    pills: [
      { label: "AI automations", href: "/scale/ai-automations", icon: "bolt" },
      { label: "AI agents", href: "/scale/ai-agents", icon: "bot" },
      { label: "Analytics", href: "/scale/analytics", icon: "chart" },
      { label: `${INTEGRATIONS.length} integrations`, href: "/integrations", icon: "plug" },
      { label: "ManuelPOS", href: "/mpos", icon: "till" },
    ],
  },
};
