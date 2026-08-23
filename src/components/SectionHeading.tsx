type SectionHeadingProps = {
  /** The small line above the heading. */
  eyebrow: string;
  /** The heading itself, split so the second half can be tinted. */
  title: string;
  accent?: string;
  /** Ties the section's `aria-labelledby` to this heading. */
  id: string;
  className?: string;
};

/**
 * The eyebrow-and-heading pair every section opens with.
 *
 * Four sections were repeating the same markup with slightly different
 * spacing; this keeps them consistent and gives each heading the id its
 * section points at, so a screen reader announces the section by its name.
 */
export default function SectionHeading({
  eyebrow,
  title,
  accent,
  id,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <span className="inline-block font-display text-sm text-plug-electric uppercase tracking-[0.3em] mb-4">
        {eyebrow}
      </span>
      <h2
        id={id}
        className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-plug-light leading-tight mb-6"
      >
        {title}
        {accent ? <span className="block gradient-text">{accent}</span> : null}
      </h2>
    </div>
  );
}
