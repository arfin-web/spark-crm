import { Navbar } from "@/components/landing-page/Navigation/Navbar";
import { Hero } from "@/components/landing-page/Hero/Hero";
import { LogoCloud } from "@/components/landing-page/LogoCloud/LogoCloud";
import { Features } from "@/components/landing-page/Features/Features";
import { Pipeline } from "@/components/landing-page/Pipeline/Pipeline";
import { Testimonials } from "@/components/landing-page/Testimonials/Testimonials";
import { Pricing } from "@/components/landing-page/Pricing/Pricing";
import { FAQ } from "@/components/landing-page/FAQ/FAQ";
import { Footer } from "@/components/landing-page/Footer/Footer";

export default function LandingPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <LogoCloud />
        <Features />
        <Pipeline />
        <Testimonials />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
