import { useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead, SEO_CONTENT } from "@/components/SEOHead";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import {
  getOrganizationSchema,
  getLocalBusinessSchema,
  getBreadcrumbSchema,
  getFAQSchema,
  getJobPostingSchema,
  getServiceSchema,
  companyDriverFaqsPlain,
} from "@/data/schemaData";
import { CompanyDriverHeroSection } from "@/components/sections/CompanyDriverHeroSection";
import { TechBenefitsSection } from "@/components/sections/TechBenefitsSection";
import { FuelIncentiveSection } from "@/components/sections/FuelIncentiveSection";
import { FuelTipsSection } from "@/components/sections/FuelTipsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { SEOContentSection } from "@/components/sections/SEOContentSection";
import xxiiMackMountains from "@/assets/xxii-mack-mountains.jpg";

const CompanyDrivers = () => {
  const schemas = useMemo(() => [
    getOrganizationSchema(),
    getLocalBusinessSchema(),
    getBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Company Drivers", path: "/company-drivers" },
    ]),
    getFAQSchema(companyDriverFaqsPlain),
    getJobPostingSchema({
      title: "Company Driver - CDL-A",
      description: "Join XXII Century as a company driver. Starting at 65 CPM with automatic raises. Full benefits including health, dental, vision, 401(k). Modern equipment, weekly pay.",
      employmentType: "FULL_TIME",
      minSalary: 65000,
      maxSalary: 95000,
    }),
    getServiceSchema({
      name: "Company Driver Employment",
      description: "Full-time CDL-A company driver positions with competitive CPM, comprehensive benefits, modern equipment, and flexible route options.",
      url: "/company-drivers",
    }),
  ], []);

  return (
    <Layout>
      <SEOHead
        title={SEO_CONTENT.companyDrivers.title}
        description={SEO_CONTENT.companyDrivers.description}
        keywords={SEO_CONTENT.companyDrivers.keywords}
        canonicalPath="/company-drivers"
      />
      <SchemaMarkup schemas={schemas} />
      <CompanyDriverHeroSection />
      <SEOContentSection pageKey="companyDrivers" sideImage={xxiiMackMountains} sideImageAlt="XXII Century Mack truck in snowy mountains" />
      <FuelIncentiveSection />
      <FuelTipsSection />
      <TechBenefitsSection />
      <FAQSection pageKey="companyDrivers" />
    </Layout>
  );
};

export default CompanyDrivers;
