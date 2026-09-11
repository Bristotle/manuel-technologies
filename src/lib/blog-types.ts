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
