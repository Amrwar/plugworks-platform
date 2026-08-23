import { describe, expect, it } from "vitest";
import { SERVICES } from "./services";

describe("the services on offer", () => {
  it("lists six of them", () => {
    expect(SERVICES).toHaveLength(6);
  });

  it("gives each a unique id", () => {
    const ids = SERVICES.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("uses slug-shaped ids so they can be anchors or keys", () => {
    for (const service of SERVICES) {
      expect(service.id).toMatch(/^[a-z][a-z0-9-]*$/);
    }
  });

  it("gives each a title and a description", () => {
    for (const service of SERVICES) {
      expect(service.title.trim()).not.toBe("");
      expect(service.description.trim()).not.toBe("");
    }
  });

  it("writes descriptions long enough to say something", () => {
    for (const service of SERVICES) {
      expect(service.description.length).toBeGreaterThan(40);
    }
  });

  it("ends every description with a full stop", () => {
    for (const service of SERVICES) {
      expect(service.description.endsWith(".")).toBe(true);
    }
  });

  it("tints each card with one of the brand tokens", () => {
    for (const service of SERVICES) {
      expect(["plug-electric", "plug-spark", "plug-glow"]).toContain(service.color);
    }
  });

  it("does not repeat a title", () => {
    const titles = SERVICES.map((s) => s.title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("derives each id from its own title", () => {
    for (const service of SERVICES) {
      const fromTitle = service.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      expect(service.id).toBe(fromTitle);
    }
  });
});
