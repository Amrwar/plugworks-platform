import { afterEach, describe, expect, it, vi } from "vitest";
import { prefersReducedMotion } from "./useReveal";

afterEach(() => {
  vi.unstubAllGlobals();
});

function withMatchMedia(matches: boolean) {
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
}

describe("asking whether the reader wants less motion", () => {
  it("is false when the query does not match", () => {
    withMatchMedia(false);
    expect(prefersReducedMotion()).toBe(false);
  });

  it("is true when the query matches", () => {
    withMatchMedia(true);
    expect(prefersReducedMotion()).toBe(true);
  });

  it("asks about prefers-reduced-motion specifically", () => {
    let asked = "";
    vi.stubGlobal("matchMedia", (query: string) => {
      asked = query;
      return { matches: false, media: query, addEventListener: () => {}, removeEventListener: () => {} };
    });
    prefersReducedMotion();
    expect(asked).toBe("(prefers-reduced-motion: reduce)");
  });

  it("says no rather than throwing where matchMedia is missing", () => {
    vi.stubGlobal("matchMedia", undefined);
    expect(prefersReducedMotion()).toBe(false);
  });
});
