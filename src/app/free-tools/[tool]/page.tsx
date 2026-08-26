import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FreeToolApp } from "@/components/FreeToolApp";
import { FREE_TOOLS, getFreeTool, type FreeToolSlug } from "@/lib/free-tools";

type PageProps = { params: Promise<{ tool: string }> };

export function generateStaticParams() { return FREE_TOOLS.map((tool) => ({ tool: tool.slug })); }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tool: slug } = await params;
  const tool = getFreeTool(slug);
  if (!tool) return {};
  return { title: tool.name, description: tool.description, alternates: { canonical: `/free-tools/${tool.slug}` } };
}

export default async function FreeToolPage({ params }: PageProps) {
  const { tool: slug } = await params;
  const tool = getFreeTool(slug);
  if (!tool) notFound();
  return <main><section className="border-b border-mt-border bg-white py-24 sm:py-32"><Container><SectionLabel>Free tool</SectionLabel><h1 className="mt-6 max-w-[18ch]">{tool.name}</h1><p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-mt-slate">{tool.intro}</p></Container></section><section className="py-24 sm:py-32"><Container><div className="mx-auto max-w-[860px] border border-mt-border bg-white p-6 sm:p-10"><FreeToolApp slug={slug as FreeToolSlug} /></div></Container></section></main>;
}
