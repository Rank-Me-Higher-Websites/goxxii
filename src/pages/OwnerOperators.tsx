import { Layout } from "@/components/layout/Layout";
import { OwnerOperatorHeroSection } from "@/components/sections/OwnerOperatorHeroSection";
import { TechBenefitsSection } from "@/components/sections/TechBenefitsSection";
import { FAQSection } from "@/components/sections/FAQSection";

const OwnerOperators = () => (
  <Layout>
    <OwnerOperatorHeroSection />
    <TechBenefitsSection />
    <FAQSection />
  </Layout>
);

export default OwnerOperators;
