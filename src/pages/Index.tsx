import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { OwnerOperatorSection } from "@/components/sections/OwnerOperatorSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { TechBenefitsSection } from "@/components/sections/TechBenefitsSection";
import { TrustedBrandsSection } from "@/components/sections/TrustedBrandsSection";
import { IndustryPartnersSection } from "@/components/sections/IndustryPartnersSection";
import { LiveTruckSection } from "@/components/sections/LiveTruckSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { CompanyDriverSection } from "@/components/sections/CompanyDriverSection";
import { FreightServicesSection } from "@/components/sections/FreightServicesSection";
import { TrailerOptionsSection } from "@/components/sections/TrailerOptionsSection";
import { TechPoweredSection } from "@/components/sections/TechPoweredSection";
import { MobileAppSection } from "@/components/sections/MobileAppSection";
import { CareerSection } from "@/components/sections/CareerSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { QuickCTABanner } from "@/components/QuickCTABanner";
import { LocationMapSection } from "@/components/sections/LocationMapSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <div className="mt-8 md:mt-12" />
      <OwnerOperatorSection />
      <AboutSection />
      <QuickCTABanner variant="compact" />
      <TechBenefitsSection />
      <TrustedBrandsSection />
      <IndustryPartnersSection />
      <LiveTruckSection />
      <TestimonialSection />
      <CompanyDriverSection />
      <QuickCTABanner />
      <FreightServicesSection />
      <TrailerOptionsSection />
      <TechPoweredSection />
      <MobileAppSection />
      <CareerSection />
      <BlogSection />
      <LocationMapSection />
      <FAQSection />
    </Layout>
  );
};

export default Index;
