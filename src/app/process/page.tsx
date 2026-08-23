import type { Metadata } from "next";
import Link from "next/link";

import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import PageHeader from "@/components/PageHeader";
import ProcessTimeline from "@/components/ProcessTimeline";
import { orderedProcess, processSpan } from "@/data/process";
import { pageUrl, metaDescription, pageTitle } from "@/lib/seo";

export const metadata: Metadata = {
  title: pageTitle("Process"),
  description: metaDescription(
    "How a Plugworks project runs, step by step: what happens, roughly how long it takes, and what you have in your hands at the end of each stage."
  ),
  alternates: { canonical: pageUrl("process") },
};

export default function ProcessPage() {
  const steps = orderedProcess();
  const span = processSpan();

  return (
    <div className="min-h-screen bg-plug-black">
      <Navigation />
      <main id="main">
        <PageHeader
          eyebrow="How We Work"
          title="Five steps, and what you get at the end of each"
          intro={`Most projects run ${span.shortest} to ${span.longest} working days end to end. The stages below are the same whether the deliverable is a film, a stand or a site — only the length of each one moves.`}
          crumbs={[{ label: "Home", href: "/" }, { label: "Process" }]}
        />

        <section aria-labelledby="steps-heading" className="py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <h2 id="steps-heading" className="sr-only">
              The five steps
            </h2>
            <ProcessTimeline steps={steps} />
          </div>
        </section>

        <section
          aria-labelledby="honesty-heading"
          className="border-t border-white/5 bg-plug-dark/30 py-20"
        >
          <div className="mx-auto max-w-3xl px-6 lg:px-12">
            <h2
              id="honesty-heading"
              className="mb-6 font-display text-2xl font-bold text-plug-light"
            >
              Where this goes wrong
            </h2>
            <div className="space-y-4 font-body leading-relaxed text-plug-light/60">
              <p>
                The step that slips is almost never production. It is the one before it, where a
                decision gets deferred because nobody in the room can make it. We would rather have
                that argument in week one than in the edit.
              </p>
              <p>
                So the written problem statement at the end of the first step is not a formality.
                If we cannot get it signed, the honest thing is to stop there, and we will say so.
              </p>
            </div>
            <Link
              href="/#contact"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-plug-electric px-8 py-4 font-display text-sm uppercase tracking-[0.2em] text-plug-black transition-transform duration-300 hover:-translate-y-0.5"
            >
              Start a conversation
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
