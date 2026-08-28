import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { DotGrid } from "@/components/ui/DotGrid";
import {
  PUBLISHABLE_TESTIMONIALS,
  type Testimonial,
} from "@/lib/testimonials";

/* Testimonials. REF-011, testimonials-6.
   ---------------------------------------------------------------------------
   Renders nothing until there is at least one real, permissioned quote. An
   empty testimonials band with placeholder faces is worse than no band, and a
   site selling trust cannot ship invented praise.

   Taken from the reference: quote led cards, attribution beneath with a small
   avatar, an even grid. Rejected: star ratings, which mean nothing without a
   review platform behind them, and the carousel, which would cost a client
   component and is worse for conversion than showing all of them at once.

   The layout adapts to how many there are, because three cards laid out for
   six looks like something is missing.
   -------------------------------------------------------------------------- */

function Avatar({ item }: { item: Testimonial }) {
  if (item.photo) {
    return (
      <Image
        src={item.photo}
        alt={item.name}
        width={44}
        height={44}
        sizes="44px"
        className="h-11 w-11 rounded-full object-cover"
      />
    );
  }

  const initials = item.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <span
      aria-hidden="true"
      className="flex h-11 w-11 items-center justify-center rounded-full bg-mt-surface text-sm font-extrabold text-mt-purple"
    >
      {initials}
    </span>
  );
}

export function Testimonials() {
  const items = PUBLISHABLE_TESTIMONIALS;
  if (items.length === 0) return null;

  const columns =
    items.length >= 3 ? "lg:grid-cols-3" : items.length === 2 ? "lg:grid-cols-2" : "";

  return (
    <section className="relative overflow-hidden border-y border-mt-border bg-white py-24 sm:py-32">
      <DotGrid fade="top" />

      <Container className="relative">
        <div className="max-w-[34ch]">
          <SectionLabel>What clients say</SectionLabel>
          <h2 className="mt-6 !text-3xl sm:!text-4xl">
            The part we cannot write ourselves.
          </h2>
        </div>

        <ul className={`mt-14 grid gap-5 sm:grid-cols-2 ${columns} mt-reveal-group`}>
          {items.map((item) => (
            <li
              key={item.id}
              className="flex flex-col justify-between gap-8 rounded-[18px] border border-mt-border bg-white p-7"
            >
              <blockquote className="text-lg leading-relaxed text-mt-ink">
                {item.quote}
              </blockquote>

              <figcaption className="flex items-center gap-4 border-t border-mt-border pt-6">
                <Avatar item={item} />
                <span className="flex flex-col">
                  <span className="text-[0.9375rem] font-semibold text-mt-ink">
                    {item.name}
                  </span>
                  <span className="text-[0.875rem] leading-snug text-mt-slate">
                    {item.role},{" "}
                    {item.companyUrl ? (
                      <a
                        href={item.companyUrl}
                        rel="noopener"
                        className="underline decoration-mt-border underline-offset-2 transition-colors duration-150 hover:text-mt-purple"
                      >
                        {item.company}
                      </a>
                    ) : (
                      item.company
                    )}
                  </span>
                </span>
              </figcaption>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
