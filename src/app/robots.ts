import type { MetadataRoute } from "next";

import { SITE } from "@/data/site";

/** Let everything be crawled, and point at the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
