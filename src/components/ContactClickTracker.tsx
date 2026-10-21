"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

/* Call and WhatsApp links are plain anchors, server rendered, with no
   JavaScript of their own. One delegated listener records a tap on any of
   them, with where it happened: the floating button, the footer, or the
   page it sits on. Renders nothing. */
export function ContactClickTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const kind = href.startsWith("tel:") ? "click_call" : href.startsWith("https://wa.me/") ? "click_whatsapp" : null;
      if (!kind) return;
      const where = link.closest("footer") ? "footer" : link.classList.contains("fixed") ? "floating button" : window.location.pathname;
      track(kind, { link_location: where });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
