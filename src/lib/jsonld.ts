import { LOCATIONS } from "@/data/locations";
import { serviceDetail } from "@/data/service-details";
import { SERVICES, type Service } from "@/data/services";
import { SITE } from "@/data/site";
import type { CaseStudy } from "@/data/work";
import { pageUrl } from "@/lib/seo";

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

/** One step of a trail, as a search engine wants to read it. */
export type BreadcrumbStep = {
  label: string;
  /** Path relative to the site root; the last step may leave it out. */
  path?: string;
};

/**
 * The trail at the top of an inner page, as structured data.
 *
 * Positions are one-based because that is what the vocabulary says, and the
 * last step deliberately carries no url — it is the page you are already on.
 */
export function breadcrumbJsonLd(steps: readonly BreadcrumbStep[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: steps.map((step, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: step.label,
      ...(step.path === undefined ? {} : { item: pageUrl(step.path) }),
    })),
  };
}

/** One service, as an offering of the studio. */
export function serviceJsonLd(service: Service) {
  const detail = serviceDetail(service.id);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: detail?.intro ?? service.description,
    url: pageUrl(`services/${service.id}`),
    provider: { "@type": "Organization", name: SITE.name, url: pageUrl() },
    ...(detail === undefined
      ? {}
      : {
          offers: {
            "@type": "Offer",
            priceCurrency: "USD",
            price: detail.fromUsd,
          },
        }),
  };
}

/** One case study, as a piece of creative work. */
export function caseStudyJsonLd(study: CaseStudy) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: study.title,
    abstract: study.summary,
    url: pageUrl(`work/${study.slug}`),
    dateCreated: String(study.year),
    locationCreated: { "@type": "Place", name: study.city },
    creator: { "@type": "Organization", name: SITE.name, url: pageUrl() },
  };
}

/** Any of the documents above, ready to drop into a script tag. */
export function jsonLdString(document: unknown): string {
  return JSON.stringify(document);
}
