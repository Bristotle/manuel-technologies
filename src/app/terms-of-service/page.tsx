import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = { title: "Terms of service", description: "Terms governing use of the Manuel Technologies website and its free tools.", alternates: { canonical: "/terms-of-service" } };

export default function TermsPage() {
  return <main><section className="border-b border-mt-border bg-white py-24 sm:py-32"><Container><SectionLabel>Legal</SectionLabel><h1 className="mt-6">Terms of service</h1><p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">These terms describe the basic conditions for using this website and its free tools.</p></Container></section><section className="py-24"><Container><div className="max-w-[680px] space-y-12"><section><h2 className="!text-2xl">Website information</h2><p className="mt-4 text-lg leading-relaxed text-mt-slate">The website and tools provide general information and planning aids. They are not legal, financial, tax, medical, or professional advice. Check important decisions with a suitably qualified adviser.</p></section><section><h2 className="!text-2xl">Acceptable use</h2><p className="mt-4 text-lg leading-relaxed text-mt-slate">Do not misuse the website, attempt unauthorised access, submit unlawful material, or rely on a tool output where a professional assessment is required.</p></section><section><h2 className="!text-2xl">Contact</h2><p className="mt-4 text-lg leading-relaxed text-mt-slate">Questions about these terms can be sent through the <Link href="/contact" className="text-mt-purple underline">contact page</Link>.</p></section></div></Container></section></main>;
}