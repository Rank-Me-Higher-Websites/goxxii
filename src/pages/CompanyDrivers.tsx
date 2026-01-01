import { Layout } from "@/components/layout/Layout";
import { CompanyDriverHeroSection } from "@/components/sections/CompanyDriverHeroSection";
import { TechBenefitsSection } from "@/components/sections/TechBenefitsSection";
import { FAQSection } from "@/components/sections/FAQSection";

const CompanyDrivers = () => (
  <Layout>
    <CompanyDriverHeroSection />
    <TechBenefitsSection />
    <FAQSection />
  </Layout>
);

export default CompanyDrivers;
