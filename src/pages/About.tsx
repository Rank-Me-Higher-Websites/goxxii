import { useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead, SEO_CONTENT } from "@/components/SEOHead";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import {
  getOrganizationSchema,
  getLocalBusinessSchema,
  getBreadcrumbSchema,
  getServiceSchema,
} from "@/data/schemaData";
import { AboutHeroSection } from "@/components/sections/AboutHeroSection";
import { LeadershipSection } from "@/components/sections/LeadershipSection";
import { MissionValuesSection } from "@/components/sections/MissionValuesSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TrustedBrandsSection } from "@/components/sections/TrustedBrandsSection";
import { IndustryPartnersSection } from "@/components/sections/IndustryPartnersSection";
import { QuickCTABanner } from "@/components/QuickCTABanner";
import { SEOContentSection } from "@/components/sections/SEOContentSection";

const About = () => {
  const schemas = useMemo(() => [
    getOrganizationSchema(),
    getLocalBusinessSchema(),
    getBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ]),
    getServiceSchema({
      name: "About XXII Century Trucking",
      description: "Chicago-based trucking carrier since 2009. 100+ drivers, Fortune 500 partnerships, owner operator and company driver programs with AI-powered fleet management.",
      url: "/about",
    }),
  ], []);

  return (
    <Layout>
      <SEOHead
        title={SEO_CONTENT.about.title}
        description={SEO_CONTENT.about.description}
        keywords={SEO_CONTENT.about.keywords}
        canonicalPath="/about"
      />
      <SchemaMarkup schemas={schemas} />
      <AboutHeroSection />
      <MissionValuesSection />
      <QuickCTABanner variant="compact" />
      <ServicesSection />
      <SEOContentSection pageKey="about" />
      <LeadershipSection />
      <TrustedBrandsSection />
      <IndustryPartnersSection />
    </Layout>
  );
};

export default About;
