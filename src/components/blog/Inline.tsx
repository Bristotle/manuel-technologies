import Link from "next/link";
import type { ReactNode } from "react";

/* Inline links inside post paragraphs.

   Paragraphs are plain strings in blog-posts.ts, which keeps the data file
   readable and keeps markup out of it. The one exception is a link, written
   as [text](href). This turns that into <Link> for internal paths and <a>
   for external URLs. Nothing else is interpreted: no emphasis, no HTML.

   ONLY TWO HREF SHAPES ARE ACCEPTED. A path beginning with a single slash,
   or an absolute https URL. Anything else renders as literal text, so a typo
   in the data can never produce a javascript: or data: link. */

const LINK = /\[([^\]]+)\]\((\/[^\s)]*|https:\/\/[^\s)]+)\)/g;

export function renderInline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const m of text.matchAll(LINK)) {
    const [whole, label, href] = m;
    const at = m.index ?? 0;
    if (at > last) out.push(text.slice(last, at));
    if (href.startsWith("/")) {
      out.push(
        <Link key={i++} href={href} className="text-mt-purple underline decoration-mt-border underline-offset-4 hover:decoration-mt-purple">
          {label}
        </Link>,
      );
    } else {
      out.push(
        <a key={i++} href={href} target="_blank" rel="noopener noreferrer" className="text-mt-purple underline decoration-mt-border underline-offset-4 hover:decoration-mt-purple">
          {label}
        </a>,
      );
    }
    last = at + whole.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
