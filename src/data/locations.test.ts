import { describe, expect, it } from "vitest";
import { LOCATIONS } from "./locations";

describe("where the studio works from", () => {
  it("names both offices", () => {
    expect(LOCATIONS.map((l) => l.city)).toEqual(["Cairo", "Dubai"]);
  });

  it("pairs each city with its country", () => {
    expect(LOCATIONS.map((l) => l.country)).toEqual(["Egypt", "UAE"]);
  });

  it("never lists the same city twice", () => {
    const cities = LOCATIONS.map((l) => l.city);
    expect(new Set(cities).size).toBe(cities.length);
  });

  it("gives each office a description", () => {
    for (const location of LOCATIONS) {
      expect(location.description.trim().length).toBeGreaterThan(30);
    }
  });

  it("carries a flag for each", () => {
    for (const location of LOCATIONS) {
      expect(location.flag.trim()).not.toBe("");
    }
  });

  it("tints each with a brand token", () => {
    for (const location of LOCATIONS) {
      expect(location.accent.startsWith("plug-")).toBe(true);
    }
  });
});
