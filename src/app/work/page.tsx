import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { hasCaseStudy } from "@/lib/case-studies";
import { PROJECTS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Live client work from Manuel Technologies. Ecommerce, regulated professional services, healthcare and retail, across four markets, plus software we shipped ourselves.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: `Work | ${SITE.name}`,
    description:
      "Live client work across four markets, plus software we shipped ourselves.",
    url: `${SITE.url}/work`,
  },
};

export default function Work() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Work",
    url: `${SITE.url}/work`,
    hasPart: PROJECTS.map((p) => ({
      "@type": "CreativeWork",
      name: p.client,
      /* Point at our case study where one exists, so the schema graph stays
         on our own domain rather than handing every node to the client. */
      url: hasCaseStudy(p.slug) ? `${SITE.url}/work/${p.slug}` : p.url,
      about: p.sector,
    })),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="bg-white py-24 sm:py-32">
        <Container>
          <SectionLabel>Work</SectionLabel>
          <h1 className="mt-6 max-w-[14ch]">Everything here is live.</h1>
          <p className="mt-8 max-w-[60ch] text-lg leading-relaxed text-mt-slate">
            Four markets, three regulated sectors, and software you can install
            and check yourself. Every link below goes to the real thing, not a
            mockup.
          </p>
        </Container>
      </section>

      {/* Projects */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="flex flex-col gap-24">
            {PROJECTS.filter((p) => p.thumb).map((p, i) => (
              <article
                key={p.slug}
                className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16"
              >
                <Link
                  href={hasCaseStudy(p.slug) ? `/work/${p.slug}` : p.url}
                  className={`group block overflow-hidden rounded-[18px] border border-mt-border bg-white transition-colors duration-150 hover:border-mt-purple ${
                    i % 2 ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={p.thumb!}
                    alt={`${p.client} homepage`}
                    width={1200}
                    height={750}
                    priority={i === 0}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="h-auto w-full"
                  />
                </Link>

                <div className={i % 2 ? "lg:order-1" : ""}>
                  <SectionLabel>{p.sector}</SectionLabel>
                  <h2 className="mt-4 !text-2xl sm:!text-3xl">{p.client}</h2>
                  <p className="mt-2 font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.18em] text-mt-muted">
                    {p.market}
                  </p>
                  <p className="mt-6 max-w-[52ch] leading-relaxed text-mt-slate">
                    {p.summary}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {p.scope.map((s) => (
                      <li
                        key={s}
                        className="rounded-[20px] border border-mt-border px-3 py-1.5 font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.13em] text-mt-purple"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap gap-4">
                    {hasCaseStudy(p.slug) && (
                      <Button href={`/work/${p.slug}`}>
                        Read the case study
                      </Button>
                    )}
                    <Button href={p.url} variant="secondary" external>
                      Visit the site
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Our own software */}
      <section className="border-y border-mt-border bg-white py-24 sm:py-32">
        <Container>
          <SectionLabel>Our own software</SectionLabel>
          <h2 className="mt-6 max-w-[20ch]">
            We use what we build, before you do.
          </h2>
          <p className="mt-8 max-w-[60ch] text-lg leading-relaxed text-mt-slate">
            CWV Drift Monitor reports mobile and desktop performance scores,
            live Core Web Vitals and ranked fixes the moment you open it. No API
            key, no account, no tracking. Built on Manifest V3 and the native
            PerformanceObserver API, and published free on the Chrome Web Store,
            so anyone can check the work rather than take our word for it.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href={SITE.chromeStore} external>
              View on the Chrome Web Store
            </Button>
            <Button
              href="/cwv-drift-monitor/privacy-policy"
              variant="secondary"
            >
              Read its privacy policy
            </Button>
          </div>
        </Container>
      </section>

      {/* Also worked on */}
      <section className="py-24 sm:py-32">
        <Container>
          <SectionLabel>Also live</SectionLabel>
          <ul className="mt-8 flex flex-col">
            {PROJECTS.filter((p) => !p.thumb).map((p) => (
              <li key={p.slug} className="border-t border-mt-border">
                <Link
                  href={hasCaseStudy(p.slug) ? `/work/${p.slug}` : p.url}
                  className="flex flex-col gap-2 py-6 transition-colors duration-150 hover:text-mt-purple sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <span className="text-lg font-semibold">{p.client}</span>
                  <span className="font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.18em] text-mt-muted">
                    {p.sector} · {p.market}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-16 max-w-[60ch]">
            <p className="text-lg leading-relaxed text-mt-slate">
              Every case study states what was built and how to confirm it on
              the live site. If you want to see something specific that is not
              written up, ask and we will walk you through it.
            </p>
            <div className="mt-8">
              <Button href="/contact">Start a conversation</Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
