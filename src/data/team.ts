/** One person on the studio floor. */
export type TeamMember = {
  /** Stable key, also the anchor used when a bio is linked to directly. */
  id: string;
  name: string;
  /** What they actually do, in the words they would use. */
  role: string;
  /** Which side of the studio they sit on. */
  discipline: TeamDiscipline;
  /** The city they are based in; matches a location in `locations.ts`. */
  city: string;
  /** The year they joined, used to work out tenure. */
  since: number;
  /** Two or three sentences, written as prose rather than as a list. */
  bio: readonly string[];
};

/** The three sides of the studio. */
export type TeamDiscipline = "creative" | "production" | "strategy";

/** Disciplines in the order the page shows them. */
export const TEAM_DISCIPLINES: readonly TeamDiscipline[] = [
  "creative",
  "production",
  "strategy",
] as const;

/**
 * The people, in no particular order.
 *
 * Display order is worked out from `since` rather than baked into the array,
 * so adding somebody in the middle of the file cannot quietly reshuffle the
 * page, and a test can check the ordering rule instead of the literal list.
 */
export const TEAM: readonly TeamMember[] = [
  {
    id: "nadia-abbas",
    name: "Nadia Abbas",
    role: "Creative Director",
    discipline: "creative",
    city: "Cairo",
    since: 2016,
    bio: [
      "Nadia started the studio after eight years of art directing for other people and deciding she would rather argue about the idea than about the deck.",
      "She runs the creative reviews, which are shorter than most and considerably more direct.",
    ],
  },
  {
    id: "omar-farid",
    name: "Omar Farid",
    role: "Head of Production",
    discipline: "production",
    city: "Cairo",
    since: 2017,
    bio: [
      "Omar has built sets in car parks, hotel ballrooms and one working quarry, and has opinions about all three.",
      "If a schedule survives contact with him it will survive contact with the shoot.",
    ],
  },
  {
    id: "layla-mansour",
    name: "Layla Mansour",
    role: "Strategy Lead",
    discipline: "strategy",
    city: "Dubai",
    since: 2019,
    bio: [
      "Layla writes the problem statement that every project is measured against, and is the person most likely to ask what happens if the campaign works.",
      "She came from media planning, which is why the numbers in our decks tend to hold up.",
    ],
  },
  {
    id: "youssef-tarek",
    name: "Youssef Tarek",
    role: "Design Lead",
    discipline: "creative",
    city: "Cairo",
    since: 2020,
    bio: [
      "Youssef looks after everything the audience actually touches — the type, the signage, the interface, the thing in your hand at the end.",
      "He keeps a shelf of printed proofs from projects that shipped badly, as a reminder.",
    ],
  },
  {
    id: "hana-said",
    name: "Hana Said",
    role: "Producer",
    discipline: "production",
    city: "Dubai",
    since: 2021,
    bio: [
      "Hana runs the Gulf side of production, which means permits, crews and the particular arithmetic of shooting outdoors in August.",
      "Nothing on her call sheets is aspirational.",
    ],
  },
  {
    id: "karim-lotfy",
    name: "Karim Lotfy",
    role: "Technical Director",
    discipline: "production",
    city: "Cairo",
    since: 2022,
    bio: [
      "Karim is the reason the interactive pieces stay up for the whole run rather than the first weekend.",
      "He tests on the worst hardware he can find, on purpose.",
    ],
  },
];

/** Everyone, longest-serving first, then alphabetically for ties. */
export function orderedTeam(members: readonly TeamMember[] = TEAM): TeamMember[] {
  return [...members].sort((a, b) => {
    if (a.since !== b.since) return a.since - b.since;
    return a.name.localeCompare(b.name);
  });
}

/** The people on one side of the studio, in display order. */
export function teamByDiscipline(discipline: TeamDiscipline): TeamMember[] {
  return orderedTeam().filter((member) => member.discipline === discipline);
}

/** One person, by their stable key. */
export function teamMember(id: string): TeamMember | undefined {
  return TEAM.find((member) => member.id === id);
}

/** How long somebody has been here, in whole years, never negative. */
export function tenure(member: TeamMember, year: number): number {
  return Math.max(0, year - member.since);
}

/** The cities the studio has people in, alphabetically, without repeats. */
export function teamCities(): string[] {
  return Array.from(new Set(TEAM.map((member) => member.city))).sort();
}

/** Disciplines that actually have somebody in them, in display order. */
export function staffedDisciplines(): TeamDiscipline[] {
  return TEAM_DISCIPLINES.filter((discipline) => teamByDiscipline(discipline).length > 0);
}

/** The year the first person joined — the year the studio started counting. */
export function foundedYear(): number {
  return Math.min(...TEAM.map((member) => member.since));
}
