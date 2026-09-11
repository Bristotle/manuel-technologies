import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PILLARS } from "@/lib/site";

/* 404. Until this file existed the site served Next.js's unstyled default:
   no navigation, no footer, no logo, one link. It is the page a stranger
   arriving from a stale backlink is most likely to see first, on a site
   whose proposition is building websites properly. */

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main>
      <section className="border-b border-mt-border bg-white py-24 sm:py-32">
        <Container>
          <SectionLabel>404</SectionLabel>
          <h1 className="mt-6 max-w-[18ch]">That page is not here.</h1>
          <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">
            The address may have changed, or the link that brought you here was
            wrong. Nothing is broken on your side. Everything on the site is
            reachable from the links below.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/">Go to the homepage</Button>
            <Button href="/contact" variant="secondary">Tell us what you were looking for</Button>
          </div>
        </Container>
      </section>
      <section className="py-24 sm:py-32">
        <Container>
          <SectionLabel>Where to go instead</SectionLabel>
          <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ...PILLARS.map((p) => ({ name: `${p.name}: ${p.promise}`, href: `/${p.slug}` })),
              { name: "Work: live sites and case studies", href: "/work" },
              { name: "Pricing: four tiers and care plans", href: "/pricing" },
              { name: "Free tools: twelve, no email required", href: "/free-tools" },
              { name: "Free audit: score any site in fifteen seconds", href: "/free-audit" },
              { name: "Blog: articles by category", href: "/blog" },
              { name: "About: how the work is run", href: "/about" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-[0.9375rem] font-semibold text-mt-slate transition-colors duration-150 hover:text-mt-purple">{l.name}</Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </main>
  );
}
