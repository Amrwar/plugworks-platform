import Link from "next/link";

/** Shown when a visitor asks for a page this site does not have. */
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-plug-black px-6 text-center">
      <h1 className="font-display text-5xl font-bold text-plug-light">
        This one is unplugged
      </h1>
      <p className="font-body text-plug-light/60">
        We could not find that page. The work, the studios and the contact form
        are all on the home page.
      </p>
      <Link
        href="/"
        className="font-display text-sm uppercase tracking-[0.3em] text-plug-electric hover:underline"
      >
        Back to the front
      </Link>
    </main>
  );
}
