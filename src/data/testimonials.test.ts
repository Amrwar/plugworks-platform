import { describe, expect, it } from "vitest";

import {
  TESTIMONIALS,
  attributedTestimonials,
  attribution,
  quotedCompanies,
  rotate,
  studiesWithQuotes,
  testimonial,
  testimonialForStudy,
} from "./testimonials";
import { CASE_STUDIES } from "./work";

describe("TESTIMONIALS", () => {
  it("gives every quote a unique id", () => {
    const ids = TESTIMONIALS.map((entry) => entry.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("attributes every quote to a named person with a role", () => {
    for (const entry of TESTIMONIALS) {
      expect(entry.name.trim().length).toBeGreaterThan(0);
      expect(entry.role.trim().length).toBeGreaterThan(0);
      expect(entry.company.trim().length).toBeGreaterThan(0);
    }
  });

  it("quotes whole sentences rather than fragments", () => {
    for (const entry of TESTIMONIALS) {
      expect(entry.quote.trim().length).toBeGreaterThan(60);
      expect(entry.quote.trim().endsWith(".")).toBe(true);
    }
  });

  it("never leans on an ellipsis to make a quote work", () => {
    for (const entry of TESTIMONIALS) {
      expect(entry.quote).not.toContain("…");
      expect(entry.quote).not.toContain("...");
    }
  });

  it("points every attached quote at a case study that exists", () => {
    const slugs = CASE_STUDIES.map((study) => study.slug);
    for (const entry of attributedTestimonials()) {
      expect(slugs).toContain(entry.studySlug);
    }
  });

  it("never attaches two quotes to the same study", () => {
    const slugs = attributedTestimonials().map((entry) => entry.studySlug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("testimonial", () => {
  it("finds a quote by id", () => {
    expect(testimonial(TESTIMONIALS[0].id)?.name).toBe(TESTIMONIALS[0].name);
  });

  it("returns undefined for an id nobody has", () => {
    expect(testimonial("not-a-quote")).toBeUndefined();
  });
});

describe("testimonialForStudy", () => {
  it("finds the quote attached to a study", () => {
    const attached = attributedTestimonials()[0];
    expect(testimonialForStudy(attached.studySlug as string)?.id).toBe(attached.id);
  });

  it("returns undefined for a study nobody has quoted", () => {
    expect(testimonialForStudy("kingfisher-rebrand-rollout")).toBeUndefined();
  });

  it("returns undefined for a study that does not exist", () => {
    expect(testimonialForStudy("no-such-study")).toBeUndefined();
  });
});

describe("attributedTestimonials", () => {
  it("returns only quotes that name a study", () => {
    for (const entry of attributedTestimonials()) {
      expect(entry.studySlug).toBeDefined();
    }
  });

  it("is a subset of the whole list", () => {
    expect(attributedTestimonials().length).toBeLessThanOrEqual(TESTIMONIALS.length);
  });
});

describe("rotate", () => {
  it("returns the number of quotes asked for", () => {
    expect(rotate(3)).toHaveLength(3);
  });

  it("starts where it is told to", () => {
    expect(rotate(2, 1)[0].id).toBe(TESTIMONIALS[1].id);
  });

  it("wraps round the end of the list", () => {
    const wrapped = rotate(2, TESTIMONIALS.length - 1);
    expect(wrapped[0].id).toBe(TESTIMONIALS[TESTIMONIALS.length - 1].id);
    expect(wrapped[1].id).toBe(TESTIMONIALS[0].id);
  });

  it("handles an offset larger than the list", () => {
    expect(rotate(1, TESTIMONIALS.length * 3 + 2)[0].id).toBe(TESTIMONIALS[2].id);
  });

  it("handles a negative offset", () => {
    expect(rotate(1, -1)[0].id).toBe(TESTIMONIALS[TESTIMONIALS.length - 1].id);
  });

  it("never repeats a quote when asked for more than there are", () => {
    const many = rotate(TESTIMONIALS.length + 5);
    expect(many).toHaveLength(TESTIMONIALS.length);
    expect(new Set(many.map((entry) => entry.id)).size).toBe(TESTIMONIALS.length);
  });

  it("returns nothing when asked for nothing", () => {
    expect(rotate(0)).toEqual([]);
  });

  it("returns nothing when asked for a negative count", () => {
    expect(rotate(-2)).toEqual([]);
  });
});

describe("attribution", () => {
  it("signs a quote with the name, the role and the company", () => {
    const entry = TESTIMONIALS[0];
    expect(attribution(entry)).toBe(`${entry.name}, ${entry.role}, ${entry.company}`);
  });

  it("produces a single line for every quote", () => {
    for (const entry of TESTIMONIALS) {
      expect(attribution(entry)).not.toContain("\n");
    }
  });
});

describe("quotedCompanies", () => {
  it("lists each company once, alphabetically", () => {
    const companies = quotedCompanies();
    expect(companies).toEqual(Array.from(new Set(companies)).sort());
  });

  it("covers every quote", () => {
    for (const entry of TESTIMONIALS) {
      expect(quotedCompanies()).toContain(entry.company);
    }
  });
});

describe("studiesWithQuotes", () => {
  it("names only studies that really have a quote", () => {
    for (const slug of studiesWithQuotes()) {
      expect(testimonialForStudy(slug)).toBeDefined();
    }
  });

  it("keeps the order of the work list", () => {
    const positions = studiesWithQuotes().map((slug) =>
      CASE_STUDIES.findIndex((study) => study.slug === slug)
    );
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
  });
});
