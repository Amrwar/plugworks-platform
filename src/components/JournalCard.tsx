import Link from "next/link";

import type { JournalEntry } from "@/data/journal";
import { publishedLabel } from "@/data/journal";
import { teamMember } from "@/data/team";
import { readingMinutes } from "@/lib/text";

type JournalCardProps = {
  entry: JournalEntry;
};

/**
 * One note in the index.
 *
 * The date is a real `time` element carrying the machine-readable value, so
 * the page says the same thing to a reader and to a crawler, and the whole
 * card is one link for the same reason the work cards are.
 */
export default function JournalCard({ entry }: JournalCardProps) {
  const author = teamMember(entry.authorId);
  const minutes = readingMinutes(entry.body);

  return (
    <article className="group border-b border-white/5 py-10 first:pt-0">
      <Link
        href={`/journal/${entry.slug}`}
        aria-label={`${entry.title}, by ${author?.name ?? "the studio"}`}
        className="block"
      >
        <div className="mb-4 flex flex-wrap items-center gap-3 font-body text-xs uppercase tracking-[0.2em] text-plug-light/40">
          <time dateTime={entry.published}>{publishedLabel(entry)}</time>
          <span aria-hidden="true">·</span>
          <span>{minutes} min read</span>
          {author ? (
            <>
              <span aria-hidden="true">·</span>
              <span>{author.name}</span>
            </>
          ) : null}
        </div>

        <h3 className="font-display text-2xl font-bold leading-tight text-plug-light transition-colors duration-300 group-hover:text-plug-electric md:text-3xl">
          {entry.title}
        </h3>

        <p className="mt-4 max-w-2xl font-body leading-relaxed text-plug-light/60">
          {entry.standfirst}
        </p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {entry.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-white/10 px-3 py-1 font-body text-xs text-plug-light/50"
            >
              {tag}
            </li>
          ))}
        </ul>
      </Link>
    </article>
  );
}
