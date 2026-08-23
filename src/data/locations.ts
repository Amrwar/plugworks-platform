/** One office, as shown on the locations section. */
export type Location = {
  country: string;
  city: string;
  description: string;
  /** Flag emoji standing in for a photograph. */
  flag: string;
  /** Tailwind colour token the card is tinted with. */
  accent: string;
};

/** Where Plugworks works from. */
export const LOCATIONS: readonly Location[] = [
  {
    country: "Egypt",
    city: "Cairo",
    description:
      "Our creative hub in the heart of the Middle East, where ancient inspiration meets modern innovation.",
    flag: "🇪🇬",
    accent: "plug-spark",
  },
  {
    country: "UAE",
    city: "Dubai",
    description:
      "Our production powerhouse in the city of the future, connecting brands to global audiences.",
    flag: "🇦🇪",
    accent: "plug-electric",
  },
] as const;
