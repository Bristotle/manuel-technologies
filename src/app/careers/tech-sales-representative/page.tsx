import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { SITE, CONTACT } from "@/lib/site";
import { ogCard } from "@/lib/og";
import { MPOS } from "@/lib/mpos";
import { roleBySlug, ROMAN } from "@/lib/careers";

/* Tech Sales Representative. The first sales hire, 20 November 2026.

   Layout logic taken from a careers advert Emmanuel sent (title, meta line,
   apply first, then the role, targets, pay, requirements and how to apply).
   Copy, colours and claims are our own.

   Applications go by WhatsApp, the channel the candidates actually use, with
   the business email as the alternative. The email link's visible text is the
   address itself, which CLAUDE.md section 8 allows. */

const role = roleBySlug("tech-sales-representative")!;
const SUBJECT = `Application: ${role.title}: Your full name`;
const WA_TEXT = `Hello, I am applying for the ${role.title} role.\nName:\nTown and region:\nSales or customer experience:\nI will send my CV here.`;
const WHATSAPP = `${CONTACT.whatsapp}?text=${encodeURIComponent(WA_TEXT)}`;

const TOWNS = [
  { region: "Western", towns: "Sekondi-Takoradi, Tarkwa, Axim, Prestea" },
  { region: "Central", towns: "Cape Coast, Kasoa, Winneba, Mankessim" },
  { region: "Western North", towns: "Sefwi Wiawso, Bibiani, Enchi, Juaboso" },
] as const;

const DO = [
  "Visit shops, restaurants, chop bars, salons, barbershops and pharmacies, and find the owners who are still writing sales in a book.",
  "Show MPOS working on a phone: a sale, a receipt, MoMo, the stock count and the owner's report.",
  "Help new businesses through the free 14 day trial: adding their products or menu and ringing up their first real sales.",
  "Follow up by phone and WhatsApp until each trial becomes a paying customer, or a clear no.",
  "Log every visit, demo and follow up the same day, so nothing is lost.",
] as const;

const TARGETS = [
  { metric: "Businesses visited", note: "New owners spoken to in person" },
  { metric: "Demos given", note: "MPOS shown working, start to finish" },
  { metric: "Trials started", note: "Accounts set up with real products" },
  { metric: "Paying customers", note: "Trials that become paid licences" },
] as const;

const GET = [
  <><strong className="text-mt-ink">{role.pay.label}</strong> basic pay, paid monthly.</>,
  <><strong className="text-mt-ink">10% commission</strong> on every client you bring in who pays in full. The more you close, the more you earn.</>,
  <><strong className="text-mt-ink">Data bundle + airtime</strong>, paid every two weeks, so you stay connected to every prospect: calls, WhatsApp and demos.</>,
  <>A <strong className="text-mt-ink">6 month contract</strong>, with room to extend and grow depending on your performance.</>,
  "Training on the job: how MPOS works, how to demo it, and how to close, from the people who build it.",
  "A demo account to sell with, on your own phone.",
  "As we expand from these three regions to the rest of Ghana, the strongest performers lead the new areas.",
] as const;

const LOOK = [
  "You live in, or know well, the Western, Central or Western North region.",
  "You are comfortable walking into a business and starting a conversation with the owner.",
  "You speak English and at least one local language, such as Fante, Twi, Nzema or Sefwi.",
  "You own a smartphone and use apps every day. MoMo, WhatsApp and Google Maps are second nature.",
  "You work to targets without being chased. Sales or customer service experience is a plus, not a requirement.",
] as const;

const STEPS = [
  { title: "Send your CV", body: "On WhatsApp or by email, with a short note: your name, your town, and why you want this role." },
  { title: "A short call", body: "Shortlisted candidates get a 15 minute phone call. Only shortlisted candidates are contacted." },
  { title: "Meet and demo", body: "An interview in person, where you show MPOS to us as if we were a shop owner. We teach you the demo first." },
] as const;

export const metadata: Metadata = {
  title: `${role.title}, ${role.regions.join(", ")}`,
  description: `We are hiring a ${role.title} in the Western, Central and Western North regions. ${role.pay.label} plus 10% commission, with data and airtime paid every two weeks. 6 month contract, training on the job.`,
  alternates: { canonical: `/careers/${role.slug}` },
  openGraph: {
    images: [ogCard(role.title, "Careers")],
    title: `${role.title} | ${SITE.name}`,
    description: `${role.pay.label} plus 10% commission. Field sales in the Western, Central and Western North regions, 6 month contract, training on the job.`,
    url: `${SITE.url}/careers/${role.slug}`,
  },
};

