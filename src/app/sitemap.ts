import type { MetadataRoute } from "next";

import { SITE } from "@/data/site";

/** One entry: this is a single-page site. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
