import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DotGrid } from "@/components/ui/DotGrid";
import { SectionLabel } from "@/components/ui/SectionLabel";
import STUDY from "@/lib/research/uk-accountancy-2026.json";
import { SITE } from "@/lib/site";

/* Original research: UK accountancy websites, September 2026.
   ---------------------------------------------------------------------------
   First piece of primary research on the site. The dataset was produced by the
   same audit engine that powers /free-audit, run against 56 firm websites, and
   the numbers on this page are read from the committed JSON rather than typed
   in, so the page cannot drift from the study.

   WHY THIS EXISTS. Original data is the one content type a competitor cannot
   copy and the one generative engines reliably cite. We already own a crawler,
   so the dataset costs nothing but time.

   NO NAMED FIRMS IN THE FINDINGS. Individual sites appear nowhere. The study
   reports distributions, not a league table. Naming firms for their technical
   failures would be a cheap way to get attention and an expensive way to lose
   the profession's goodwill, and several of the flags turned out to be
   measurement artefacts rather than real faults, which is exactly why.

   The chart is inline SVG. No library, no client component, 0KB.
   -------------------------------------------------------------------------- */

const f = STUDY.findings;
const M = STUDY.measurable;

const pct = (n: number, of: number = M) => Math.round((n / of) * 100);

/* Ordered by how much each one costs, not by size, so the chart reads as a
   priority list rather than a ranking. */
const BARS = [
  { label: "More than one H1, or none", value: f.notOneH1, note: "Nothing tells a crawler what the page is about" },
  { label: "Slower than 3 seconds", value: f.slowerThan3s, note: "Measured to first byte, including DNS, TLS and redirects" },
  { label: "No structured data at all", value: f.noStructuredData, note: "No JSON-LD anywhere on the homepage" },
  { label: "Blocking an AI crawler", value: f.blockingAiCrawlers, note: "Explicit Disallow for GPTBot, ClaudeBot and others" },
  { label: "No meta description", value: f.noMetaDescription, note: "Google writes its own, usually worse" },
  { label: "No XML sitemap", value: f.noSitemap, note: "Discovery left entirely to internal links" },
  { label: "No canonical tag", value: f.noCanonical, note: "Duplicates cannot be resolved" },
];

const FAQS = [
  {
    q: "How were the 56 firms chosen?",
    a: `Top organic results for "accountants in {city}" across ${STUDY.cities.length} UK cities: ${STUDY.cities.join(", ")}. Directories, ICAEW listings and aggregator pages were excluded because they are not firm websites. This is not a random sample of the profession. It is a sample of the firms a searcher actually finds, which is the population that matters for a study about visibility.`,
  },
  {
    q: "Why does the sample drop from 56 to 44?",
    a: `Twelve sites could not be measured. Seven refused the request outright and five returned a bot protection challenge instead of their homepage. Every percentage in the findings is calculated against the ${M} that could actually be read, never against 56, because reporting a site as failing a check we were never able to run would be dishonest.`,
  },
  {
    q: "Are the slow response times really that bad?",
    a: `The figure is time to first byte including DNS, TLS negotiation and any redirects, measured from a single location on one attempt. It is not a lab benchmark and a second run would move it. What it is good enough to say is that ${f.slowerThan3s} of ${M} sites took over three seconds to return their first byte, which is slow by any measure and is the kind of thing a crawler notices before a human does.`,
  },
  {
    q: "Did you name the firms that failed checks?",
    a: "No, and we will not. The study reports distributions rather than a league table. Naming firms for technical faults is a cheap way to get attention and an expensive way to lose a profession's goodwill. Several flags also turned out to be measurement artefacts rather than real faults, which is the second reason.",
  },
  {
    q: "Can I reproduce this?",
    a: "Yes. The audit is free and ungated, the sampling frame is written above, and the raw counts are on this page. Run any of these domains through it yourself and you will get the same measurements, because they are measurements rather than opinions.",
  },
];

