import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { BLOG_POSTS, getBlogPost } from "@/lib/blog-posts";
import { SITE } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `${SITE.url}/blog/${post.slug}`,
      publishedTime: post.published,
      modifiedTime: post.modified,
      authors: [`${SITE.url}/about`],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  const postUrl = `${SITE.url}/blog/${post.slug}`;
  const sectionId = (heading: string) => heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.published,
      dateModified: post.modified,
      inLanguage: "en-GB",
      mainEntityOfPage: postUrl,
      author: { "@type": "Person", name: "Emmanuel Akyeam", url: `${SITE.url}/about`, jobTitle: "Technical SEO Manager and Engineer" },
      publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
      articleSection: post.cluster,
      keywords: post.cluster,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE.url}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="border-b border-mt-border bg-white py-24 sm:py-32">
        <Container>
          <div className="flex flex-wrap items-center gap-3 text-sm text-mt-slate">
            <Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/blog">Blog</Link><span aria-hidden="true">/</span><span>{post.cluster}</span>
          </div>
          <div className="mt-12 max-w-[760px]">
            <SectionLabel>{post.cluster}</SectionLabel>
            <h1 className="mt-6">{post.title}</h1>
            <p className="mt-8 max-w-[65ch] text-xl leading-relaxed text-mt-slate">{post.lead}</p>
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-mt-muted"><span>By <Link href="/about" className="text-mt-slate hover:text-mt-purple">Emmanuel Akyeam</Link></span><span aria-hidden="true">/</span><time dateTime={post.modified}>Updated {post.modified}</time><span aria-hidden="true">/</span><span>{post.readTime}</span></div>
            <div className="mt-10 border-t border-mt-border pt-8">
              <SectionLabel>Search brief</SectionLabel>
              <dl className="mt-6 grid gap-4 text-base sm:grid-cols-2">
                <div><dt className="font-semibold text-mt-ink">Primary query</dt><dd className="mt-1 text-mt-slate">{post.primaryKeyword}</dd></div>
                <div><dt className="font-semibold text-mt-ink">Intent</dt><dd className="mt-1 text-mt-slate">{post.searchIntent}</dd></div>
              </dl>
              <p className="mt-6 text-sm text-mt-slate"><span className="font-semibold text-mt-ink">Related queries:</span> {post.secondaryKeywords?.join(", ")}</p>
            </div>
          </div>
        </Container>
      </section>
      <article className="py-24 sm:py-32"><Container><div className="grid gap-16 lg:grid-cols-[220px_minmax(0,680px)] lg:items-start">
        <aside className="lg:sticky lg:top-8">
          <details className="border-y border-mt-border py-4 lg:hidden"><summary className="cursor-pointer font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.18em] text-mt-purple">Jump to a section</summary><nav className="mt-4 flex flex-col gap-3">{post.sections.map((item) => <a key={item.heading} href={`#${sectionId(item.heading)}`} className="text-sm text-mt-slate hover:text-mt-purple">{item.heading}</a>)}<a href="#final-thoughts" className="text-sm text-mt-slate hover:text-mt-purple">Final thoughts</a><a href="#faqs" className="text-sm text-mt-slate hover:text-mt-purple">FAQs</a></nav></details>
          <nav className="hidden border-l border-mt-border pl-6 lg:block"><p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.18em] text-mt-purple">On this page</p><div className="mt-6 flex flex-col gap-4">{post.sections.map((item) => <a key={item.heading} href={`#${sectionId(item.heading)}`} className="text-sm leading-snug text-mt-slate hover:text-mt-purple">{item.heading}</a>)}<a href="#final-thoughts" className="text-sm leading-snug text-mt-slate hover:text-mt-purple">Final thoughts</a><a href="#faqs" className="text-sm leading-snug text-mt-slate hover:text-mt-purple">FAQs</a></div></nav>
        </aside>
        <div>
          <div className="border-l-4 border-mt-purple bg-white p-6"><SectionLabel>Quick answer</SectionLabel><p className="mt-4 text-lg leading-relaxed">{post.lead}</p></div>
          <div className="mt-16">{post.sections.map((item) => <section id={sectionId(item.heading)} key={item.heading} className="mb-16 scroll-mt-8"><h2 className="!text-3xl">{item.heading}</h2>{item.paragraphs.map((paragraph) => <p key={paragraph} className="mt-6 text-lg leading-relaxed text-mt-slate">{paragraph}</p>)}</section>)}</div>
          <section id="final-thoughts" className="scroll-mt-8 border-y border-mt-border py-12"><SectionLabel>Final thoughts</SectionLabel><p className="mt-6 text-xl leading-relaxed">{post.conclusion}</p></section>
          <section id="faqs" className="mt-16 scroll-mt-8"><SectionLabel>Frequently asked questions</SectionLabel><div className="mt-8 flex flex-col gap-8">{post.faqs.map((item) => <div key={item.question} className="border-t border-mt-border pt-6"><h2 className="!text-2xl">{item.question}</h2><p className="mt-4 text-lg leading-relaxed text-mt-slate">{item.answer}</p></div>)}</div></section>
          <section className="mt-16 border-t border-mt-border pt-8"><SectionLabel>Publish checklist</SectionLabel><ul className="mt-6 grid gap-4 sm:grid-cols-2">{post.checklist?.map((item) => <li key={item} className="border-b border-mt-border pb-4 text-base text-mt-slate">{item}</li>)}</ul></section>
          <section className="mt-16 border-t border-mt-border pt-8"><SectionLabel>Sources</SectionLabel><ul className="mt-6 flex flex-col gap-4">{post.sources.map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noopener noreferrer" className="text-mt-slate underline decoration-mt-border underline-offset-4 hover:text-mt-purple">{source.label}</a></li>)}</ul></section>
          <section className="mt-16 border-y border-mt-border bg-white px-6 py-12 sm:px-10"><SectionLabel>Next step</SectionLabel><h2 className="mt-6 !text-3xl">Turn the research into a working plan.</h2><p className="mt-6 max-w-[55ch] text-lg leading-relaxed text-mt-slate">Bring the evidence, constraints, and next decision. We will help you turn it into a clear technical brief.</p><div className="mt-8 flex flex-wrap gap-4"><Button href={post.serviceHref}>Explore the related service</Button><Button href="/contact" variant="secondary">Start a conversation</Button></div></section>
        </div>
      </div></Container></article>
    </main>
  );
}
