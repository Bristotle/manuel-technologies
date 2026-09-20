/* The four band palette as class names. Tailwind reads literal strings, so
   every class lives here in full rather than being built at runtime.

   text     the "for words" tone on a light ground, 4.5:1 or better
   onDark   the fill, for text on ink
   pill     a small outlined tag on a light ground
   rule     a short bar under a heading (fill)
   glow     the fill, as a hex for the --glow-c variable */
export type Accent = "purple" | "teal" | "amber" | "pink";

export const ACCENT: Record<Accent, { text: string; onDark: string; pill: string; rule: string; glow: string; hover: string }> = {
  purple: { text: "text-mt-purple", onDark: "text-mt-lilac", pill: "border-mt-purple/25 bg-mt-surface text-mt-purple", rule: "bg-mt-purple", glow: "#6B2FD9", hover: "hover:border-mt-purple-light" },
  teal:   { text: "text-mt-teal-ink", onDark: "text-mt-teal", pill: "border-mt-teal/30 bg-mt-teal/10 text-mt-teal-ink", rule: "bg-mt-teal", glow: "#00B3A4", hover: "hover:border-mt-teal" },
  amber:  { text: "text-mt-amber-ink", onDark: "text-mt-amber", pill: "border-mt-amber/40 bg-mt-amber/10 text-mt-amber-ink", rule: "bg-mt-amber", glow: "#FFA400", hover: "hover:border-mt-amber" },
  pink:   { text: "text-mt-pink-ink", onDark: "text-mt-pink", pill: "border-mt-pink/35 bg-mt-pink/10 text-mt-pink-ink", rule: "bg-mt-pink", glow: "#FF6B9D", hover: "hover:border-mt-pink" },
};

/* Pillar to band. Build shares purple; the site reads purple, teal, amber. */
export const PILLAR_ACCENT: Record<"build" | "grow" | "scale", Accent> = { build: "purple", grow: "teal", scale: "amber" };
