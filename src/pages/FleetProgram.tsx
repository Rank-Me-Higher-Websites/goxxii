import { Layout } from "@/components/layout/Layout";
import { SEOHead, SEO_CONTENT } from "@/components/SEOHead";
import { FleetHeroSection } from "@/components/sections/FleetHeroSection";
import { FleetOwnerOperatorSection } from "@/components/sections/FleetOwnerOperatorSection";
import { FleetCompanyDriverSection } from "@/components/sections/FleetCompanyDriverSection";
import { FleetContactSection } from "@/components/sections/FleetContactSection";
import { TechBenefitsSection } from "@/components/sections/TechBenefitsSection";
import { TrustedBrandsSection } from "@/components/sections/TrustedBrandsSection";
import { FAQSection } from "@/components/sections/FAQSection";

const FleetProgram = () => (
  <Layout>
    <SEOHead 
      title={SEO_CONTENT.fleetProgram.title}
      description={SEO_CONTENT.fleetProgram.description}
      keywords={SEO_CONTENT.fleetProgram.keywords}
      canonicalPath="/fleet-program"
    />
    <FleetHeroSection />
    <FleetOwnerOperatorSection />
    <FleetCompanyDriverSection />
    <FleetContactSection />
    <TechBenefitsSection />
    <TrustedBrandsSection />
    <FAQSection />
  </Layout>
);

export default FleetProgram;
