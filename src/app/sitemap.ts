import type { MetadataRoute } from "next";

import { allRoutes } from "@/data/routes";
import { pageUrl } from "@/lib/seo";

/**
 * Every page the site serves.
 *
 * The list is derived from `routes.ts`, so a new case study or service shows
 * up here the moment its data lands — there is no second list to forget.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return allRoutes().map((route) => ({
    url: pageUrl(route.path),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
