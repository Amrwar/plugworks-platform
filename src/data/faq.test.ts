import { describe, expect, it } from "vitest";
import { FAQ, FAQ_TOPICS, faqByTopic, faqEntry, faqJsonLd, usedTopics } from "./faq";

describe("the questions", () => {
  it("asks and answers at least six", () => {
    expect(FAQ.length).toBeGreaterThanOrEqual(6);
  });

  it("gives every entry a unique id", () => {
    const ids = FAQ.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("uses ids a disclosure button can point at", () => {
    for (const entry of FAQ) {
      expect(entry.id).toMatch(/^[a-z][a-z0-9-]*$/);
    }
  });

  it("phrases every question as a question", () => {
    for (const entry of FAQ) {
      expect(entry.question.trim().endsWith("?")).toBe(true);
    }
  });

  it("answers every question in at least one paragraph", () => {
    for (const entry of FAQ) {
      expect(entry.answer.length).toBeGreaterThanOrEqual(1);
      for (const paragraph of entry.answer) {
        expect(paragraph.trim().length).toBeGreaterThan(40);
      }
    }
  });

  it("files every question under a known topic", () => {
    for (const entry of FAQ) {
      expect(FAQ_TOPICS).toContain(entry.topic);
    }
  });

  it("never repeats a question", () => {
    const questions = FAQ.map((e) => e.question);
    expect(new Set(questions).size).toBe(questions.length);
  });
});

describe("grouping the questions", () => {
  it("returns only questions for the topic asked", () => {
    for (const entry of faqByTopic("money")) {
      expect(entry.topic).toBe("money");
    }
  });

  it("accounts for every question across the topics", () => {
    const counted = FAQ_TOPICS.reduce((total, topic) => total + faqByTopic(topic).length, 0);
    expect(counted).toBe(FAQ.length);
  });

  it("keeps declaration order inside a topic", () => {
    const money = faqByTopic("money").map((e) => e.id);
    const declared = FAQ.filter((e) => e.topic === "money").map((e) => e.id);
    expect(money).toEqual(declared);
  });

  it("lists only topics that have questions", () => {
    for (const topic of usedTopics()) {
      expect(faqByTopic(topic).length).toBeGreaterThan(0);
    }
  });

  it("finds one entry by its id", () => {
    expect(faqEntry("payment-terms")?.topic).toBe("money");
  });

  it("gives back nothing for an unknown id", () => {
    expect(faqEntry("nope")).toBeUndefined();
  });
});

describe("the FAQ structured data", () => {
  const doc = faqJsonLd();

  it("declares itself an FAQPage", () => {
    expect(doc["@context"]).toBe("https://schema.org");
    expect(doc["@type"]).toBe("FAQPage");
  });

  it("carries one entry per question on the page", () => {
    expect(doc.mainEntity).toHaveLength(FAQ.length);
  });

  it("asks the same questions the page asks", () => {
    expect(doc.mainEntity.map((q) => q.name)).toEqual(FAQ.map((e) => e.question));
  });

  it("answers with the whole answer, not just the first paragraph", () => {
    const multi = FAQ.find((e) => e.answer.length > 1)!;
    const marked = doc.mainEntity.find((q) => q.name === multi.question)!;
    for (const paragraph of multi.answer) {
      expect(marked.acceptedAnswer.text).toContain(paragraph);
    }
  });

  it("serialises to JSON a script tag can carry", () => {
    expect(() => JSON.parse(JSON.stringify(doc))).not.toThrow();
  });
});
