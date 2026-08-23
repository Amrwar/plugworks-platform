import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import TestimonialWall, { PullQuote } from "./TestimonialWall";
import { TESTIMONIALS, attributedTestimonials, attribution } from "@/data/testimonials";

const ENTRIES = TESTIMONIALS.slice(0, 3);

describe("TestimonialWall", () => {
  it("renders the quotes as a list", () => {
    const html = renderToStaticMarkup(<TestimonialWall entries={ENTRIES} />);
    expect(html).toContain("<ul");
    expect(html.match(/<li>/g)).toHaveLength(ENTRIES.length);
  });

  it("marks each quote up as a figure with a blockquote", () => {
    const html = renderToStaticMarkup(<TestimonialWall entries={ENTRIES} />);
    expect(html.match(/<figure /g)).toHaveLength(ENTRIES.length);
    expect(html.match(/<blockquote/g)).toHaveLength(ENTRIES.length);
  });

  it("ties every quote to its attribution", () => {
    const html = renderToStaticMarkup(<TestimonialWall entries={ENTRIES} />);
    expect(html.match(/<figcaption/g)).toHaveLength(ENTRIES.length);
  });

  it("renders the words themselves", () => {
    const html = renderToStaticMarkup(<TestimonialWall entries={ENTRIES} />);
    for (const entry of ENTRIES) {
      expect(html).toContain(entry.name);
      expect(html).toContain(entry.company);
    }
  });

  it("links a quote that came off a case study", () => {
    const attached = attributedTestimonials()[0];
    const html = renderToStaticMarkup(<TestimonialWall entries={[attached]} />);
    expect(html).toContain(`href="/work/${attached.studySlug}"`);
  });

  it("names the company in the link, so the links are told apart", () => {
    const attached = attributedTestimonials()[0];
    const html = renderToStaticMarkup(<TestimonialWall entries={[attached]} />);
    expect(html).toContain(`aria-label="Read the story behind ${attached.company}`);
  });

  it("leaves out the link for a quote with no case study behind it", () => {
    const loose = TESTIMONIALS.find((entry) => entry.studySlug === undefined);
    const html = renderToStaticMarkup(<TestimonialWall entries={loose ? [loose] : []} />);
    expect(html).not.toContain("<a ");
  });

  it("renders an empty list when there are no quotes", () => {
    const html = renderToStaticMarkup(<TestimonialWall entries={[]} />);
    expect(html).not.toContain("<li>");
  });
});

describe("PullQuote", () => {
  it("renders one figure with one blockquote", () => {
    const html = renderToStaticMarkup(<PullQuote entry={TESTIMONIALS[0]} />);
    expect(html.match(/<figure /g)).toHaveLength(1);
    expect(html.match(/<blockquote/g)).toHaveLength(1);
  });

  it("signs the quote on one line", () => {
    const html = renderToStaticMarkup(<PullQuote entry={TESTIMONIALS[0]} />);
    expect(html).toContain(attribution(TESTIMONIALS[0]));
  });

  it("never turns the pull quote into a link", () => {
    const html = renderToStaticMarkup(<PullQuote entry={attributedTestimonials()[0]} />);
    expect(html).not.toContain("<a ");
  });
});