export const metadata: Metadata = {
  title: "UK accountancy websites: an AI visibility study",
  description: `We crawled ${STUDY.sampled} UK accountancy firm websites. ${STUDY.sampled - M} could not be read by an identified crawler at all, and the bot protection responsible serves a noindex page.`,
  alternates: { canonical: "/research/uk-accountancy-websites" },
  openGraph: {
    title: `UK accountancy websites: an AI visibility study | ${SITE.name}`,
    description: `${STUDY.sampled} firms crawled, ${M} measurable. What we found about structured data, crawler access and speed.`,
    url: `${SITE.url}/research/uk-accountancy-websites`,
    type: "article",
  },
};

export default function Study() {
  const url = `${SITE.url}/research/uk-accountancy-websites`;
  const unreadable = STUDY.sampled - M;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "UK accountancy websites: an AI visibility study",
      description: metadata.description,
      url,
      datePublished: STUDY.sampledAt,
      dateModified: STUDY.sampledAt,
      author: { "@type": "Organization", name: SITE.name, url: SITE.url },
      publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
      isBasedOn: {
        "@type": "Dataset",
        name: "UK accountancy website technical audit, September 2026",
        description: `Technical audit of ${STUDY.sampled} UK accountancy firm websites covering crawler access, structured data, discovery and response time.`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((x) => ({
        "@type": "Question",
        name: x.q,
        acceptedAnswer: { "@type": "Answer", text: x.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Research", item: url },
      ],
    },
  ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden border-b border-mt-border bg-white py-20 sm:py-28">
        <DotGrid fade="bottom" />
        <Container className="relative">
          <div className="flex flex-wrap items-center gap-3 text-sm text-mt-slate">
            <Link href="/" className="hover:text-mt-purple">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Research</span>
          </div>

          <div className="mt-10 max-w-[820px]">
            <SectionLabel>Original research · September 2026</SectionLabel>
            <h1 className="mt-6">
              We crawled {STUDY.sampled} UK accountancy websites.{" "}
              <span className="text-mt-purple">
                {unreadable} could not be read at all.
              </span>
            </h1>
            <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">
              Not slow. Not badly optimised. Unreadable by an identified,
              well behaved crawler that obeys robots.txt and says who it is.
              The bot protection responsible serves a holding page carrying{" "}
              <strong className="text-mt-ink">noindex, nofollow</strong>, which
              is what an AI crawler sees when it visits.
            </p>
          </div>

          <dl className="mt-14 grid gap-8 border-t border-mt-border pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [String(STUDY.sampled), "Firms sampled"],
              [String(M), "Could be measured"],
              [String(unreadable), "Could not"],
              [`${f.medianScore}`, "Median audit score"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase leading-relaxed tracking-[0.14em] text-mt-muted">{l}</dt>
                <dd className="mt-2 text-3xl font-extrabold tracking-tight text-mt-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Method, first rather than last, because a study that hides it is a
          press release. */}
      <section className="py-20 sm:py-24">
        <Container size="prose">
          <SectionLabel>Method</SectionLabel>
          <div className="mt-8 flex flex-col gap-6 text-lg leading-relaxed text-mt-slate">
            <p>
              Top organic results for &ldquo;accountants in {"{city}"}&rdquo;
              across {STUDY.cities.length} UK cities: {STUDY.cities.join(", ")}.
              Directories and ICAEW listing pages were excluded, since they are
              not firm websites. Each homepage was fetched once, along with its
              robots.txt and XML sitemap, and scored by the same engine that
              powers our{" "}
              <Link href="/free-audit" className="text-mt-purple hover:underline">free audit</Link>.
            </p>
            <p>
              This is not a random sample of the profession. It is a sample of
              the firms a searcher actually finds, which is the population that
              matters for a study about visibility. Every percentage below is
              calculated against the {M} sites that could be read, never against{" "}
              {STUDY.sampled}, because reporting a site as failing a check we
              could never run would be dishonest.
            </p>
          </div>
        </Container>
      </section>

      {/* Findings */}
      <section className="border-y border-mt-border bg-white py-24 sm:py-32">
        <Container>
          <SectionLabel>What we found</SectionLabel>
          <h2 className="mt-6 max-w-[26ch]">
            Share of the {M} readable sites failing each check.
          </h2>

          <div className="mt-14 flex flex-col gap-7">
            {BARS.map((bar) => {
              const p = pct(bar.value);
              return (
                <div key={bar.label}>
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <span className="text-[0.9375rem] font-semibold text-mt-ink">{bar.label}</span>
                    <span className="font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.14em] text-mt-muted">
                      {bar.value} of {M} · {p}%
                    </span>
                  </div>
                  <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-mt-border">
                    <div className="h-full rounded-full bg-mt-purple" style={{ width: `${p}%` }} />
                  </div>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-mt-muted">{bar.note}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-[18px] border border-mt-border bg-mt-border sm:grid-cols-3">
            {[
              [`${f.medianResponseMs}ms`, "Median time to first byte"],
              [`${f.medianHtmlKb}KB`, "Median HTML weight"],
              [`${f.medianWordCount}`, "Median words on the homepage"],
            ].map(([v, l]) => (
              <div key={l} className="bg-white px-6 py-6">
                <span className="block text-2xl font-extrabold tracking-tight text-mt-ink">{v}</span>
                <span className="mt-2 block font-[family-name:var(--font-mono)] text-[0.625rem] uppercase leading-relaxed tracking-[0.14em] text-mt-muted">{l}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* The interesting bit */}
      <section className="py-24 sm:py-32">
        <Container size="prose">
          <SectionLabel>The finding that surprised us</SectionLabel>
          <h2 className="mt-6">Bot protection is an AI visibility decision nobody made.</h2>
          <div className="mt-8 flex flex-col gap-6 text-lg leading-relaxed text-mt-slate">
            <p>
              Five of the twelve unreadable sites returned a Cloudflare
              challenge instead of their homepage. That page is roughly 5KB, it
              says &ldquo;Just a moment...&rdquo;, and it carries a{" "}
              <strong className="text-mt-ink">noindex, nofollow</strong> meta
              robots tag.
            </p>
            <p>
              A browser solves the challenge in a second and nobody notices.
              GPTBot and ClaudeBot cannot solve a JavaScript challenge. They get
              the holding page, and the holding page tells them not to index it.
            </p>
            <p className="font-semibold text-mt-ink">
              So a security setting, usually enabled by someone who never
              discussed it with whoever owns marketing, quietly decides whether
              a firm can appear in an AI answer. Nobody made that call. It came
              with the plan.
            </p>
            <p>
              Separately, {f.blockingAiCrawlers} of the {M} readable sites block
              AI crawlers deliberately, with an explicit{" "}
              <code className="text-[0.9em] text-mt-ink">Disallow: /</code> for
              GPTBot, ClaudeBot, Google-Extended, Applebot-Extended and CCBot.
              All {f.blockingAiCrawlers} carry the same five agents in the
              same order, and not one of them blocks PerplexityBot. Four firms
              independently arriving at an identical list, with the same gap in
              it, is a template. Nobody sat down and chose this either.
            </p>
          </div>
        </Container>
      </section>

      {/* The honest bit */}
      <section className="border-y border-mt-border bg-white py-24 sm:py-32">
        <Container size="prose">
          <SectionLabel>What we got wrong first</SectionLabel>
          <h2 className="mt-6">The first run of this study was wrong, and checking it found a bug in our own tool.</h2>
          <div className="mt-8 flex flex-col gap-6 text-lg leading-relaxed text-mt-slate">
            <p>
              The first pass reported that five firms carried{" "}
              <strong className="text-mt-ink">noindex</strong> on their
              homepage. That would have been a serious accusation, and it was
              false. We were close to publishing it with the firms named.
            </p>
            <p>
              The tell was that all five pages were within a few hundred bytes
              of each other. Five unrelated companies do not produce near
              identical homepages. They were all the same Cloudflare challenge
              page, and its noindex tag is correct behaviour: an interstitial
              genuinely should not be indexed. The firms had done nothing
              wrong. Our crawler had simply never reached their sites.
            </p>
            <p>
              Checking that led to a real bug. Our robots.txt parser accepted
              whatever it was handed. Given an HTML challenge page at
              /robots.txt, it found no directives it recognised and returned
              its default, which is that every crawler is allowed. A confident
              all clear, derived from a file it never actually read.
            </p>
            <p className="font-semibold text-mt-ink">
              That was live in our free audit and our crawler checker. It is
              fixed. The body is now checked to see whether it is a robots.txt
              at all, and when it is not, the answer is that we could not read
              it rather than a reassuring guess.
            </p>
            <p>
              The crawler blocking findings survived the same scrutiny. Each
              was confirmed by fetching the file independently, and each turned
              out to be a genuine, explicit{" "}
              <code className="text-[0.9em] text-mt-ink">Disallow: /</code>.
              Those numbers stand.
            </p>
            <p>
              This section exists because the failure mode is the whole point. A
              tool that reports confidently on data it could not collect is
              worse than no tool, whether it errs towards alarm or towards
              reassurance. The only defence is checking a finding against the
              thing itself before publishing it, which is also why no firm is
              named anywhere on this page.
            </p>
          </div>
        </Container>
      </section>

      {/* Actionable */}
      <section className="py-24 sm:py-32">
        <Container>
          <SectionLabel>What to do about it</SectionLabel>
          <h2 className="mt-6 max-w-[24ch]">Four checks, none of which need a budget.</h2>
          <ol className="mt-reveal-group mt-14 grid gap-8 md:grid-cols-2">
            {[
              ["01", "Open your own robots.txt", "Look for GPTBot, ClaudeBot, PerplexityBot and Google-Extended. If any carries Disallow: /, somebody decided you should not appear in AI answers. Confirm that was on purpose."],
              ["02", "Fetch your homepage without a browser", "curl it, or use any tool that does not run JavaScript. If you get a challenge page, that is what an AI crawler sees, and it carries noindex."],
              ["03", "Count your H1s", `${pct(f.notOneH1)}% of the sites we read had more than one or none. It is a two minute fix and it is the clearest signal you have about what a page is for.`],
              ["04", "Time your first byte", `Median here was ${(f.medianResponseMs / 1000).toFixed(1)} seconds. If yours is worse, that is crawl budget you are paying for and not spending on being indexed.`],
            ].map(([n, t, b]) => (
              <li key={n} className="border-t border-mt-border pt-6">
                <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.18em] text-mt-purple">{n}</span>
                <h3 className="mt-4 !text-lg !tracking-tight">{t}</h3>
                <p className="mt-3 max-w-[60ch] text-[0.9375rem] leading-relaxed text-mt-slate">{b}</p>
              </li>
            ))}
          </ol>

          <div className="mt-14 flex flex-wrap gap-4">
            <Button href="/free-audit">Run this audit on your own site</Button>
            <Button href="/free-tools/ai-crawler-check" variant="secondary">
              Just check the crawlers
            </Button>
          </div>
        </Container>
      </section>

      <section className="border-t border-mt-border bg-white py-24 sm:py-32">
        <Container>
          <SectionLabel>Questions</SectionLabel>
          <h2 className="mt-6 max-w-[24ch]">About the method.</h2>
          <div className="mt-reveal-group mt-12 grid gap-x-16 gap-y-10 md:grid-cols-2">
            {FAQS.map((x) => (
              <article key={x.q} className="border-t border-mt-border pt-6">
                <h3 className="!text-lg !tracking-tight">{x.q}</h3>
                <p className="mt-4 max-w-[60ch] text-[0.9375rem] leading-relaxed text-mt-slate">{x.a}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
