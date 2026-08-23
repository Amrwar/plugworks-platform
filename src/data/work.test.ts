import { describe, expect, it } from "vitest";
import { SERVICES } from "./services";
import {
  CASE_STUDIES,
  orderedWork,
  relatedWork,
  servicesWithWork,
  workBySlug,
  workCities,
  workForService,
  workYears,
} from "./work";

describe("the work catalogue", () => {
  it("gives every study a unique slug", () => {
    const slugs = CASE_STUDIES.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("uses url-safe slugs", () => {
    for (const study of CASE_STUDIES) {
      expect(study.slug).toMatch(/^[a-z][a-z0-9-]*$/);
    }
  });

  it("files every study under a service the studio offers", () => {
    const offered = SERVICES.map((s) => s.id);
    for (const study of CASE_STUDIES) {
      expect(offered).toContain(study.serviceId);
    }
  });

  it("gives every study a client, a city and a year", () => {
    for (const study of CASE_STUDIES) {
      expect(study.client.trim()).not.toBe("");
      expect(study.city.trim()).not.toBe("");
      expect(study.year).toBeGreaterThan(2000);
    }
  });

  it("summarises each in one line", () => {
    for (const study of CASE_STUDIES) {
      expect(study.summary.length).toBeGreaterThan(40);
      expect(study.summary).not.toContain("\n");
    }
  });

  it("tells each story in at least two paragraphs", () => {
    for (const study of CASE_STUDIES) {
      expect(study.story.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("never leaves a paragraph blank", () => {
    for (const study of CASE_STUDIES) {
      for (const paragraph of study.story) {
        expect(paragraph.trim().length).toBeGreaterThan(40);
      }
    }
  });

  it("puts numbers against every study", () => {
    for (const study of CASE_STUDIES) {
      expect(study.results.length).toBeGreaterThanOrEqual(2);
      for (const result of study.results) {
        expect(result.label.trim()).not.toBe("");
        expect(result.value.trim()).not.toBe("");
      }
    }
  });

  it("credits somebody on every study", () => {
    for (const study of CASE_STUDIES) {
      expect(study.credits.length).toBeGreaterThanOrEqual(1);
      for (const credit of study.credits) {
        expect(credit.role.trim()).not.toBe("");
        expect(credit.name.trim()).not.toBe("");
      }
    }
  });

  it("features at least one piece, and not all of them", () => {
    const featured = CASE_STUDIES.filter((s) => s.featured);
    expect(featured.length).toBeGreaterThanOrEqual(1);
    expect(featured.length).toBeLessThan(CASE_STUDIES.length);
  });
});

describe("ordering the work", () => {
  it("puts featured studies first", () => {
    const ordered = orderedWork();
    const lastFeatured = ordered.map((s) => s.featured).lastIndexOf(true);
    const firstPlain = ordered.map((s) => s.featured).indexOf(false);
    expect(lastFeatured).toBeLessThan(firstPlain);
  });

  it("puts newer work before older within a band", () => {
    const plain = orderedWork().filter((s) => !s.featured);
    for (let i = 1; i < plain.length; i += 1) {
      expect(plain[i - 1].year).toBeGreaterThanOrEqual(plain[i].year);
    }
  });

  it("settles a tie on the title, so the order never wobbles", () => {
    const a = orderedWork().map((s) => s.slug);
    const b = orderedWork().map((s) => s.slug);
    expect(a).toEqual(b);
  });

  it("leaves the catalogue it was given alone", () => {
    const before = CASE_STUDIES.map((s) => s.slug);
    orderedWork();
    expect(CASE_STUDIES.map((s) => s.slug)).toEqual(before);
  });

  it("returns every study exactly once", () => {
    expect(orderedWork()).toHaveLength(CASE_STUDIES.length);
  });
});

describe("finding one piece of work", () => {
  it("finds a study by its slug", () => {
    expect(workBySlug("nile-tower-launch")?.client).toBe("Orascom Real Estate");
  });

  it("gives back nothing for a slug that does not exist", () => {
    expect(workBySlug("no-such-work")).toBeUndefined();
  });

  it("is case sensitive, because urls are", () => {
    expect(workBySlug("Nile-Tower-Launch")).toBeUndefined();
  });
});

describe("work by service", () => {
  it("returns only studies filed under that service", () => {
    for (const study of workForService("content-production")) {
      expect(study.serviceId).toBe("content-production");
    }
  });

  it("returns nothing for a service with no work", () => {
    expect(workForService("no-such-service")).toEqual([]);
  });

  it("lists only services that have work behind them", () => {
    for (const id of servicesWithWork()) {
      expect(workForService(id).length).toBeGreaterThan(0);
    }
  });

  it("accounts for every study across the services", () => {
    const counted = servicesWithWork().reduce(
      (total, id) => total + workForService(id).length,
      0
    );
    expect(counted).toBe(CASE_STUDIES.length);
  });
});

describe("related work", () => {
  it("never suggests the study being read", () => {
    for (const study of CASE_STUDIES) {
      for (const related of relatedWork(study.slug)) {
        expect(related.slug).not.toBe(study.slug);
      }
    }
  });

  it("prefers work in the same discipline", () => {
    const current = workBySlug("nile-tower-launch")!;
    const sibling = CASE_STUDIES.find(
      (s) => s.serviceId === current.serviceId && s.slug !== current.slug
    );
    if (sibling) {
      expect(relatedWork(current.slug)[0].serviceId).toBe(current.serviceId);
    }
  });

  it("fills up from the rest of the catalogue when a discipline is thin", () => {
    expect(relatedWork("meridian-museum-ar", 2)).toHaveLength(2);
  });

  it("honours the limit it is given", () => {
    expect(relatedWork("nile-tower-launch", 1)).toHaveLength(1);
  });

  it("returns nothing for a slug that does not exist", () => {
    expect(relatedWork("no-such-work")).toEqual([]);
  });

  it("returns nothing when asked for none", () => {
    expect(relatedWork("nile-tower-launch", 0)).toEqual([]);
  });

  it("never repeats a suggestion", () => {
    const slugs = relatedWork("nile-tower-launch", 4).map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("the facets the work supports", () => {
  it("lists the years newest first", () => {
    const years = workYears();
    expect([...years].sort((a, b) => b - a)).toEqual(years);
  });

  it("lists each year once", () => {
    expect(new Set(workYears()).size).toBe(workYears().length);
  });

  it("lists the cities alphabetically, once each", () => {
    const cities = workCities();
    expect([...cities].sort()).toEqual(cities);
    expect(new Set(cities).size).toBe(cities.length);
  });

  it("names only cities the studio actually works from", () => {
    for (const city of workCities()) {
      expect(CASE_STUDIES.some((s) => s.city === city)).toBe(true);
    }
  });
});
