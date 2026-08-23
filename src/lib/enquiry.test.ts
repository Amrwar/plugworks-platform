import { describe, expect, it } from "vitest";
import { isSendable, looksLikeEmail, MIN_MESSAGE, validateEnquiry } from "./enquiry";

const good = {
  name: "Nadia",
  email: "nadia@example.com",
  company: "Northwind",
  service: "content-production",
  message: "We are launching a product in Cairo and need a film.",
};

describe("recognising an email address", () => {
  it("accepts an ordinary address", () => {
    expect(looksLikeEmail("nadia@example.com")).toBe(true);
  });

  it("accepts a subdomain", () => {
    expect(looksLikeEmail("nadia@mail.example.co.uk")).toBe(true);
  });

  it("accepts a plus tag", () => {
    expect(looksLikeEmail("nadia+studio@example.com")).toBe(true);
  });

  it("refuses an address with no at sign", () => {
    expect(looksLikeEmail("nadia.example.com")).toBe(false);
  });

  it("refuses two at signs", () => {
    expect(looksLikeEmail("nadia@@example.com")).toBe(false);
  });

  it("refuses a domain with no dot", () => {
    expect(looksLikeEmail("nadia@example")).toBe(false);
  });

  it("refuses a domain that ends in a dot", () => {
    expect(looksLikeEmail("nadia@example.")).toBe(false);
  });

  it("refuses a doubled dot in the domain", () => {
    expect(looksLikeEmail("nadia@example..com")).toBe(false);
  });

  it("refuses an address with a space in it", () => {
    expect(looksLikeEmail("nadia @example.com")).toBe(false);
  });

  it("refuses an empty local part", () => {
    expect(looksLikeEmail("@example.com")).toBe(false);
  });
});

describe("reading the enquiry form", () => {
  it("passes a complete enquiry", () => {
    expect(validateEnquiry(good)).toEqual({});
    expect(isSendable(good)).toBe(true);
  });

  it("asks for a name when it is missing", () => {
    expect(validateEnquiry({ ...good, name: "" }).name).toBeDefined();
  });

  it("treats a name of spaces as missing", () => {
    expect(validateEnquiry({ ...good, name: "   " }).name).toBeDefined();
  });

  it("asks for an email when it is missing", () => {
    expect(validateEnquiry({ ...good, email: "" }).email).toBeDefined();
  });

  it("complains differently about a malformed email", () => {
    const blank = validateEnquiry({ ...good, email: "" }).email;
    const wrong = validateEnquiry({ ...good, email: "nope" }).email;
    expect(wrong).toBeDefined();
    expect(wrong).not.toBe(blank);
  });

  it("lets the company be left out", () => {
    expect(validateEnquiry({ ...good, company: "" })).toEqual({});
  });

  it("lets the service be left unchosen", () => {
    expect(validateEnquiry({ ...good, service: "" })).toEqual({});
  });

  it("refuses a service we do not offer", () => {
    expect(validateEnquiry({ ...good, service: "time-travel" }).service).toBeDefined();
  });

  it("accepts every service we do offer", () => {
    for (const id of ["brand-experiences", "event-production", "digital-experiences"]) {
      expect(validateEnquiry({ ...good, service: id }).service).toBeUndefined();
    }
  });

  it("asks for a message when it is missing", () => {
    expect(validateEnquiry({ ...good, message: "" }).message).toBeDefined();
  });

  it("asks for more when the message is too short", () => {
    expect(validateEnquiry({ ...good, message: "hi" }).message).toBeDefined();
  });

  it("accepts a message exactly at the minimum", () => {
    const message = "x".repeat(MIN_MESSAGE);
    expect(validateEnquiry({ ...good, message }).message).toBeUndefined();
  });

  it("measures the message after trimming", () => {
    const message = "  " + "x".repeat(MIN_MESSAGE - 1) + "  ";
    expect(validateEnquiry({ ...good, message }).message).toBeDefined();
  });

  it("collects every problem at once rather than stopping at the first", () => {
    const errors = validateEnquiry({ name: "", email: "nope", message: "" });
    expect(Object.keys(errors).sort()).toEqual(["email", "message", "name"]);
  });

  it("treats a missing field and an absent key the same way", () => {
    expect(validateEnquiry({})).toEqual(validateEnquiry({ name: "", email: "", message: "" }));
  });

  it("says the form is not sendable while anything is wrong", () => {
    expect(isSendable({ ...good, email: "nope" })).toBe(false);
  });
});
