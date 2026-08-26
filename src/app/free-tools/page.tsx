import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FreeToolsLab } from "@/components/FreeToolsLab";

export const metadata: Metadata = {
  title: "Free SEO and performance tools",
  description: "Free tools for SEO briefs, search snippets, content planning, and Core Web Vitals budgets.",
  alternates: { canonical: "/free-tools" },
};

export default function FreeToolsPage() {
  return <main><section className="border-b border-mt-border bg-white py-24 sm:py-32"><Container><SectionLabel>Free tools</SectionLabel><h1 className="mt-6 max-w-[16ch]">Useful checks for the work before launch.</h1><p className="mt-8 max-w-[60ch] text-lg leading-relaxed text-mt-slate">Small, practical tools for teams planning content, improving search snippets, and protecting page experience. No account required.</p></Container></section><section className="py-24 sm:py-32"><Container><FreeToolsLab /></Container></section></main>;
}
