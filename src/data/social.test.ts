import { describe, expect, it } from "vitest";
import { SOCIAL_LINKS } from "./social";

describe("the social profiles", () => {
  it("lists four of them", () => {
    expect(SOCIAL_LINKS).toHaveLength(4);
  });

  it("gives every icon-only link an accessible name", () => {
    for (const link of SOCIAL_LINKS) {
      expect(link.label.trim().length).toBeGreaterThan(3);
    }
  });

  it("names the studio in each label", () => {
    for (const link of SOCIAL_LINKS) {
      expect(link.label).toContain("Plugworks");
    }
  });

  it("points every link at an absolute https url", () => {
    for (const link of SOCIAL_LINKS) {
      expect(link.href.startsWith("https://")).toBe(true);
    }
  });

  it("never repeats a destination", () => {
    const hrefs = SOCIAL_LINKS.map((l) => l.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("gives each a unique id", () => {
    const ids = SOCIAL_LINKS.map((l) => l.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
