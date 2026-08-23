import type { Metadata } from "next";
import Link from "next/link";

import FaqAccordion from "@/components/FaqAccordion";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import PageHeader from "@/components/PageHeader";
import { FAQ, faqByTopic, faqJsonLd, usedTopics } from "@/data/faq";
import { pageUrl, metaDescription, pageTitle } from "@/lib/seo";
import { slugify } from "@/lib/text";

export const metadata: Metadata = {
  title: pageTitle("Questions"),
  description: metaDescription(
    "The questions people ask Plugworks before they get in touch: how we scope, what we cost, and what happens when a project goes sideways."
  ),
  alternates: { canonical: pageUrl("faq") },
};

export default function FaqPage() {
  const topics = usedTopics();

  return (
    <div className="min-h-screen bg-plug-black">
      <Navigation />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }}
      />
      <main id="main">
        <PageHeader
          eyebrow="Questions"
          title="The things people ask before they call"
          intro={`${FAQ.length} questions we get often enough to answer in public, including the awkward ones about money.`}
          crumbs={[{ label: "Home", href: "/" }, { label: "Questions" }]}
        />

        {topics.map((topic) => (
          <section key={topic} aria-labelledby={`${slugify(topic)}-heading`} className="py-16">
            <div className="mx-auto max-w-4xl px-6 lg:px-12">
              <h2
                id={`${slugify(topic)}-heading`}
                className="mb-8 font-display text-2xl font-bold capitalize text-plug-light"
              >
                {topic}
              </h2>
              <FaqAccordion entries={faqByTopic(topic)} />
            </div>
          </section>
        ))}

        <section aria-labelledby="ask-heading" className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-4xl px-6 lg:px-12">
            <h2 id="ask-heading" className="font-display text-2xl font-bold text-plug-light">
              Something not answered here
            </h2>
            <p className="mt-4 max-w-2xl font-body text-plug-light/60">
              Send it over. If it turns out other people are asking the same thing, it ends up on
              this page.
            </p>
            <Link
              href="/#contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-plug-electric px-8 py-4 font-display text-sm uppercase tracking-[0.2em] text-plug-electric transition-colors duration-300 hover:bg-plug-electric hover:text-plug-black"
            >
              Ask us directly
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
