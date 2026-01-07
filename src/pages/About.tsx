import { Layout } from "@/components/layout/Layout";
import { SEOHead, SEO_CONTENT } from "@/components/SEOHead";
import { AboutHeroSection } from "@/components/sections/AboutHeroSection";
import { LeadershipSection } from "@/components/sections/LeadershipSection";
import { MissionValuesSection } from "@/components/sections/MissionValuesSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TrustedBrandsSection } from "@/components/sections/TrustedBrandsSection";
import { IndustryPartnersSection } from "@/components/sections/IndustryPartnersSection";
import { QuickCTABanner } from "@/components/QuickCTABanner";

const About = () => (
  <Layout>
    <SEOHead 
      title={SEO_CONTENT.about.title}
      description={SEO_CONTENT.about.description}
      keywords={SEO_CONTENT.about.keywords}
      canonicalPath="/about"
    />
    <AboutHeroSection />
    <div className="mt-8 md:mt-12" />
    <MissionValuesSection />
    <QuickCTABanner variant="compact" />
    <ServicesSection />
    <LeadershipSection />
    <TrustedBrandsSection />
    <IndustryPartnersSection />
  </Layout>
);

export default About;
