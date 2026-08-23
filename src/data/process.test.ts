import { describe, expect, it } from "vitest";
import { orderedProcess, PROCESS, processSpan, processStep } from "./process";

describe("the studio process", () => {
  it("has five steps", () => {
    expect(PROCESS).toHaveLength(5);
  });

  it("numbers them one to five with no gaps", () => {
    expect(orderedProcess().map((s) => s.order)).toEqual([1, 2, 3, 4, 5]);
  });

  it("gives every step a unique id", () => {
    const ids = PROCESS.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("uses anchor-shaped ids", () => {
    for (const step of PROCESS) {
      expect(step.id).toMatch(/^[a-z][a-z0-9-]*$/);
    }
  });

  it("summarises every step in a sentence or two", () => {
    for (const step of PROCESS) {
      expect(step.summary.length).toBeGreaterThan(60);
    }
  });

  it("promises something concrete at every step", () => {
    for (const step of PROCESS) {
      expect(step.deliverables.length).toBeGreaterThanOrEqual(2);
      for (const item of step.deliverables) {
        expect(item.trim()).not.toBe("");
      }
    }
  });

  it("gives every step a sane duration range", () => {
    for (const step of PROCESS) {
      const [shortest, longest] = step.days;
      expect(shortest).toBeGreaterThan(0);
      expect(longest).toBeGreaterThanOrEqual(shortest);
    }
  });

  it("adds the steps into a whole-project span", () => {
    const span = processSpan();
    expect(span.shortest).toBe(PROCESS.reduce((n, s) => n + s.days[0], 0));
    expect(span.longest).toBe(PROCESS.reduce((n, s) => n + s.days[1], 0));
  });

  it("reports a span that makes sense", () => {
    const { shortest, longest } = processSpan();
    expect(longest).toBeGreaterThan(shortest);
  });

  it("finds a step by its id", () => {
    expect(processStep("build")?.title).toBe("Build");
  });

  it("gives back nothing for a step that does not exist", () => {
    expect(processStep("nope")).toBeUndefined();
  });

  it("leaves the declared order alone when sorting", () => {
    const before = PROCESS.map((s) => s.id);
    orderedProcess();
    expect(PROCESS.map((s) => s.id)).toEqual(before);
  });
});
