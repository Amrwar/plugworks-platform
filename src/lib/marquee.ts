/**
 * How many copies of a phrase a scrolling banner needs.
 *
 * A marquee that loops seamlessly has to carry enough copies to cover the
 * viewport twice: one screenful visible while the second slides in behind it.
 * Too few and the reader sees the gap at the end of the run.
 */
export function marqueeRepeats(viewportWidth: number, phraseWidth: number): number {
  if (phraseWidth <= 0) return 1;
  const needed = Math.ceil((viewportWidth * 2) / phraseWidth);
  return Math.max(2, needed);
}

/** The phrase repeated the right number of times, ready to render. */
export function marqueeItems(phrase: string, repeats: number): string[] {
  return Array.from({ length: Math.max(1, Math.floor(repeats)) }, () => phrase);
}
