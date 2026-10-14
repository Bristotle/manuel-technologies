import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { PRIVACY, PRIVACY_UPDATED } from "@/lib/legal";
import { ogCard } from "@/lib/og";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "What manueltechnologies.com collects through its contact form, newsletter, free tools and analytics, why, who processes it, and your rights.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: { images: [ogCard("Privacy policy", "Legal")] },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      intro="What this website collects, why, who processes it, and what you can ask us to do with it. The short version: only what a feature needs, no advertising cookies, no analytics cookies for UK and EU visitors, and nothing sold."
      sections={PRIVACY}
      updated={PRIVACY_UPDATED}
    />
  );
}
