import { Layout } from "@/components/layout/Layout";
import { FleetHeroSection } from "@/components/sections/FleetHeroSection";
import { FleetOwnerOperatorSection } from "@/components/sections/FleetOwnerOperatorSection";
import { FleetCompanyDriverSection } from "@/components/sections/FleetCompanyDriverSection";
import { TechBenefitsSection } from "@/components/sections/TechBenefitsSection";
import { TrustedBrandsSection } from "@/components/sections/TrustedBrandsSection";
import { FAQSection } from "@/components/sections/FAQSection";

const FleetProgram = () => (
  <Layout>
    <FleetHeroSection />
    <FleetOwnerOperatorSection />
    <FleetCompanyDriverSection />
    <TechBenefitsSection />
    <TrustedBrandsSection />
    <FAQSection />
  </Layout>
);

export default FleetProgram;
