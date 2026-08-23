import ComingSoonBanner from "@/components/ComingSoonBanner";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Locations from "@/components/Locations";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-plug-black relative">
      <ComingSoonBanner />
      <Navigation />
      {/* The banner, the nav and the footer are their own landmarks; only the
          sections belong inside main. */}
      <main id="main">
        <Hero />
        <About />
        <Services />
        <Locations />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
