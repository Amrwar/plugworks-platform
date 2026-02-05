import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Plugworks | Creative & Production House",
  description: "Where ideas are plugged into real experiences. A creative and production house based in Egypt and UAE.",
  keywords: ["creative agency", "production house", "Egypt", "UAE", "branding", "experiences", "events"],
  authors: [{ name: "Plugworks" }],
  openGraph: {
    title: "Plugworks | Creative & Production House",
    description: "Where ideas are plugged into real experiences.",
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
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
