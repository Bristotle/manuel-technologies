import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { PUBLISHED_CASE_STUDIES } from "@/lib/case-studies";
import { SERVICE_PAGES } from "@/lib/service-pages";
import { PAGE_MODIFIED, PILLARS, SITE } from "@/lib/site";

/* --------------------------------------------------------------------------
   Sitemap.

   EVERY lastmod HERE IS A REAL CONTENT DATE. This file used to stamp
   `new Date()` on 32 of 45 URLs, which resolved to the build time, so every
   deploy told Google that 32 pages had changed when none of them had.

   Google ignores lastmod once a site proves it unreliable, and that is the
   strongest crawl scheduling signal a small site has. It matters more the
   larger the site gets: at programmatic scale, lastmod is how you tell Google
   which of several thousand URLs is worth recrawling. Spending it on noise is
   expensive.

   So: no `new Date()` in this file, ever. Dates come from the content records
   themselves. See PAGE_MODIFIED in site.ts for the standalone routes.

   changeFrequency is deliberately absent. Google ignores it, and declaring
   "weekly" on a page that changes twice a year is another false signal for
   no gain. priority is kept because Bing gives it slight weight, and it costs
   nothing to be honest about relative importance.

   WHEN THIS GROWS. Above roughly 5,000 URLs, split into a sitemap index with
   one child per cluster using Next's `generateSitemaps`. Segmented sitemaps
   are the only practical way to see which cluster is indexing and which is
   not. One flat file gives you a single coverage number and no diagnosis.
   -------------------------------------------------------------------------- */

type Entry = MetadataRoute.Sitemap[number];

function entry(path: string, modified: string, priority: number): Entry {
  return {
    url: path === "/" ? SITE.url : `${SITE.url}${path}`,
    lastModified: new Date(modified),
    priority,
  };
}

/* A standalone route, dated from PAGE_MODIFIED. Throws at build time if the
   date is missing, so a new page can never quietly ship with no lastmod. */
function page(path: string, priority: number): Entry {
  const modified = PAGE_MODIFIED[path];
  if (!modified) {
    throw new Error(
      `sitemap: no PAGE_MODIFIED date for "${path}". Add one in src/lib/site.ts.`,
    );
  }
  return entry(path, modified, priority);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pillars = PILLARS.map((p) => entry(`/${p.slug}`, p.modified, 0.9));

  const services = SERVICE_PAGES.map((s) =>
    entry(`/${s.pillar}/${s.slug}`, s.modified, 0.8),
  );

  const caseStudies = PUBLISHED_CASE_STUDIES.map((c) =>
    entry(`/work/${c.slug}`, c.modified, 0.8),
  );

  const blogPosts = BLOG_POSTS.map((post) =>
    entry(`/blog/${post.slug}`, post.modified, 0.7),
  );

  return [
    page("/", 1),
    ...pillars,
    ...services,
    page("/work", 0.8),
    ...caseStudies,
    page("/integrations", 0.8),
    page("/contact", 0.8),
    page("/about", 0.7),
    page("/free-tools", 0.7),
    page("/free-tools/seo-audit", 0.7),
    page("/free-tools/geo-content-brief", 0.7),
    page("/free-tools/ai-agent-readiness", 0.7),
    page("/blog", 0.6),
    ...blogPosts,
    page("/privacy-policy", 0.3),
    page("/terms-of-service", 0.3),
    page("/cwv-drift-monitor/privacy-policy", 0.3),
  ];
}
