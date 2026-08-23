import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work from Manuel Technologies. Ecommerce, regulated professional services, healthcare and our own shipped software.",
  alternates: { canonical: "/work" },
};

export default function Work() {
  return (
    <main>
      <section className="bg-white py-24 sm:py-32">
        <Container>
          <SectionLabel>Work</SectionLabel>
          <h1 className="mt-6 max-w-[16ch]">Things we shipped.</h1>
          <p className="mt-8 max-w-[60ch] text-lg text-mt-slate">
            Four markets, three regulated sectors, and software you can install
            and check for yourself.
          </p>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            <Card>
              <SectionLabel>Our own product</SectionLabel>
              <h2 className="mt-4 !text-xl">CWV Drift Monitor</h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-mt-slate">
                A Chrome extension that reports mobile and desktop performance
                scores, live Core Web Vitals and ranked fixes the moment you
                open it. No API key, no account, no tracking. Built with
                Manifest V3 and the native PerformanceObserver API.
              </p>
              <p className="mt-4 text-[0.9375rem] text-mt-slate">
                Live on the Chrome Web Store, free, in Developer Tools.
              </p>
              <div className="mt-6">
                <Button href={SITE.chromeStore} variant="secondary" external>
                  View on the Chrome Web Store
                </Button>
              </div>
            </Card>

            <Card>
              <SectionLabel>More case studies</SectionLabel>
              <h2 className="mt-4 !text-xl">Being written up now</h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-mt-slate">
                Client work across ecommerce in the UAE, UK tax and accountancy,
                US healthcare and Ghanaian retail is being documented properly,
                with the numbers rather than adjectives.
              </p>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-mt-slate">
                If you want to see something specific before then, ask and we
                will walk you through it.
              </p>
              <div className="mt-6">
                <Button href={`mailto:${SITE.email}`} variant="secondary">
                  Ask about a project
                </Button>
              </div>
            </Card>
          </div>
        </Container>
      </section>
    </main>
  );
}
