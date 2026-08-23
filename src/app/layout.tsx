import type { Metadata } from "next";

import { SITE } from "@/data/site";
import { organizationJsonLdString } from "@/lib/jsonld";
import { canonicalUrl, metaDescription, pageTitle } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: pageTitle(),
  description: metaDescription(),
  keywords: [
    "creative agency",
    "production house",
    "Egypt",
    "UAE",
    "branding",
    "experiences",
    "events",
  ],
  authors: [{ name: SITE.name }],
  alternates: { canonical: canonicalUrl() },
  openGraph: {
    title: pageTitle(),
    description: metaDescription(),
    url: canonicalUrl(),
    siteName: SITE.name,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-plug-electric focus:px-4 focus:py-2 focus:font-display focus:text-plug-black"
        >
          Skip to content
        </a>
        <div className="noise-overlay" />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: organizationJsonLdString() }}
        />
      </body>
    </html>
  );
}
