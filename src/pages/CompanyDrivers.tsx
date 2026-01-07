import { Layout } from "@/components/layout/Layout";
import { SEOHead, SEO_CONTENT } from "@/components/SEOHead";
import { CompanyDriverHeroSection } from "@/components/sections/CompanyDriverHeroSection";
import { TechBenefitsSection } from "@/components/sections/TechBenefitsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { SEOContentSection } from "@/components/sections/SEOContentSection";

const CompanyDrivers = () => (
  <Layout>
    <SEOHead 
      title={SEO_CONTENT.companyDrivers.title}
      description={SEO_CONTENT.companyDrivers.description}
      keywords={SEO_CONTENT.companyDrivers.keywords}
      canonicalPath="/company-drivers"
    />
    <CompanyDriverHeroSection />
    <SEOContentSection pageKey="companyDrivers" />
    <TechBenefitsSection />
    <FAQSection />
  </Layout>
);

export default CompanyDrivers;
