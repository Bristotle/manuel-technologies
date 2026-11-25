import { PILLARS, PROJECTS, SITE, CONTACT } from "@/lib/site";
import { TOOLS } from "@/lib/free-tools";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { MPOS } from "@/lib/mpos";

/* --------------------------------------------------------------------------
   /llms.txt, added 25 November 2026. The plain text summary that AI answer
   engines read to learn what a site is and which pages answer what.

   Generated from the same data as the nav, the work index and the blog, so
   it lists a new service, project or post the moment that exists and can
   never describe something the site does not. Static at build time.

   States only what is true and checkable: what we build, for whom, where,
   and the work that proves it. No prices beyond what /pricing publishes,
   no client counts, no rankings claimed.
   -------------------------------------------------------------------------- */

export const dynamic = "force-static";

const u = (path: string) => `${SITE.url}${path}`;

export function GET() {
  const services = PILLARS.map(
    (p) =>
      `### ${p.name}: ${p.promise}\n${p.services.map((s) => `- [${s.name}](${u(s.href)}): ${s.blurb}`).join("\n")}`,
  ).join("\n\n");

  const work = PROJECTS.map((p) => `- [${p.client}](${u(`/work/${p.slug}`)}): ${p.summary}`).join("\n");

  const posts = [...BLOG_POSTS]
    .sort((a, b) => b.modified.localeCompare(a.modified))
    .map((p) => `- [${p.title}](${u(`/blog/${p.slug}`)}): ${p.description}`)
    .join("\n");

  const body = `# ${SITE.name}

> ${SITE.name} is a software and digital services company in Accra, Ghana, working with clients in Ghana, the United Kingdom, the United States and the United Arab Emirates. It builds websites, web applications, mobile apps and integrations, grows them through technical SEO and generative engine optimisation (GEO), and automates the work behind them with AI automations and AI agents. Founded and led by Emmanuel Akyeam, an engineer. Tagline: ${SITE.tagline}

What it builds, in plain terms:
- Websites and online stores, including Mobile Money (MoMo) and card checkout for Ghanaian businesses
- Custom web applications, client portals, dashboards and internal tools
- Mobile apps and progressive web apps (PWAs)
- Integrations between CRMs, ERPs, payment gateways, WhatsApp and accounting systems
- Search visibility in Google and in AI answers (ChatGPT, Perplexity, Gemini, Google AI Overviews)
- Workflow automation and AI agents with human review, logging and limits

Its own products, built and run in house:
- MPOS (${MPOS.url}): ${MPOS.summary}
- Fold (https://www.getfold.org): church management web app and PWA for Ghanaian congregations, covering members, attendance and giving
- CWV Drift Monitor: a Chrome extension that tracks Core Web Vitals using the browser's PerformanceObserver API

Contact: ${SITE.email}, ${CONTACT.phone} (also WhatsApp), or ${u("/contact")}. Published prices: ${u("/pricing")}.

## Services

${services}

## Work

Engagements where ${SITE.name} was the vendor.

${work}

## Articles

${posts}

## Free tools

${TOOLS.map((t) => `- [${t.title}](${u(t.href)}): ${t.description}`).join("\n")}

## Other pages

- [Pricing](${u("/pricing")}): published price bands for websites, stores and custom builds in Ghana cedis
- [Free tools](${u("/free-tools")}): calculators and checkers that run in the browser, listed above
- [Research](${u("/research")}): benchmarks of Ghanaian business websites, measured by ${SITE.name}
- [About](${u("/about")}): who runs the company and how it works
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
