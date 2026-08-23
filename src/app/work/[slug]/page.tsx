import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import Navigation from "@/components/Navigation";
import PageHeader from "@/components/PageHeader";
import WorkCard from "@/components/WorkCard";
import { SERVICES } from "@/data/services";
import { PullQuote } from "@/components/TestimonialWall";
import { testimonialForStudy } from "@/data/testimonials";
import { CASE_STUDIES, relatedWork, workBySlug } from "@/data/work";
import { pageUrl, metaDescription, pageTitle } from "@/lib/seo";
import { breadcrumbJsonLd, caseStudyJsonLd } from "@/lib/jsonld";
import { readingMinutes } from "@/lib/text";

type PageProps = {
  params: { slug: string } | Promise<{ slug: string }>;
};

/** Every case study is known at build time, so every page is static. */
export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await Promise.resolve(params);
  const study = workBySlug(slug);
  if (!study) return { title: pageTitle("Work") };
  return {
    title: pageTitle(study.title),
    description: metaDescription(study.summary),
    alternates: { canonical: pageUrl(`work/${study.slug}`) },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await Promise.resolve(params);
  const study = workBySlug(slug);
  if (!study) notFound();

  const service = SERVICES.find((entry) => entry.id === study.serviceId);
  const minutes = readingMinutes(study.story);
  const related = relatedWork(study.slug, 2);
  const quote = testimonialForStudy(study.slug);

  return (
    <div className="min-h-screen bg-plug-black">
      <Navigation />
      <JsonLd document={caseStudyJsonLd(study)} />
      <JsonLd
        document={breadcrumbJsonLd([
          { label: "Home", path: "" },
          { label: "Work", path: "work" },
          { label: study.title },
        ])}
      />
      <main id="main">
        <PageHeader
          eyebrow={service?.title}
          title={study.title}
          intro={study.summary}
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Work", href: "/work" },
            { label: study.title },
          ]}
        />

        <section aria-labelledby="facts-heading" className="border-b border-white/5 py-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <h2 id="facts-heading" className="sr-only">
              Project facts
            </h2>
            <dl className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div>
                <dt className="font-body text-xs uppercase tracking-[0.2em] text-plug-light/40">
                  Client
                </dt>
                <dd className="font-display text-lg text-plug-light">{study.client}</dd>
              </div>
              <div>
                <dt className="font-body text-xs uppercase tracking-[0.2em] text-plug-light/40">
                  City
                </dt>
                <dd className="font-display text-lg text-plug-light">{study.city}</dd>
              </div>
              <div>
                <dt className="font-body text-xs uppercase tracking-[0.2em] text-plug-light/40">
                  Year
                </dt>
                <dd className="font-display text-lg text-plug-light">{study.year}</dd>
              </div>
              <div>
                <dt className="font-body text-xs uppercase tracking-[0.2em] text-plug-light/40">
                  Read
                </dt>
                <dd className="font-display text-lg text-plug-light">{minutes} min</dd>
              </div>
            </dl>
          </div>
        </section>

        <section aria-labelledby="story-heading" className="py-24">
          <div className="mx-auto max-w-3xl px-6 lg:px-12">
            <h2
              id="story-heading"
              className="mb-10 font-display text-3xl font-bold text-plug-light"
            >
              What happened
            </h2>
            <div className="space-y-6">
              {study.story.map((paragraph, index) => (
                <p
                  key={index}
                  className="font-body text-lg leading-relaxed text-plug-light/70"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="results-heading"
          className="border-y border-white/5 bg-plug-dark/30 py-20"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <h2
              id="results-heading"
              className="mb-12 font-display text-3xl font-bold text-plug-light"
            >
              What it did
            </h2>
            <dl className="grid gap-10 sm:grid-cols-3">
              {study.results.map((result) => (
                <div key={result.label}>
                  <dd className="font-display text-4xl font-bold gradient-text">
                    {result.value}
                  </dd>
                  <dt className="mt-2 font-body text-sm text-plug-light/50">{result.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {quote ? (
          <section aria-labelledby="quote-heading" className="py-20">
            <h2 id="quote-heading" className="sr-only">
              What the client said
            </h2>
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
              <PullQuote entry={quote} />
            </div>
          </section>
        ) : null}

        <section aria-labelledby="credits-heading" className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <h2
              id="credits-heading"
              className="mb-8 font-display text-2xl font-bold text-plug-light"
            >
              Credits
            </h2>
            <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {study.credits.map((credit) => (
                <div key={`${credit.role}-${credit.name}`} className="border-l border-white/10 pl-4">
                  <dt className="font-body text-xs uppercase tracking-[0.2em] text-plug-light/40">
                    {credit.role}
                  </dt>
                  <dd className="font-body text-plug-light/80">{credit.name}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {related.length > 0 ? (
          <section
            aria-labelledby="related-heading"
            className="border-t border-white/5 py-20"
          >
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
              <h2
                id="related-heading"
                className="mb-10 font-display text-2xl font-bold text-plug-light"
              >
                More work
              </h2>
              <div className="grid gap-8 md:grid-cols-2">
                {related.map((entry) => (
                  <WorkCard key={entry.slug} study={entry} />
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
