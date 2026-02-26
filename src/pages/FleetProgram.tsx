import { useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead, SEO_CONTENT } from "@/components/SEOHead";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import {
  getOrganizationSchema,
  getLocalBusinessSchema,
  getBreadcrumbSchema,
  getFAQSchema,
  getServiceSchema,
  fleetProgramFaqsPlain,
} from "@/data/schemaData";
import { FleetHeroSection } from "@/components/sections/FleetHeroSection";
import { FleetPowerOnlySection } from "@/components/sections/FleetPowerOnlySection";
import { FleetJoinSection } from "@/components/sections/FleetJoinSection";
import { FleetSupportSection } from "@/components/sections/FleetSupportSection";
import { FleetRequirementsSection } from "@/components/sections/FleetRequirementsSection";
import { FleetOwnerOperatorSection } from "@/components/sections/FleetOwnerOperatorSection";
import { FleetCompanyDriverSection } from "@/components/sections/FleetCompanyDriverSection";
import { FleetContactSection } from "@/components/sections/FleetContactSection";
import { TechBenefitsSection } from "@/components/sections/TechBenefitsSection";
import { TrustedBrandsSection } from "@/components/sections/TrustedBrandsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { SEOContentSection } from "@/components/sections/SEOContentSection";

const FleetProgram = () => {
  const schemas = useMemo(() => [
    getOrganizationSchema(),
    getLocalBusinessSchema(),
    getBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Fleet Program", path: "/fleet-program" },
    ]),
    getFAQSchema(fleetProgramFaqsPlain),
    getServiceSchema({
      name: "Fleet Partnership & Power Only Program",
      description: "Partner with XXII Century for steady Fortune 500 freight. Power Only program with trailer access, 24/7 dispatch support, and competitive rates for small carriers and fleet owners.",
      url: "/fleet-program",
    }),
  ], []);

  return (
    <Layout>
      <SEOHead
        title={SEO_CONTENT.fleetProgram.title}
        description={SEO_CONTENT.fleetProgram.description}
        keywords={SEO_CONTENT.fleetProgram.keywords}
        canonicalPath="/fleet-program"
      />
      <SchemaMarkup schemas={schemas} />
      <FleetHeroSection />
      <FleetPowerOnlySection />
      <FleetJoinSection />
      <FleetSupportSection />
      <FleetRequirementsSection />
      <FleetOwnerOperatorSection />
      <FleetCompanyDriverSection />
      <SEOContentSection pageKey="fleetProgram" />
      <FleetContactSection />
      <TechBenefitsSection />
      <TrustedBrandsSection />
      <FAQSection pageKey="fleetProgram" />
    </Layout>
  );
};

export default FleetProgram;
