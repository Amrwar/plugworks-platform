import { describe, expect, it } from "vitest";
import { activeSection } from "./sections";

const sections = [
  { id: "about", top: 500 },
  { id: "services", top: 1200 },
  { id: "locations", top: 2000 },
  { id: "contact", top: 2800 },
];

describe("deciding which section is being read", () => {
  it("highlights nothing above the first section", () => {
    expect(activeSection(sections, 0)).toBeNull();
  });

  it("highlights the first section the moment its top reaches the line", () => {
    expect(activeSection(sections, 500)).toBe("about");
  });

  it("keeps the section highlighted while inside it", () => {
    expect(activeSection(sections, 900)).toBe("about");
  });

  it("moves on as the next section arrives", () => {
    expect(activeSection(sections, 1200)).toBe("services");
  });

  it("highlights the last section once past it", () => {
    expect(activeSection(sections, 99999)).toBe("contact");
  });

  it("does not care what order it is given the sections in", () => {
    const shuffled = [sections[2], sections[0], sections[3], sections[1]];
    expect(activeSection(shuffled, 1300)).toBe("services");
  });

  it("leaves the caller's array alone", () => {
    const input = [...sections];
    activeSection(input, 1500);
    expect(input).toEqual(sections);
  });

  it("copes with no sections at all", () => {
    expect(activeSection([], 100)).toBeNull();
  });
});
