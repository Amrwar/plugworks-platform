/** A single entry in the primary navigation. */
export type NavLink = {
  /** Visible label. */
  name: string;
  /** In-page anchor, always a fragment on this one-page site. */
  href: string;
};

/**
 * The primary navigation, in the order the sections appear on the page.
 *
 * The header, the mobile menu and the footer all render this list, so the
 * order here is the order everywhere and a section can never be reachable
 * from one menu but missing from another.
 */
export const NAV_LINKS: readonly NavLink[] = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Locations", href: "#locations" },
  { name: "Contact", href: "#contact" },
] as const;

/** The section ids the navigation points at, without the leading hash. */
export function navSectionIds(links: readonly NavLink[] = NAV_LINKS): string[] {
  return links.map((link) => link.href.replace(/^#/, ""));
}

/**
 * The pages that have a route of their own.
 *
 * Kept apart from `NAV_LINKS` because the two behave differently: a section
 * link scrolls when you are already on the home page and has to jump back to
 * it when you are not, while a page link is always just a page.
 */
export const PAGE_LINKS: readonly NavLink[] = [
  { name: "Work", href: "/work" },
  { name: "Services", href: "/services" },
  { name: "Process", href: "/process" },
  { name: "Studio", href: "/about" },
  { name: "Questions", href: "/faq" },
] as const;

/** Whether a path is the home page, allowing for a trailing slash. */
export function isHome(pathname: string): boolean {
  return pathname === "/" || pathname === "";
}

/**
 * Where a link should actually point from the page you are on.
 *
 * A section anchor only works on the home page; from anywhere else it has to
 * carry the path with it, or the browser looks for a section that is not in
 * the document and does nothing at all.
 */
export function resolveHref(href: string, pathname: string): string {
  if (!href.startsWith("#")) return href;
  return isHome(pathname) ? href : `/${href}`;
}

/** Whether a page link is the page currently being shown. */
export function isCurrentPage(href: string, pathname: string): boolean {
  if (href.startsWith("#")) return false;
  const clean = (value: string) => value.replace(/\/+$/, "") || "/";
  return clean(href) === clean(pathname);
}
