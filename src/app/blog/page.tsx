import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { PILLARS } from "@/lib/site";
import { BLOG_POSTS } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical notes on website development, technical SEO, programmatic SEO, GEO, AI agents, and automation.",
  alternates: { canonical: "/blog" },
};

const SERVICE_LINKS = PILLARS.flatMap((pillar) =>
  pillar.services.slice(0, 2).map((service) => ({
    name: service.name,
    href: service.href,
  })),
);

export default function BlogPage() {
  const visiblePosts = BLOG_POSTS;
  return (
    <main>
      <section className="border-b border-mt-border bg-white py-24 sm:py-32">
        <Container>
          <SectionLabel>Blog</SectionLabel>
          <h1 className="mt-6 max-w-[16ch]">Useful thinking for technical growth.</h1>
          <p className="mt-8 max-w-[60ch] text-lg leading-relaxed text-mt-slate">
            Practical notes on building, finding, and scaling digital products.
            We write about the decisions behind the work, not generic marketing advice.
          </p>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          {/* Original research sits above the article list. It is the only
              content here nobody else can produce, so it should not be buried
              in a grid with everything else. */}
          <Link
            href="/research/uk-accountancy-websites"
            className="mt-lift mt-spot group block rounded-[18px] border border-mt-purple bg-white p-7 transition-colors duration-150 sm:p-8"
          >
            <span className="mt-label">( Original research )</span>
            <h2 className="mt-5 max-w-[26ch] !text-2xl !tracking-tight group-hover:text-mt-purple sm:!text-3xl">
              We crawled 56 UK accountancy websites. 12 could not be read at all.
            </h2>
            <p className="mt-4 max-w-[65ch] leading-relaxed text-mt-slate">
              What we found about AI crawler access, structured data and speed,
              plus the bug the study exposed in our own audit tool.
            </p>
            <span className="mt-6 inline-flex text-sm font-semibold text-mt-purple">
              Read the study
            </span>
          </Link>

          <div className="mt-16">
          <SectionLabel>Topics</SectionLabel>
          <div className="mt-reveal-group mt-8 grid gap-5 md:grid-cols-3">
            {visiblePosts.map((post) => {
              return (
              <article key={post.title} className="border border-mt-border bg-white p-6">
                <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.13em] text-mt-purple">{post.cluster}</span>
                <h2 className="mt-4 !text-xl !tracking-tight"><Link href={`/blog/${post.slug}`} className="hover:text-mt-purple">{post.title}</Link></h2>
                <p className="mt-4 text-base leading-relaxed text-mt-slate">{post.description}</p>
                <div className="mt-6">
                  <Button href={`/blog/${post.slug}`} variant="secondary">Read the article</Button>
                </div>
              </article>
              );
            })}
          </div>
          <div className="mt-16 border-t border-mt-border pt-8">
            <SectionLabel>Start with a service</SectionLabel>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
              {SERVICE_LINKS.map((service) => (
                <Link key={service.href} href={service.href} className="text-sm font-semibold text-mt-slate transition-colors duration-150 hover:text-mt-purple">
                  {service.name}
                </Link>
              ))}
            </div>
          </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
