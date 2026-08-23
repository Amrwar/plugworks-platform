import { describe, expect, it } from "vitest";
import { SITE } from "@/data/site";
import { allRoutes } from "@/data/routes";
import { CASE_STUDIES } from "@/data/work";
import manifest from "./manifest";
import robots from "./robots";
import sitemap from "./sitemap";

describe("the web app manifest", () => {
  const doc = manifest();

  it("names the studio", () => {
    expect(doc.name).toBe(SITE.name);
    expect(doc.short_name).toBe(SITE.name);
  });

  it("starts at the root", () => {
    expect(doc.start_url).toBe("/");
  });

  it("carries the description the metadata uses", () => {
    expect(doc.description).toBe(SITE.description);
  });

  it("gives colours the browser chrome can use", () => {
    expect(doc.background_color).toMatch(/^#[0-9a-f]{6}$/i);
    expect(doc.theme_color).toMatch(/^#[0-9a-f]{6}$/i);
  });
});

describe("the robots rules", () => {
  const doc = robots();

  it("lets every crawler in", () => {
    expect(doc.rules).toEqual({ userAgent: "*", allow: "/" });
  });

  it("points at the sitemap on the canonical host", () => {
    expect(doc.sitemap).toBe(`${SITE.url}/sitemap.xml`);
  });
});

describe("the sitemap", () => {
  const entries = sitemap();

  it("lists every page the site serves", () => {
    expect(entries).toHaveLength(allRoutes().length);
  });

  it("opens with the home page, at the canonical url", () => {
    expect(entries[0].url).toBe(SITE.url);
  });

  it("gives the home page top priority", () => {
    expect(entries[0].priority).toBe(1);
  });

  it("gives the home page top priority and nothing else", () => {
    const tops = entries.filter((entry) => entry.priority === 1);
    expect(tops).toHaveLength(1);
  });

  it("writes every url against the canonical host", () => {
    for (const entry of entries) {
      expect(entry.url.startsWith(SITE.url)).toBe(true);
    }
  });

  it("never lists the same url twice", () => {
    const urls = entries.map((entry) => entry.url);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("carries the change frequency each route declares", () => {
    const declared = allRoutes().map((route) => route.changeFrequency);
    expect(entries.map((entry) => entry.changeFrequency)).toEqual(declared);
  });

  it("includes a case study page, so the work is crawlable", () => {
    expect(entries.map((entry) => entry.url)).toContain(
      `${SITE.url}/work/${CASE_STUDIES[0].slug}`
    );
  });
});
