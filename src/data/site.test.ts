import { describe, expect, it } from "vitest";
import { looksLikeEmail } from "@/lib/enquiry";
import { SITE } from "./site";

describe("the studio's own details", () => {
  it("has a name and a tagline", () => {
    expect(SITE.name.trim()).not.toBe("");
    expect(SITE.tagline.trim()).not.toBe("");
  });

  it("publishes a reachable-looking address", () => {
    expect(looksLikeEmail(SITE.email)).toBe(true);
  });

  it("gives an absolute https url with no trailing slash", () => {
    expect(SITE.url.startsWith("https://")).toBe(true);
    expect(SITE.url.endsWith("/")).toBe(false);
  });

  it("describes the studio in a length a search result can show", () => {
    expect(SITE.description.length).toBeGreaterThan(60);
    expect(SITE.description.length).toBeLessThan(320);
  });
});
