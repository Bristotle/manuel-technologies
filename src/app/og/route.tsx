import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

/* Share card generator. GET /og?t=<title>&k=<kicker>

   WHY A ROUTE AND NOT THE opengraph-image FILE CONVENTION. The file
   convention applies to a segment and everything beneath it, and it
   overrides config based images. A root level file would have replaced the
   real screenshots on /work/[slug] and /pricing with a generic card. This
   route is referenced from metadata on the pages that had no image at all,
   which was 49 of 61, and leaves pages with real screenshots alone.

   Static parameters only. The title and kicker are read from the query,
   stripped of control characters, length capped, and rendered as text.
   Nothing is fetched. */

export const runtime = "nodejs";

const PURPLE = "#6B2FD9";
const INK = "#1A1033";
const SURFACE = "#F5F2FC";
const MUTED = "#7B72A0";

function clean(v: string | null, max: number, fallback: string) {
  const s = (v ?? "").replace(/[^\x20-\x7e -￿]/g, "").trim();
  return (s || fallback).slice(0, max);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = clean(searchParams.get("t"), 120, "Build. Grow. Scale.");
  const kicker = clean(searchParams.get("k"), 48, "Manuel Technologies");
  const size = title.length > 80 ? 48 : title.length > 50 ? 58 : 68;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: SURFACE,
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="44" height="44" viewBox="0 0 64 64" fill="none" stroke={PURPLE} strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 14 H56" /><path d="M32 14 V52" /><path d="M8 52 V24 L32 44" /><path d="M56 52 V24 L32 44" />
          </svg>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: "0.18em", color: PURPLE, textTransform: "uppercase" }}>
            ( {kicker} )
          </div>
        </div>
        <div style={{ display: "flex", fontSize: size, fontWeight: 700, lineHeight: 1.06, letterSpacing: "-0.02em", color: INK, maxWidth: 1000 }}>
          {title}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: `2px solid ${PURPLE}`, paddingTop: 24 }}>
          <div style={{ display: "flex", fontSize: 24, fontWeight: 700, color: INK }}>manueltechnologies.com</div>
          <div style={{ display: "flex", fontSize: 20, letterSpacing: "0.22em", color: MUTED, textTransform: "uppercase" }}>Build. Grow. Scale.</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: { "cache-control": "public, max-age=31536000, s-maxage=31536000, immutable" },
    },
  );
}
