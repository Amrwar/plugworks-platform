import { CASE_STUDIES } from "./work";

/** Something a client said, on the record. */
export type Testimonial = {
  /** Stable key. */
  id: string;
  /** The quote, as they said it, without an ellipsis doing heavy lifting. */
  quote: string;
  /** Who said it. */
  name: string;
  /** Their job at the time they said it. */
  role: string;
  /** Their organisation. */
  company: string;
  /** The case study it came off, if it came off one. */
  studySlug?: string;
};

/**
 * The quotes, in no particular order.
 *
 * `studySlug` is optional because not every quote belongs to a case study on
 * the site, but the ones that do are checked against the work list by a test
 * so a renamed study cannot leave a quote pointing at nothing.
 */
export const TESTIMONIALS: readonly Testimonial[] = [
  {
    id: "nile-tower",
    quote:
      "They told us in week one that the idea we arrived with would not survive the summer heat, and then showed us one that would. Nobody else in the process did that.",
    name: "Dina Halim",
    role: "Head of Marketing",
    company: "Nile Tower",
    studySlug: "nile-tower-launch",
  },
  {
    id: "atlas",
    quote:
      "The film came in on the day they said it would, at the number they said it would, and it is still the most watched thing we have ever published.",
    name: "Sherif Adel",
    role: "Communications Director",
    company: "Atlas Airways",
    studySlug: "atlas-airways-safety-film",
  },
  {
    id: "delta",
    quote:
      "What we actually bought was somebody who would say no. Three times they talked us out of spending more, which is not the agency experience we were used to.",
    name: "Mariam Fouad",
    role: "Chief Executive",
    company: "Delta Clinics",
    studySlug: "delta-clinics-open-day",
  },
  {
    id: "regional-retailer",
    quote:
      "We ran the same brief past four studios. Plugworks was the only one that came back asking what would count as success before quoting a price.",
    name: "Hassan Nour",
    role: "Brand Lead",
    company: "Maadi Retail Group",
  },
  {
    id: "long-run",
    quote:
      "The installation ran for eleven weeks with two people on site. On the last weekend it looked the same as on the first, which is the whole trick.",
    name: "Yara Kamel",
    role: "Programme Manager",
    company: "Gulf Cultural Foundation",
  },
];

/** One quote, by its key. */
export function testimonial(id: string): Testimonial | undefined {
  return TESTIMONIALS.find((entry) => entry.id === id);
}

/** The quote that came off a given case study, if there is one. */
export function testimonialForStudy(slug: string): Testimonial | undefined {
  return TESTIMONIALS.find((entry) => entry.studySlug === slug);
}

/** Only the quotes tied to work shown on the site. */
export function attributedTestimonials(): Testimonial[] {
  return TESTIMONIALS.filter((entry) => entry.studySlug !== undefined);
}

/**
 * A rotation of `count` quotes starting at `offset`.
 *
 * Wraps rather than running off the end, so a page can ask for more quotes
 * than exist without special-casing the short list, and takes the offset as
 * an argument rather than reading a clock, which keeps rendering stable.
 */
export function rotate(count: number, offset = 0): Testimonial[] {
  if (count <= 0 || TESTIMONIALS.length === 0) return [];
  const start = ((offset % TESTIMONIALS.length) + TESTIMONIALS.length) % TESTIMONIALS.length;
  return Array.from(
    { length: Math.min(count, TESTIMONIALS.length) },
    (_, index) => TESTIMONIALS[(start + index) % TESTIMONIALS.length]
  );
}

/** How a quote is signed under the words themselves. */
export function attribution(entry: Testimonial): string {
  return `${entry.name}, ${entry.role}, ${entry.company}`;
}

/** The companies that have said something, alphabetically, without repeats. */
export function quotedCompanies(): string[] {
  return Array.from(new Set(TESTIMONIALS.map((entry) => entry.company))).sort();
}

/** Case studies that have a quote against them. */
export function studiesWithQuotes(): string[] {
  return CASE_STUDIES.filter((study) => testimonialForStudy(study.slug) !== undefined).map(
    (study) => study.slug
  );
}
