import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import PageHeader from "@/components/PageHeader";
import WorkCard from "@/components/WorkCard";
import { SERVICES } from "@/data/services";
import { orderedWork, servicesWithWork, workCities, workYears } from "@/data/work";
import { canonicalUrl, metaDescription, pageTitle } from "@/lib/seo";
import { listSentence } from "@/lib/text";

export const metadata: Metadata = {
  title: pageTitle("Work"),
  description: metaDescription(
    "Case studies from Plugworks: brand experiences, films, events and digital work made in Cairo and Dubai."
  ),
  alternates: { canonical: canonicalUrl("work") },
};

export default function WorkIndex() {
  const studies = orderedWork();
  const disciplines = servicesWithWork()
    .map((id) => SERVICES.find((service) => service.id === id)?.title)
    .filter((title): title is string => Boolean(title));

  return (
    <div className="min-h-screen bg-plug-black">
      <Navigation />
      <main id="main">
        <PageHeader
          eyebrow="Selected Work"
          title="Things we built, and what they did"
          intro={`Work across ${listSentence(workCities())}, in ${listSentence(
            disciplines
          )}. Every study lists what it changed, not just what it looked like.`}
          crumbs={[{ label: "Home", href: "/" }, { label: "Work" }]}
        />

        <section aria-labelledby="work-grid-heading" className="relative py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <h2 id="work-grid-heading" className="sr-only">
              All case studies
            </h2>

            <dl className="mb-16 grid grid-cols-2 gap-8 border-b border-white/5 pb-12 md:grid-cols-4">
              <div>
                <dt className="font-body text-xs uppercase tracking-[0.2em] text-plug-light/40">
                  Projects
                </dt>
                <dd className="font-display text-3xl font-bold text-plug-light">
                  {studies.length}
                </dd>
              </div>
              <div>
                <dt className="font-body text-xs uppercase tracking-[0.2em] text-plug-light/40">
                  Disciplines
                </dt>
                <dd className="font-display text-3xl font-bold text-plug-light">
                  {disciplines.length}
                </dd>
              </div>
              <div>
                <dt className="font-body text-xs uppercase tracking-[0.2em] text-plug-light/40">
                  Cities
                </dt>
                <dd className="font-display text-3xl font-bold text-plug-light">
                  {workCities().length}
                </dd>
              </div>
              <div>
                <dt className="font-body text-xs uppercase tracking-[0.2em] text-plug-light/40">
                  Years
                </dt>
                <dd className="font-display text-3xl font-bold text-plug-light">
                  {workYears()[workYears().length - 1]}–{workYears()[0]}
                </dd>
              </div>
            </dl>

            <div className="grid gap-8 md:grid-cols-2">
              {studies.map((study) => (
                <WorkCard key={study.slug} study={study} wide={study.featured} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
