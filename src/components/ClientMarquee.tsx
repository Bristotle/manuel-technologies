import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CLIENTS, type Client } from "@/lib/clients";

/* Trusted by. Two rails floating in opposite directions.
   ---------------------------------------------------------------------------
   Zero JavaScript. The track is duplicated in markup and translated exactly
   -50%, so the loop has no visible join. Only transform is animated, which
   keeps it on the compositor and off the main thread, so it costs nothing
   against INP and nothing against CLS.

   Names are set as wordmarks rather than as image logos. Three reasons, and
   they hold until Emmanuel has written permission and the actual asset files:
   we do not hold licence to reproduce a client's mark, twelve logo files is
   twelve image requests carrying no information the name does not already
   carry, and a mismatched set of scraped PNGs at different weights and crops
   looks worse than clean type. When real SVGs arrive with permission, drop
   them into /public/clients, set `logo` on the client, and this component
   renders them instead with no other change.
   -------------------------------------------------------------------------- */

function Wordmark({ client }: { client: Client }) {
  return (
    <li className="flex shrink-0 items-center gap-8 pr-8">
      <span className="whitespace-nowrap text-xl font-extrabold tracking-[-0.02em] text-mt-slate transition-colors duration-200 hover:text-mt-ink sm:text-2xl">
        {client.display ?? client.name}
      </span>
      <span
        aria-hidden="true"
        className="font-[family-name:var(--font-mono)] text-xs text-mt-purple"
      >
        +
      </span>
    </li>
  );
}

function Rail({
  clients,
  reverse,
}: {
  clients: Client[];
  reverse?: boolean;
}) {
  const track = (
    <ul
      aria-hidden="true"
      className="flex shrink-0 items-center"
    >
      {clients.map((client) => (
        <Wordmark key={client.name} client={client} />
      ))}
    </ul>
  );

  return (
    <div className="mt-marquee-mask mt-marquee-hold overflow-hidden">
      <div
        className={`mt-marquee mt-marquee-slow${
          reverse ? " mt-marquee-reverse" : ""
        }`}
      >
        {track}
        {track}
      </div>
    </div>
  );
}

export function ClientMarquee() {
  /* Split into two rails. Odd and even rather than first half and second
     half, so neither rail is all the recognisable names. */
  const top = CLIENTS.filter((_, i) => i % 2 === 0);
  const bottom = CLIENTS.filter((_, i) => i % 2 === 1);

  return (
    <section className="border-y border-mt-border bg-white py-20 sm:py-24">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel>Trusted by</SectionLabel>
            <h2 className="mt-5 max-w-[24ch] !text-2xl sm:!text-3xl">
              Universities, research firms, retailers, and founders.
            </h2>
          </div>
          <p className="max-w-[40ch] text-[0.9375rem] leading-relaxed text-mt-slate">
            The work ranges from a single landing page to a full platform. The
            standard does not change with the size of it.
          </p>
        </div>
      </Container>

      {/* Rails break the container deliberately. Edge to edge is the point. */}
      <div className="mt-14 flex flex-col gap-6">
        <Rail clients={top} />
        <Rail clients={bottom} reverse />
      </div>

      {/* The rails are aria-hidden because a screen reader should not walk a
          duplicated infinite list. This is the accessible equivalent. */}
      <p className="sr-only">
        Organisations we have worked with:{" "}
        {CLIENTS.map((client) => client.name).join(", ")}.
      </p>
    </section>
  );
}
