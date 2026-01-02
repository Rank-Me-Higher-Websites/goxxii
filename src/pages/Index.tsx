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

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <OwnerOperatorSection />
      <AboutSection />
      <TechBenefitsSection />
      <TrustedBrandsSection />
      <IndustryPartnersSection />
      <LiveTruckSection />
      <TestimonialSection />
      <CompanyDriverSection />
      <FreightServicesSection />
      <TrailerOptionsSection />
      <TechPoweredSection />
      <MobileAppSection />
      <CareerSection />
      <BlogSection />
      <FAQSection />
    </Layout>
  );
};

export default Index;
