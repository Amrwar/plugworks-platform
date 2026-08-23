import { SERVICES } from "./services";

/** A single credit line on a case study. */
export type Credit = {
  role: string;
  name: string;
};

/** A measurable outcome worth putting on the page. */
export type Result = {
  label: string;
  value: string;
};

/** One piece of work, as shown in the grid and on its own page. */
export type CaseStudy = {
  /** URL segment, and the key everything else joins on. */
  slug: string;
  title: string;
  client: string;
  /** The service this belongs under, matching an id in the services data. */
  serviceId: string;
  /** Where it was made. */
  city: string;
  /** Calendar year the work shipped. */
  year: number;
  /** One line for the grid card. */
  summary: string;
  /** The longer telling, one paragraph per entry. */
  story: readonly string[];
  results: readonly Result[];
  credits: readonly Credit[];
  /** Shown larger, first in the grid. */
  featured: boolean;
};

/**
 * The work, newest first.
 *
 * `serviceId` joins each study to the service list, so a case study can never
 * advertise a discipline the studio does not say it offers - there is a test
 * for exactly that.
 */
export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    slug: "nile-tower-launch",
    title: "Lighting the Nile Tower",
    client: "Orascom Real Estate",
    serviceId: "brand-experiences",
    city: "Cairo",
    year: 2026,
    summary:
      "A projection-mapped launch that turned forty storeys of concrete into the invitation itself.",
    story: [
      "The tower was finished but empty, and the client wanted the city to notice before a single unit went on sale. A conventional launch would have filled a ballroom with four hundred people; we wanted four hundred thousand.",
      "We mapped the west face of the building and ran a twelve-minute sequence telling the story of the site, from the riverbank it was built on to the skyline it now belonged to. The soundtrack went out on a local FM frequency, so anyone parked along the corniche could hear it in the car.",
      "The sequence ran nightly for a fortnight. By the second night the corniche had queues.",
    ],
    results: [
      { label: "Reach", value: "2.4m" },
      { label: "Units reserved in week one", value: "38%" },
      { label: "Earned coverage", value: "17 outlets" },
    ],
    credits: [
      { role: "Creative Direction", name: "Nadia Farouk" },
      { role: "Technical Direction", name: "Karim Adel" },
      { role: "Sound", name: "Studio Mango" },
    ],
    featured: true,
  },
  {
    slug: "atlas-airways-safety-film",
    title: "The Safety Film People Watched",
    client: "Atlas Airways",
    serviceId: "content-production",
    city: "Dubai",
    year: 2026,
    summary:
      "Six minutes of mandatory viewing, rebuilt as something passengers looked up for.",
    story: [
      "Airline safety films are the most-watched films nobody watches. Atlas had the usual problem: compliance demanded the content, and cabin crew reported that almost nobody followed it.",
      "We shot it as one continuous take through a practical set built to the exact dimensions of an A350 cabin, with the demonstration happening around a passenger who never moves. The camera does the travelling instead.",
      "Cabin crew now report that passengers ask about the film.",
    ],
    results: [
      { label: "Completion rate", value: "81%" },
      { label: "Languages", value: "6" },
      { label: "Awards", value: "2" },
    ],
    credits: [
      { role: "Director", name: "Yara Habib" },
      { role: "Director of Photography", name: "Tomas Meyer" },
      { role: "Production Design", name: "Layla Mansour" },
    ],
    featured: true,
  },
  {
    slug: "delta-clinics-open-day",
    title: "Twelve Clinics, One Morning",
    client: "Delta Health",
    serviceId: "event-production",
    city: "Cairo",
    year: 2025,
    summary:
      "A simultaneous open day across twelve governorates, run from a single control room.",
    story: [
      "Delta wanted every clinic to open its doors on the same Saturday, with the same look, the same run of show and the same standard of hospitality - in towns up to nine hours apart by road.",
      "We built a kit that shipped flat, went up in ninety minutes with four people, and needed no power tools. Each site had a run sheet timed to the minute and one point of contact in a control room in Cairo.",
      "Eleven of the twelve opened within four minutes of the target time. The twelfth had a road closure.",
    ],
    results: [
      { label: "Sites", value: "12" },
      { label: "Visitors", value: "9,400" },
      { label: "Setup per site", value: "88 min" },
    ],
    credits: [
      { role: "Executive Producer", name: "Hana Selim" },
      { role: "Logistics", name: "Omar Zaki" },
    ],
    featured: false,
  },
  {
    slug: "kingfisher-rebrand-rollout",
    title: "A Rebrand That Landed in a Weekend",
    client: "Kingfisher Logistics",
    serviceId: "campaign-strategy",
    city: "Dubai",
    year: 2025,
    summary:
      "Two hundred vehicles, nine depots and a fleet livery changed between Friday and Monday.",
    story: [
      "Kingfisher had lived with two identities since an acquisition three years earlier. The brief was not to design a third - it was to make the changeover invisible to customers.",
      "We sequenced the rollout backwards from the first Monday delivery: livery on the vehicles running the earliest routes, signage at the depots those vehicles returned to, and everything customer-facing switched overnight on the Sunday.",
      "On the Monday, nobody phoned to ask what had happened.",
    ],
    results: [
      { label: "Vehicles", value: "204" },
      { label: "Depots", value: "9" },
      { label: "Customer queries", value: "0" },
    ],
    credits: [
      { role: "Strategy", name: "Rami Boutros" },
      { role: "Design Direction", name: "Nadia Farouk" },
    ],
    featured: false,
  },
  {
    slug: "sahara-film-festival-identity",
    title: "An Identity That Moved With the Light",
    client: "Sahara Film Festival",
    serviceId: "creative-direction",
    city: "Cairo",
    year: 2025,
    summary:
      "A festival identity generated from the day's own sunrise and sunset times.",
    story: [
      "The festival runs nine days across three venues, and its previous identity was a fixed logo applied to everything. We proposed something that changed with the programme instead.",
      "The mark is generated from the light: its gradient derives from the sunrise and sunset of the day it appears on, so opening night looks unlike the closing gala, and a morning screening looks unlike an evening one.",
      "The generator shipped as a small tool the festival team still runs themselves.",
    ],
    results: [
      { label: "Unique marks", value: "9" },
      { label: "Ticket sales", value: "+22%" },
      { label: "Handover", value: "self-serve" },
    ],
    credits: [
      { role: "Creative Direction", name: "Nadia Farouk" },
      { role: "Engineering", name: "Karim Adel" },
    ],
    featured: false,
  },
  {
    slug: "meridian-museum-ar",
    title: "The Museum That Explains Itself",
    client: "Meridian Museum",
    serviceId: "digital-experiences",
    city: "Dubai",
    year: 2024,
    summary:
      "An augmented layer that reads the room rather than asking visitors to scan anything.",
    story: [
      "Museum AR usually means holding a phone up to a marker. Meridian's curators were clear that they did not want visitors looking at screens instead of objects.",
      "We built a layer that positions itself from the architecture rather than from markers, so a visitor can raise the phone briefly, take the context and put it away. The median session is ninety seconds, which was the target.",
      "It runs on hardware the museum already owned.",
    ],
    results: [
      { label: "Median session", value: "94s" },
      { label: "Galleries covered", value: "7" },
      { label: "New hardware", value: "none" },
    ],
    credits: [
      { role: "Experience Design", name: "Yara Habib" },
      { role: "Engineering", name: "Karim Adel" },
    ],
    featured: false,
  },
] as const;

