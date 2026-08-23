/** The hero, whose three lines are set one under the other. */
export const HERO = {
  eyebrow: "Egypt & UAE",
  lines: ["Where Ideas", "Are Plugged", "Into Reality"] as const,
  /** The middle line is the one that carries the gradient. */
  accentLine: 1,
} as const;

/** The headings each section opens with. */
export const SECTION_COPY = {
  about: { eyebrow: "Who We Are", title: "Ideas, ", accent: "Plugged In" },
  services: { eyebrow: "What We Do", title: "Our ", accent: "Services" },
  locations: { eyebrow: "Where We Are", title: "Two Cities, ", accent: "One Current" },
  contact: { eyebrow: "Get in Touch", title: "Ready to ", accent: "Plug In?" },
} as const;

/** The id of the heading that names each section, for `aria-labelledby`. */
export function headingId(section: keyof typeof SECTION_COPY): string {
  return `${section}-heading`;
}
