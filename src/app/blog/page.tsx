import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical notes on website development, technical SEO, programmatic SEO, GEO, AI agents, and automation.",
  alternates: { canonical: "/blog" },
};

const TOPICS = [
  {
    title: "Technical SEO",
    body: "How crawlability, rendering, Core Web Vitals, and site architecture affect the pages people need to find.",
    href: "/grow/technical-seo",
  },
  {
    title: "Programmatic SEO",
    body: "How to use real data and controlled publishing systems to create useful pages at scale without thin content.",
    href: "/grow/programmatic-seo",
  },
  {
    title: "AI agents and automation",
    body: "Practical thinking about models, tools, permissions, evaluation, and the workflows worth automating.",
    href: "/scale/ai-agents",
  },
] as const;

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
            {TOPICS.map((topic) => (
              <article key={topic.href} className="border border-mt-border bg-white p-6">
                <h2 className="!text-xl !tracking-tight">{topic.title}</h2>
                <p className="mt-4 text-base leading-relaxed text-mt-slate">{topic.body}</p>
                <div className="mt-6">
                  <Button href={topic.href} variant="secondary">Read the topic</Button>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
