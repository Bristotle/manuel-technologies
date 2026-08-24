import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell Manuel Technologies what you are building, growing or scaling. We respond to serious project enquiries within one business day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main>
      <section className="bg-white py-24 sm:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <SectionLabel>Start a conversation</SectionLabel>
              <h1 className="mt-8 max-w-[10ch]">Let&apos;s make the next thing work.</h1>
              <p className="mt-8 max-w-[42ch] text-lg leading-relaxed text-mt-slate">
                Tell us what you are trying to build, grow or scale. You will get a direct reply from the person doing the work, usually within one business day.
              </p>

              <dl className="mt-12 flex flex-col gap-8 border-t border-mt-border pt-8">
                <div>
                  <dt className="mt-label">Email</dt>
                  <dd className="mt-2 text-base font-semibold">
                    <a href={`mailto:${SITE.email}`} className="hover:text-mt-purple">
                      {SITE.email}
                    </a>
                  </dd>
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
                A few concrete details help us understand the shape of the work before we reply.
              </p>
              <div className="mt-10">
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-mt-border py-24 sm:py-32">
        <Container>
          <SectionLabel>What happens next</SectionLabel>
          <div className="mt-8 grid gap-10 md:grid-cols-3">
            <div>
              <h3>01. We read the brief</h3>
              <p className="mt-4 text-mt-slate">We look at the goal, constraints, existing stack and the result that would make the project worthwhile.</p>
            </div>
            <div>
              <h3>02. We ask the useful questions</h3>
              <p className="mt-4 text-mt-slate">No generic discovery call. Just the technical and commercial questions needed to scope the right first step.</p>
            </div>
            <div>
              <h3>03. We agree the first move</h3>
              <p className="mt-4 text-mt-slate">That might be an audit, a fixed build, a roadmap or a clear reason not to proceed yet.</p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}