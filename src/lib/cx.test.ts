import { describe, expect, it } from "vitest";
import { cx } from "./cx";

describe("joining class names", () => {
  it("joins what it is given", () => {
    expect(cx("a", "b")).toBe("a b");
  });

  it("drops false, null and undefined", () => {
    expect(cx("a", false, null, undefined, "b")).toBe("a b");
  });

  it("drops empty strings", () => {
    expect(cx("a", "", "b")).toBe("a b");
  });

  it("collapses runs of whitespace", () => {
    expect(cx("a   b", "  c ")).toBe("a b c");
  });

  it("returns an empty string when everything is dropped", () => {
    expect(cx(false, undefined)).toBe("");
  });

  it("keeps the order it was given", () => {
    expect(cx("first", "second", "third")).toBe("first second third");
  });
});
