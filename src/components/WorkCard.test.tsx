import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import WorkCard from "./WorkCard";
import { SERVICES } from "@/data/services";
import { CASE_STUDIES } from "@/data/work";

const STUDY = CASE_STUDIES[0];

describe("WorkCard", () => {
  it("is a single link, so a study is one tab stop", () => {
    const html = renderToStaticMarkup(<WorkCard study={STUDY} />);
    expect(html.match(/<a /g)).toHaveLength(1);
  });

  it("points at the study's own page", () => {
    const html = renderToStaticMarkup(<WorkCard study={STUDY} />);
    expect(html).toContain(`href="/work/${STUDY.slug}"`);
  });

  it("names the study and the client in the accessible name", () => {
    const html = renderToStaticMarkup(<WorkCard study={STUDY} />);
    expect(html).toContain(`aria-label="${STUDY.title} — ${STUDY.client}"`);
  });

  it("wraps the card in an article", () => {
    const html = renderToStaticMarkup(<WorkCard study={STUDY} />);
    expect(html).toContain("<article");
  });

  it("labels the card with the discipline it belongs to", () => {
    const service = SERVICES.find((entry) => entry.id === STUDY.serviceId);
    const html = renderToStaticMarkup(<WorkCard study={STUDY} />);
    expect(html).toContain(service?.title ?? "Studio work");
  });

  it("falls back to a generic label for an unknown discipline", () => {
    const html = renderToStaticMarkup(
      <WorkCard study={{ ...STUDY, serviceId: "not-a-service" }} />
    );
    expect(html).toContain("Studio work");
  });

  it("shows the city and the year", () => {
    const html = renderToStaticMarkup(<WorkCard study={STUDY} />);
    expect(html).toContain(STUDY.city);
    expect(html).toContain(String(STUDY.year));
  });

  it("shows two results on a normal card", () => {
    const html = renderToStaticMarkup(<WorkCard study={STUDY} />);
    expect(html.match(/<dt /g)).toHaveLength(2);
  });

  it("shows three results and takes both columns when featured", () => {
    const html = renderToStaticMarkup(<WorkCard study={STUDY} wide />);
    expect(html.match(/<dt /g)).toHaveLength(3);
    expect(html).toContain("md:col-span-2");
  });

  it("stays in one column when it is not featured", () => {
    const html = renderToStaticMarkup(<WorkCard study={STUDY} />);
    expect(html).not.toContain("md:col-span-2");
  });

  it("hides the decorative marks from assistive technology", () => {
    const html = renderToStaticMarkup(<WorkCard study={STUDY} />);
    expect(html.match(/aria-hidden="true"/g)?.length).toBeGreaterThanOrEqual(3);
  });
});
