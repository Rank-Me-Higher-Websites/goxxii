import { Layout } from "@/components/layout/Layout";
import { AboutHeroSection } from "@/components/sections/AboutHeroSection";
import { LeadershipSection } from "@/components/sections/LeadershipSection";
import { MissionValuesSection } from "@/components/sections/MissionValuesSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TrustedBrandsSection } from "@/components/sections/TrustedBrandsSection";
import { IndustryPartnersSection } from "@/components/sections/IndustryPartnersSection";

const About = () => (
  <Layout>
    <AboutHeroSection />
    <MissionValuesSection />
    <ServicesSection />
    <LeadershipSection />
    <TrustedBrandsSection />
    <IndustryPartnersSection />
  </Layout>
);

export default About;
