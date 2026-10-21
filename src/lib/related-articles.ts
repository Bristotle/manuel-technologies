import { BLOG_POSTS, type BlogPost } from "@/lib/blog-posts";

/* --------------------------------------------------------------------------
   The link from a pillar to its cluster. Every post already names the
   service it supports in serviceHref, so the mapping is read from the posts,
   never kept as a second list that could drift. A new post appears on its
   service page and its pillar hub the moment it is published.

   Service page: posts written for that service first, topped up with posts
   for other services in the same pillar, newest first, up to three.
   Pillar hub: every post for any service in the pillar, newest first.
   -------------------------------------------------------------------------- */

const newest = (a: BlogPost, b: BlogPost) => b.modified.localeCompare(a.modified);

export function articlesForService(pillar: string, slug: string, limit = 3): BlogPost[] {
  const href = `/${pillar}/${slug}`;
  const own = BLOG_POSTS.filter((p) => p.serviceHref === href).sort(newest);
  const pillarPosts = BLOG_POSTS.filter((p) => p.serviceHref.startsWith(`/${pillar}/`) && p.serviceHref !== href).sort(newest);
  return [...own, ...pillarPosts].slice(0, limit);
}

export function articlesForPillar(pillar: string, limit = 6): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.serviceHref.startsWith(`/${pillar}/`)).sort(newest).slice(0, limit);
}
