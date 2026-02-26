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
  ownerOperatorFaqsPlain,
} from "@/data/schemaData";
import { OwnerOperatorHeroSection } from "@/components/sections/OwnerOperatorHeroSection";
import { TechBenefitsSection } from "@/components/sections/TechBenefitsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { SEOContentSection } from "@/components/sections/SEOContentSection";

const OwnerOperators = () => {
  const schemas = useMemo(() => [
    getOrganizationSchema(),
    getLocalBusinessSchema(),
    getBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Owner Operators", path: "/owner-operators" },
    ]),
    getFAQSchema(ownerOperatorFaqsPlain),
    getJobPostingSchema({
      title: "Owner Operator - Dry Van",
      description: "Join XXII Century as an owner operator. Earn competitive linehaul pay with Fortune 500 freight. AI-powered fuel management, weekly settlements, 24/7 dispatch support. No forced dispatch.",
      employmentType: "CONTRACTOR",
      minSalary: 150000,
      maxSalary: 300000,
    }),
    getServiceSchema({
      name: "Owner Operator Program",
      description: "Independent contractor trucking program with competitive linehaul rates, Fortune 500 freight access, fuel discounts, AI-powered tools, and 24/7 dispatch support.",
      url: "/owner-operators",
    }),
  ], []);

  return (
    <Layout>
      <SEOHead
        title={SEO_CONTENT.ownerOperators.title}
        description={SEO_CONTENT.ownerOperators.description}
        keywords={SEO_CONTENT.ownerOperators.keywords}
        canonicalPath="/owner-operators"
      />
      <SchemaMarkup schemas={schemas} />
      <OwnerOperatorHeroSection />
      <SEOContentSection pageKey="ownerOperators" />
      <TechBenefitsSection />
      <FAQSection pageKey="ownerOperators" />
    </Layout>
  );
};

export default OwnerOperators;
