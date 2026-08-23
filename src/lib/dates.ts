/**
 * The year to print in the copyright line.
 *
 * Taken from a clock passed in rather than read inside the component, so the
 * footer can be rendered for any moment and the behaviour can be tested
 * without waiting for a new year.
 */
export function copyrightYear(now: Date = new Date()): number {
  return now.getUTCFullYear();
}

/** The copyright line itself. */
export function copyrightLine(owner: string, now: Date = new Date()): string {
  return `© ${copyrightYear(now)} ${owner}. All rights reserved.`;
}
