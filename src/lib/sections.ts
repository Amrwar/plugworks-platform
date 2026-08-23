/** A section's id together with where its top sits on the page. */
export type SectionTop = { id: string; top: number };

/**
 * Which section the reader is looking at.
 *
 * The last section whose top has passed the line wins, so the highlight
 * changes as a heading reaches it rather than when the section happens to be
 * the largest thing on screen. Before the first section starts, nothing is
 * active - the hero is not in the menu.
 */
export function activeSection(sections: readonly SectionTop[], scrollY: number): string | null {
  let active: string | null = null;
  for (const section of [...sections].sort((a, b) => a.top - b.top)) {
    if (section.top <= scrollY) active = section.id;
  }
  return active;
}
