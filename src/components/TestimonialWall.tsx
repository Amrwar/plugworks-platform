import Link from "next/link";

import type { Testimonial } from "@/data/testimonials";
import { attribution } from "@/data/testimonials";

type TestimonialWallProps = {
  entries: readonly Testimonial[];
};

/**
 * What clients said, as quotes.
 *
 * Each one is a `blockquote` with its `figcaption` attribution, so the words
 * and the person who said them are announced as one unit rather than as a
 * paragraph followed by some loose text.
 */
export default function TestimonialWall({ entries }: TestimonialWallProps) {
  return (
    <ul className="grid gap-8 md:grid-cols-2">
      {entries.map((entry) => (
        <li key={entry.id}>
          <figure className="flex h-full flex-col justify-between rounded-2xl border border-white/5 bg-plug-dark/40 p-8">
            <blockquote className="font-body text-lg leading-relaxed text-plug-light/80">
              <p>{entry.quote}</p>
            </blockquote>

            <figcaption className="mt-8 border-t border-white/5 pt-6">
              <span className="block font-display font-semibold text-plug-light">
                {entry.name}
              </span>
              <span className="block font-body text-sm text-plug-light/50">
                {entry.role}, {entry.company}
              </span>

              {entry.studySlug ? (
                <Link
                  href={`/work/${entry.studySlug}`}
                  aria-label={`Read the story behind ${entry.company}'s project`}
                  className="mt-4 inline-flex items-center gap-2 font-body text-sm text-plug-electric transition-colors duration-300 hover:text-plug-light"
                >
                  Read the story
                </Link>
              ) : null}
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}

/** The single pull quote used where a whole wall would be too much. */
export function PullQuote({ entry }: { entry: Testimonial }) {
  return (
    <figure className="mx-auto max-w-3xl text-center">
      <blockquote className="font-display text-2xl leading-relaxed text-plug-light md:text-3xl">
        <p>{entry.quote}</p>
      </blockquote>
      <figcaption className="mt-8 font-body text-sm uppercase tracking-[0.2em] text-plug-light/40">
        {attribution(entry)}
      </figcaption>
    </figure>
  );
}
