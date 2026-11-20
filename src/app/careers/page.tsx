import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SITE } from "@/lib/site";
import { ogCard } from "@/lib/og";
import { ROLES } from "@/lib/careers";

/* Careers. A short index of open roles. Each role has its own page with the
   full advert and its JobPosting schema; this page only lists them. */

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Open roles at Manuel Technologies. We are hiring Tech Sales Representatives in the Western, Central and Western North regions, with training on the job.",
  alternates: { canonical: "/careers" },
  openGraph: {
    images: [ogCard("Work with us", "Careers")],
    title: `Careers | ${SITE.name}`,
    description: "Open roles at Manuel Technologies, starting with field sales in the Western, Central and Western North regions.",
    url: `${SITE.url}/careers`,
  },
};

export default function Careers() {
  const open = ROLES.filter((r) => r.open);
  return (
    <main>
      <section className="relative overflow-hidden bg-white py-24 sm:py-32">
        <Container className="relative">
          <SectionLabel>Careers</SectionLabel>
          <h1 className="mt-6 max-w-[18ch]">
            Help local businesses <span className="text-mt-purple">run on better software.</span>
          </h1>
          <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">
            We build MPOS, the till and stock system for Ghanaian businesses, and the websites
            that bring those businesses their customers. We are growing region by region,
            starting with the Western, Central and Western North regions.
          </p>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <SectionLabel>Open roles</SectionLabel>
          <h2 className="mt-6">{open.length === 1 ? "One role open now." : `${open.length} roles open now.`}</h2>

          <ul className="mt-12 grid gap-6">
            {open.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/careers/${r.slug}`}
                  className="group grid overflow-hidden rounded-[18px] border border-mt-border bg-white transition-colors duration-150 hover:border-mt-purple md:grid-cols-[1fr_380px]"
                >
                  <div className="p-8">
                    <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.18em] text-mt-muted">
                      {r.regions.join(", ")} regions
                    </span>
                    <h3 className="mt-4 !text-2xl group-hover:text-mt-purple">{r.title}</h3>
                    <p className="mt-3 max-w-[60ch] leading-relaxed text-mt-slate">{r.summary}</p>
                    <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem] text-mt-ink">
                      <strong>{r.pay.label} + 10% commission</strong>
                      <span>{r.type}</span>
                    </p>
                    <span className="mt-8 inline-flex items-center gap-2 font-semibold text-mt-purple">
                      Read the role and apply
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </span>
                  </div>
                  <div className="relative hidden border-l border-mt-border bg-mt-surface md:block">
                    <Image
                      src="/work/manuelpos.webp"
                      alt="MPOS, the point of sale system this role sells"
                      width={1200}
                      height={750}
                      sizes="380px"
                      className="h-full w-full object-cover object-left-top"
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-12 max-w-[65ch] leading-relaxed text-mt-slate">
            No role that fits? Send a short note about what you would bring on{" "}
            <Link href="/contact" className="text-mt-purple underline decoration-mt-purple/30 underline-offset-4 hover:decoration-mt-purple">
              the contact page
            </Link>
            . We keep every message and come back to it when a role opens.
          </p>
        </Container>
      </section>
    </main>
  );
}
