import Link from "next/link";

import { SERVICES } from "@/data/services";
import type { CaseStudy } from "@/data/work";
import { excerpt } from "@/lib/text";

type WorkCardProps = {
  study: CaseStudy;
  /** Featured work is given the full width of the grid. */
  wide?: boolean;
};

/** The name of the discipline a study belongs to, for the card's label. */
function serviceTitle(serviceId: string): string {
  return SERVICES.find((service) => service.id === serviceId)?.title ?? "Studio work";
}

/**
 * One piece of work in the grid.
 *
 * The whole card is a single link, so there is one tab stop per study rather
 * than three, and the accessible name is the title plus the client — enough
 * to tell two studies apart when a reader tabs through a list of links.
 */
export default function WorkCard({ study, wide = false }: WorkCardProps) {
  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border border-white/5 bg-plug-dark/50 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-plug-electric/30 ${
        wide ? "md:col-span-2" : ""
      }`}
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-plug-electric/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />

      <Link
        href={`/work/${study.slug}`}
        aria-label={`${study.title} — ${study.client}`}
        className="relative block p-8"
      >
        <div className="mb-6 flex flex-wrap items-center gap-3 font-body text-xs uppercase tracking-[0.2em] text-plug-light/40">
          <span className="text-plug-electric">{serviceTitle(study.serviceId)}</span>
          <span aria-hidden="true">·</span>
          <span>{study.city}</span>
          <span aria-hidden="true">·</span>
          <span>{study.year}</span>
        </div>

        <h3
          className={`mb-4 font-display font-bold leading-tight text-plug-light ${
            wide ? "text-3xl md:text-4xl" : "text-2xl"
          }`}
        >
          {study.title}
        </h3>

        <p className="mb-6 font-body leading-relaxed text-plug-light/60">
          {excerpt(study.summary, wide ? 160 : 120)}
        </p>

        <dl className="flex flex-wrap gap-x-8 gap-y-3">
          {study.results.slice(0, wide ? 3 : 2).map((result) => (
            <div key={result.label}>
              <dt className="font-body text-xs uppercase tracking-[0.2em] text-plug-light/40">
                {result.label}
              </dt>
              <dd className="font-display text-xl font-bold text-plug-light">{result.value}</dd>
            </div>
          ))}
        </dl>

        <span className="mt-8 inline-flex items-center gap-2 font-display text-sm uppercase tracking-[0.2em] text-plug-electric">
          Read the story
          <svg
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </Link>
    </article>
  );
}
