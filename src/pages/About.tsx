import { Layout } from "@/components/layout/Layout";
import { AboutSection } from "@/components/sections/AboutSection";
import { TrustedBrandsSection } from "@/components/sections/TrustedBrandsSection";
import { IndustryPartnersSection } from "@/components/sections/IndustryPartnersSection";

const About = () => (
  <Layout>
    <div className="pt-24">
      <AboutSection />
      <TrustedBrandsSection />
      <IndustryPartnersSection />
    </div>
  </Layout>
);

export default About;
