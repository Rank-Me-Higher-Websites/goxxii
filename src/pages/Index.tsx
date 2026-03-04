import { useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead, SEO_CONTENT } from "@/components/SEOHead";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import {
  getOrganizationSchema,
  getLocalBusinessSchema,
  getWebSiteSchema,
  getBreadcrumbSchema,
  getFAQSchema,
  getServiceSchema,
  homeFaqsPlain,
} from "@/data/schemaData";
import { HeroSection } from "@/components/sections/HeroSection";
import { OwnerOperatorSection } from "@/components/sections/OwnerOperatorSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { TechBenefitsSection } from "@/components/sections/TechBenefitsSection";
import { TrustedBrandsSection } from "@/components/sections/TrustedBrandsSection";
import xxiiMackMountains from "@/assets/xxii-mack-mountains.jpg";
import { IndustryPartnersSection } from "@/components/sections/IndustryPartnersSection";
import { LiveTruckSection } from "@/components/sections/LiveTruckSection";
import { ReviewsWidgetSection } from "@/components/sections/ReviewsWidgetSection";
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
import { SEOContentSection } from "@/components/sections/SEOContentSection";

const Index = () => {
  const schemas = useMemo(() => [
    getOrganizationSchema(),
    getLocalBusinessSchema(),
    getWebSiteSchema(),
    getBreadcrumbSchema([{ name: "Home", path: "/" }]),
    getFAQSchema(homeFaqsPlain),
    getServiceSchema({ name: "Owner Operator Program", description: "Independent contractor trucking program offering competitive linehaul pay, Fortune 500 freight, fuel discounts, and 24/7 dispatch support.", url: "/owner-operators" }),
    getServiceSchema({ name: "Company Driver Employment", description: "Full-time CDL-A company driver positions with 63 CPM starting pay, health benefits, 401(k), and modern equipment.", url: "/company-drivers" }),
    getServiceSchema({ name: "Freight Shipping Services", description: "Nationwide dry van, refrigerated, and flatbed freight shipping for shippers and brokers. Real-time tracking and Fortune 500 carrier network.", url: "/freight-shipping-services" }),
  ], []);

  return (
    <Layout>
      <SEOHead
        title={SEO_CONTENT.home.title}
        description={SEO_CONTENT.home.description}
        keywords={SEO_CONTENT.home.keywords}
        canonicalPath="/"
      />
      <SchemaMarkup schemas={schemas} />
      <HeroSection />
      <div className="mt-8 md:mt-12" />
      <OwnerOperatorSection />
      <AboutSection />
      <div className="hidden lg:block"><QuickCTABanner variant="compact" /></div>
      <TrustedBrandsSection />
      <TechBenefitsSection />
      <IndustryPartnersSection />
      <LiveTruckSection />
      <CompanyDriverSection />
      <FreightServicesSection />
      <QuickCTABanner />
      <TrailerOptionsSection />
      <TechPoweredSection />
      <MobileAppSection />
      <SEOContentSection pageKey="home" />
      <CareerSection />
      <ReviewsWidgetSection />
      <LocationMapSection />
      <FAQSection pageKey="home" />
      <BlogSection />
    </Layout>
  );
};

export default Index;
