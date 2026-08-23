import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import TeamGrid from "./TeamGrid";
import { TEAM, orderedTeam } from "@/data/team";
import { initials } from "@/lib/text";

const MEMBERS = orderedTeam();

describe("TeamGrid", () => {
  it("renders the people as a list", () => {
    const html = renderToStaticMarkup(<TeamGrid members={MEMBERS} year={2026} />);
    expect(html).toContain("<ul");
    expect(html.match(/<li /g)).toHaveLength(MEMBERS.length);
  });

  it("gives every person a heading", () => {
    const html = renderToStaticMarkup(<TeamGrid members={MEMBERS} year={2026} />);
    expect(html.match(/<h3/g)).toHaveLength(MEMBERS.length);
  });

  it("names everyone with their role", () => {
    const html = renderToStaticMarkup(<TeamGrid members={MEMBERS} year={2026} />);
    for (const member of MEMBERS) {
      expect(html).toContain(member.name);
      expect(html).toContain(member.role);
    }
  });

  it("gives each card the person's id, so a bio can be linked to", () => {
    const html = renderToStaticMarkup(<TeamGrid members={MEMBERS} year={2026} />);
    for (const member of MEMBERS) {
      expect(html).toContain(`id="${member.id}"`);
    }
  });

  it("keeps the order it is handed", () => {
    const html = renderToStaticMarkup(<TeamGrid members={MEMBERS} year={2026} />);
    const positions = MEMBERS.map((member) => html.indexOf(member.name));
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
  });

  it("hides the initials badge, which repeats the name beside it", () => {
    const html = renderToStaticMarkup(<TeamGrid members={MEMBERS} year={2026} />);
    expect(html.match(/aria-hidden="true"/g)).toHaveLength(MEMBERS.length);
    expect(html).toContain(initials(MEMBERS[0].name));
  });

  it("counts tenure to the year it is given", () => {
    const member = { ...TEAM[0], since: 2016 };
    const html = renderToStaticMarkup(<TeamGrid members={[member]} year={2026} />);
    expect(html).toContain("10 years");
  });

  it("uses the singular for one year", () => {
    const member = { ...TEAM[0], since: 2025 };
    const html = renderToStaticMarkup(<TeamGrid members={[member]} year={2026} />);
    expect(html).toContain("1 year");
    expect(html).not.toContain("1 years");
  });

  it("says under a year for somebody who joined this year", () => {
    const member = { ...TEAM[0], since: 2026 };
    const html = renderToStaticMarkup(<TeamGrid members={[member]} year={2026} />);
    expect(html).toContain("Under a year");
  });

  it("renders every bio paragraph", () => {
    const html = renderToStaticMarkup(<TeamGrid members={[MEMBERS[0]]} year={2026} />);
    for (const paragraph of MEMBERS[0].bio) {
      expect(html).toContain(paragraph);
    }
  });

  it("renders an empty list when nobody is passed", () => {
    const html = renderToStaticMarkup(<TeamGrid members={[]} year={2026} />);
    expect(html).not.toContain("<li");
  });
});
