import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import FaqAccordion from "./FaqAccordion";
import { FAQ } from "@/data/faq";

const ENTRIES = FAQ.slice(0, 3);

describe("FaqAccordion", () => {
  it("renders the questions as a list", () => {
    const html = renderToStaticMarkup(<FaqAccordion entries={ENTRIES} />);
    expect(html).toContain("<ul");
    expect(html.match(/<li>/g)).toHaveLength(ENTRIES.length);
  });

  it("makes every question a real button", () => {
    const html = renderToStaticMarkup(<FaqAccordion entries={ENTRIES} />);
    expect(html.match(/<button type="button"/g)).toHaveLength(ENTRIES.length);
  });

  it("starts with every answer collapsed", () => {
    const html = renderToStaticMarkup(<FaqAccordion entries={ENTRIES} />);
    expect(html.match(/aria-expanded="false"/g)).toHaveLength(ENTRIES.length);
    expect(html).not.toContain('aria-expanded="true"');
  });

  it("hides every collapsed answer from the page, not just from view", () => {
    const html = renderToStaticMarkup(<FaqAccordion entries={ENTRIES} />);
    expect(html.match(/hidden=""/g)).toHaveLength(ENTRIES.length);
  });

  it("points each button at the panel it opens", () => {
    const html = renderToStaticMarkup(<FaqAccordion entries={ENTRIES} />);
    for (const entry of ENTRIES) {
      expect(html).toContain(`aria-controls="${entry.id}-answer"`);
      expect(html).toContain(`id="${entry.id}-answer"`);
    }
  });

  it("labels each panel with its own question", () => {
    const html = renderToStaticMarkup(<FaqAccordion entries={ENTRIES} />);
    for (const entry of ENTRIES) {
      expect(html).toContain(`aria-labelledby="${entry.id}-question"`);
      expect(html).toContain(`id="${entry.id}-question"`);
    }
  });

  it("gives every question a heading, so a reader can jump between them", () => {
    const html = renderToStaticMarkup(<FaqAccordion entries={ENTRIES} />);
    expect(html.match(/<h3>/g)).toHaveLength(ENTRIES.length);
  });

  it("renders every question's text", () => {
    const html = renderToStaticMarkup(<FaqAccordion entries={ENTRIES} />);
    for (const entry of ENTRIES) {
      expect(html).toContain(entry.question);
    }
  });

  it("renders the answers, collapsed but present, so they are indexable", () => {
    const html = renderToStaticMarkup(<FaqAccordion entries={ENTRIES} />);
    for (const paragraph of ENTRIES[0].answer) {
      expect(html).toContain(paragraph);
    }
  });

  it("hides the open and close mark from assistive technology", () => {
    const html = renderToStaticMarkup(<FaqAccordion entries={ENTRIES} />);
    expect(html.match(/aria-hidden="true"/g)).toHaveLength(ENTRIES.length);
  });

  it("renders an empty list when there are no questions", () => {
    const html = renderToStaticMarkup(<FaqAccordion entries={[]} />);
    expect(html).not.toContain("<li>");
  });
});
