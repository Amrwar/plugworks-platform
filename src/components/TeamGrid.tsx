import type { TeamMember } from "@/data/team";
import { tenure } from "@/data/team";
import { initials } from "@/lib/text";

type TeamGridProps = {
  members: readonly TeamMember[];
  /** The year tenure is counted to; passed in so the markup stays static. */
  year: number;
};

/**
 * The people, as a list.
 *
 * It is a `ul` rather than a stack of divs because it is a list, and each
 * card carries the person's own heading, so a reader can jump between people
 * with the heading keys instead of tabbing through the whole grid.
 */
export default function TeamGrid({ members, year }: TeamGridProps) {
  return (
    <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {members.map((member) => {
        const years = tenure(member, year);
        return (
          <li
            key={member.id}
            id={member.id}
            className="group rounded-2xl border border-white/5 bg-plug-dark/40 p-8 transition-colors duration-500 hover:border-plug-electric/30"
          >
            <div className="mb-6 flex items-center gap-4">
              <span
                aria-hidden="true"
                className="flex h-14 w-14 items-center justify-center rounded-full border border-plug-electric/30 font-display text-lg font-bold text-plug-electric"
              >
                {initials(member.name)}
              </span>
              <div>
                <h3 className="font-display text-xl font-bold text-plug-light">{member.name}</h3>
                <p className="font-body text-sm text-plug-electric">{member.role}</p>
              </div>
            </div>

            <div className="mb-6 space-y-3">
              {member.bio.map((paragraph, index) => (
                <p key={index} className="font-body text-sm leading-relaxed text-plug-light/60">
                  {paragraph}
                </p>
              ))}
            </div>

            <dl className="flex gap-8 border-t border-white/5 pt-4 font-body text-xs">
              <div>
                <dt className="uppercase tracking-[0.2em] text-plug-light/40">Based in</dt>
                <dd className="mt-1 text-plug-light/80">{member.city}</dd>
              </div>
              <div>
                <dt className="uppercase tracking-[0.2em] text-plug-light/40">Here for</dt>
                <dd className="mt-1 text-plug-light/80">
                  {years === 0 ? "Under a year" : `${years} ${years === 1 ? "year" : "years"}`}
                </dd>
              </div>
            </dl>
          </li>
        );
      })}
    </ul>
  );
}
