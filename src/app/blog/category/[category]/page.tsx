import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CATEGORIES, postsIn } from "@/lib/blog-categories";
import { SITE } from "@/lib/site";
import { ogCard } from "@/lib/og";

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const c = CATEGORIES.find((x) => x.slug === category);
  if (!c) return {};
  return {
    title: `${c.name}: articles`,
    description: c.description,
    alternates: { canonical: `/blog/category/${c.slug}` },
    openGraph: { title: `${c.name} | ${SITE.name}`, description: c.description, url: `${SITE.url}/blog/category/${c.slug}`, images: [ogCard(`${c.name}: ${postsIn(c).length} articles`, "Blog")] },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const c = CATEGORIES.find((x) => x.slug === category);
  if (!c) notFound();
  const posts = postsIn(c);
  const url = `${SITE.url}/blog/category/${c.slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `${c.name}: articles`,
      description: c.description,
      url,
      isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: posts.length,
        itemListElement: posts.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.title, url: `${SITE.url}/blog/${p.slug}` })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE.url}/blog` },
        { "@type": "ListItem", position: 3, name: c.name, item: url },
      ],
    },
  ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="border-b border-mt-border bg-white py-24 sm:py-32">
        <Container>
          <div className="flex flex-wrap items-center gap-3 text-sm text-mt-slate">
            <Link href="/" className="hover:text-mt-purple">Home</Link><span aria-hidden="true">/</span>
            <Link href="/blog" className="hover:text-mt-purple">Blog</Link><span aria-hidden="true">/</span>
            <span>{c.name}</span>
          </div>
          <SectionLabel className="mt-10">{posts.length} articles</SectionLabel>
          <h1 className="mt-6 max-w-[18ch]">{c.name}</h1>
          <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">{c.description}</p>
          {c.pillarHref ? (
            <div className="mt-8">
              <Button href={c.pillarHref}>{c.pillarHref === "/pricing" ? "See the price list" : "See the service"}</Button>
            </div>
          ) : null}
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <div className="mt-reveal-group grid gap-5 md:grid-cols-2">
            {posts.map((post) => (
              <article key={post.slug} className="mt-lift flex flex-col rounded-[18px] border border-mt-border bg-white p-6 transition-colors duration-150 hover:border-mt-purple-light">
                <h2 className="!text-xl !tracking-tight"><Link href={`/blog/${post.slug}`} className="hover:text-mt-purple">{post.title}</Link></h2>
                <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-mt-slate">{post.description}</p>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <span className="text-sm text-mt-muted">{post.readTime}</span>
                  <Link href={`/blog/${post.slug}`} className="text-sm font-semibold text-mt-purple hover:underline">Read the article</Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 border-t border-mt-border pt-8">
            <SectionLabel>Other categories</SectionLabel>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
              {CATEGORIES.filter((x) => x.slug !== c.slug).map((x) => (
                <Link key={x.slug} href={`/blog/category/${x.slug}`} className="text-sm font-semibold text-mt-slate transition-colors duration-150 hover:text-mt-purple">{x.name}</Link>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
