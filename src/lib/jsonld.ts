import { LOCATIONS } from "@/data/locations";
import { SERVICES } from "@/data/services";
import { SITE } from "@/data/site";

/**
 * The Organization record search engines read.
 *
 * Built from the same data the page renders, so the markup can never claim a
 * service or an office the site does not show.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    slogan: SITE.tagline,
    description: SITE.description,
    address: LOCATIONS.map((location) => ({
      "@type": "PostalAddress",
      addressLocality: location.city,
      addressCountry: location.country,
    })),
    makesOffer: SERVICES.map((service) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: service.title },
    })),
  };
}

/** The same record as a string, ready for a script tag. */
export function organizationJsonLdString(): string {
  return JSON.stringify(organizationJsonLd());
}
