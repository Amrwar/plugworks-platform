import type { Metadata } from "next";
import Link from "next/link";

import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import Navigation from "@/components/Navigation";
import PageHeader from "@/components/PageHeader";
import { SERVICES } from "@/data/services";
import { engagementSpan, serviceDetail, startingPrice, weekRange } from "@/data/service-details";
import { workForService } from "@/data/work";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { metaDescription, pageTitle, pageUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: pageTitle("Services"),
  description: metaDescription(
    "What Plugworks does: brand experiences, content, events, strategy, creative direction and digital work, with what each one includes and what it starts at."
  ),
  alternates: { canonical: pageUrl("services") },
};

export default function ServicesIndex() {
  const span = engagementSpan();

  return (
    <div className="min-h-screen bg-plug-black">
      <Navigation />
      <JsonLd
        document={breadcrumbJsonLd([
          { label: "Home", path: "" },
          { label: "Services" },
        ])}
      />
      <main id="main">
        <PageHeader
          eyebrow="What We Do"
          title="Six things, done properly"
          intro={`Projects run between ${span.shortest} and ${span.longest} weeks. Each page below says what is in the engagement, what is not, and where the number starts — before you have to ask.`}
          crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        />

        <section aria-labelledby="services-heading" className="py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <h2 id="services-heading" className="sr-only">
              All services
            </h2>

            <ul className="grid gap-8 md:grid-cols-2">
              {SERVICES.map((service) => {
                const detail = serviceDetail(service.id);
                const studies = workForService(service.id);
                return (
                  <li
                    key={service.id}
                    className="group rounded-2xl border border-white/5 bg-plug-dark/40 transition-colors duration-500 hover:border-plug-electric/30"
                  >
                    <Link href={`/services/${service.id}`} className="block p-8">
                      <h3 className="font-display text-2xl font-bold text-plug-light">
                        {service.title}
                      </h3>
                      <p className="mt-4 font-body leading-relaxed text-plug-light/60">
                        {detail?.intro ?? service.description}
                      </p>

                      {detail ? (
                        <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/5 pt-6 font-body text-sm">
                          <div>
                            <dt className="text-xs uppercase tracking-[0.2em] text-plug-light/40">
                              Typically
                            </dt>
                            <dd className="mt-1 text-plug-light/80">{weekRange(detail)}</dd>
                          </div>
                          <div>
                            <dt className="text-xs uppercase tracking-[0.2em] text-plug-light/40">
                              Starts at
                            </dt>
                            <dd className="mt-1 text-plug-light/80">{startingPrice(detail)}</dd>
                          </div>
                          <div>
                            <dt className="text-xs uppercase tracking-[0.2em] text-plug-light/40">
                              Case studies
                            </dt>
                            <dd className="mt-1 text-plug-light/80">{studies.length}</dd>
                          </div>
                        </dl>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
