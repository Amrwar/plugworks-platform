import { describe, expect, it } from "vitest";
import { NAV_LINKS, navSectionIds } from "./navigation";

describe("the primary navigation", () => {
  it("offers at least the four sections the page is built from", () => {
    expect(NAV_LINKS.length).toBeGreaterThanOrEqual(4);
  });

  it("points every link at an in-page anchor", () => {
    for (const link of NAV_LINKS) {
      expect(link.href.startsWith("#")).toBe(true);
    }
  });

  it("never repeats a destination", () => {
    const hrefs = NAV_LINKS.map((link) => link.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("never repeats a label", () => {
    const names = NAV_LINKS.map((link) => link.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("gives every link a non-blank label", () => {
    for (const link of NAV_LINKS) {
      expect(link.name.trim()).not.toBe("");
    }
  });

  it("strips the hash when asked for section ids", () => {
    expect(navSectionIds()).toEqual(["about", "services", "locations", "contact"]);
  });

  it("keeps ids in the order the links are declared", () => {
    expect(navSectionIds()).toEqual(NAV_LINKS.map((l) => l.href.slice(1)));
  });

  it("handles a caller's own list rather than only the default", () => {
    expect(navSectionIds([{ name: "Work", href: "#work" }])).toEqual(["work"]);
  });

  it("uses lower-case, hyphen-free ids that are valid anchors", () => {
    for (const id of navSectionIds()) {
      expect(id).toMatch(/^[a-z][a-z0-9-]*$/);
    }
  });
});
