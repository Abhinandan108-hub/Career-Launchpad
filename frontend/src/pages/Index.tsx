import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import TrustBadges from "@/components/home/TrustBadges";
import FeatureGrid from "@/components/home/FeatureGrid";
import HomeHowItWorks from "@/components/home/HomeHowItWorks";
import HomeTestimonials from "@/components/home/HomeTestimonials";
import HomePricing from "@/components/home/HomePricing";
import HomeFAQ from "@/components/home/HomeFAQ";
import HomeCTA from "@/components/home/HomeCTA";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <TrustBadges />
    <FeatureGrid />
    <HomeHowItWorks />
    <HomeTestimonials />
    <HomePricing />
    <HomeFAQ />
    <HomeCTA />
    <Footer />
  </div>
);

export default Index;
