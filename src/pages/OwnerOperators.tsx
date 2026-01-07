import { Layout } from "@/components/layout/Layout";
import { SEOHead, SEO_CONTENT } from "@/components/SEOHead";
import { OwnerOperatorHeroSection } from "@/components/sections/OwnerOperatorHeroSection";
import { TechBenefitsSection } from "@/components/sections/TechBenefitsSection";
import { FAQSection } from "@/components/sections/FAQSection";

const OwnerOperators = () => (
  <Layout>
    <SEOHead 
      title={SEO_CONTENT.ownerOperators.title}
      description={SEO_CONTENT.ownerOperators.description}
      keywords={SEO_CONTENT.ownerOperators.keywords}
      canonicalPath="/owner-operators"
    />
    <OwnerOperatorHeroSection />
    <TechBenefitsSection />
    <FAQSection />
  </Layout>
);

export default OwnerOperators;
