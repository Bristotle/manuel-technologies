import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { hasCaseStudy } from "@/lib/case-studies";
import { PROJECTS, type Project } from "@/lib/site";

/* Selected work. REF-013, higglo.io client spotlight.
   ---------------------------------------------------------------------------
   Taken: screenshot led cards at two up, a category pill sitting on the image,
   and a footer bar carrying the client name, the scope, and a metric pill.
   Below them, a live rail of the remaining clients.

   NOT taken: the reference is an employer site, so nothing here is a copy of
   their page. Their cards are serif over olive and slate with a full bleed
   image; ours are the locked purple palette, mono bracket labels, our own
   card geometry and our own copy. The pattern is common across agency sites.
   The execution is ours.

   The metric pill is the load bearing part. Every card on the reference carries
   a number, and that is the only reason it reads as credible rather than
   confident. Ours are countable facts a visitor can verify by opening the site,
   never claims. The pill is optional, so no card ever needs an invented one.

   Images are `next/image`, so AVIF and WebP are served with correct sizing.
   Only the first card gets `priority`, since it is the one likely above the
   fold on a tall viewport.
   -------------------------------------------------------------------------- */

function WorkCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  return (
    <li>
      <Link
        href={hasCaseStudy(project.slug) ? `/work/${project.slug}` : project.url}
        className="mt-lift group flex h-full flex-col overflow-hidden rounded-[18px] border border-mt-border bg-white transition-colors duration-150 hover:border-mt-purple-light"
      >
        {/* Screenshot, with the category pill over it */}
        <div className="relative aspect-[16/10] overflow-hidden bg-mt-surface">
          {project.thumb && (
            <Image
              src={project.thumb}
              alt={`${project.client} website`}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority={priority}
              className="object-cover object-top"
            />
          )}
          <span className="absolute left-4 top-4 rounded-full bg-mt-ink/85 px-3 py-1.5 font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-white backdrop-blur-sm">
            {project.sector}
          </span>
        </div>

        {/* Footer bar */}
        <div className="flex flex-1 flex-col gap-4 border-t border-mt-border p-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="!text-xl !tracking-tight">{project.client}</h3>
            <p className="mt-2 font-[family-name:var(--font-mono)] text-[0.625rem] uppercase leading-relaxed tracking-[0.14em] text-mt-muted">
              {project.scope.join("  ·  ")}
            </p>
          </div>

          {project.metric && (
            <span className="shrink-0 self-start rounded-full border border-mt-border bg-mt-surface px-3.5 py-1.5 text-[0.8125rem] font-semibold text-mt-purple sm:self-auto">
              {project.metric}
            </span>
          )}
        </div>
      </Link>
    </li>
  );
}

export function SelectedWork() {
  /* Cards for anything with a screenshot. Everything else goes to the rail,
     so a project without an image is still visible rather than dropped. */
  const featured = PROJECTS.filter((p) => p.thumb).slice(0, 4);
  const rest = PROJECTS.filter((p) => !featured.includes(p));

  return (
    <section className="border-y border-mt-border bg-white py-24 sm:py-32">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <SectionLabel>Selected work</SectionLabel>
          <h2 className="max-w-[20ch] !text-3xl sm:!text-4xl">
            Every one of these is{" "}
            <span className="text-mt-purple">live right now.</span>
          </h2>
        </div>

        <ul className="mt-14 grid gap-5 lg:grid-cols-2 mt-reveal-group">
          {featured.map((project, index) => (
            <WorkCard
              key={project.slug}
              project={project}
              priority={index === 0}
            />
          ))}
        </ul>

        {rest.length > 0 && (
          <div className="mt-12 border-t border-mt-border pt-8">
            <p className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-mt-muted">
              ( Also live )
            </p>
            <ul className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-4">
              {rest.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={
                      hasCaseStudy(project.slug)
                        ? `/work/${project.slug}`
                        : project.url
                    }
                    className="group inline-flex items-baseline gap-3 text-base font-semibold text-mt-ink transition-colors duration-150 hover:text-mt-purple"
                  >
                    {project.client}
                    <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.14em] text-mt-muted">
                      {project.market}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-12">
          <Link
            href="/work"
            className="inline-flex min-h-12 items-center justify-center rounded-[10px] border border-mt-border px-6 py-3.5 text-base font-semibold text-mt-ink transition-colors duration-150 hover:border-mt-purple hover:text-mt-purple"
          >
            See all the work
          </Link>
        </div>
      </Container>
    </section>
  );
}
