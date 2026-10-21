export type BlogFaq = { question: string; answer: string };
export type BlogSource = { label: string; href: string };

/* A screenshot of real work inside a post. CLAUDE.md section 4 requires at
   least one per post in the cost cluster. Width and height are required so
   the slot is reserved before the image arrives and CLS stays at zero. */
export type BlogImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  href?: string;
};

export type BlogTable = {
  caption: string;
  headers: string[];
  rows: string[][];
};

/* Paragraphs may contain inline links written as [text](/path) or
   [text](https://...). Rendered by renderInline() in the post template. No
   other markup is interpreted. */
export type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  table?: BlogTable;
  image?: BlogImage;
};

/* A bar chart drawn from data we measured ourselves. Values are computed at
   build time from the benchmark files in lib/research, never typed in, so a
   chart cannot drift from its source. Pure HTML, no chart library. */
export type BlogChart = {
  title: string;
  /* Where the numbers come from, with the sample and the date. */
  source: string;
  sourceHref: string;
  unit: "%" | "s" | "words";
  bars: { label: string; value: number; note?: string; highlight?: boolean }[];
};

/* A schematic of the method a post describes. Each step is taken from the
   post's own text, so the diagram summarises rather than adds claims. */
export type BlogDiagram = {
  title: string;
  caption: string;
  steps: { label: string; detail: string }[];
  /* Optional closing loop shown under the steps, such as a feedback path. */
  loop?: string;
};
