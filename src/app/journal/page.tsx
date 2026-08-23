import type { Metadata } from "next";

import Footer from "@/components/Footer";
import JournalCard from "@/components/JournalCard";
import JsonLd from "@/components/JsonLd";
import Navigation from "@/components/Navigation";
import PageHeader from "@/components/PageHeader";
import { JOURNAL, journalTags, orderedJournal, publishedYear } from "@/data/journal";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { metaDescription, pageTitle, pageUrl } from "@/lib/seo";
import { listSentence } from "@/lib/text";

export const metadata: Metadata = {
  title: pageTitle("Journal"),
  description: metaDescription(
    "Notes from the Plugworks studio floor on briefs, schedules, budgets and the things that only go wrong once."
  ),
  alternates: { canonical: pageUrl("journal") },
};

export default function JournalIndex() {
  const entries = orderedJournal();
  const years = Array.from(new Set(JOURNAL.map(publishedYear))).sort((a, b) => a - b);

  return (
    <div className="min-h-screen bg-plug-black">
      <Navigation />
      <JsonLd
        document={breadcrumbJsonLd([{ label: "Home", path: "" }, { label: "Journal" }])}
      />
      <main id="main">
        <PageHeader
          eyebrow="Journal"
          title="Notes from the floor"
          intro={`Short pieces on ${listSentence(
            journalTags()
          )} — written by the people doing the work, mostly after something taught us a lesson the expensive way.`}
          crumbs={[{ label: "Home", href: "/" }, { label: "Journal" }]}
        />

        <section aria-labelledby="notes-heading" className="py-20">
          <div className="mx-auto max-w-4xl px-6 lg:px-12">
            <h2 id="notes-heading" className="sr-only">
              All notes
            </h2>

            <dl className="mb-12 flex flex-wrap gap-x-12 gap-y-6 border-b border-white/5 pb-10">
              <div>
                <dt className="font-body text-xs uppercase tracking-[0.2em] text-plug-light/40">
                  Notes
                </dt>
                <dd className="font-display text-2xl font-bold text-plug-light">
                  {entries.length}
                </dd>
              </div>
              <div>
                <dt className="font-body text-xs uppercase tracking-[0.2em] text-plug-light/40">
                  Subjects
                </dt>
                <dd className="font-display text-2xl font-bold text-plug-light">
                  {journalTags().length}
                </dd>
              </div>
              <div>
                <dt className="font-body text-xs uppercase tracking-[0.2em] text-plug-light/40">
                  Written
                </dt>
                <dd className="font-display text-2xl font-bold text-plug-light">
                  {years.length === 1 ? years[0] : `${years[0]}–${years[years.length - 1]}`}
                </dd>
              </div>
            </dl>

            {entries.map((entry) => (
              <JournalCard key={entry.slug} entry={entry} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
