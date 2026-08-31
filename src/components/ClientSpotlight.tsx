import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FEATURED_TESTIMONIAL } from "@/lib/testimonials";

/* Client spotlight. REF, higglo.io client spotlight band.
   ---------------------------------------------------------------------------
   Taken: the single featured quote rather than a grid, the lead line set at
   display size so it carries the section, one emphasised phrase inside it, and
   an attribution row that puts the person on the left and the company on the
   right with a rule above.

   NOT taken, deliberately:

   - The dark ground. CallToAction.tsx documents that it "carries the only dark
     ground on the site, which is what makes it read as an ending rather than
     another section". A second dark band would spend that, so this sits on
     white with the surface tint behind the quote.
   - The blue italic accent. Palette is locked to one accent. The emphasised
     phrase is purple, and it is the only purple in this viewport.
   - Their serif. Typeface is set once in layout.tsx.

   CLAUDE.md section 9: take layout logic and hierarchy from a reference, never
   its colour, typeface or sentences.

   The quote runs to about 180 words, well past the two to four sentences the
   grid card is built for. So the lead sentence is set large and the rest
   follows at body size. The text is verbatim in both cases. A testimonial
   attributed to a named person is never edited to fit house style, which is
   why the em dash rule and the sentence length guidance do not apply to the
   words inside <blockquote>.

   Renders nothing when no permissioned quote is marked featured.
   -------------------------------------------------------------------------- */

/* The phrase set in the accent colour. It must appear verbatim inside the
   quote, or the quote renders unmarked rather than being altered to fit. */
const EMPHASIS = "set the standard";

function LeadQuote({ text }: { text: string }) {
  const at = text.indexOf(EMPHASIS);
  if (at === -1) return <>{text}</>;

  return (
    <>
      {text.slice(0, at)}
      <em className="not-italic text-mt-purple">{EMPHASIS}</em>
      {text.slice(at + EMPHASIS.length)}
    </>
  );
}

export function ClientSpotlight() {
  const item = FEATURED_TESTIMONIAL;
  if (!item) return null;

  const initials = item.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <section className="border-y border-mt-border bg-white py-24 sm:py-32">
      <Container>
        <SectionLabel>Client spotlight</SectionLabel>

        <figure className="mt-10">
          <blockquote>
            <p className="max-w-[20ch] text-[1.75rem] leading-[1.15] tracking-[-0.025em] text-mt-ink sm:max-w-[24ch] sm:text-[2.5rem] lg:text-[3rem]">
              <LeadQuote text={item.quote} />
            </p>

            {item.continuation && (
              <div className="mt-10 grid gap-8 md:grid-cols-2">
                {item.continuation.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="max-w-[62ch] text-lg leading-relaxed text-mt-slate"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </blockquote>

          <figcaption className="mt-12 flex flex-col gap-6 border-t border-mt-border pt-8 sm:flex-row sm:items-center sm:justify-between">
            <span className="flex items-center gap-4">
              {item.photo ? (
                <Image
                  src={item.photo}
                  alt={item.name}
                  width={44}
                  height={44}
                  sizes="44px"
                  className="h-11 w-11 rounded-full object-cover"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-mt-surface text-sm font-extrabold text-mt-purple"
                >
                  {initials}
                </span>
              )}
              <span className="flex flex-col">
                <span className="text-base font-semibold text-mt-ink">
                  {item.name}
                </span>
                <span className="text-[0.9375rem] leading-snug text-mt-slate">
                  {item.role}, {item.company}
                </span>
              </span>
            </span>

            {/* Company mark on the right, as the reference does. Linked so the
                reader can confirm the company exists rather than take it on
                trust, which is the entire point of a testimonial. */}
            {item.companyUrl ? (
              <a
                href={item.companyUrl}
                rel="noopener"
                className="font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.18em] text-mt-muted transition-colors duration-150 hover:text-mt-purple active:text-mt-purple-light"
              >
                {item.company}
              </a>
            ) : (
              <span className="font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.18em] text-mt-muted">
                {item.company}
              </span>
            )}
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
