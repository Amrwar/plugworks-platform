import { SERVICES } from "./services";

/** The longer page behind one card on the services grid. */
export type ServiceDetail = {
  /** Matches a `Service.id`; the join is checked by a test. */
  serviceId: string;
  /** The sentence under the heading on the service's own page. */
  intro: string;
  /** What is actually in the engagement. */
  includes: readonly string[];
  /** What people assume is included and is not — said out loud. */
  excludes: readonly string[];
  /** Typical span in working weeks, as a range. */
  weeks: readonly [number, number];
  /** Roughly what a project of this kind starts at, in US dollars. */
  fromUsd: number;
};

/**
 * The detail behind each service.
 *
 * Kept apart from `services.ts` so the home page grid stays cheap to render:
 * the grid only needs a title and a sentence, and the long copy is only
 * pulled in on the page that actually shows it.
 */
export const SERVICE_DETAILS: readonly ServiceDetail[] = [
  {
    serviceId: "brand-experiences",
    intro:
      "Activations people queue for, remember and post about without being asked to. Built to survive a full run, not a press day.",
    includes: [
      "Concept and creative territories",
      "Spatial design and build drawings",
      "Fabrication management on site",
      "Staffing, briefing and run-of-show",
    ],
    excludes: ["Media buying", "Long-term venue leases"],
    weeks: [6, 14],
    fromUsd: 45000,
  },
  {
    serviceId: "content-production",
    intro:
      "Commercials, brand films and the social cuts that come off them, shot by a crew that has done it in this region before.",
    includes: [
      "Treatment and shooting board",
      "Casting, location and permits",
      "Direction and production",
      "Edit, grade, sound and delivery",
    ],
    excludes: ["Talent residuals", "Paid distribution"],
    weeks: [4, 10],
    fromUsd: 30000,
  },
  {
    serviceId: "event-production",
    intro:
      "Launches, conferences and the kind of evening where three hundred people all need to be in the right room at the right time.",
    includes: [
      "Venue search and technical recce",
      "Show design and rehearsal",
      "Supplier contracting",
      "On-site production management",
    ],
    excludes: ["Guest travel", "Catering contracts we do not hold"],
    weeks: [5, 12],
    fromUsd: 38000,
  },
  {
    serviceId: "campaign-strategy",
    intro:
      "The work before the work: what the campaign is for, who it is aimed at, and how anyone will know whether it landed.",
    includes: [
      "Audience and category research",
      "Written problem statement",
      "Message architecture",
      "Measurement plan and reporting frame",
    ],
    excludes: ["Media planning", "Ongoing community management"],
    weeks: [3, 6],
    fromUsd: 18000,
  },
  {
    serviceId: "creative-direction",
    intro:
      "A single creative owner across everything an audience sees, so five suppliers do not produce five different brands.",
    includes: [
      "Creative platform and territories",
      "Art direction across channels",
      "Supplier review and sign-off",
      "Toolkit and usage notes",
    ],
    excludes: ["Full brand identity rebuilds", "Trademark work"],
    weeks: [4, 16],
    fromUsd: 22000,
  },
  {
    serviceId: "digital-experiences",
    intro:
      "Sites, installations and the interactive pieces that have to keep working on the last day of the run, not just the first.",
    includes: [
      "Interaction design and prototyping",
      "Build and hardware integration",
      "Load and device testing",
      "Handover with a runbook",
    ],
    excludes: ["Ongoing hosting we do not own", "App store submissions"],
    weeks: [6, 18],
    fromUsd: 34000,
  },
];

/** The detail behind one service, if there is one. */
export function serviceDetail(serviceId: string): ServiceDetail | undefined {
  return SERVICE_DETAILS.find((detail) => detail.serviceId === serviceId);
}

/** Services that have a detail page worth linking to. */
export function detailedServices(): string[] {
  return SERVICES.filter((service) => serviceDetail(service.id) !== undefined).map(
    (service) => service.id
  );
}

/** "6–14 weeks", collapsing to one number when the range has no width. */
export function weekRange(detail: ServiceDetail): string {
  const [from, to] = detail.weeks;
  return from === to ? `${from} weeks` : `${from}–${to} weeks`;
}

/** The starting price, written the way a person would say it. */
export function startingPrice(detail: ServiceDetail): string {
  return `From $${detail.fromUsd.toLocaleString("en-US")}`;
}

/** The cheapest thing the studio will start on, across all services. */
export function lowestEntryPrice(): number {
  return Math.min(...SERVICE_DETAILS.map((detail) => detail.fromUsd));
}

/** The shortest and longest a project of any kind tends to run, in weeks. */
export function engagementSpan(): { shortest: number; longest: number } {
  return {
    shortest: Math.min(...SERVICE_DETAILS.map((detail) => detail.weeks[0])),
    longest: Math.max(...SERVICE_DETAILS.map((detail) => detail.weeks[1])),
  };
}
