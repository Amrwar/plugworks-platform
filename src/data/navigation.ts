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
