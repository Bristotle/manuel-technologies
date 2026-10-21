import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MPOS } from "@/lib/mpos";
import type { Accent } from "@/lib/accent";

/* ManuelPOS as proof on a pillar. The point it makes: Manuel Technologies
   ships and operates production software, not only websites. Facts from
   lib/mpos.ts, so this never says more than mpos.bz does. */
export function ManuelPosProof({ accent = "purple", surface = false }: { accent?: Accent; surface?: boolean }) {
  return (
    <section className={`border-b border-mt-border py-24 sm:py-32 ${surface ? "bg-mt-surface" : "bg-white"}`}>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <Link href="/mpos" className="block overflow-hidden rounded-[18px] border border-mt-border bg-mt-surface transition-colors duration-150 hover:border-mt-purple">
            <Image src="/work/manuelpos.webp" alt="ManuelPOS, the till and appointments screens" width={1200} height={750} sizes="(min-width: 1024px) 50vw, 100vw" className="h-auto w-full" />
          </Link>
          <div>
            <SectionLabel accent={accent}>Software we run</SectionLabel>
            <h2 className="mt-6 max-w-[20ch]">We ship production software, and run it.</h2>
            <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-mt-slate">
              ManuelPOS is our own till, bookings and stock system for six kinds of business in Ghana. It is built for a business to run its whole day on, so it has to keep working when the network does not.
            </p>
            <ul className="mt-8 flex flex-col gap-3">
              {MPOS.features.slice(0, 3).map((f) => (
                <li key={f.title} className="flex gap-3 text-[0.9375rem] leading-relaxed text-mt-slate">
                  <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-mt-purple" />
                  <span><strong className="font-semibold text-mt-ink">{f.title}.</strong> {f.body.split(". ")[0]}.</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/mpos">See ManuelPOS</Button>
              <Button href={MPOS.url} external variant="secondary">Visit mpos.bz</Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
