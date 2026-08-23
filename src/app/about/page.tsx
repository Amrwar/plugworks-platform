import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import PageHeader from "@/components/PageHeader";
import TeamGrid from "@/components/TeamGrid";
import { LOCATIONS } from "@/data/locations";
import {
  TEAM,
  foundedYear,
  orderedTeam,
  staffedDisciplines,
  teamByDiscipline,
  teamCities,
} from "@/data/team";
import { copyrightYear } from "@/lib/dates";
import { canonicalUrl, metaDescription, pageTitle } from "@/lib/seo";
import { listSentence } from "@/lib/text";

export const metadata: Metadata = {
  title: pageTitle("Studio"),
  description: metaDescription(
    "Who Plugworks is: a Cairo and Dubai studio of creatives, producers and strategists, and how the work gets divided between them."
  ),
  alternates: { canonical: canonicalUrl("about") },
};

/** How each side of the studio describes itself, in its own words. */
const DISCIPLINE_BLURBS: Record<string, string> = {
  creative: "The people who decide what the thing is, and what it looks like when it lands.",
  production: "The people who make it exist on the day, on the budget, in the weather.",
  strategy: "The people who work out what it is supposed to change, and whether it did.",
};

export default function AboutPage() {
  const year = copyrightYear();
  const started = foundedYear();

  return (
    <div className="min-h-screen bg-plug-black">
      <Navigation />
      <main id="main">
        <PageHeader
          eyebrow="The Studio"
          title="A small studio that would rather build than pitch"
          intro={`We have been at this since ${started}, out of ${listSentence(
            teamCities()
          )}. Everybody here makes something; nobody here only manages.`}
          crumbs={[{ label: "Home", href: "/" }, { label: "Studio" }]}
        />

        <section aria-labelledby="numbers-heading" className="border-b border-white/5 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <h2 id="numbers-heading" className="sr-only">
              The studio in numbers
            </h2>
            <dl className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div>
                <dt className="font-body text-xs uppercase tracking-[0.2em] text-plug-light/40">
                  Working since
                </dt>
                <dd className="font-display text-3xl font-bold text-plug-light">{started}</dd>
              </div>
              <div>
                <dt className="font-body text-xs uppercase tracking-[0.2em] text-plug-light/40">
                  People
                </dt>
                <dd className="font-display text-3xl font-bold text-plug-light">{TEAM.length}</dd>
              </div>
              <div>
                <dt className="font-body text-xs uppercase tracking-[0.2em] text-plug-light/40">
                  Studios
                </dt>
                <dd className="font-display text-3xl font-bold text-plug-light">
                  {LOCATIONS.length}
                </dd>
              </div>
              <div>
                <dt className="font-body text-xs uppercase tracking-[0.2em] text-plug-light/40">
                  Disciplines
                </dt>
                <dd className="font-display text-3xl font-bold text-plug-light">
                  {staffedDisciplines().length}
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section aria-labelledby="everyone-heading" className="py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <h2
              id="everyone-heading"
              className="mb-4 font-display text-3xl font-bold text-plug-light"
            >
              Everyone, longest-serving first
            </h2>
            <p className="mb-12 max-w-2xl font-body text-plug-light/60">
              No account handlers, no layer between you and the person doing the work. The one you
              meet in the first conversation is on the project.
            </p>
            <TeamGrid members={orderedTeam()} year={year} />
          </div>
        </section>

        {staffedDisciplines().map((discipline) => (
          <section
            key={discipline}
            aria-labelledby={`${discipline}-heading`}
            className="border-t border-white/5 py-16"
          >
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
              <h2
                id={`${discipline}-heading`}
                className="font-display text-2xl font-bold capitalize text-plug-light"
              >
                {discipline}
              </h2>
              <p className="mt-3 max-w-2xl font-body text-plug-light/60">
                {DISCIPLINE_BLURBS[discipline]}
              </p>
              <p className="mt-6 font-body text-sm text-plug-light/50">
                {listSentence(teamByDiscipline(discipline).map((member) => member.name))}
              </p>
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </div>
  );
}
