import { Layout } from "@/components/layout/Layout";
import { OwnerOperatorSection } from "@/components/sections/OwnerOperatorSection";
import { TechBenefitsSection } from "@/components/sections/TechBenefitsSection";
import { FAQSection } from "@/components/sections/FAQSection";

const OwnerOperators = () => (
  <Layout>
    <div className="pt-24">
      <OwnerOperatorSection />
      <TechBenefitsSection />
      <FAQSection />
    </div>
  </Layout>
);

export default OwnerOperators;
