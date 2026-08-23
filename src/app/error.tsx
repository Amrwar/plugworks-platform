"use client";

import { useEffect } from "react";

/** Shown when the page throws while rendering. */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface it for whatever collects browser errors; the visitor gets the
    // friendly copy below rather than a stack trace.
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-plug-black px-6 text-center">
      <h1 className="font-display text-4xl font-bold text-plug-light">
        Something shorted out
      </h1>
      <p className="font-body text-plug-light/60">
        That is on us. Try again, and if it keeps happening please email us.
      </p>
      <button
        type="button"
        onClick={reset}
        className="font-display text-sm uppercase tracking-[0.3em] text-plug-electric hover:underline"
      >
        Try again
      </button>
    </main>
  );
}
