import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  getCaseStudy,
  PUBLISHED_CASE_STUDIES,
  SCOPE_TO_SERVICE,
} from "@/lib/case-studies";
import { PROJECTS, SITE } from "@/lib/site";

/* Case study. Server component, no client JavaScript.

   Why this route exists. /work previously sent every project link straight
   out to the client site: five external links, two internal ones. The index
   donated all of its authority outward and kept none, and the six named
   engagements had no indexable page of their own. Every card now lands here
   first, and the external link moves into the body where it belongs as
   evidence rather than as the only destination. */

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PUBLISHED_CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

/* An unpublished or unknown slug 404s rather than rendering a thin page. */
export const dynamicParams = false;

function getProject(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  const project = getProject(slug);
  if (!study || !project) return {};

  return {
    title: `${project.client}: ${study.title}`,
    description: study.description,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: {
      title: `${project.client} | ${SITE.name}`,
      description: study.description,
      url: `${SITE.url}/work/${study.slug}`,
      images: project.thumb ? [{ url: project.thumb }] : undefined,
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  const project = getProject(slug);
  if (!study || !project) notFound();

  const pageUrl = `${SITE.url}/work/${study.slug}`;

  /* Other published studies, for the rail at the foot of the page. */
  const others = PUBLISHED_CASE_STUDIES.filter(
    (other) => other.slug !== study.slug,
  )
    .map((other) => ({ study: other, project: getProject(other.slug) }))
    .filter((entry) => entry.project !== undefined)
    .slice(0, 3);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: study.title,
      description: study.description,
      url: pageUrl,
      dateModified: study.modified,
      about: {
        "@type": "Organization",
        name: project.client,
        url: project.url,
      },
      author: {
        "@type": "Organization",
        name: SITE.name,
        url: SITE.url,
      },
      publisher: {
        "@type": "Organization",
        name: SITE.name,
        url: SITE.url,
      },
      ...(project.thumb ? { image: `${SITE.url}${project.thumb}` } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Work", item: `${SITE.url}/work` },
        { "@type": "ListItem", position: 3, name: project.client, item: pageUrl },
      ],
    },
  ];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="border-b border-mt-border bg-white py-24 sm:py-32">
        <Container>
          <div className="flex flex-wrap items-center gap-3 text-sm text-mt-slate">
            <Link href="/" className="hover:text-mt-purple">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/work" className="hover:text-mt-purple">
              Work
            </Link>
            <span aria-hidden="true">/</span>
            <span>{project.client}</span>
          </div>

          <div className="mt-12 max-w-[760px]">
            <SectionLabel>{project.sector}</SectionLabel>
            <h1 className="mt-6">{study.title}</h1>
            <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">
              {study.lead}
            </p>
          </div>

          <dl className="mt-14 grid gap-8 border-t border-mt-border pt-8 sm:grid-cols-3">
            <div>
              <dt className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.18em] text-mt-muted">
                Client
              </dt>
              <dd className="mt-2 text-lg font-semibold text-mt-ink">
                {project.client}
              </dd>
            </div>
            <div>
              <dt className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.18em] text-mt-muted">
                Market
              </dt>
              <dd className="mt-2 text-lg font-semibold text-mt-ink">
                {project.market}
              </dd>
            </div>
            {project.metric && (
              <div>
                <dt className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.18em] text-mt-muted">
                  Shipped
                </dt>
                <dd className="mt-2 text-lg font-semibold text-mt-purple">
                  {project.metric}
                </dd>
              </div>
            )}
          </dl>
        </Container>
      </section>

      {/* Screenshot. Visual evidence above the fold on any tall viewport. */}
      {project.thumb && (
        <section className="py-16 sm:py-24">
          <Container>
            <div className="overflow-hidden rounded-[18px] border border-mt-border bg-white">
              <Image
                src={project.thumb}
                alt={`The ${project.client} website`}
                width={1200}
                height={750}
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="h-auto w-full"
              />
            </div>
          </Container>
        </section>
      )}

      {/* Body */}
      <section className="pb-24 sm:pb-32">
        <Container>
          <div className="max-w-[680px]">
            {study.sections.map((section) => (
              <div
                key={section.heading}
                className="mt-16 border-t border-mt-border pt-8 first:mt-0"
              >
                <h2 className="!text-2xl sm:!text-3xl">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-6 max-w-[65ch] text-lg leading-relaxed text-mt-slate"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Check it yourself. The evidence layer, all externally confirmable. */}
      <section className="border-y border-mt-border bg-white py-24 sm:py-32">
        <Container>
          <SectionLabel>Check it yourself</SectionLabel>
          <h2 className="mt-6 max-w-[22ch]">
            Everything above is{" "}
            <span className="text-mt-purple">verifiable on the live site.</span>
          </h2>
          <ul className="mt-10 max-w-[680px] flex flex-col">
            {study.verify.map((item) => (
              <li
                key={item}
                className="border-t border-mt-border py-6 text-lg leading-relaxed text-mt-slate"
              >
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Button href={project.url} variant="secondary" external>
              Open {project.client}
            </Button>
          </div>
        </Container>
      </section>

      {/* Results. Renders only when real figures exist. */}
      {study.results.length > 0 && (
        <section className="py-24 sm:py-32">
          <Container>
            <SectionLabel>Results</SectionLabel>
            <ul className="mt-10 max-w-[680px] flex flex-col">
              {study.results.map((result) => (
                <li
                  key={result}
                  className="border-t border-mt-border py-6 text-lg leading-relaxed text-mt-slate"
                >
                  {result}
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* Scope, linked into the services that delivered it. */}
      <section className="py-24 sm:py-32">
        <Container>
          <SectionLabel>What this involved</SectionLabel>
          <ul className="mt-10 flex flex-wrap gap-3">
            {project.scope.map((item) => {
              const href = SCOPE_TO_SERVICE[item];
              /* No service page means plain text, never a dead link. */
              if (!href) {
                return (
                  <li
                    key={item}
                    className="rounded-[20px] border border-mt-border px-4 py-2 font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.13em] text-mt-slate"
                  >
                    {item}
                  </li>
                );
              }
              return (
                <li key={item}>
                  <Link
                    href={href}
                    className="inline-flex rounded-[20px] border border-mt-border px-4 py-2 font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.13em] text-mt-purple transition-colors duration-150 hover:border-mt-purple active:border-mt-purple-light"
                  >
                    {item}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Other work */}
      {others.length > 0 && (
        <section className="border-t border-mt-border py-24 sm:py-32">
          <Container>
            <SectionLabel>More work</SectionLabel>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {others.map(({ study: other, project: otherProject }) => (
                <Link
                  key={other.slug}
                  href={`/work/${other.slug}`}
                  className="group border border-mt-border bg-white p-6 transition-colors duration-150 hover:border-mt-purple"
                >
                  <span className="font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.18em] text-mt-purple">
                    {otherProject!.client}
                  </span>
                  <p className="mt-4 text-base leading-relaxed text-mt-slate group-hover:text-mt-ink">
                    {other.title}
                  </p>
                  <span className="mt-6 inline-flex text-sm font-semibold text-mt-purple">
                    Read the case study
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-16 border-t border-mt-border pt-8">
              <p className="max-w-[65ch] text-lg leading-relaxed">
                Working on something with the same shape?
              </p>
              <div className="mt-6">
                <Button href="/contact">Start a conversation</Button>
              </div>
            </div>
          </Container>
        </section>
      )}
    </main>
  );
}
