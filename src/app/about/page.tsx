import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Manuel Technologies is led by Emmanuel Akyeam, a technical SEO manager working with US digital agencies. Clients in the UK, US, UAE and Ghana.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <main>
      <section className="bg-white py-24 sm:py-32">
        <Container>
          <SectionLabel>About</SectionLabel>
          <h1 className="mt-6 max-w-[18ch]">
            The technical team you do not have yet.
          </h1>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container size="prose">
          <div className="flex flex-col gap-6 text-lg leading-relaxed text-mt-slate">
            <p>
              Manuel Technologies is led by <strong className="text-mt-ink">Emmanuel Akyeam</strong>,
              a technical SEO manager working with US digital agencies.
            </p>
            <p>
              He has led website and SEO programmes for clients across the
              United States, Australia, the United Kingdom and Ghana, covering
              ecommerce at catalogue scale, regulated professional services,
              healthcare and retail.
            </p>
            <p>
              He also builds the tooling he uses. CWV Drift Monitor is a Core
              Web Vitals extension published on the Chrome Web Store, built
              because auditing client performance through Lighthouse reports was
              slower than it needed to be. A WordPress plugin is next.
            </p>
            <p className="text-mt-ink">
              Most agencies sell you capacity, then hand your work to whoever is
              free. This is the opposite arrangement. You get the person who
              does this professionally, directly.
            </p>
          </div>

          <div className="mt-14">
            <Button href={`mailto:${SITE.email}`}>Start a conversation</Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
