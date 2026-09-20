import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { TERMS } from "@/lib/legal";
import { ogCard } from "@/lib/og";

export const metadata: Metadata = {
  title: "Terms of service",
  description: "Terms for using manueltechnologies.com and its free tools, and the commercial terms that apply when you engage Manuel Technologies: scope, payment, handover, ownership and liability.",
  alternates: { canonical: "/terms-of-service" },
  openGraph: { images: [ogCard("Terms of service", "Legal")] },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of service"
      intro="How the website and free tools may be used, and the terms that apply when you engage us: what a scope contains, how payment and handover work, who owns what, and where our responsibility ends."
      sections={TERMS}
    />
  );
}
