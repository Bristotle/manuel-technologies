import { BLOG_POSTS } from "@/lib/blog-posts";

/* Category hubs at /blog/category/[slug].

   These replace the /blog?category= links that used to sit in every post's
   sidebar. The blog index stopped reading searchParams so it could be static,
   which left 56 links across the site rendering the same unfiltered page. A
   real static route per category is both the fix and an asset: each hub is
   an indexable page with a distinct title, a description, and a link to
   every post in the cluster, which is exactly the shape a topic cluster
   needs to pass authority from posts up to a hub and across siblings. */

export type Category = { slug: string; name: string; description: string; pillarHref?: string };

export const CATEGORIES: Category[] = [
  {
    slug: "website-cost-in-ghana",
    name: "Website cost in Ghana",
    description: "What websites cost in Ghana in 2026, what moves the price, how to compare firms, and the technical questions nobody else answers.",
    pillarHref: "/pricing",
  },
  {
    slug: "search-and-geo",
    name: "Search and GEO",
    description: "Technical SEO, programmatic SEO, and visibility in AI answers. How pages get found, ranked and cited.",
    pillarHref: "/grow",
  },
  {
    slug: "web-and-software",
    name: "Web and software",
    description: "Building websites and custom software that hold up: security, accessibility, integrations, and when to build rather than buy.",
    pillarHref: "/build",
  },
  {
    slug: "ai-and-automation",
    name: "AI and automation",
    description: "AI agents and workflow automation with clear boundaries, measurement, and human control.",
    pillarHref: "/scale",
  },
  {
    slug: "proof-and-planning",
    name: "Proof and planning",
    description: "Choosing partners, writing briefs, and measuring whether the work is working.",
  },
];

export function categoryFor(clusterName: string): Category | undefined {
  return CATEGORIES.find((c) => c.name === clusterName);
}

export function postsIn(category: Category) {
  return BLOG_POSTS.filter((p) => p.cluster === category.name);
}
