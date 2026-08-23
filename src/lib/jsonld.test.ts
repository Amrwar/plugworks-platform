import { describe, expect, it } from "vitest";
import { LOCATIONS } from "@/data/locations";
import { SERVICES } from "@/data/services";
import { SITE } from "@/data/site";
import { organizationJsonLd, organizationJsonLdString } from "./jsonld";

describe("the organization markup", () => {
  const doc = organizationJsonLd();

  it("declares the schema.org context", () => {
    expect(doc["@context"]).toBe("https://schema.org");
  });

  it("is an Organization", () => {
    expect(doc["@type"]).toBe("Organization");
  });

  it("carries the studio name, url and address", () => {
    expect(doc.name).toBe(SITE.name);
    expect(doc.url).toBe(SITE.url);
    expect(doc.email).toBe(SITE.email);
  });

  it("lists one postal address per office", () => {
    expect(doc.address).toHaveLength(LOCATIONS.length);
  });

  it("takes each city and country from the locations data", () => {
    expect(doc.address.map((a) => a.addressLocality)).toEqual(LOCATIONS.map((l) => l.city));
    expect(doc.address.map((a) => a.addressCountry)).toEqual(LOCATIONS.map((l) => l.country));
  });

  it("offers one entry per service", () => {
    expect(doc.makesOffer).toHaveLength(SERVICES.length);
  });

  it("names each offered service from the services data", () => {
    expect(doc.makesOffer.map((o) => o.itemOffered.name)).toEqual(SERVICES.map((s) => s.title));
  });

  it("serialises to JSON a script tag can carry", () => {
    expect(() => JSON.parse(organizationJsonLdString())).not.toThrow();
  });

  it("round-trips without losing anything", () => {
    expect(JSON.parse(organizationJsonLdString())).toEqual(doc);
  });
});
