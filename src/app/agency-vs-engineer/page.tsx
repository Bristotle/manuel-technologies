import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Comparison } from "@/components/Comparison";
import { Container } from "@/components/ui/Container";
import { DotGrid } from "@/components/ui/DotGrid";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SITE } from "@/lib/site";

/* Comparison page.
   ---------------------------------------------------------------------------
   The same table the homepage carries, doing a second job. On the homepage it
   handles the objection mid scroll. Here it answers a query.

   NOT A DUPLICATE. The table is about 270 words and is shared. Everything
   around it on this page is written for this page, so the two are not near
   duplicates of each other, and this one carries the depth a comparison query
   actually wants.

   The section arguing FOR agencies is deliberate and it is not a rhetorical
   device. It is true, it is the fastest way to be trusted by someone who has
   not decided yet, and balanced comparisons are what generative engines quote.
   A page that says every alternative is worthless gets read as marketing and
   cited by nobody. */

export const metadata: Metadata = {
  title: "Agency or engineer: how to choose",
  description:
    "The agency retainer against senior engineering ownership, including when an agency is the better choice and the questions worth asking either one.",
  alternates: { canonical: "/agency-vs-engineer" },
  openGraph: {
    title: `Agency or engineer | ${SITE.name}`,
    description:
      "When an agency is the right answer, when senior engineering ownership is, and how to tell before you sign.",
    url: `${SITE.url}/agency-vs-engineer`,
  },
};

const AGENCY_WINS = [
  {
    title: "You need many disciplines at once, permanently",
    body: "A brand refresh, paid media, PR, social, and a site rebuild running in parallel is a staffing problem. An agency already has those people and can put them on it this month.",
  },
  {
    title: "The work is volume, not depth",
    body: "Two hundred landing pages a quarter to a fixed template is a production line. Production lines want capacity and process, and a good agency is built to supply both.",
  },
  {
    title: "You need cover, not a specialist",
    body: "Holiday, illness, and turnover are somebody else's problem inside an agency. A single practitioner is a single point of failure, and for some organisations that risk is the deciding factor.",
  },
];

const QUESTIONS = [
  {
    q: "Who writes the code, and can I meet them before I sign?",
    a: "The person in the pitch is often not the person on the keyboard. Ask for the name and the seniority of whoever will actually be doing the work, and ask what else they are on that month.",
  },
  {
    q: "What do I own at the end, and where does it live?",
    a: "The repository, the domains, the analytics property, and the deployment. If any of those sit inside an account you cannot access, you are renting your own business.",
  },
  {
    q: "What happens to performance after launch?",
    a: "Ask how Core Web Vitals are measured, on what device class, and whether a regression fails the build or just gets noticed later. Fast on a desktop connection is not an answer.",
  },
  {
    q: "How is this work made legible to AI search?",
    a: "Ask which crawlers are allowed by name in robots.txt, whether structured data matches what is visible on the page, and how the site would be cited rather than merely ranked.",
  },
  {
    q: "Can you show me something you built that I can open right now?",
    a: "Not a case study PDF. A URL, an app, or an extension. Anything that runs is worth more than any deck, because it can be checked. Ours are at /work and /free-tools.",
  },
];

