import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PROJECTS, type Project } from "@/lib/site";

/* --------------------------------------------------------------------------
   Work reel, directly under the homepage hero. From diptell.com, 5 November
   2026: a dark panel of real screenshots moving upward in two columns at
   different speeds, with one round link in the middle to the work.

   What changed on the way in. Diptell spins its badge and runs on Framer
   with a smooth scroll library. Here the columns are tier 1 motion, a
   vertical marquee: @keyframes translateY on a duplicated track, exactly
   -50%, so the loop has no join. Server component, no client JavaScript.
   The badge does not spin, because CLAUDE.md section 4 says nothing spins.

   Every tile is a live site from PROJECTS, so the reel updates itself when
   a project with a screenshot is added. Hover or focus pauses it, and
   reduced motion stops it.

   Images: no `priority`, the hero H1 stays the LCP element. Columns hidden at a
   breakpoint are display:none, so lazy loading never fetches them.
   -------------------------------------------------------------------------- */

function Tile({ project, hidden }: { project: Project; hidden?: boolean }) {
  return (
    <li className="pb-4">
      <figure className="relative overflow-hidden rounded-[18px] border border-white/10 bg-white">
        <Image
          src={project.thumb!}
          alt={hidden ? "" : `${project.client} homepage, live at ${project.url.replace("https://", "")}`}
          width={1200}
          height={750}
          sizes="(min-width: 1024px) 480px, (min-width: 768px) 45vw, 100vw"
          className="h-auto w-full"
        />
        <figcaption className="absolute bottom-3 left-3 mr-3 rounded-[20px] bg-mt-ink px-3 py-1.5 font-[family-name:var(--font-mono)] text-[0.625rem] uppercase tracking-[0.14em] text-white">
          {project.client}
          {project.metric && <span className="whitespace-nowrap text-mt-lilac"> · {project.metric}</span>}
        </figcaption>
      </figure>
    </li>
  );
}

function Column({ items, className }: { items: Project[]; className: string }) {
  return (
    <div className={`mt-reel ${className}`}>
      <ul>
        {items.map((p) => (
          <Tile key={p.slug} project={p} />
        ))}
      </ul>
      <ul aria-hidden="true">
        {items.map((p) => (
          <Tile key={p.slug} project={p} hidden />
        ))}
      </ul>
    </div>
  );
}

export function WorkReel() {
  const shots = PROJECTS.filter((p) => p.thumb);
  const left = shots.filter((_, i) => i % 2 === 0);
  const right = shots.filter((_, i) => i % 2 === 1);

  return (
    <section aria-label="Recent work" className="bg-white pb-24 sm:pb-32">
      <Container>
        <div className="mt-reel-hold relative h-[520px] overflow-hidden rounded-[18px] bg-mt-ink p-4 sm:h-[680px] sm:p-6">
          <div className="mt-reel-mask grid h-full gap-4 md:grid-cols-2 sm:gap-6">
            {/* A phone gets one column carrying every screenshot. Hidden
                columns never fetch their lazy images. */}
            <Column items={shots} className="mt-reel-a md:hidden" />
            <Column items={left} className="mt-reel-a hidden md:block" />
            <Column items={right} className="mt-reel-b hidden md:block" />
          </div>

          {/* The one link in the panel. Static, round, on top of the reel. */}
          <Link
            href="/work"
            className="absolute left-1/2 top-1/2 z-10 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2 rounded-full border border-white/20 bg-mt-ink text-center text-white transition-colors duration-150 hover:border-mt-lilac hover:bg-mt-purple active:bg-mt-purple-light"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-6 w-6">
              <path d="M3.5 7.5A1.5 1.5 0 0 1 5 6h4l2 2h8a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 19 19H5a1.5 1.5 0 0 1-1.5-1.5Z" />
            </svg>
            <span className="font-[family-name:var(--font-mono)] text-[0.625rem] uppercase leading-relaxed tracking-[0.18em]">
              ( See the
              <br />
              work )
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
