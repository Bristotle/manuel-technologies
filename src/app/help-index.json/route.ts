import { BLOG_POSTS } from "@/lib/blog-posts";
import { TOOLS } from "@/lib/free-tools";
import { TERMS } from "@/lib/glossary";
import { SERVICE_PAGES } from "@/lib/service-pages";

/* --------------------------------------------------------------------------
   Search index for the help panel, served as a static file at build time.

   The panel fetches this the first time someone opens it, so no page carries
   the index in its HTML. Everything here already exists as a page; the
   index only lets a visitor find it by typing.

   Shape is kept short on purpose: t title, h href, k kind, d one line used
   for matching and shown under the title.
   -------------------------------------------------------------------------- */

export const dynamic = "force-static";

type Entry = { t: string; h: string; k: string; d: string };

const PAGES: Entry[] = [
  { t: "Website prices", h: "/pricing", k: "Page", d: "Four website tiers and care plans, with what each includes." },
  { t: "Contact", h: "/contact", k: "Page", d: "Start a project, call or WhatsApp. A reply within one business day." },
  { t: "Our work", h: "/work", k: "Page", d: "Live client sites and case studies." },
  { t: "About", h: "/about", k: "Page", d: "Who builds the work, and how." },
  { t: "Agency or engineer", h: "/agency-vs-engineer", k: "Page", d: "Which one you need, and how to tell." },
  { t: "Free tools", h: "/free-tools", k: "Page", d: "Thirteen free tools. No account, no email gate." },
  { t: "Research", h: "/research", k: "Page", d: "Original benchmarks of business websites." },
  { t: "Integrations", h: "/integrations", k: "Page", d: "The tools and systems we connect to." },
  { t: "Glossary", h: "/glossary", k: "Page", d: "Plain definitions of web, SEO and AI terms." },
  { t: "Guides", h: "/blog", k: "Page", d: "Every article, by topic." },
  { t: "Build", h: "/build", k: "Pillar", d: "Websites, design, custom software, mobile apps, integrations." },
  { t: "Grow", h: "/grow", k: "Pillar", d: "Technical SEO, programmatic SEO, GEO, content and ads." },
  { t: "Scale", h: "/scale", k: "Pillar", d: "AI automations, AI agents and analytics." },
];

export function GET() {
  const entries: Entry[] = [
    ...PAGES,
    ...SERVICE_PAGES.map((s) => ({ t: s.name, h: `/${s.pillar}/${s.slug}`, k: "Service", d: s.description })),
    ...TOOLS.map((t) => ({ t: t.title, h: t.href, k: "Free tool", d: t.description })),
    ...BLOG_POSTS.map((p) => ({ t: p.title, h: `/blog/${p.slug}`, k: "Guide", d: p.description })),
    ...TERMS.map((t) => ({ t: t.term, h: `/glossary/${t.slug}`, k: "Glossary", d: t.short })),
  ];
  return Response.json(entries, {
    headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
  });
}
