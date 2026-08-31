import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FEATURED_TESTIMONIAL } from "@/lib/testimonials";

/* Client spotlight. REF, higglo.io client spotlight band.
   ---------------------------------------------------------------------------
   Emmanuel asked for this to match the reference directly, including the dark
   ground. Taken: the dark band, the single featured quote rather than a grid,
   the lead line set at display size carrying the whole section, decorative
   quotation marks opening and closing it, one emphasised phrase inside, a rule,
   then an attribution row with the person left and the company right.

   WHAT CHANGED ELSEWHERE. CallToAction.tsx used to be the only dark ground on
   the site, and its comment said so. That is no longer true, and the comment
   there has been corrected. The CTA still closes the page; this band now
   punctuates the middle of it.

   Still not taken, because these are locked rather than preferences:

   - Their blue. The accent is purple. On this ground it is --mt-purple-light,
     which the palette designates for dark mode, not --mt-purple, which sits at
     2.6:1 here.
   - Their serif, and the italic emphasis that goes with it. The display face is
     Space Grotesk, set once in layout.tsx, and it ships no true italic. Faking
     an oblique on a display size quote looks cheap, so the emphasis is carried
     by colour instead, which is what the reference's blue is really doing.
   - The bracket label stays ( CLIENT SPOTLIGHT ) rather than the reference's
     leading rule. Bracket syntax is MT identity per CLAUDE.md section 4 and
     runs through the nav, marquees and every other section label.

   The quote runs to about 180 words, far past the reference's one liner, so the
   lead sentence carries the display treatment and the rest follows at body
   size. Both verbatim. A quote attributed to a named person is never edited to
   fit house style, which is why the writing rules stop at the blockquote.

   Renders nothing when no permissioned quote is marked featured.
   -------------------------------------------------------------------------- */

/* The phrase set in the accent colour. Must appear verbatim inside the quote,
   or the quote renders unmarked rather than being altered to fit. */
const EMPHASIS = "set the standard";

function LeadQuote({ text }: { text: string }) {
  const at = text.indexOf(EMPHASIS);
  if (at === -1) return <>{text}</>;

  return (
    <>
      {text.slice(0, at)}
      <em className="not-italic text-mt-purple-light">{EMPHASIS}</em>
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
    <section className="bg-mt-ink py-24 text-white sm:py-32">
      <Container>
        <SectionLabel className="!text-mt-purple-light">
          Client spotlight
        </SectionLabel>

        <figure className="mt-10">
          <blockquote>
            <p className="max-w-[22ch] text-[1.875rem] leading-[1.12] tracking-[-0.03em] text-white sm:max-w-[26ch] sm:text-[2.75rem] lg:text-[3.25rem]">
              {/* Decorative marks, as the reference has them. aria-hidden so a
                  screen reader gets the quote once, from the blockquote. */}
              <span aria-hidden="true" className="text-mt-purple-light">
                &ldquo;
              </span>
              <LeadQuote text={item.quote} />
              <span aria-hidden="true" className="text-mt-purple-light">
                &rdquo;
              </span>
            </p>

            {item.continuation && (
              <div className="mt-12 grid gap-8 md:grid-cols-2">
                {item.continuation.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="max-w-[62ch] text-lg leading-relaxed text-white/70"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </blockquote>

          <figcaption className="mt-14 flex flex-col gap-6 border-t border-white/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
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
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-sm font-extrabold text-mt-purple-light"
                >
                  {initials}
                </span>
              )}
              <span className="flex flex-col">
                <span className="text-base font-semibold text-white">
                  {item.name}
                </span>
                <span className="text-[0.9375rem] leading-snug text-white/60">
                  {item.role}, {item.company}
                </span>
              </span>
            </span>

            {/* Company mark on the right, as the reference does. Linked so the
                reader can confirm the company exists rather than take it on
                trust, which is the whole point of a testimonial. */}
            {item.companyUrl ? (
              <a
                href={item.companyUrl}
                rel="noopener"
                className="font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.18em] text-white/60 transition-colors duration-150 hover:text-white active:text-mt-purple-light"
              >
                {item.company}
              </a>
            ) : (
              <span className="font-[family-name:var(--font-mono)] text-[0.6875rem] uppercase tracking-[0.18em] text-white/60">
                {item.company}
              </span>
            )}
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
