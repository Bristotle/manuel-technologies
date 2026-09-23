import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import lawFirms from "@/lib/research/benchmarks/ghana-law-firms.json";
import hospitals from "@/lib/research/benchmarks/ghana-private-hospitals.json";
import schools from "@/lib/research/benchmarks/ghana-private-schools.json";
import realEstate from "@/lib/research/benchmarks/ghana-real-estate.json";
import UK from "@/lib/research/uk-accountancy-2026.json";

/* SEO and lead generation proof, on /work.
   ---------------------------------------------------------------------------
   WHY THIS SECTION EXISTS AND WHAT IT MAY NOT CONTAIN. A prospect asked for
   proof of SEO and lead generation work on 23 September 2026. The reports
   available were from Emmanuel's staff role at a US agency, for a named,
   current client. CLAUDE.md section 7 is explicit: only engagements where
   Manuel Technologies was the vendor appear under /work, and staff role work
   is personal experience on /about, never company work. Publishing another
   firm's client data under our name is also the exact thing we rejected from
   REF-007. So none of it is here.

   What is here is ours, and every figure is checkable by the reader:

     SELF_AUDIT   produced by scripts/research/self.mts, which runs the same
                  engine as /free-audit and as every industry benchmark, so
                  the comparison is like for like. Re-run it before changing
                  the number; never type one in.
     BENCHMARKS   the committed JSON the engine wrote.
     DIH          counted from the client's live sitemap.xml on the date
                  shown. Recount before changing it.

   CLIENT PERFORMANCE DATA IS DELIBERATELY ABSENT. We have not published a
   client's traffic or ranking figures because we do not yet have written
   permission to. The section says so plainly rather than leaving a gap a
   reader has to notice. When permission arrives, the numbers go in the case
   studies where they belong, and this note comes out. */

const GH = [lawFirms, hospitals, schools, realEstate];

/* Our own site, scored by our own engine. npx tsx scripts/research/self.mts */
const SELF = { score: 98, ttfbMs: 415, checked: "2026-09-23" };

/* Median of the four Ghana benchmark medians, stated as a range so no single
   number is implied to be more precise than it is. */
const marketScores = GH.map((b) => b.findings.medianScore).sort((a, b) => a - b);
const marketTtfb = GH.map((b) => b.findings.medianResponseMs).sort((a, b) => a - b);
const sitesMeasured = GH.reduce((n, b) => n + b.measurable, 0) + UK.measurable;

/* Dementia In Home, counted from the live sitemap. */
const DIH = { urls: 1190, counted: "2026-09-23", cities: 24 };

export function SeoProof() {
  return (
    <section className="border-y border-mt-border bg-white py-24 sm:py-32">
      <Container>
        <SectionLabel accent="teal">SEO and lead generation</SectionLabel>
        <h2 className="mt-6 max-w-[24ch]">
          An agency that cannot rank its own site{" "}
          <span className="text-mt-teal-ink">is selling you a theory.</span>
        </h2>
        <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">
          So start with ours. We built an audit engine, pointed it at{" "}
          {sitesMeasured} business websites across five industries, published
          what it found, and then ran it on ourselves on the same terms. Every
          number below can be checked by someone who does not trust us, which
          is the only kind of proof worth putting on a page.
        </p>

        {/* The self comparison. Same engine, both sides. */}
        <div className="mt-14 grid gap-px overflow-hidden rounded-[18px] border border-mt-border bg-mt-border lg:grid-cols-[1.1fr_1fr_1fr]">
          <div className="flex flex-col justify-center bg-mt-surface p-7">
            <span className="mt-label">( Our own site, our own engine )</span>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-mt-slate">
              The same twenty checks we run on a client, run on us and
              published whichever way they fall. Scored {SELF.checked}.
            </p>
          </div>
          <div className="bg-white p-7">
            <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.14em] text-mt-muted">Audit score</span>
            <p className="mt-3 text-5xl font-extrabold tracking-tight text-mt-teal-ink">{SELF.score}</p>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-mt-slate">
              Against a median of {marketScores[0]} to {marketScores[marketScores.length - 1]} across the {GH.reduce((n, b) => n + b.measurable, 0)} Ghanaian business
              sites we measured.
            </p>
          </div>
          <div className="bg-white p-7">
            <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.14em] text-mt-muted">Time to first byte</span>
            <p className="mt-3 text-5xl font-extrabold tracking-tight text-mt-teal-ink">{SELF.ttfbMs}ms</p>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-mt-slate">
              Against medians of {marketTtfb[0]}ms to {marketTtfb[marketTtfb.length - 1]}ms. On a phone, that gap is
              the difference between arriving and leaving.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-3">
          <div className="border-t border-mt-border pt-6">
            <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.18em] text-mt-teal-ink">01</span>
            <h3 className="mt-4 !text-lg !tracking-tight">Programmatic SEO at real scale</h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-mt-slate">
              We built {DIH.urls.toLocaleString("en-GB")} pages for{" "}
              <Link href="/work/dementia-in-home" className="text-mt-teal-ink hover:underline">Dementia In Home</Link>,
              roughly {DIH.cities} cities at around fifty pages each, every one
              carrying that city&rsquo;s own Census and Medicaid data rather than a
              swapped place name. Counted from their live sitemap on {DIH.counted};
              open it and count them yourself.
            </p>
          </div>
          <div className="border-t border-mt-border pt-6">
            <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.18em] text-mt-teal-ink">02</span>
            <h3 className="mt-4 !text-lg !tracking-tight">Original research, not repackaged advice</h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-mt-slate">
              {sitesMeasured} websites measured and published across{" "}
              <Link href="/research" className="text-mt-teal-ink hover:underline">five studies</Link>:
              UK accountancy firms, and law firms, hospitals, schools and real
              estate in Ghana. Method stated before findings, no company named,
              and one study documents a bug it found in our own tool.
            </p>
          </div>
          <div className="border-t border-mt-border pt-6">
            <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.18em] text-mt-teal-ink">03</span>
            <h3 className="mt-4 !text-lg !tracking-tight">Lead generation built in, not bolted on</h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-mt-slate">
              Thirteen{" "}
              <Link href="/free-tools" className="text-mt-teal-ink hover:underline">free tools</Link>{" "}
              that run without an email gate, because a tool nobody can use
              without surrendering an address is an advert. That is the same
              enquiry machinery we build into client sites: the path, the
              qualification, and somewhere for a visitor to go before they are
              ready to buy.
            </p>
          </div>
        </div>

        {/* The honest gap, stated rather than hidden. */}
        <div className="mt-14 rounded-[18px] border border-mt-border bg-mt-surface p-7 sm:p-8">
          <span className="mt-label">( What is not on this page )</span>
          <p className="mt-4 max-w-[70ch] text-[0.9375rem] leading-relaxed text-mt-slate">
            Client traffic charts and ranking screenshots. We have done this
            work, and the case studies below describe it, but a client&rsquo;s
            Search Console data belongs to the client and we do not publish it
            without written permission. Several of those conversations are
            open. When permission arrives the figures will appear in the case
            study they belong to, dated, with the client named and credited.
            Until then this page shows what is ours to show.
          </p>
          <p className="mt-4 max-w-[70ch] text-[0.9375rem] leading-relaxed text-mt-slate">
            If an agency shows you a traffic chart, ask whose account it came
            from and whether they have permission to show it. It is a fair
            question and the answer tells you a great deal.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Button href="/free-audit">Run the same audit on your site</Button>
          <Button href="/research" variant="secondary">Read the research</Button>
        </div>
      </Container>
    </section>
  );
}
