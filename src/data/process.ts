/** One step in the way the studio works. */
export type ProcessStep = {
  /** Stable key, also the anchor for the step. */
  id: string;
  /** Shown as the step number, one-based. */
  order: number;
  title: string;
  summary: string;
  /** What the client actually receives at the end of this step. */
  deliverables: readonly string[];
  /** Rough duration, in working days, as a range. */
  days: readonly [number, number];
};

/**
 * How a project runs, start to finish.
 *
 * The steps carry their own `order` rather than relying on array position,
 * so a step can be moved in the file without silently renumbering the page,
 * and a test can check the sequence is still complete.
 */
export const PROCESS: readonly ProcessStep[] = [
  {
    id: "listen",
    order: 1,
    title: "Listen",
    summary:
      "We start with the problem behind the brief. Most briefs describe a solution somebody has already half-decided on, and the useful conversation is the one underneath it.",
    deliverables: ["Kick-off session", "Written problem statement", "Success measures"],
    days: [3, 5],
  },
  {
    id: "shape",
    order: 2,
    title: "Shape",
    summary:
      "We put two or three genuinely different directions on the table, costed, so the choice is about which idea is right rather than which is affordable.",
    deliverables: ["Concept routes", "Indicative budget per route", "Production risks"],
    days: [5, 10],
  },
  {
    id: "build",
    order: 3,
    title: "Build",
    summary:
      "Production, with one producer accountable for the whole thing. You get a single point of contact and a schedule that shows what is happening on any given day.",
    deliverables: ["Production schedule", "Weekly progress note", "Asset review rounds"],
    days: [15, 45],
  },
  {
    id: "run",
    order: 4,
    title: "Run",
    summary:
      "Delivery day. Whether that is a launch, a shoot or a release, the plan is rehearsed before it is run, and somebody is on the ground who wrote it.",
    deliverables: ["Run sheet", "On-site direction", "Contingency plan"],
    days: [1, 14],
  },
  {
    id: "hand-over",
    order: 5,
    title: "Hand over",
    summary:
      "We leave you able to run it without us. Source files, a short written handover, and where we have built a tool, the tool and how to use it.",
    deliverables: ["Source files", "Handover document", "Results readout"],
    days: [2, 5],
  },
] as const;

/** The steps in the order they happen. */
export function orderedProcess(): ProcessStep[] {
  return [...PROCESS].sort((a, b) => a.order - b.order);
}

/** The shortest and longest a whole project runs, in working days. */
export function processSpan(): { shortest: number; longest: number } {
  return PROCESS.reduce(
    (span, step) => ({
      shortest: span.shortest + step.days[0],
      longest: span.longest + step.days[1],
    }),
    { shortest: 0, longest: 0 }
  );
}

/** One step by its id. */
export function processStep(id: string): ProcessStep | undefined {
  return PROCESS.find((step) => step.id === id);
}
