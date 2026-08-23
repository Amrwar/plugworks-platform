import { describe, expect, it } from "vitest";

import {
  STATIC_ROUTES,
  allRoutes,
  href,
  isKnownRoute,
  serviceRoutes,
  workRoutes,
} from "./routes";
import { CASE_STUDIES } from "./work";
import { SERVICES } from "./services";

describe("STATIC_ROUTES", () => {
  it("starts at the home page", () => {
    expect(STATIC_ROUTES[0].path).toBe("");
  });

  it("gives the home page the only priority of one", () => {
    const tops = STATIC_ROUTES.filter((route) => route.priority === 1);
    expect(tops).toHaveLength(1);
    expect(tops[0].path).toBe("");
  });

  it("keeps every priority inside the range a sitemap allows", () => {
    for (const route of STATIC_ROUTES) {
      expect(route.priority).toBeGreaterThan(0);
      expect(route.priority).toBeLessThanOrEqual(1);
    }
  });

  it("never writes a leading slash into a path", () => {
    for (const route of STATIC_ROUTES) {
      expect(route.path.startsWith("/")).toBe(false);
    }
  });

  it("labels every page", () => {
    for (const route of STATIC_ROUTES) {
      expect(route.label.trim().length).toBeGreaterThan(0);
    }
  });
});

describe("workRoutes", () => {
  it("produces one route per case study", () => {
    expect(workRoutes()).toHaveLength(CASE_STUDIES.length);
  });

  it("puts the newest work first", () => {
    const years = workRoutes().map(
      (route) => CASE_STUDIES.find((study) => `work/${study.slug}` === route.path)?.year ?? 0
    );
    expect(years).toEqual([...years].sort((a, b) => b - a));
  });

  it("files each study under the work path", () => {
    for (const route of workRoutes()) {
      expect(route.path.startsWith("work/")).toBe(true);
    }
  });

  it("uses the study title as the label", () => {
    const labels = workRoutes().map((route) => route.label);
    for (const study of CASE_STUDIES) {
      expect(labels).toContain(study.title);
    }
  });
});

describe("serviceRoutes", () => {
  it("produces one route per service", () => {
    expect(serviceRoutes()).toHaveLength(SERVICES.length);
  });

  it("keeps the order of the services grid", () => {
    expect(serviceRoutes().map((route) => route.label)).toEqual(
      SERVICES.map((service) => service.title)
    );
  });

  it("files each service under the services path", () => {
    for (const route of serviceRoutes()) {
      expect(route.path.startsWith("services/")).toBe(true);
    }
  });
});

describe("allRoutes", () => {
  it("covers the fixed pages and both generated sets", () => {
    expect(allRoutes()).toHaveLength(
      STATIC_ROUTES.length + SERVICES.length + CASE_STUDIES.length
    );
  });

  it("never repeats a path", () => {
    const paths = allRoutes().map((route) => route.path);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("puts the fixed pages before the generated ones", () => {
    expect(allRoutes().slice(0, STATIC_ROUTES.length)).toEqual([...STATIC_ROUTES]);
  });
});

describe("href", () => {
  it("turns the home path into a single slash", () => {
    expect(href({ path: "", label: "Home", changeFrequency: "monthly", priority: 1 })).toBe("/");
  });

  it("puts a leading slash on every other path", () => {
    expect(href({ path: "faq", label: "Q", changeFrequency: "monthly", priority: 0.5 })).toBe(
      "/faq"
    );
  });

  it("never produces a double slash", () => {
    for (const route of allRoutes()) {
      expect(href(route)).not.toContain("//");
    }
  });
});

describe("isKnownRoute", () => {
  it("recognises a fixed page", () => {
    expect(isKnownRoute("/faq")).toBe(true);
  });

  it("recognises the home page", () => {
    expect(isKnownRoute("/")).toBe(true);
  });

  it("recognises a generated case study page", () => {
    expect(isKnownRoute(`/work/${CASE_STUDIES[0].slug}`)).toBe(true);
  });

  it("ignores a trailing slash", () => {
    expect(isKnownRoute("/process/")).toBe(true);
  });

  it("rejects a page the site does not serve", () => {
    expect(isKnownRoute("/careers")).toBe(false);
  });
});
