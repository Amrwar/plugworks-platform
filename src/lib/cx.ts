/**
 * Joins class names, dropping anything falsy.
 *
 * The components build long conditional class strings by hand, which is where
 * the stray double spaces and `undefined` in the markup come from.
 */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
}
