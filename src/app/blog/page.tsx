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

const TOPICS = [
  {
    cluster: "Search and GEO",
    title: "How to optimise a UK website for Google AI Overviews",
    body: "What Google's guidance means for technical SEO, useful content, and sources that answer systems can retrieve.",
    href: "/grow/geo",
  },
  {
    cluster: "Search and GEO",
    title: "Technical foundations for GEO: crawlability, schema, and AI access",
    body: "A practical look at the supported technical work behind visibility in conventional and generative search.",
    href: "/grow/technical-seo",
  },
  {
    cluster: "Search and GEO",
    title: "How to run a technical SEO and AI search audit",
    body: "A buyer's guide to finding crawl, indexation, rendering, entity, and source quality issues before investing.",
    href: "/grow/technical-seo",
  },
  {
    cluster: "Search and GEO",
    title: "Programmatic SEO that does not create thin content",
    body: "How data quality, page rules, unique evidence, and publishing controls make scaled pages useful.",
    href: "/grow/programmatic-seo",
  },
  {
    cluster: "Web and software",
    title: "What a secure, accessible website build should include",
    body: "A practical checklist for mobile experience, accessibility, content structure, security, and maintainable delivery.",
    href: "/build/website-development",
  },
  {
    cluster: "Web and software",
    title: "When should a business build custom software?",
    body: "How to compare configuration, integration, and a focused application when existing tools create repeated work.",
    href: "/build/custom-software",
  },
  {
    cluster: "Web and software",
    title: "How to connect CRM, ERP, and internal systems safely",
    body: "The identifiers, permissions, validation, retries, and reconciliation an integration needs in production.",
    href: "/build/systems-integrations",
  },
  {
    cluster: "AI and automation",
    title: "Should your business use an AI agent or a fixed automation?",
    body: "A decision framework for choosing the simplest reliable pattern for a real operational workflow.",
    href: "/scale/ai-agents",
  },
  {
    cluster: "AI and automation",
    title: "How to introduce AI automation without losing control",
    body: "Where to use permissions, validation, human review, evaluation, monitoring, and escalation.",
    href: "/scale/ai-automations",
  },
  {
    cluster: "AI and automation",
    title: "What does a production-ready AI agent need?",
    body: "The practical architecture behind tool use, retrieval, structured outputs, cost controls, and safe rollout.",
    href: "/scale/ai-agents",
  },
  {
    cluster: "AI and automation",
    title: "How to measure whether AI automation is working",
    body: "Measure quality, exceptions, review effort, cost, time saved, and the downstream result instead of demo quality.",
    href: "/scale/analytics",
  },
  {
    cluster: "Proof and planning",
    title: "How to choose a technical SEO and development partner",
    body: "The questions that reveal who owns the work, how delivery is governed, and whether the evidence is real.",
    href: "/about",
  },
] as const;

const SERVICE_LINKS = PILLARS.flatMap((pillar) =>
  pillar.services.slice(0, 2).map((service) => ({
    name: service.name,
    href: service.href,
  })),
);

export default function BlogPage() {
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
          <SectionLabel>Topics</SectionLabel>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {TOPICS.map((topic, index) => {
              const post = BLOG_POSTS[index];
              return (
              <article key={topic.title} className="border border-mt-border bg-white p-6">
                <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.13em] text-mt-purple">{topic.cluster}</span>
                <h2 className="mt-4 !text-xl !tracking-tight"><Link href={`/blog/${post.slug}`} className="hover:text-mt-purple">{topic.title}</Link></h2>
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
        </Container>
      </section>
    </main>
  );
}
