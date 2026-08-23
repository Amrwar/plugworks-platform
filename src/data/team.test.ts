import { describe, expect, it } from "vitest";

import {
  TEAM,
  TEAM_DISCIPLINES,
  foundedYear,
  orderedTeam,
  staffedDisciplines,
  teamByDiscipline,
  teamCities,
  teamMember,
  tenure,
} from "./team";
import { LOCATIONS } from "./locations";

describe("TEAM", () => {
  it("gives every member a unique id", () => {
    const ids = TEAM.map((member) => member.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("files everyone under a known discipline", () => {
    for (const member of TEAM) {
      expect(TEAM_DISCIPLINES).toContain(member.discipline);
    }
  });

  it("bases everyone in a city the studio actually has", () => {
    const cities = LOCATIONS.map((location) => location.city);
    for (const member of TEAM) {
      expect(cities).toContain(member.city);
    }
  });

  it("writes every bio as at least two sentences of prose", () => {
    for (const member of TEAM) {
      expect(member.bio.length).toBeGreaterThanOrEqual(2);
      for (const paragraph of member.bio) {
        expect(paragraph.trim().length).toBeGreaterThan(40);
      }
    }
  });

  it("gives everyone a joining year that is not in the future", () => {
    for (const member of TEAM) {
      expect(member.since).toBeGreaterThan(2000);
      expect(member.since).toBeLessThanOrEqual(2026);
    }
  });
});

describe("orderedTeam", () => {
  it("puts the longest-serving first", () => {
    const years = orderedTeam().map((member) => member.since);
    expect(years).toEqual([...years].sort((a, b) => a - b));
  });

  it("breaks a tie on the name", () => {
    const sameYear = [
      { ...TEAM[0], id: "zoe", name: "Zoe Aziz", since: 2018 },
      { ...TEAM[0], id: "adam", name: "Adam Aziz", since: 2018 },
    ];
    expect(orderedTeam(sameYear).map((member) => member.id)).toEqual(["adam", "zoe"]);
  });

  it("leaves the source list alone", () => {
    const before = TEAM.map((member) => member.id);
    orderedTeam();
    expect(TEAM.map((member) => member.id)).toEqual(before);
  });

  it("returns everybody", () => {
    expect(orderedTeam()).toHaveLength(TEAM.length);
  });
});

describe("teamByDiscipline", () => {
  it("returns only that discipline", () => {
    for (const discipline of TEAM_DISCIPLINES) {
      for (const member of teamByDiscipline(discipline)) {
        expect(member.discipline).toBe(discipline);
      }
    }
  });

  it("accounts for everyone across the disciplines", () => {
    const counted = TEAM_DISCIPLINES.reduce(
      (total, discipline) => total + teamByDiscipline(discipline).length,
      0
    );
    expect(counted).toBe(TEAM.length);
  });

  it("keeps the longest-serving first within a discipline", () => {
    const years = teamByDiscipline("production").map((member) => member.since);
    expect(years).toEqual([...years].sort((a, b) => a - b));
  });
});

describe("teamMember", () => {
  it("finds somebody by id", () => {
    expect(teamMember(TEAM[0].id)?.name).toBe(TEAM[0].name);
  });

  it("returns undefined for a stranger", () => {
    expect(teamMember("nobody-here")).toBeUndefined();
  });
});

describe("tenure", () => {
  it("counts whole years since joining", () => {
    expect(tenure({ ...TEAM[0], since: 2016 }, 2026)).toBe(10);
  });

  it("never goes negative for somebody who has not started", () => {
    expect(tenure({ ...TEAM[0], since: 2030 }, 2026)).toBe(0);
  });

  it("reads zero in the joining year", () => {
    expect(tenure({ ...TEAM[0], since: 2026 }, 2026)).toBe(0);
  });
});

describe("teamCities", () => {
  it("lists each city once, alphabetically", () => {
    const cities = teamCities();
    expect(cities).toEqual(Array.from(new Set(cities)).sort());
  });

  it("covers every member", () => {
    for (const member of TEAM) {
      expect(teamCities()).toContain(member.city);
    }
  });
});

describe("staffedDisciplines", () => {
  it("keeps the declared display order", () => {
    const staffed = staffedDisciplines();
    const positions = staffed.map((discipline) => TEAM_DISCIPLINES.indexOf(discipline));
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
  });

  it("names only disciplines with somebody in them", () => {
    for (const discipline of staffedDisciplines()) {
      expect(teamByDiscipline(discipline).length).toBeGreaterThan(0);
    }
  });
});

describe("foundedYear", () => {
  it("is the earliest joining year on the team", () => {
    expect(foundedYear()).toBe(Math.min(...TEAM.map((member) => member.since)));
  });

  it("is not after anybody's joining year", () => {
    for (const member of TEAM) {
      expect(foundedYear()).toBeLessThanOrEqual(member.since);
    }
  });
});
