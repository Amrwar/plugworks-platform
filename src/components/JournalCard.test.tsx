import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import JournalCard from "./JournalCard";
import { JOURNAL, publishedLabel } from "@/data/journal";
import { teamMember } from "@/data/team";

const ENTRY = JOURNAL[0];

/** Text as React writes it into markup, quotes and all. */
function escaped(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/'/g, "&#x27;");
}

describe("JournalCard", () => {
  it("is a single link, so a note is one tab stop", () => {
    const html = renderToStaticMarkup(<JournalCard entry={ENTRY} />);
    expect(html.match(/<a /g)).toHaveLength(1);
  });

  it("points at the note's own page", () => {
    const html = renderToStaticMarkup(<JournalCard entry={ENTRY} />);
    expect(html).toContain(`href="/journal/${ENTRY.slug}"`);
  });

  it("names the note and its author in the accessible name", () => {
    const author = teamMember(ENTRY.authorId);
    const html = renderToStaticMarkup(<JournalCard entry={ENTRY} />);
    expect(html).toContain(`aria-label="${ENTRY.title}, by ${author?.name}"`);
  });

  it("falls back to the studio when the author is not on the team", () => {
    const html = renderToStaticMarkup(
      <JournalCard entry={{ ...ENTRY, authorId: "long-gone" }} />
    );
    expect(html).toContain("by the studio");
  });

  it("marks the date up as a time element with its machine value", () => {
    const html = renderToStaticMarkup(<JournalCard entry={ENTRY} />);
    expect(html.toLowerCase()).toContain(`<time datetime="${ENTRY.published}">`);
    expect(html).toContain(publishedLabel(ENTRY));
  });

  it("shows the standfirst rather than the whole note", () => {
    const html = renderToStaticMarkup(<JournalCard entry={ENTRY} />);
    expect(html).toContain(escaped(ENTRY.standfirst));
    expect(html).not.toContain(escaped(ENTRY.body[1]));
  });

  it("lists the tags", () => {
    const html = renderToStaticMarkup(<JournalCard entry={ENTRY} />);
    for (const tag of ENTRY.tags) {
      expect(html).toContain(tag);
    }
  });

  it("gives every note a heading", () => {
    const html = renderToStaticMarkup(<JournalCard entry={ENTRY} />);
    expect(html.match(/<h3/g)).toHaveLength(1);
  });

  it("hides the separators from assistive technology", () => {
    const html = renderToStaticMarkup(<JournalCard entry={ENTRY} />);
    expect(html.match(/aria-hidden="true"/g)?.length).toBeGreaterThanOrEqual(2);
  });

  it("leaves out the author separator when there is no author", () => {
    const html = renderToStaticMarkup(
      <JournalCard entry={{ ...ENTRY, authorId: "long-gone" }} />
    );
    expect(html.match(/aria-hidden="true"/g)).toHaveLength(1);
  });
});