export default function AgencyVsEngineer() {
  const pageUrl = `${SITE.url}/agency-vs-engineer`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        {
          "@type": "ListItem",
          position: 2,
          name: "Agency or engineer",
          item: pageUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: QUESTIONS.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative overflow-hidden border-b border-mt-border bg-white py-24 sm:py-32">
        <DotGrid fade="bottom" />
        <Container className="relative">
          <div className="flex flex-wrap items-center gap-3 text-sm text-mt-slate">
            <Link href="/" className="hover:text-mt-purple">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span>Agency or engineer</span>
          </div>

          <div className="mt-12 max-w-[760px]">
            <SectionLabel>Choosing a partner</SectionLabel>
            <h1 className="mt-6">
              Agency or engineer, and how to tell which you need.
            </h1>
            <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">
              Both are legitimate. They fail in different ways, and the failure
              modes are predictable enough to choose between in advance. This
              page sets out the difference, says plainly where an agency is the
              better answer, and gives you the questions that separate a good
              one from a confident one. If you would rather judge on output,{" "}
              <Link href="/work" className="text-mt-purple hover:underline">
                the work is here
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>

      {/* The shared table, without its homepage heading. */}
      <Comparison heading={false} />

      <section className="py-24 sm:py-32">
        <Container>
          <SectionLabel>The honest part</SectionLabel>
          <h2 className="mt-6 max-w-[24ch]">
            Three situations where an agency is the{" "}
            <span className="text-mt-purple">better choice.</span>
          </h2>
          <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">
            We would rather say this than have you find it out at month four.
            If your situation is one of these, hire the agency.
          </p>

          <div className="mt-reveal-group mt-12 grid gap-8 md:grid-cols-3">
            {AGENCY_WINS.map((item, index) => (
              <div key={item.title} className="border-t border-mt-border pt-6">
                <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.18em] text-mt-purple">
                  0{index + 1}
                </span>
                <h3 className="mt-4 !text-xl !tracking-tight">{item.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-mt-slate">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 max-w-[65ch] border-t border-mt-border pt-8">
            <p className="text-lg leading-relaxed text-mt-slate">
              The pattern underneath all three is the same. Agencies are built
              for breadth and for capacity. When the constraint is how many
              hands you need, that is the right shape. When the constraint is
              how well one thing has to be built, it stops being the right
              shape, and the work quietly moves to whoever on the team is free.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-y border-mt-border bg-white py-24 sm:py-32">
        <Container>
          <SectionLabel>Where this matters most</SectionLabel>
          <h2 className="mt-6 max-w-[24ch]">
            Depth beats capacity on anything that has to keep working.
          </h2>

          <div className="mt-12 grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div className="flex flex-col gap-6 text-lg leading-relaxed text-mt-slate">
              <p>
                A brochure site can be produced.{" "}
                <Link href="/build/custom-software" className="text-mt-purple hover:underline">
                  An application
                </Link>
                ,{" "}
                <Link href="/build/systems-integrations" className="text-mt-purple hover:underline">
                  an integration
                </Link>
                , or a search architecture has to be understood, and
                understanding does not survive being split across four people
                who each hold a quarter of it.
              </p>
              <p>
                This is why the technical work reads so differently after
                handover. Code written by whoever was free is code nobody can
                explain a year later. That is a maintenance cost you pay
                forever, and it never appears on the original quote.
              </p>
            </div>
            <div className="flex flex-col gap-6 text-lg leading-relaxed text-mt-slate">
              <p>
                Search work has the same shape. Rankings can be reported by
                anyone.{" "}
                <Link href="/grow/technical-seo" className="text-mt-purple hover:underline">
                  Crawlability, indexation and rendering
                </Link>{" "}
                are properties of the code, and they only improve when the
                person diagnosing them can also change them. The same is true
                of{" "}
                <Link href="/grow/geo" className="text-mt-purple hover:underline">
                  being citable by generative engines
                </Link>
                .
              </p>
              <p className="font-semibold text-mt-ink">
                The question is not agency or individual. It is whether the
                person who understands the problem is the person allowed to fix
                it.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <SectionLabel>Before you sign</SectionLabel>
          <h2 className="mt-6 max-w-[22ch]">
            Five questions worth asking either one.
          </h2>
          <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">
            These work on us as well. If any partner cannot answer all five
            without rescheduling the call, that is the answer.
          </p>

          <dl className="mt-12 max-w-[820px]">
            {QUESTIONS.map((item) => (
              <div key={item.q} className="border-t border-mt-border py-8">
                <dt className="max-w-[52ch] text-lg font-semibold text-mt-ink">
                  {item.q}
                </dt>
                <dd className="mt-4 max-w-[65ch] text-base leading-relaxed text-mt-slate">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/contact">Book a 15 minute call</Button>
            <Button href="/work" variant="secondary">
              See the work first
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
