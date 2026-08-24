import type { MetadataRoute } from "next";
import { PILLARS, SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pillars = PILLARS.map((p) => ({
    url: `${SITE.url}/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  /* Service pages enter the sitemap only once `live` is true.
     Never submit a URL that does not exist. */
  const services = PILLARS.flatMap((p) =>
    p.services
      .filter((s) => s.live)
      .map((s) => ({
        url: `${SITE.url}${s.href}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
  );

  return [
    {
      url: SITE.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...pillars,
    ...services,
    {
      url: `${SITE.url}/work`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE.url}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE.url}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE.url}/cwv-drift-monitor/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