const Arrow = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

function Bullets({ items }: { items: readonly React.ReactNode[] }) {
  return (
    <ul className="mt-8 grid gap-4 text-lg leading-relaxed text-mt-slate">
      {items.map((t, i) => (
        <li key={i} className="flex gap-4">
          <span aria-hidden="true" className="mt-3 h-1.5 w-1.5 flex-none rounded-full bg-mt-purple" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export default function TechSalesRepresentative() {
  const jobJsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: role.title,
    description: `<p>${role.summary}</p><ul>${DO.map((d) => `<li>${d}</li>`).join("")}</ul>`,
    datePosted: role.posted,
    validThrough: `${role.closes}T23:59:59+00:00`,
    employmentType: role.employmentType,
    hiringOrganization: { "@type": "Organization", name: SITE.name, sameAs: SITE.url, logo: `${SITE.url}/logo.svg` },
    jobLocation: role.regions.map((r) => ({
      "@type": "Place",
      address: { "@type": "PostalAddress", addressRegion: `${r} Region`, addressCountry: "GH" },
    })),
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: role.pay.currency,
      value: { "@type": "QuantitativeValue", value: role.pay.amount, unitText: role.pay.unit },
    },
    incentiveCompensation: role.commission,
    jobBenefits: role.allowances,
    directApply: false,
  };
  const crumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Careers", item: `${SITE.url}/careers` },
      { "@type": "ListItem", position: 2, name: role.title, item: `${SITE.url}/careers/${role.slug}` },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbsJsonLd) }} />

      {/* Title, the facts a candidate checks first, and the apply button. */}
      <section className="relative overflow-hidden bg-white pb-16 pt-16 sm:pb-24 sm:pt-24">
        <Container className="relative">
          <nav aria-label="Breadcrumb" className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.18em] text-mt-muted">
            <Link href="/careers" className="hover:text-mt-purple">Careers</Link>
            <span aria-hidden="true"> / </span>
            <span className="text-mt-ink">{role.title}</span>
          </nav>
          <h1 className="mt-8 max-w-[14ch]">
            {role.title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-mt-purple">{role.title.split(" ").slice(-1)}</span>
          </h1>

          <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-4 text-[0.9375rem]">
            {[
              ["Pay", role.pay.label],
              ["Commission", "10% on full payments"],
              ["Contract", "6 months, full time"],
              ["Where", `${role.regions.join(", ")} regions`],
              ["Closes", "31 December 2026"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.18em] text-mt-muted">{k}</dt>
                <dd className="mt-1 font-semibold text-mt-ink">{v}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">
            Bring local businesses onto MPOS, our point of sale, stock and reports system.
            You will find owners, show them the system working on a phone, and help
            them through a free trial until they become paying customers. We train you on the job.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={WHATSAPP} external>Apply on WhatsApp</Button>
            <Button href="#apply" variant="secondary">How to apply</Button>
          </div>
        </Container>
      </section>

      {/* Regions first: it is the deciding fact for most applicants. */}
      <section className="border-y border-mt-border py-24 sm:py-32">
        <Container>
          <SectionLabel>Where we are hiring</SectionLabel>
          <h2 className="mt-6 max-w-[22ch]">Three regions first. <span className="text-mt-purple">The rest of Ghana next.</span></h2>
          <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">
            We are growing with the businesses in our own part of the country before anywhere
            else. Candidates who live anywhere in these regions, not only the regional capitals, are given favourable consideration,
            because you already know the towns, the markets and the people.
          </p>
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {TOWNS.map((t) => (
              <li key={t.region} className="rounded-[18px] border border-mt-border bg-white p-8">
                <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.18em] text-mt-purple">( {t.region} )</span>
                <p className="mt-4 leading-relaxed text-mt-slate">{t.towns}, and the towns around them.</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* What they sell, shown rather than described. */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionLabel>What you will sell</SectionLabel>
              <h2 className="mt-6 max-w-[18ch]">One product: a till that works when the network does not.</h2>
              <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">{MPOS.summary}</p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {MPOS.businessTypes.map((b) => (
                  <li key={b.name} className="rounded-full border border-mt-border bg-white px-4 py-2 text-[0.9375rem] text-mt-ink">{b.name}</li>
                ))}
              </ul>
              <p className="mt-8">
                <a href={MPOS.url} rel="noopener" className="inline-flex items-center gap-2 font-semibold text-mt-purple underline decoration-mt-purple/30 underline-offset-4 hover:decoration-mt-purple">
                  See MPOS on mpos.bz <Arrow />
                </a>
              </p>
            </div>
            <div className="overflow-hidden rounded-[18px] border border-mt-border bg-white">
              <Image
                src="/work/manuelpos.webp"
                alt="The MPOS homepage, showing the till and the appointments screen"
                width={1200}
                height={750}
                priority
                sizes="(min-width: 1024px) 480px, 100vw"
                className="h-auto w-full"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-mt-border bg-white py-24 sm:py-32">
        <Container size="prose">
          <SectionLabel>What you will do</SectionLabel>
          <h2 className="mt-6">A normal week in the field.</h2>
          <Bullets items={DO} />
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <SectionLabel>Targets</SectionLabel>
          <h2 className="mt-6 max-w-[22ch]">Four numbers, reviewed weekly and monthly.</h2>
          <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">
            Exact targets are agreed at interview and start low while you learn. They rise as
            you find your feet.
          </p>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TARGETS.map((t, i) => (
              <li key={t.metric} className="border-t border-mt-border pt-6">
                <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.18em] text-mt-purple">{ROMAN[i]}</span>
                <h3 className="mt-4 !text-lg !tracking-tight">{t.metric}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-mt-slate">{t.note}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-y border-mt-border bg-white py-24 sm:py-32">
        <Container size="prose">
          <SectionLabel>What you get</SectionLabel>
          <h2 className="mt-6">Basic pay, commission, and room to grow.</h2>
          <Bullets items={GET} />
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container size="prose">
          <SectionLabel>Who we are looking for</SectionLabel>
          <h2 className="mt-6">Curious, local and comfortable talking to owners.</h2>
          <Bullets items={LOOK} />
        </Container>
      </section>

      <section id="apply" className="scroll-mt-24 border-t border-mt-border bg-white py-24 sm:py-32">
        <Container>
          <SectionLabel>How to apply</SectionLabel>
          <h2 className="mt-6 max-w-[20ch]">Three steps, and we teach you the demo.</h2>
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.title} className="rounded-[18px] border border-mt-border p-8">
                <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.18em] text-mt-purple">{ROMAN[i]}</span>
                <h3 className="mt-4 !text-lg !tracking-tight">{s.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-mt-slate">{s.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-12 grid gap-8 rounded-[18px] border border-mt-border bg-mt-surface p-8 md:grid-cols-2">
            <div>
              <h3 className="!text-lg !tracking-tight">On WhatsApp</h3>
              <p className="mt-2 leading-relaxed text-mt-slate">
                Message {CONTACT.phone.replace("+233 ", "0")} and send your CV as a document or a clear photo.
              </p>
              <div className="mt-6"><Button href={WHATSAPP} external>Apply on WhatsApp</Button></div>
            </div>
            <div>
              <h3 className="!text-lg !tracking-tight">By email</h3>
              <p className="mt-2 leading-relaxed text-mt-slate">
                Send your CV to{" "}
                <a href={`mailto:${SITE.email}?subject=${encodeURIComponent(SUBJECT)}`} className="font-semibold text-mt-purple underline decoration-mt-purple/30 underline-offset-4 hover:decoration-mt-purple">
                  {SITE.email}
                </a>
                , with the subject line:
              </p>
              <p className="mt-4 rounded-[10px] border border-mt-border bg-white px-4 py-3 font-[family-name:var(--font-mono)] text-sm text-mt-ink">{SUBJECT}</p>
            </div>
          </div>

          <p className="mt-8 max-w-[65ch] leading-relaxed text-mt-slate">
            Applications close on 31 December 2026. Only shortlisted candidates are contacted.{" "}
            <Link href="/careers" className="text-mt-purple underline decoration-mt-purple/30 underline-offset-4 hover:decoration-mt-purple">
              See all open roles
            </Link>
            .
          </p>
        </Container>
      </section>
    </main>
  );
}
