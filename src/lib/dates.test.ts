import { describe, expect, it } from "vitest";
import { copyrightLine, copyrightYear } from "./dates";

describe("the copyright year", () => {
  it("reads the year from the clock it is given", () => {
    expect(copyrightYear(new Date("2031-06-01T00:00:00Z"))).toBe(2031);
  });

  it("uses UTC, so the last evening of the year does not roll back", () => {
    expect(copyrightYear(new Date("2031-12-31T23:30:00Z"))).toBe(2031);
  });

  it("rolls over on the first instant of the new year", () => {
    expect(copyrightYear(new Date("2032-01-01T00:00:00Z"))).toBe(2032);
  });

  it("defaults to now when no clock is passed", () => {
    expect(copyrightYear()).toBe(new Date().getUTCFullYear());
  });
});

describe("the copyright line", () => {
  it("names the owner and the year", () => {
    expect(copyrightLine("Plugworks", new Date("2030-02-02T00:00:00Z"))).toBe(
      "© 2030 Plugworks. All rights reserved."
    );
  });

  it("starts with the copyright sign", () => {
    expect(copyrightLine("Plugworks").startsWith("©")).toBe(true);
  });
});
