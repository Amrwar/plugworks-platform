import { describe, expect, it } from "vitest";
import {
  NAV_LINKS,
  PAGE_LINKS,
  isCurrentPage,
  isHome,
  navSectionIds,
  resolveHref,
} from "./navigation";
import { isKnownRoute } from "./routes";

describe("the primary navigation", () => {
  it("offers at least the four sections the page is built from", () => {
    expect(NAV_LINKS.length).toBeGreaterThanOrEqual(4);
  });

  it("points every link at an in-page anchor", () => {
    for (const link of NAV_LINKS) {
      expect(link.href.startsWith("#")).toBe(true);
    }
  });

  it("never repeats a destination", () => {
    const hrefs = NAV_LINKS.map((link) => link.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("never repeats a label", () => {
    const names = NAV_LINKS.map((link) => link.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("gives every link a non-blank label", () => {
    for (const link of NAV_LINKS) {
      expect(link.name.trim()).not.toBe("");
    }
  });

  it("strips the hash when asked for section ids", () => {
    expect(navSectionIds()).toEqual(["about", "services", "locations", "contact"]);
  });

  it("keeps ids in the order the links are declared", () => {
    expect(navSectionIds()).toEqual(NAV_LINKS.map((l) => l.href.slice(1)));
  });

  it("handles a caller's own list rather than only the default", () => {
    expect(navSectionIds([{ name: "Work", href: "#work" }])).toEqual(["work"]);
  });

  it("uses lower-case, hyphen-free ids that are valid anchors", () => {
    for (const id of navSectionIds()) {
      expect(id).toMatch(/^[a-z][a-z0-9-]*$/);
    }
  });
});

describe("the page links", () => {
  it("points every link at a path, never at an anchor", () => {
    for (const link of PAGE_LINKS) {
      expect(link.href.startsWith("/")).toBe(true);
    }
  });

  it("never repeats a destination", () => {
    const hrefs = PAGE_LINKS.map((link) => link.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("never repeats a label", () => {
    const names = PAGE_LINKS.map((link) => link.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("only points at pages the site actually serves", () => {
    for (const link of PAGE_LINKS) {
      expect(isKnownRoute(link.href)).toBe(true);
    }
  });

  it("never offers the home page twice over", () => {
    expect(PAGE_LINKS.map((link) => link.href)).not.toContain("/");
  });
});

describe("isHome", () => {
  it("recognises the root path", () => {
    expect(isHome("/")).toBe(true);
  });

  it("recognises an empty path", () => {
    expect(isHome("")).toBe(true);
  });

  it("rejects any other page", () => {
    expect(isHome("/work")).toBe(false);
  });
});

describe("resolveHref", () => {
  it("leaves a section anchor alone on the home page", () => {
    expect(resolveHref("#about", "/")).toBe("#about");
  });

  it("carries the path with a section anchor from anywhere else", () => {
    expect(resolveHref("#about", "/work")).toBe("/#about");
  });

  it("leaves a page link alone wherever you are", () => {
    expect(resolveHref("/faq", "/work")).toBe("/faq");
    expect(resolveHref("/faq", "/")).toBe("/faq");
  });

  it("never produces a double slash", () => {
    expect(resolveHref("#contact", "/services/content-production")).not.toContain("//");
  });

  it("resolves every declared section link from a deep page", () => {
    for (const link of NAV_LINKS) {
      expect(resolveHref(link.href, "/work/nile-tower-launch")).toBe(`/${link.href}`);
    }
  });
});

describe("isCurrentPage", () => {
  it("matches the page you are on", () => {
    expect(isCurrentPage("/work", "/work")).toBe(true);
  });

  it("ignores a trailing slash on either side", () => {
    expect(isCurrentPage("/work/", "/work")).toBe(true);
    expect(isCurrentPage("/work", "/work/")).toBe(true);
  });

  it("does not match a different page", () => {
    expect(isCurrentPage("/work", "/faq")).toBe(false);
  });

  it("does not match a child of the page", () => {
    expect(isCurrentPage("/work", "/work/nile-tower-launch")).toBe(false);
  });

  it("never claims a section anchor is the current page", () => {
    expect(isCurrentPage("#about", "/")).toBe(false);
  });
});
