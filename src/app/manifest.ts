import type { MetadataRoute } from "next";

import { SITE } from "@/data/site";

/** The web app manifest, built from the same site data as the page. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.name,
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
  };
}