/** Every case study, featured work first, then newest, then by title. */
export function orderedWork(studies: readonly CaseStudy[] = CASE_STUDIES): CaseStudy[] {
  return [...studies].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    if (a.year !== b.year) return b.year - a.year;
    return a.title.localeCompare(b.title);
  });
}

/** One case study by its slug, or undefined if there is no such work. */
export function workBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((study) => study.slug === slug);
}

/** The work filed under one service. */
export function workForService(serviceId: string): CaseStudy[] {
  return orderedWork().filter((study) => study.serviceId === serviceId);
}

/** The services that actually have work behind them. */
export function servicesWithWork(): string[] {
  return SERVICES.filter((service) => workForService(service.id).length > 0).map((s) => s.id);
}

/**
 * Other work to show at the foot of a case study.
 *
 * Work in the same discipline comes first, because that is what a reader who
 * got this far is most likely to want next; the rest of the catalogue fills
 * whatever room is left.
 */
export function relatedWork(slug: string, limit = 2): CaseStudy[] {
  const current = workBySlug(slug);
  if (!current) return [];
  const sameService = workForService(current.serviceId).filter((s) => s.slug !== slug);
  const rest = orderedWork().filter(
    (s) => s.slug !== slug && !sameService.some((m) => m.slug === s.slug)
  );
  return [...sameService, ...rest].slice(0, Math.max(0, limit));
}

/** The years the studio has work from, newest first. */
export function workYears(): number[] {
  return Array.from(new Set(CASE_STUDIES.map((s) => s.year))).sort((a, b) => b - a);
}

/** The cities the studio has worked in, alphabetically. */
export function workCities(): string[] {
  return Array.from(new Set(CASE_STUDIES.map((s) => s.city))).sort();
}
