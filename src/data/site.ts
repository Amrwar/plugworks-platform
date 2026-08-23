/** Everything about the studio that more than one component needs to know. */
export const SITE = {
  name: "Plugworks",
  tagline: "Where Ideas Are Plugged Into Reality",
  description:
    "Plugworks is a creative and production house in Egypt and the UAE, turning bold concepts into brand experiences, films and events.",
  email: "hello@plugworks.co",
  url: "https://plugworks.co",
} as const;

/** The studio's countries, derived rather than typed out a second time. */
export { LOCATIONS } from "./locations";
