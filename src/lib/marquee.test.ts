import { describe, expect, it } from "vitest";
import { marqueeItems, marqueeRepeats } from "./marquee";

describe("sizing a scrolling banner", () => {
  it("covers the viewport twice over", () => {
    expect(marqueeRepeats(1000, 250)).toBe(8);
  });

  it("rounds up rather than leaving a gap", () => {
    expect(marqueeRepeats(1000, 300)).toBe(7);
  });

  it("never drops below two copies, however wide the phrase", () => {
    expect(marqueeRepeats(100, 5000)).toBe(2);
  });

  it("copes with a phrase of no width at all", () => {
    expect(marqueeRepeats(1000, 0)).toBe(1);
  });

  it("grows as the viewport does", () => {
    expect(marqueeRepeats(2000, 250)).toBeGreaterThan(marqueeRepeats(1000, 250));
  });
});

describe("building the banner items", () => {
  it("repeats the phrase the number of times asked", () => {
    expect(marqueeItems("Coming soon", 3)).toEqual([
      "Coming soon",
      "Coming soon",
      "Coming soon",
    ]);
  });

  it("always renders at least one copy", () => {
    expect(marqueeItems("Coming soon", 0)).toHaveLength(1);
  });

  it("ignores a fractional count", () => {
    expect(marqueeItems("x", 2.9)).toHaveLength(2);
  });
});
