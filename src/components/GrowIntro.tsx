import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";

/* Sits directly under the Grow hero, the counterpart to ScaleIntro.
   ---------------------------------------------------------------------------
   WHY THIS EXISTS. /grow carried 109 words of main content while being a
   pillar hub at sitemap priority 0.9. See the note in BuildIntro.

   The AI search band is the load bearing part of this page. It is the only
   claim on the site a prospect can verify in ten seconds, by opening
   /robots.txt and reading the crawler names, and a page selling GEO should
   lead with the thing that is checkable rather than the thing that is
   impressive.

   NEVER PROMISE A CITATION. Our own blog says there is no ethical way to
   guarantee appearing in an AI answer, and the service pages repeat it. This
   section describes access and structure, which we control, not outcomes,
   which we do not. */

const SIGNALS = [
  {
    label: "Access",
    body: "Status codes, robots rules, canonicals, rendering, and sitemaps. Whether a page can be reached and understood at all.",
    detail:
      "GPTBot, ClaudeBot, PerplexityBot, Google-Extended and Applebot-Extended are allowed by name in our own robots.txt. Open it and check.",
  },
  {
    label: "Structure",
    body: "One subject per URL, headings that match it, structured data that describes what is actually visible on the page.",
    detail:
      "Schema is a label, not an argument. Marking up a claim the reader cannot see is how a site loses trust with both engines at once.",
  },
  {
    label: "Evidence",
    body: "Named authors, dated pages, primary sources, and figures a reader can trace back to where they came from.",
    detail:
      "Retrieval systems quote sources that can be checked. So do buyers. The same work serves both, which is why we do not separate them.",
  },
] as const;

export function GrowIntro() {
  return (
    <section className="border-b border-mt-border bg-white py-24 sm:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <SectionLabel>What this pillar is</SectionLabel>
            <h2 className="mt-6 !text-3xl !leading-[1.05] sm:!text-4xl">
              Being findable by the engines that answer before Google does.
            </h2>
          </div>

          <div className="flex flex-col gap-6 text-lg leading-relaxed text-mt-slate">
            <p>
              Search stopped being one destination. A question now gets answered
              inside Google, inside ChatGPT, inside Perplexity, and inside
              Gemini, often without anyone reaching a website at all. The work
              that makes a page rank and the work that makes it citable have
              largely converged, and both are properties of the code.
            </p>
            <p>
              So this pillar is implementation, not reporting. Crawlability,
              indexation, rendering, internal link architecture, structured
              data, and page experience, changed in the repository rather than
              described in a document. A recommendation nobody ships is a cost
              with no result attached.
            </p>
            <p className="font-semibold text-mt-ink">
              Nobody can promise you a citation in an AI answer, and anyone who
              does is selling something. What can be built is a source that is
              clear, useful, technically reachable, and worth quoting.
            </p>
          </div>
        </div>

        <div className="mt-20 mt-reveal-group">
          <SectionLabel>What actually gets worked on</SectionLabel>
          <dl className="mt-8 grid gap-px overflow-hidden rounded-[18px] border border-mt-border bg-mt-border md:grid-cols-3">
            {SIGNALS.map((item) => (
              <div key={item.label} className="flex flex-col gap-5 bg-white p-7">
                <div>
                  <dt className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.16em] text-mt-purple">
                    ( {item.label} )
                  </dt>
                  <dd className="mt-3 text-[0.9375rem] leading-relaxed text-mt-slate">
                    {item.body}
                  </dd>
                </div>
                <div className="border-t border-mt-border pt-5">
                  <dd className="text-[0.9375rem] font-medium leading-relaxed text-mt-ink">
                    {item.detail}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-14 flex flex-wrap gap-4">
          <Button href="/grow/technical-seo">Technical SEO</Button>
          <Button href="/grow/geo" variant="secondary">
            Generative engine optimisation
          </Button>
        </div>
      </Container>
    </section>
  );
}
