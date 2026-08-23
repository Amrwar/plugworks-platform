import Link from "next/link";

export type Crumb = {
  label: string;
  href?: string;
};

type PageHeaderProps = {
  /** The small line above the title. */
  eyebrow?: string;
  title: string;
  /** One or two sentences under the title. */
  intro?: string;
  /** The trail back to the home page; the last crumb is the current page. */
  crumbs?: readonly Crumb[];
};

/**
 * The masthead every inner page opens with.
 *
 * The heading is always the page's single `h1`, and the trail is a real
 * `nav` landmark with the current page marked, so a screen reader can read
 * the position rather than infer it from styling.
 */
export default function PageHeader({ eyebrow, title, intro, crumbs }: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-white/5 pt-40 pb-20">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div
        className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-plug-electric/10 blur-glow"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        {crumbs && crumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 font-body text-sm text-plug-light/40">
              {crumbs.map((crumb, index) => {
                const isLast = index === crumbs.length - 1;
                return (
                  <li key={`${crumb.label}-${index}`} className="flex items-center gap-2">
                    {crumb.href && !isLast ? (
                      <Link
                        href={crumb.href}
                        className="transition-colors duration-300 hover:text-plug-electric"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span aria-current={isLast ? "page" : undefined} className="text-plug-light/70">
                        {crumb.label}
                      </span>
                    )}
                    {isLast ? null : <span aria-hidden="true">/</span>}
                  </li>
                );
              })}
            </ol>
          </nav>
        ) : null}

        {eyebrow ? (
          <span className="mb-4 inline-block font-display text-sm uppercase tracking-[0.3em] text-plug-electric">
            {eyebrow}
          </span>
        ) : null}

        <h1 className="max-w-4xl font-display text-4xl font-bold leading-tight text-plug-light md:text-6xl">
          {title}
        </h1>

        {intro ? (
          <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-plug-light/60">
            {intro}
          </p>
        ) : null}
      </div>
    </header>
  );
}
