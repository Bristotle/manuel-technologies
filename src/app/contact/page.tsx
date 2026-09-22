import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WorkProcess } from "@/components/WorkProcess";
import { CONTACT, SITE } from "@/lib/site";
import { ogCard } from "@/lib/og";

export const metadata: Metadata = {
  openGraph: { images: [ogCard("Start a conversation", "Contact")] },
  title: "Contact",
  description:
    "Tell Manuel Technologies what you are building, growing or scaling. We respond to serious project enquiries within one business day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Manuel Technologies",
    url: `${SITE.url}/contact`,
    description: metadata.description,
    mainEntity: { "@type": "Organization", name: SITE.name, url: SITE.url, email: SITE.email, telephone: CONTACT.tel },
  };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative overflow-hidden bg-white py-24 sm:py-32">
        <Container className="relative">
          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <SectionLabel>Start a conversation</SectionLabel>
              <h1 className="mt-8 max-w-[10ch]">Let&apos;s make the next thing work.</h1>
              <p className="mt-8 max-w-[42ch] text-lg leading-relaxed text-mt-slate">
                Tell us what you are trying to build, grow or scale. You will get a direct reply from the person doing the work, usually within one business day.
              </p>
              <p className="mt-4 max-w-[42ch] text-[0.9375rem] leading-relaxed text-mt-slate">
                Want a number first?{" "}
                <Link href="/pricing" className="font-semibold text-mt-purple hover:underline">Every price is published</Link>
                , with what it includes.
              </p>

              <dl className="mt-12 flex flex-col gap-8 border-t border-mt-border pt-8">
                <div>
                  <dt className="mt-label">Phone</dt>
                  <dd className="mt-2 text-base font-semibold">
                    <a href={`tel:${CONTACT.tel}`} className="hover:text-mt-purple">{CONTACT.phone}</a>
                  </dd>
                </div>
                <div>
                  <dt className="mt-label">Email</dt>
                  <dd className="mt-2 text-base font-semibold">
                    <a href={`mailto:${SITE.email}`} className="hover:text-mt-purple">
                      {SITE.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="mt-label">Where</dt>
                  <dd className="mt-2 text-base font-semibold">{CONTACT.office}</dd>
                </div>
                <div>
                  <dt className="mt-label">Hours</dt>
                  <dd className="mt-2 text-base font-semibold">{CONTACT.hours}</dd>
                </div>
                <div>
                  <dt className="mt-label">Typical response</dt>
                  <dd className="mt-2 text-base font-semibold">Within one business day</dd>
                </div>
                <div>
                  <dt className="mt-label">Working worldwide</dt>
                  <dd className="mt-2 text-base font-semibold">Remote, across time zones</dd>
                </div>
              </dl>
            </div>

            <div className="border border-mt-border bg-mt-surface p-6 sm:p-10">
              <SectionLabel>Project enquiry</SectionLabel>
              <h2 className="mt-6 max-w-[16ch]">Give us enough to be useful.</h2>
              <p className="mt-6 max-w-[52ch] text-base text-mt-slate">
                Free, no obligation. We respond within 24 hours, 7 days a week.
              </p>
              <div className="mt-10">
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <WorkProcess compact />
    </main>
  );
}