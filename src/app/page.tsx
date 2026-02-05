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
    <main className="min-h-screen bg-plug-black relative">
      <ComingSoonBanner />
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Locations />
      <Contact />
      <Footer />
    </main>
  );
}
