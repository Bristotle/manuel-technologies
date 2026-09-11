import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { BLOG_POSTS, getBlogPost } from "@/lib/blog-posts";
import { renderInline } from "@/components/blog/Inline";
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
      ...(post.heroImage ? { images: [{ url: `${SITE.url}${post.heroImage.src}`, width: post.heroImage.width, height: post.heroImage.height, alt: post.heroImage.alt }] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  const postUrl = `${SITE.url}/blog/${post.slug}`;
  const sectionId = (heading: string) => heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  /* Same cluster first, then everything else. Before this it was the first
     four entries of the array for every post, which sent 13 inbound links
     to four posts and one to each of the other eight. A cluster only works
     if its posts point at each other. */
  const others = BLOG_POSTS.filter((item) => item.slug !== post.slug);
  const recentPosts = [
    ...others.filter((item) => item.cluster === post.cluster),
    ...others.filter((item) => item.cluster !== post.cluster),
  ].slice(0, 4);
  const categories = [...new Set(BLOG_POSTS.map((item) => item.cluster))];
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
      ...(post.heroImage ? { image: `${SITE.url}${post.heroImage.src}` } : {}),
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
      {/* Reading progress. mt-scroll-progress is scroll driven CSS, so this
          rail costs no JavaScript and no scroll listener. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 bg-transparent"
      >
        <div className="mt-scroll-progress h-full w-full bg-mt-purple" />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative overflow-hidden border-b border-mt-border bg-white py-24 sm:py-32">
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
      <article className="py-24 sm:py-32"><Container><div className="grid gap-16 lg:grid-cols-[minmax(0,680px)_280px] lg:items-start">
        <div>
          <div className="border-l-4 border-mt-purple bg-white p-6"><SectionLabel>Quick answer</SectionLabel><p className="mt-4 text-lg leading-relaxed">{renderInline(post.lead)}</p></div>
          {/* Real work, above the fold of the body. CLAUDE.md section 4:
              every page carries visual evidence. Also the schema image. */}
          {post.heroImage ? (
            <figure className="mt-10">
              <Link href={post.heroImage.href ?? "/work"} className="block overflow-hidden rounded-[18px] border border-mt-border bg-mt-surface">
                <Image src={post.heroImage.src} alt={post.heroImage.alt} width={post.heroImage.width} height={post.heroImage.height} sizes="(min-width: 1024px) 680px, 100vw" priority className="h-auto w-full" />
              </Link>
              <figcaption className="mt-3 text-sm leading-relaxed text-mt-muted">{renderInline(post.heroImage.caption)}</figcaption>
            </figure>
          ) : null}
          <div className="mt-reveal-group mt-16">{post.sections.map((item) => (
            <section id={sectionId(item.heading)} key={item.heading} className="mb-16 scroll-mt-8">
              <h2 className="!text-3xl">{item.heading}</h2>
              {item.paragraphs.map((paragraph) => <p key={paragraph} className="mt-6 text-lg leading-relaxed text-mt-slate">{renderInline(paragraph)}</p>)}
              {item.bullets ? (
                <ul className="mt-6 flex flex-col gap-3">
                  {item.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-lg leading-relaxed text-mt-slate">
                      <span aria-hidden="true" className="mt-[0.75em] h-1.5 w-1.5 shrink-0 rounded-full bg-mt-purple" />
                      <span>{renderInline(b)}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              {item.table ? (
                <div className="mt-8 overflow-x-auto rounded-[18px] border border-mt-border bg-white">
                  <table className="w-full min-w-[520px] text-left text-sm">
                    <caption className="px-5 pt-4 text-left font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.14em] text-mt-muted">{item.table.caption}</caption>
                    <thead><tr className="border-b border-mt-border">{item.table.headers.map((h) => <th key={h} className="px-5 py-3 font-[family-name:var(--font-mono)] text-[0.625rem] font-bold uppercase tracking-[0.14em] text-mt-muted">{h}</th>)}</tr></thead>
                    <tbody className="divide-y divide-mt-border">{item.table.rows.map((row) => <tr key={row.join("|")}>{row.map((cell, i) => <td key={i} className={`px-5 py-3.5 align-top leading-relaxed ${i === 0 ? "font-semibold text-mt-ink" : "text-mt-slate"}`}>{renderInline(cell)}</td>)}</tr>)}</tbody>
                  </table>
                </div>
              ) : null}
              {item.image ? (
                <figure className="mt-8">
                  {item.image.href ? (
                    <Link href={item.image.href} className="block overflow-hidden rounded-[18px] border border-mt-border bg-mt-surface">
                      <Image src={item.image.src} alt={item.image.alt} width={item.image.width} height={item.image.height} sizes="(min-width: 1024px) 680px, 100vw" className="h-auto w-full" />
                    </Link>
                  ) : (
                    <div className="overflow-hidden rounded-[18px] border border-mt-border bg-mt-surface">
                      <Image src={item.image.src} alt={item.image.alt} width={item.image.width} height={item.image.height} sizes="(min-width: 1024px) 680px, 100vw" className="h-auto w-full" />
                    </div>
                  )}
                  <figcaption className="mt-3 text-sm leading-relaxed text-mt-muted">{renderInline(item.image.caption)}</figcaption>
                </figure>
              ) : null}
            </section>
          ))}</div>
          <section id="final-thoughts" className="scroll-mt-8 py-4"><SectionLabel>Final thoughts</SectionLabel><p className="mt-6 text-xl leading-relaxed">{renderInline(post.conclusion)}</p></section>
          <section id="faqs" className="mt-16 scroll-mt-8"><SectionLabel>Frequently asked questions</SectionLabel><div className="mt-reveal-group mt-8 flex flex-col gap-8">{post.faqs.map((item) => <div key={item.question} className="pt-2"><h2 className="!text-2xl">{item.question}</h2><p className="mt-4 text-lg leading-relaxed text-mt-slate">{renderInline(item.answer)}</p></div>)}</div></section>
          <section className="mt-16 pt-8"><SectionLabel>Sources</SectionLabel><ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">{post.sources.map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noopener noreferrer" className="text-sm text-mt-slate underline decoration-mt-border underline-offset-4 hover:text-mt-purple">{source.label}</a></li>)}</ul></section>
          <section className="mt-16 border-y border-mt-border bg-white px-6 py-12 sm:px-10"><SectionLabel>Next step</SectionLabel><h2 className="mt-6 !text-3xl">Turn the research into a working plan.</h2><p className="mt-6 max-w-[55ch] text-lg leading-relaxed text-mt-slate">Bring the evidence, constraints, and next decision. We will help you turn it into a clear technical brief.</p><div className="mt-8 flex flex-wrap gap-4"><Button href={post.serviceHref}>Explore the related service</Button><Button href="/contact" variant="secondary">Start a conversation</Button></div></section>
        </div>
        <aside className="lg:sticky lg:top-8">
          <details className="border-y border-mt-border py-4 lg:hidden"><summary className="cursor-pointer font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.18em] text-mt-purple">Jump to a section</summary><nav className="mt-4 flex flex-col gap-3">{post.sections.map((item) => <a key={item.heading} href={`#${sectionId(item.heading)}`} className="text-sm text-mt-slate hover:text-mt-purple">{item.heading}</a>)}<a href="#final-thoughts" className="text-sm text-mt-slate hover:text-mt-purple">Final thoughts</a><a href="#faqs" className="text-sm text-mt-slate hover:text-mt-purple">FAQs</a></nav></details>
          <div className="hidden lg:block border-l border-mt-border pl-6"><p className="mt-label">On this page</p><nav className="mt-6 flex flex-col gap-4">{post.sections.map((item) => <a key={item.heading} href={`#${sectionId(item.heading)}`} className="text-sm leading-snug text-mt-slate hover:text-mt-purple">{item.heading}</a>)}<a href="#final-thoughts" className="text-sm leading-snug text-mt-slate hover:text-mt-purple">Final thoughts</a><a href="#faqs" className="text-sm leading-snug text-mt-slate hover:text-mt-purple">FAQs</a></nav></div>
          <div className="mt-12 border border-mt-border bg-white p-6"><SectionLabel>Have a brief?</SectionLabel><p className="mt-4 text-lg leading-relaxed">Tell us what you are building and get a direct reply from the person doing the work.</p><div className="mt-6"><Button href="/contact">Contact us</Button></div></div>
          <form action="/blog" method="get" className="mt-12"><label className="mt-label" htmlFor="blog-search">Search the blog</label><div className="mt-3 flex"><input id="blog-search" name="q" type="search" placeholder="Search topics" className="contact-input min-w-0 flex-1 rounded-r-none" /><button type="submit" className="rounded-r-[10px] bg-mt-purple px-4 text-sm font-semibold text-white hover:bg-mt-purple-light">Search</button></div></form>
          <div className="mt-12"><p className="mt-label">Recent posts</p><ul className="mt-5 flex flex-col gap-4">{recentPosts.map((item) => <li key={item.slug}><Link href={`/blog/${item.slug}`} className="text-sm leading-snug text-mt-slate hover:text-mt-purple">{item.title}</Link></li>)}</ul></div>
          <div className="mt-12"><p className="mt-label">Categories</p><ul className="mt-5 flex flex-col gap-3">{categories.map((category) => <li key={category}><Link href={`/blog?category=${encodeURIComponent(category)}`} className="text-sm text-mt-slate hover:text-mt-purple">{category}</Link></li>)}</ul></div>
        </aside>
      </div></Container></article>
    </main>
  );
}
