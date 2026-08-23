import { SITE } from "@/data/site";

/** The page title, kept consistent wherever a title is needed. */
export function pageTitle(section?: string): string {
  if (!section || section.trim() === "") return `${SITE.name} — ${SITE.tagline}`;
  return `${section.trim()} — ${SITE.name}`;
}

/** An absolute URL for a section of the one-page site. */
export function canonicalUrl(sectionId?: string): string {
  const base = SITE.url.replace(/\/+$/, "");
  const id = (sectionId ?? "").trim().replace(/^#/, "");
  return id === "" ? base : `${base}/#${id}`;
}

/**
 * A description trimmed to something a search result will actually show.
 *
 * Cuts on a word boundary and adds an ellipsis, so a result never ends
 * mid-word; a description already short enough is returned untouched.
 */
export function metaDescription(text: string = SITE.description, limit = 160): string {
  const clean = text.trim().replace(/\s+/g, " ");
  if (clean.length <= limit) return clean;
  const cut = clean.slice(0, limit - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[.,;:]$/, "")}…`;
}
