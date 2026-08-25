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
          </div>
        </Container>
      </section>
      <article className="py-24 sm:py-32"><Container><div className="mx-auto max-w-[680px]">
        {post.sections.map((item) => <section key={item.heading} className="mb-16"><h2 className="!text-3xl">{item.heading}</h2>{item.paragraphs.map((paragraph) => <p key={paragraph} className="mt-6 text-lg leading-relaxed text-mt-slate">{paragraph}</p>)}</section>)}
        <section className="border-y border-mt-border py-12"><SectionLabel>Final thoughts</SectionLabel><p className="mt-6 text-xl leading-relaxed">{post.conclusion}</p></section>
        <section className="mt-16"><SectionLabel>Frequently asked questions</SectionLabel><div className="mt-8 flex flex-col gap-8">{post.faqs.map((item) => <div key={item.question} className="border-t border-mt-border pt-6"><h2 className="!text-2xl">{item.question}</h2><p className="mt-4 text-lg leading-relaxed text-mt-slate">{item.answer}</p></div>)}</div></section>
        <section className="mt-16 border-t border-mt-border pt-8"><SectionLabel>Sources</SectionLabel><ul className="mt-6 flex flex-col gap-4">{post.sources.map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noopener noreferrer" className="text-mt-slate underline decoration-mt-border underline-offset-4 hover:text-mt-purple">{source.label}</a></li>)}</ul></section>
        <div className="mt-16 flex flex-wrap gap-4"><Button href={post.serviceHref}>Explore the related service</Button><Button href="/blog" variant="secondary">Back to the blog</Button></div>
      </div></Container></article>
    </main>
  );
}
