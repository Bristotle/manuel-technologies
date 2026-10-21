import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { BlogPost } from "@/lib/blog-posts";

/* Guides linked from a service page or pillar hub. This is what makes the
   service page the pillar of its topic cluster: it links down to every
   article written for it, and each article already links back up through
   its serviceHref. Server rendered, no JavaScript. */
export function RelatedArticles({ posts, heading, intro }: { posts: BlogPost[]; heading: string; intro: string }) {
  if (!posts.length) return null;
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <SectionLabel>Guides</SectionLabel>
        <h2 className="mt-6 max-w-[24ch]">{heading}</h2>
        <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-mt-slate">{intro}</p>
        <ul className={`mt-reveal-group mt-12 grid gap-6 ${posts.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-[18px] border border-mt-border bg-white p-6 transition-colors duration-150 hover:border-mt-purple active:bg-mt-surface"
              >
                <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-mt-muted">
                  {post.cluster} · {post.readTime}
                </span>
                <span className="mt-4 text-lg font-semibold leading-snug text-mt-ink group-hover:text-mt-purple">{post.title}</span>
                <span className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-mt-slate">{post.description}</span>
                <span className="mt-6 text-sm font-semibold text-mt-purple">Read the guide</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-mt-slate">
          <Link href="/blog" className="font-semibold text-mt-purple underline decoration-mt-purple/30 underline-offset-4 hover:decoration-mt-purple">
            Every guide, by topic
          </Link>
        </p>
      </Container>
    </section>
  );
}
