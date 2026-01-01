import { Layout } from "@/components/layout/Layout";
import { CompanyDriverSection } from "@/components/sections/CompanyDriverSection";
import { TechBenefitsSection } from "@/components/sections/TechBenefitsSection";
import { FAQSection } from "@/components/sections/FAQSection";

const CompanyDrivers = () => (
  <Layout>
    <div className="pt-24">
      <CompanyDriverSection />
      <TechBenefitsSection />
      <FAQSection />
    </div>
  </Layout>
);

export default CompanyDrivers;
