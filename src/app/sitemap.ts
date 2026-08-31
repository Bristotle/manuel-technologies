import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { PUBLISHED_CASE_STUDIES } from "@/lib/case-studies";
import ROUTE_DATES from "@/lib/route-dates.json";
import { discoverStaticRoutes, priorityFor } from "@/lib/routes";
import { SERVICE_PAGES } from "@/lib/service-pages";
import { SITE } from "@/lib/site";

/* --------------------------------------------------------------------------
   Sitemap.

   ROUTES ARE DISCOVERED, DATES ARE NOT. Two rules that pull in opposite
   directions, both of which matter:

   1. A page that exists should be listed. Nobody should have to remember to
      add it here, because the one time they forget is the page that never
      gets indexed. So static routes are found by walking src/app.

   2. lastmod must be a real content date. This file used to stamp
      `new Date()` on 32 of 45 URLs, which resolved to the build time, so
      every deploy claimed those pages had changed when none had. Google
      ignores lastmod once a site proves it unreliable, and that is the
      strongest crawl scheduling signal a small site has.

   Discovery satisfies the first. src/lib/route-dates.json satisfies the
   second: dates are captured once by scripts/sync-route-dates.mjs, from the
   git history of the page file, and committed. `npm run routes:sync` picks up
   anything new. The build runs the same script in check mode, so a route with
   no recorded date fails loudly with its own name rather than quietly getting
   today's date.

   Data driven routes are not discovered, because they already carry something
   better: service pages, blog posts and case studies each hold their own
   modified date on the record itself.

   changeFrequency is absent on purpose. Google ignores it, and declaring
   "weekly" on a page that changes twice a year is another false signal for no
   gain.

   WHEN THIS GROWS. Above roughly 5,000 URLs, split into a sitemap index with
   one child per cluster using Next's `generateSitemaps`. Segmented sitemaps
   are the only practical way to see which cluster is indexing and which is
   not.
   -------------------------------------------------------------------------- */

type Entry = MetadataRoute.Sitemap[number];

const dates = ROUTE_DATES as Record<string, string>;

function entry(path: string, modified: string, priority: number): Entry {
  return {
    url: path === "/" ? SITE.url : `${SITE.url}${path}`,
    lastModified: new Date(modified),
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  /* Every page.tsx without a dynamic segment, found on disk. */
  const staticRoutes = discoverStaticRoutes().map((route) => {
    const modified = dates[route];
    if (!modified) {
      /* Only reachable if the dates file drifted from the filesystem, which
         the prebuild check exists to catch first. Failing here rather than
         defaulting is deliberate: a wrong date is worse than a failed build. */
      throw new Error(
        `sitemap: no recorded date for "${route}". Run \`npm run routes:sync\` and commit src/lib/route-dates.json.`,
      );
    }
    return entry(route, modified, priorityFor(route));
  });

  /* Data driven routes, dated from their own records. */
  const services = SERVICE_PAGES.map((s) =>
    entry(`/${s.pillar}/${s.slug}`, s.modified, 0.8),
  );

  const caseStudies = PUBLISHED_CASE_STUDIES.map((c) =>
    entry(`/work/${c.slug}`, c.modified, 0.8),
  );

  const blogPosts = BLOG_POSTS.map((post) =>
    entry(`/blog/${post.slug}`, post.modified, 0.7),
  );

  return [...staticRoutes, ...services, ...caseStudies, ...blogPosts];
}
