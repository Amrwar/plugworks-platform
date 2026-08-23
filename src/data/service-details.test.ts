import { describe, expect, it } from "vitest";

import {
  SERVICE_DETAILS,
  detailedServices,
  engagementSpan,
  lowestEntryPrice,
  serviceDetail,
  startingPrice,
  weekRange,
} from "./service-details";
import { SERVICES } from "./services";

describe("SERVICE_DETAILS", () => {
  it("joins every detail to a service that exists", () => {
    const ids = SERVICES.map((service) => service.id);
    for (const detail of SERVICE_DETAILS) {
      expect(ids).toContain(detail.serviceId);
    }
  });

  it("covers every service, so no card links to a missing page", () => {
    for (const service of SERVICES) {
      expect(serviceDetail(service.id)).toBeDefined();
    }
  });

  it("never describes the same service twice", () => {
    const ids = SERVICE_DETAILS.map((detail) => detail.serviceId);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("writes an intro long enough to be a sentence", () => {
    for (const detail of SERVICE_DETAILS) {
      expect(detail.intro.trim().length).toBeGreaterThan(60);
    }
  });

  it("says what is included and what is not", () => {
    for (const detail of SERVICE_DETAILS) {
      expect(detail.includes.length).toBeGreaterThanOrEqual(3);
      expect(detail.excludes.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("never lists the same line as both included and excluded", () => {
    for (const detail of SERVICE_DETAILS) {
      const overlap = detail.includes.filter((line) => detail.excludes.includes(line));
      expect(overlap).toEqual([]);
    }
  });

  it("gives every range a low end no higher than its high end", () => {
    for (const detail of SERVICE_DETAILS) {
      expect(detail.weeks[0]).toBeLessThanOrEqual(detail.weeks[1]);
      expect(detail.weeks[0]).toBeGreaterThan(0);
    }
  });

  it("quotes a starting price that is a whole number of dollars", () => {
    for (const detail of SERVICE_DETAILS) {
      expect(Number.isInteger(detail.fromUsd)).toBe(true);
      expect(detail.fromUsd).toBeGreaterThan(0);
    }
  });
});

describe("serviceDetail", () => {
  it("finds a service by id", () => {
    expect(serviceDetail("content-production")?.serviceId).toBe("content-production");
  });

  it("returns undefined for a service that does not exist", () => {
    expect(serviceDetail("skywriting")).toBeUndefined();
  });
});

describe("detailedServices", () => {
  it("keeps the order of the services grid", () => {
    expect(detailedServices()).toEqual(SERVICES.map((service) => service.id));
  });

  it("names only services that really have a detail", () => {
    for (const id of detailedServices()) {
      expect(serviceDetail(id)).toBeDefined();
    }
  });
});

describe("weekRange", () => {
  it("writes a range as two numbers", () => {
    expect(weekRange({ ...SERVICE_DETAILS[0], weeks: [6, 14] })).toBe("6–14 weeks");
  });

  it("writes a collapsed range as one number", () => {
    expect(weekRange({ ...SERVICE_DETAILS[0], weeks: [8, 8] })).toBe("8 weeks");
  });

  it("says weeks for every real service", () => {
    for (const detail of SERVICE_DETAILS) {
      expect(weekRange(detail)).toContain("weeks");
    }
  });
});

describe("startingPrice", () => {
  it("groups the thousands", () => {
    expect(startingPrice({ ...SERVICE_DETAILS[0], fromUsd: 45000 })).toBe("From $45,000");
  });

  it("handles a price under a thousand without a separator", () => {
    expect(startingPrice({ ...SERVICE_DETAILS[0], fromUsd: 800 })).toBe("From $800");
  });
});

describe("lowestEntryPrice", () => {
  it("is the cheapest starting price on the list", () => {
    expect(lowestEntryPrice()).toBe(
      Math.min(...SERVICE_DETAILS.map((detail) => detail.fromUsd))
    );
  });

  it("is not above any single service", () => {
    for (const detail of SERVICE_DETAILS) {
      expect(lowestEntryPrice()).toBeLessThanOrEqual(detail.fromUsd);
    }
  });
});

describe("engagementSpan", () => {
  it("spans from the shortest low end to the longest high end", () => {
    const span = engagementSpan();
    expect(span.shortest).toBe(Math.min(...SERVICE_DETAILS.map((d) => d.weeks[0])));
    expect(span.longest).toBe(Math.max(...SERVICE_DETAILS.map((d) => d.weeks[1])));
  });

  it("never reports a span that runs backwards", () => {
    const span = engagementSpan();
    expect(span.shortest).toBeLessThanOrEqual(span.longest);
  });
});
