/** One service offering, as shown on the services grid. */
export type Service = {
  /** Stable key, also used to pick the illustration. */
  id: string;
  title: string;
  description: string;
  /** Tailwind colour token the card is tinted with. */
  color: string;
};

/**
 * What Plugworks sells, in display order.
 *
 * The copy lives here rather than in the component so that the same wording
 * can feed the page, the metadata and the structured data without being
 * typed out three times and drifting apart.
 */
export const SERVICES: readonly Service[] = [
  {
    id: "brand-experiences",
    title: "Brand Experiences",
    description:
      "Immersive activations and experiential marketing that connect brands with audiences in unforgettable ways.",
    color: "plug-electric",
  },
  {
    id: "content-production",
    title: "Content Production",
    description:
      "From concept to final cut—commercials, brand films, social content, and everything in between.",
    color: "plug-spark",
  },
  {
    id: "event-production",
    title: "Event Production",
    description:
      "End-to-end event management from intimate gatherings to large-scale spectacles that leave lasting impressions.",
    color: "plug-glow",
  },
  {
    id: "campaign-strategy",
    title: "Campaign Strategy",
    description:
      "Data-driven creative strategies that amplify your message and drive measurable results.",
    color: "plug-electric",
  },
  {
    id: "creative-direction",
    title: "Creative Direction",
    description:
      "Visionary leadership that shapes brand aesthetics and ensures cohesive storytelling across all touchpoints.",
    color: "plug-spark",
  },
  {
    id: "digital-experiences",
    title: "Digital Experiences",
    description:
      "Interactive digital solutions, AR/VR experiences, and innovative tech integrations that push boundaries.",
    color: "plug-glow",
  },
] as const;
