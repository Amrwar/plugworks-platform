import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import Navigation from "@/components/Navigation";
import PageHeader from "@/components/PageHeader";
import WorkCard from "@/components/WorkCard";
import { SERVICES } from "@/data/services";
import { serviceDetail, startingPrice, weekRange } from "@/data/service-details";
import { workForService } from "@/data/work";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/jsonld";
import { metaDescription, pageTitle, pageUrl } from "@/lib/seo";

type PageProps = {
  params: { slug: string } | Promise<{ slug: string }>;
};

/** Every service is known at build time, so every page is static. */
export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await Promise.resolve(params);
  const service = SERVICES.find((entry) => entry.id === slug);
  if (!service) return { title: pageTitle("Services") };
  const detail = serviceDetail(service.id);
  return {
    title: pageTitle(service.title),
    description: metaDescription(detail?.intro ?? service.description),
    alternates: { canonical: pageUrl(`services/${service.id}`) },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await Promise.resolve(params);
  const service = SERVICES.find((entry) => entry.id === slug);
  if (!service) notFound();

  const detail = serviceDetail(service.id);
  const studies = workForService(service.id);

  return (
    <div className="min-h-screen bg-plug-black">
      <Navigation />
      <JsonLd document={serviceJsonLd(service)} />
      <JsonLd
        document={breadcrumbJsonLd([
          { label: "Home", path: "" },
          { label: "Services", path: "services" },
          { label: service.title },
        ])}
      />
      <main id="main">
        <PageHeader
          eyebrow="Services"
          title={service.title}
          intro={detail?.intro ?? service.description}
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: service.title },
          ]}
        />

        {detail ? (
          <>
            <section aria-labelledby="shape-heading" className="border-b border-white/5 py-12">
              <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <h2 id="shape-heading" className="sr-only">
                  The shape of the engagement
                </h2>
                <dl className="grid grid-cols-2 gap-8 md:grid-cols-3">
                  <div>
                    <dt className="font-body text-xs uppercase tracking-[0.2em] text-plug-light/40">
                      Typically
                    </dt>
                    <dd className="font-display text-2xl text-plug-light">{weekRange(detail)}</dd>
                  </div>
                  <div>
                    <dt className="font-body text-xs uppercase tracking-[0.2em] text-plug-light/40">
                      Starts at
                    </dt>
                    <dd className="font-display text-2xl text-plug-light">
                      {startingPrice(detail)}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-body text-xs uppercase tracking-[0.2em] text-plug-light/40">
                      Work shipped
                    </dt>
                    <dd className="font-display text-2xl text-plug-light">{studies.length}</dd>
                  </div>
                </dl>
              </div>
            </section>

            <section aria-labelledby="scope-heading" className="py-20">
              <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <h2 id="scope-heading" className="sr-only">
                  What is and is not included
                </h2>
                <div className="grid gap-16 md:grid-cols-2">
                  <div>
                    <h3 className="mb-6 font-display text-2xl font-bold text-plug-light">
                      What you get
                    </h3>
                    <ul className="space-y-3">
                      {detail.includes.map((line) => (
                        <li
                          key={line}
                          className="flex gap-3 font-body leading-relaxed text-plug-light/70"
                        >
                          <span aria-hidden="true" className="text-plug-electric">
                            +
                          </span>
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-6 font-display text-2xl font-bold text-plug-light">
                      What you do not
                    </h3>
                    <ul className="space-y-3">
                      {detail.excludes.map((line) => (
                        <li
                          key={line}
                          className="flex gap-3 font-body leading-relaxed text-plug-light/50"
                        >
                          <span aria-hidden="true" className="text-plug-light/30">
                            −
                          </span>
                          {line}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 max-w-md font-body text-sm text-plug-light/40">
                      We would rather say this here than in a variation order halfway through.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : null}

        {studies.length > 0 ? (
          <section
            aria-labelledby="proof-heading"
            className="border-t border-white/5 bg-plug-dark/30 py-20"
          >
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
              <h2
                id="proof-heading"
                className="mb-10 font-display text-2xl font-bold text-plug-light"
              >
                Where we have done it
              </h2>
              <div className="grid gap-8 md:grid-cols-2">
                {studies.map((study) => (
                  <WorkCard key={study.slug} study={study} />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section aria-labelledby="next-heading" className="py-20">
          <div className="mx-auto max-w-3xl px-6 lg:px-12">
            <h2 id="next-heading" className="font-display text-2xl font-bold text-plug-light">
              Sound close enough
            </h2>
            <p className="mt-4 font-body text-plug-light/60">
              Tell us the problem rather than the deliverable. If this is not the right service for
              it, we will say which one is.
            </p>
            <Link
              href="/#contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-plug-electric px-8 py-4 font-display text-sm uppercase tracking-[0.2em] text-plug-black transition-transform duration-300 hover:-translate-y-0.5"
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
