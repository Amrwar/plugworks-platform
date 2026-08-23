import { JOURNAL } from "./journal";
import { CASE_STUDIES } from "./work";
import { SERVICES } from "./services";

/** One page the site serves, as the sitemap and the footer both see it. */
export type SiteRoute = {
  /** Path relative to the site root, without a leading slash. "" is home. */
  path: string;
  /** The label the footer and the breadcrumbs use. */
  label: string;
  /** How often the content behind it actually changes. */
  changeFrequency: "weekly" | "monthly" | "yearly";
  /** Sitemap priority, home being the only 1. */
  priority: number;
};

/**
 * The fixed pages, in navigation order.
 *
 * Generated pages — the case studies and the service pages — are appended by
 * `allRoutes`, so adding a case study adds a sitemap entry without anybody
 * remembering to edit two files.
 */
export const STATIC_ROUTES: readonly SiteRoute[] = [
  { path: "", label: "Home", changeFrequency: "monthly", priority: 1 },
  { path: "work", label: "Work", changeFrequency: "monthly", priority: 0.9 },
  { path: "services", label: "Services", changeFrequency: "monthly", priority: 0.8 },
  { path: "process", label: "Process", changeFrequency: "yearly", priority: 0.7 },
  { path: "about", label: "Studio", changeFrequency: "yearly", priority: 0.7 },
  { path: "journal", label: "Journal", changeFrequency: "weekly", priority: 0.6 },
  { path: "faq", label: "Questions", changeFrequency: "monthly", priority: 0.6 },
] as const;

/** One route per case study, in the order the work index shows them. */
export function workRoutes(): SiteRoute[] {
  return [...CASE_STUDIES]
    .sort((a, b) => b.year - a.year || a.title.localeCompare(b.title))
    .map((study) => ({
      path: `work/${study.slug}`,
      label: study.title,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    }));
}

/** One route per service, in the order the services grid shows them. */
export function serviceRoutes(): SiteRoute[] {
  return SERVICES.map((service) => ({
    path: `services/${service.id}`,
    label: service.title,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));
}

/** One route per journal note, newest first. */
export function journalRoutes(): SiteRoute[] {
  return [...JOURNAL]
    .sort((a, b) => (a.published === b.published ? 0 : a.published < b.published ? 1 : -1))
    .map((entry) => ({
      path: `journal/${entry.slug}`,
      label: entry.title,
      changeFrequency: "yearly" as const,
      priority: 0.4,
    }));
}

/** Every page the site serves, fixed pages first. */
export function allRoutes(): SiteRoute[] {
  return [...STATIC_ROUTES, ...serviceRoutes(), ...workRoutes(), ...journalRoutes()];
}

/** The path with its leading slash, which is what an `href` wants. */
export function href(route: SiteRoute): string {
  return route.path === "" ? "/" : `/${route.path}`;
}

/** Whether a path is one the site actually serves. */
export function isKnownRoute(path: string): boolean {
  const normalised = path.replace(/^\/+/, "").replace(/\/+$/, "");
  return allRoutes().some((route) => route.path === normalised);
}
