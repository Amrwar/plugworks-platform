import type { ProcessStep } from "@/data/process";

type ProcessTimelineProps = {
  steps: readonly ProcessStep[];
};

/** "3–5 days", or "5 days" when the range has collapsed to one number. */
function dayRange(days: readonly [number, number]): string {
  const [from, to] = days;
  return from === to ? `${from} days` : `${from}–${to} days`;
}

/**
 * The five steps, in order.
 *
 * An ordered list, because the order is the point — the numbers beside each
 * step are decoration on top of a list a screen reader already announces as
 * numbered, so nothing depends on reading the styling.
 */
export default function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <ol className="relative space-y-12 border-l border-white/10 pl-8 md:pl-12">
      {steps.map((step) => (
        <li key={step.id} id={step.id} className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-[41px] flex h-8 w-8 items-center justify-center rounded-full border border-plug-electric/40 bg-plug-black font-display text-sm font-bold text-plug-electric md:-left-[57px]"
          >
            {step.order}
          </span>

          <div className="flex flex-wrap items-baseline gap-4">
            <h3 className="font-display text-2xl font-bold text-plug-light">{step.title}</h3>
            <span className="font-body text-xs uppercase tracking-[0.2em] text-plug-light/40">
              {dayRange(step.days)}
            </span>
          </div>

          <p className="mt-4 max-w-2xl font-body leading-relaxed text-plug-light/60">
            {step.summary}
          </p>

          <div className="mt-6">
            <h4 className="font-body text-xs uppercase tracking-[0.2em] text-plug-light/40">
              What you get
            </h4>
            <ul className="mt-3 flex flex-wrap gap-3">
              {step.deliverables.map((deliverable) => (
                <li
                  key={deliverable}
                  className="rounded-full border border-white/10 px-4 py-2 font-body text-sm text-plug-light/70"
                >
                  {deliverable}
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}
