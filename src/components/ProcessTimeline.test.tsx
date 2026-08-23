import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import ProcessTimeline from "./ProcessTimeline";
import { orderedProcess } from "@/data/process";

const STEPS = orderedProcess();

describe("ProcessTimeline", () => {
  it("renders the steps as an ordered list", () => {
    const html = renderToStaticMarkup(<ProcessTimeline steps={STEPS} />);
    expect(html).toContain("<ol");
    expect(html.match(/<li /g)?.length).toBeGreaterThanOrEqual(STEPS.length);
  });

  it("renders every step", () => {
    const html = renderToStaticMarkup(<ProcessTimeline steps={STEPS} />);
    for (const step of STEPS) {
      expect(html).toContain(step.title);
    }
  });

  it("gives each step its id, so a step can be linked to", () => {
    const html = renderToStaticMarkup(<ProcessTimeline steps={STEPS} />);
    for (const step of STEPS) {
      expect(html).toContain(`id="${step.id}"`);
    }
  });

  it("keeps the steps in order", () => {
    const html = renderToStaticMarkup(<ProcessTimeline steps={STEPS} />);
    const positions = STEPS.map((step) => html.indexOf(step.title));
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
  });

  it("writes a range as two numbers", () => {
    const html = renderToStaticMarkup(
      <ProcessTimeline steps={[{ ...STEPS[0], days: [3, 5] }]} />
    );
    expect(html).toContain("3–5 days");
  });

  it("writes a collapsed range as one number", () => {
    const html = renderToStaticMarkup(
      <ProcessTimeline steps={[{ ...STEPS[0], days: [4, 4] }]} />
    );
    expect(html).toContain("4 days");
    expect(html).not.toContain("4–4");
  });

  it("lists what the client gets at each step", () => {
    const html = renderToStaticMarkup(<ProcessTimeline steps={STEPS} />);
    for (const deliverable of STEPS[0].deliverables) {
      expect(html).toContain(deliverable);
    }
  });

  it("hides the step numbers, which the list already announces", () => {
    const html = renderToStaticMarkup(<ProcessTimeline steps={STEPS} />);
    expect(html.match(/aria-hidden="true"/g)).toHaveLength(STEPS.length);
  });

  it("renders nothing but the empty list when there are no steps", () => {
    const html = renderToStaticMarkup(<ProcessTimeline steps={[]} />);
    expect(html).toContain("<ol");
    expect(html).not.toContain("<li");
  });
});
