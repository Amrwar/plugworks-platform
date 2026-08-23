/** One social profile, with the label a screen reader announces. */
export type SocialLink = {
  /** Stable key and icon selector. */
  id: string;
  /** Accessible name, since the links carry icons and no text. */
  label: string;
  href: string;
};

/**
 * Where to find the studio elsewhere.
 *
 * The footer rendered four icon-only anchors pointing at `#`, which gave a
 * screen reader nothing to announce. Naming them here means the markup can
 * carry a real label for each.
 */
export const SOCIAL_LINKS: readonly SocialLink[] = [
  { id: "instagram", label: "Plugworks on Instagram", href: "https://instagram.com/plugworks" },
  { id: "linkedin", label: "Plugworks on LinkedIn", href: "https://linkedin.com/company/plugworks" },
  { id: "behance", label: "Plugworks on Behance", href: "https://behance.net/plugworks" },
  { id: "x", label: "Plugworks on X", href: "https://x.com/plugworks" },
] as const;
