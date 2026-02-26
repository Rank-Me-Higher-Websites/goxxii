import { Layout } from "@/components/layout/Layout";
import { SEOHead, SEO_CONTENT } from "@/components/SEOHead";
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

const FleetProgram = () => (
  <Layout>
    <SEOHead 
      title={SEO_CONTENT.fleetProgram.title}
      description={SEO_CONTENT.fleetProgram.description}
      keywords={SEO_CONTENT.fleetProgram.keywords}
      canonicalPath="/fleet-program"
    />
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

export default FleetProgram;
