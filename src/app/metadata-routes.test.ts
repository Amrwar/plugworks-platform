import { describe, expect, it } from "vitest";
import { SITE } from "@/data/site";
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

  it("has one entry, because this is one page", () => {
    expect(entries).toHaveLength(1);
  });

  it("points at the canonical url", () => {
    expect(entries[0].url).toBe(SITE.url);
  });

  it("gives the page top priority", () => {
    expect(entries[0].priority).toBe(1);
  });
});
