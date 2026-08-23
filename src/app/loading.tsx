/** Shown while the page is still on its way. */
export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-screen items-center justify-center bg-plug-black"
    >
      <span className="font-display text-sm uppercase tracking-[0.3em] text-plug-electric">
        Plugging in…
      </span>
    </div>
  );
}
