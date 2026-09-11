import type { NextConfig } from "next";

/* Security headers. Before these existed the site sent only HSTS, which
   Vercel adds itself. A site that publishes an article on what a secure
   build should include was shipping none of the basics. A Content-Security-
   Policy is deliberately not here yet: the inline JSON-LD blocks need a
   nonce or hash strategy first, and a CSP that breaks structured data costs
   more than it protects. */
const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/(.*)", headers: SECURITY_HEADERS }];
  },
};

export default nextConfig;
