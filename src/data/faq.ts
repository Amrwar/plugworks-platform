/** One question the studio is asked often enough to answer in public. */
export type FaqEntry = {
  /** Stable key, and the id the disclosure button controls. */
  id: string;
  question: string;
  /** The answer, one paragraph per entry. */
  answer: readonly string[];
  /** Groups the question on the page. */
  topic: FaqTopic;
};

/** The headings the questions are filed under. */
export type FaqTopic = "working together" | "money" | "practical";

/** The topics in the order they are shown. */
export const FAQ_TOPICS: readonly FaqTopic[] = [
  "working together",
  "money",
  "practical",
] as const;

/** What people ask before they get in touch. */
export const FAQ: readonly FaqEntry[] = [
  {
    id: "smallest-project",
    topic: "working together",
    question: "What is the smallest project you will take on?",
    answer: [
      "There is no floor, but below about three weeks of work the overhead of running a project properly starts to cost more than it returns for you.",
      "If what you need is smaller than that, say so in the first conversation — quite often the honest answer is that you do not need an agency for it, and we will tell you so.",
    ],
  },
  {
    id: "who-does-the-work",
    topic: "working together",
    question: "Who actually does the work?",
    answer: [
      "The people you meet in the first conversation. We are deliberately small, and the director who pitches is the director on set.",
      "For specialisms we do not keep in house — orchestral scoring, stunt coordination — we bring in people we have worked with before and name them in the proposal.",
    ],
  },
  {
    id: "revisions",
    topic: "working together",
    question: "How many rounds of revisions do I get?",
    answer: [
      "Two rounds are built into every stage, and in practice that is almost always enough because the direction is agreed before anything is built.",
      "If a third round is needed because the brief has moved, we will say so and re-cost it rather than quietly absorbing it and cutting somewhere you cannot see.",
    ],
  },
  {
    id: "how-you-price",
    topic: "money",
    question: "How do you price a project?",
    answer: [
      "By the project, not by the hour. You get a fixed figure per stage, with the assumptions it rests on written down next to it.",
      "If an assumption turns out to be wrong — a location falls through, a deliverable doubles — we come back with the change before the money is spent, not after.",
    ],
  },
  {
    id: "payment-terms",
    topic: "money",
    question: "What are your payment terms?",
    answer: [
      "A third to start, a third at the midpoint, a third on handover. For projects that run past three months we bill monthly against the schedule instead.",
      "Third-party costs — crew, kit hire, venue — are passed through at cost with the invoices attached.",
    ],
  },
  {
    id: "own-the-work",
    topic: "money",
    question: "Who owns the work at the end?",
    answer: [
      "You do, in full, once the final invoice is settled. That includes source files, project files and any tool we built for you.",
      "We ask only for the right to show the work in our own portfolio, and we will hold that back for as long as you need if the project is sensitive.",
    ],
  },
  {
    id: "where-you-work",
    topic: "practical",
    question: "Do you work outside Egypt and the UAE?",
    answer: [
      "Yes. Those are the two places we keep crews and kit, so they are the cheapest places for us to work, but roughly a third of our projects happen elsewhere.",
      "Outside those two, we typically bring the direction and hire the crew locally, which keeps travel off your budget.",
    ],
  },
  {
    id: "how-quickly",
    topic: "practical",
    question: "How quickly can you start?",
    answer: [
      "Usually within two to three weeks. We run a small number of projects at a time on purpose, so the answer is sometimes longer, and we would rather tell you a real date than a hopeful one.",
      "If something is genuinely urgent, ask — occasionally a slot opens.",
    ],
  },
] as const;

/** The questions filed under one topic, in declaration order. */
export function faqByTopic(topic: FaqTopic): FaqEntry[] {
  return FAQ.filter((entry) => entry.topic === topic);
}

/** One question by its id. */
export function faqEntry(id: string): FaqEntry | undefined {
  return FAQ.find((entry) => entry.id === id);
}

/** The topics that actually have questions behind them. */
export function usedTopics(): FaqTopic[] {
  return FAQ_TOPICS.filter((topic) => faqByTopic(topic).length > 0);
}

/**
 * The FAQ as schema.org markup.
 *
 * Built from the same entries the page renders, so the structured data can
 * never answer a question the page does not show.
 */
export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.answer.join(" "),
      },
    })),
  };
}
