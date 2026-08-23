import { describe, expect, it } from "vitest";
import { navSectionIds } from "./navigation";
import { headingId, SECTION_COPY } from "./copy";

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
