import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PainPoints from "./components/PainPoints";
import SopTimeline from "./components/SopTimeline";
import EcosystemTabs from "./components/EcosystemTabs";
import Roadmap from "./components/Roadmap";
import Pricing from "./components/Pricing";
import Faq from "./components/Faq";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-alabaster text-charcoal overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <PainPoints />
        <SopTimeline />
        <EcosystemTabs />
        <Roadmap />
        <Pricing />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
