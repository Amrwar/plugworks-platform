import { describe, expect, it } from "vitest";
import { navSectionIds } from "./navigation";
import { HERO, headingId, SECTION_COPY } from "./copy";

describe("the section headings", () => {
  it("covers every section the navigation points at", () => {
    for (const id of navSectionIds()) {
      expect(Object.keys(SECTION_COPY)).toContain(id);
    }
  });

  it("gives each an eyebrow and a title", () => {
    for (const copy of Object.values(SECTION_COPY)) {
      expect(copy.eyebrow.trim()).not.toBe("");
      expect(copy.title.trim()).not.toBe("");
    }
  });

  it("builds a heading id from the section name", () => {
    expect(headingId("about")).toBe("about-heading");
  });

  it("gives every section a distinct heading id", () => {
    const ids = Object.keys(SECTION_COPY).map((s) => headingId(s as keyof typeof SECTION_COPY));
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("uses ids that are valid html identifiers", () => {
    for (const section of Object.keys(SECTION_COPY)) {
      expect(headingId(section as keyof typeof SECTION_COPY)).toMatch(/^[a-z][a-z0-9-]*$/);
    }
  });
});

describe("the hero", () => {
  it("sets the headline over three lines", () => {
    expect(HERO.lines).toHaveLength(3);
  });

  it("gives every line words", () => {
    for (const line of HERO.lines) {
      expect(line.trim()).not.toBe("");
    }
  });

  it("points its accent at a line that exists", () => {
    expect(HERO.accentLine).toBeGreaterThanOrEqual(0);
    expect(HERO.accentLine).toBeLessThan(HERO.lines.length);
  });

  it("reads as the studio tagline when the lines are joined", () => {
    expect(HERO.lines.join(" ")).toBe("Where Ideas Are Plugged Into Reality");
  });

  it("names both countries in the eyebrow", () => {
    expect(HERO.eyebrow).toContain("Egypt");
    expect(HERO.eyebrow).toContain("UAE");
  });
});
