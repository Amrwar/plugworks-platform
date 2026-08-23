"use client";

import { useState } from "react";

import type { FaqEntry } from "@/data/faq";

type FaqAccordionProps = {
  entries: readonly FaqEntry[];
};

/**
 * The questions, as a set of disclosures.
 *
 * Each question is a real `button` carrying `aria-expanded` and
 * `aria-controls`, and the answer panel is labelled by it — so the pair is
 * announced as a disclosure rather than as loose text a reader has to guess
 * the state of. Several answers can be open at once, because comparing two
 * answers is a normal thing to want.
 */
export default function FaqAccordion({ entries }: FaqAccordionProps) {
  const [open, setOpen] = useState<readonly string[]>([]);

  const toggle = (id: string) => {
    setOpen((current) =>
      current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id]
    );
  };

  return (
    <ul className="divide-y divide-white/5 border-y border-white/5">
      {entries.map((entry) => {
        const isOpen = open.includes(entry.id);
        return (
          <li key={entry.id}>
            <h3>
              <button
                type="button"
                onClick={() => toggle(entry.id)}
                aria-expanded={isOpen}
                aria-controls={`${entry.id}-answer`}
                id={`${entry.id}-question`}
                className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors duration-300 hover:text-plug-electric"
              >
                <span className="font-display text-lg font-semibold text-plug-light">
                  {entry.question}
                </span>
                <svg
                  aria-hidden="true"
                  className={`h-5 w-5 shrink-0 text-plug-electric transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
            </h3>

            <div
              id={`${entry.id}-answer`}
              role="region"
              aria-labelledby={`${entry.id}-question`}
              hidden={!isOpen}
              className="pb-6"
            >
              <div className="max-w-2xl space-y-4">
                {entry.answer.map((paragraph, index) => (
                  <p key={index} className="font-body leading-relaxed text-plug-light/60">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
