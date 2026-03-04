import { useMemo, useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead, SEO_CONTENT } from "@/components/SEOHead";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import {
  getOrganizationSchema,
  getLocalBusinessSchema,
  getBreadcrumbSchema,
  getServiceSchema,
} from "@/data/schemaData";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, MapPin, Shield, LineChart, Clock, Fuel, Route, Radio, ShieldCheck, RefreshCcw, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import freightHero from "@/assets/freight-hero.png";
import heroBackground from "@/assets/heroes/truck-green-closeup.jpg";
import freightBroker from "@/assets/freight-broker.png";
import freightShipper from "@/assets/freight-shipper.png";
import lgLogo from "@/assets/brands/lg.png";
import thermafiberLogo from "@/assets/brands/thermafiber.png";
import millerLogo from "@/assets/brands/miller.png";
import westrockLogo from "@/assets/brands/westrock.png";
import petcoLogo from "@/assets/brands/petco.png";
import wisconsinLogo from "@/assets/brands/wisconsin.png";
import { SEOContentSection } from "@/components/sections/SEOContentSection";

// Define trusted features
const trustedFeatures = [
  {
    icon: MapPin,
    title: "Live Location",
    description: "XXII's live tracking gives customers real-time updates and accurate ETAs.",
  },
  {
    icon: Shield,
    title: "Geofencing Feature",
    description: "Geofencing alerts you instantly when freight arrives, departs, or is delayed.",
  },
  {
    icon: LineChart,
    title: "Predictive Analytics",
    description: "AI forecasts delays, fuel usage, and maintenance needs before they happen.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description: "On-time delivery hits deadlines, cuts delays, and builds customer trust.",
  },
];

// Define fleet features
const fleetFeatures = [
  {
    icon: Fuel,
    title: "Fuel Efficiency Monitoring",
    description: "Track fuel usage in real time to reduce costs and improve sustainability.",
  },
  {
    icon: Route,
    title: "Smart Routing",
    description: "AI instantly maps the quickest, most cost-efficient path for every load.",
  },
  {
    icon: Radio,
    title: "Live Fleet Tracking",
    description: "Track fleet health, ETAs, and driver performance from a single dashboard.",
  },
  {
    icon: ShieldCheck,
    title: "Advanced Safety",
    description: "Real-time condition and tamper alerts shield every shipment from pickup to delivery.",
  },
  {
    icon: RefreshCcw,
    title: "Auto Load Updates",
    description: "Automated status messages keep shippers, drivers, and customers perfectly in sync.",
  },
  {
    icon: Clock,
    title: "24/7 Dispatch Support",
    description: "Round-the-clock dispatch team ensures drivers and loads stay on schedule.",
  },
];

// Define trusted brands
const brands = [
  { name: "LG", logo: lgLogo },
  { name: "Thermafiber", logo: thermafiberLogo },
  { name: "Miller", logo: millerLogo },
  { name: "WestRock", logo: westrockLogo },
  { name: "Petco", logo: petcoLogo },
  { name: "Wisconsin Paper Council", logo: wisconsinLogo },
];

const MobileFeatureCarousel = ({ features }: { features: typeof trustedFeatures }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev >= features.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [features.length]);

  return (
    <div className="block md:hidden mb-10">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {features.map((feature) => (
            <div key={feature.title} className="flex-shrink-0 w-full px-2">
              <div className="glass p-6 rounded-xl text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {features.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-primary" : "bg-muted-foreground/30"}`}
          />
        ))}
      </div>
    </div>
  );
};

const FreightServices = () => {
  const featuresRef = useRef(null);
  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" });
  const fleetRef = useRef(null);
  const fleetInView = useInView(fleetRef, { once: true, margin: "-100px" });

  const schemas = useMemo(() => [
    getOrganizationSchema(),
    getLocalBusinessSchema(),
    getBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Freight Shipping Services", path: "/freight-shipping-services" },
    ]),
    getServiceSchema({
      name: "Freight Shipping Services",
      description: "Nationwide dry van, refrigerated, and flatbed freight shipping. Real-time tracking, competitive rates, Fortune 500 carrier network, and 24/7 dispatch support.",
      url: "/freight-shipping-services",
    }),
    getServiceSchema({
      name: "Freight Brokerage",
      description: "Connect with vetted, high-performing carriers through our Trusted Carrier Network. Full truckload, LTL, and expedited freight solutions across the continental U.S. and Canada.",
      url: "/freight-shipping-services",
    }),
  ], []);

  return (
    <Layout>
      <SEOHead
        title={SEO_CONTENT.freightServices.title}
        description={SEO_CONTENT.freightServices.description}
        keywords={SEO_CONTENT.freightServices.keywords}
        canonicalPath="/freight-shipping-services"
      />
      <SchemaMarkup schemas={schemas} />
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBackground}
            alt="Freight shipping services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
        </div>

        {/* Floating gradient shapes */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-40 left-10 w-96 h-96 bg-accent/15 rounded-full blur-[120px]" />

        {/* Accent corners */}
        <div className="absolute top-0 left-0 w-1 h-24 sm:h-32 bg-gradient-to-b from-primary to-transparent" />
        <div className="absolute top-0 left-0 w-24 sm:w-32 h-1 bg-gradient-to-r from-primary to-transparent" />
        <div className="absolute bottom-0 right-0 w-1 h-24 sm:h-32 bg-gradient-to-t from-accent to-transparent" />
        <div className="absolute bottom-0 right-0 w-24 sm:w-32 h-1 bg-gradient-to-l from-accent to-transparent" />
        
        <div className="container-custom relative z-10 pt-24 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <p className="text-muted-foreground uppercase tracking-widest mb-4">Freight Shipping Services</p>
            
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-6">
              Nationwide Freight Shipping <span className="text-primary">Solutions You Can Rely On</span>
            </h1>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Button variant="hero" size="lg" asChild>
                <a href="/contact" className="flex items-center gap-2">
                  <ChevronRight className="w-5 h-5" />
                  Contact Us
                </a>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <a href="tel:+16309480501" className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Call Us
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trusted Features Section */}
      <section ref={featuresRef} className="py-20 bg-muted/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold uppercase">
              Trusted Freight Shipping Services with <span className="text-primary">XXII Century</span>
            </h2>
          </motion.div>

          {/* Mobile: Carousel */}
          <MobileFeatureCarousel features={trustedFeatures} />

          {/* Desktop: Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {trustedFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="glass p-6 rounded-xl text-center hover:border-primary/50 transition-colors"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div className="order-2 lg:order-1 space-y-4 text-center lg:text-left">
              <p className="text-muted-foreground leading-relaxed">
                Experience fast, reliable, and secure <strong className="text-foreground">freight shipping services</strong> with XXII Century Inc. We provide nationwide coverage, competitive rates, and tailored solutions to fit your business needs. From LTL to full truckload and expedited freight, our expert team ensures your shipments arrive on time, every time.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Get transparent quotes, real-time tracking, and exceptional customer support—ship with confidence today! Looking to haul freight with us? Explore our <Link to="/owner-operators" className="text-primary hover:underline">owner operator trucking jobs</Link> or <Link to="/company-drivers" className="text-primary hover:underline">CDL-A company driver positions</Link> with competitive pay.
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <img
                src={freightHero}
                alt="Fleet program for owner operators"
                className="rounded-2xl w-full"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="py-14 sm:py-20 bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center lg:text-left"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                Why Choose XXII Century for <span className="text-primary">Freight Services?</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  XXII Century operates a modern, asset-based fleet built for reliability and performance. With our own trucks, trailers, and professional drivers, we maintain full control over every shipment—delivering consistent service quality that third-party solutions simply can't match.
                </p>
                <p>
                  Our in-house operations team, advanced tracking technology, and commitment to on-time delivery mean your freight is always in capable hands. From dry van to temperature-controlled loads, we offer flexible capacity and competitive pricing tailored to your supply chain needs.
                </p>
                <p>
                  Ready to streamline your shipping? Our <Link to="/fleet-program" className="text-primary hover:underline">fleet program</Link> keeps capacity available for your freight. We're also hiring <Link to="/careers" className="text-primary hover:underline">professional truck drivers</Link> to support our growing operations.
                </p>
              </div>
              <Button variant="hero" size="lg" className="mt-8 mx-auto lg:mx-0" asChild>
                <a href="/contact" className="flex items-center gap-2">
                  <ChevronRight className="w-5 h-5" />
                  Contact Us
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="hidden lg:block"
            >
              <img
                src={freightBroker}
                alt="CDL driver and freight shipping services provider"
                className="rounded-2xl w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Freight Shippers Section */}
      <section className="py-14 sm:py-20 bg-muted/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src={freightShipper}
                alt="Black truck and white trailer"
                className="rounded-2xl w-full"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center lg:text-left"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                Freight <span className="text-primary">Shippers</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  At XXII Century, our Freight Brokerage Division combines industry expertise with unmatched service and communication. We understand the complexities of modern logistics and are committed to streamlining the freight process for our clients across the continental United States.
                </p>
                <p>
                  Through our <strong className="text-foreground">Trusted Carrier Network</strong>, we connect shippers with thoroughly vetted, high-performing carriers—ensuring every load is handled with precision, safety, and accountability. We don't just move freight; we build lasting partnerships that drive efficiency and growth.
                </p>
                <p>
                  Want to join our carrier network? Explore <Link to="/owner-operators" className="text-primary hover:underline">independent owner operator opportunities</Link> with premium freight access, or <Link to="/contact" className="text-primary hover:underline">contact our logistics team</Link> to discuss partnership options. Learn more <Link to="/about" className="text-primary hover:underline">about our trucking company</Link> and our commitment to excellence.
                </p>
              </div>
              <Button variant="hero" size="lg" className="mt-8 mx-auto lg:mx-0" asChild>
                <a href="mailto:hr@goxxii.com" className="flex items-center gap-2">
                  <ChevronRight className="w-5 h-5" />
                  Work With Us
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Fleet Management Section */}
      <section ref={fleetRef} className="py-20 bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={fleetInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Smarter Fleet Management - <span className="text-primary">Simplified</span>
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Our advanced tools give you complete visibility, safety, and efficiency across every load. From fuel tracking to smart routing and automated updates, we keep your operations running seamlessly.
            </p>
          </motion.div>

          {/* Mobile: Carousel */}
          <MobileFeatureCarousel features={fleetFeatures} />

          {/* Desktop: Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fleetFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={fleetInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="glass p-6 rounded-xl hover:border-primary/50 transition-colors"
              >
                <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Road to More Loads CTA */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-background to-accent/10">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Your Road to <span className="text-primary">More Loads</span>
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto mb-8">
              Take control of your success with steady freight, competitive pay, and the support you need to keep moving. As a trusted partner, we connect you with consistent loads, clear communication, and the tools to maximize your earnings—so you can focus on driving your business forward.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="lg" asChild>
                <a
                  href="https://intelliapp.driverapponline.com/c/goxxii?r=Eve"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ChevronRight className="w-5 h-5" />
                  Join Carrier Network
                </a>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <a href="tel:+16309480501" className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  630-948-0501
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trusted Brands Section */}
      <section className="py-14 sm:py-20 bg-gradient-to-b from-[#0a1628] via-[#0d1e36] to-[#0a1628] relative">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-white">
              Trusted by <span className="text-primary">Industry Leaders</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We proudly serve and partner with America's most recognized brands, delivering reliable freight solutions nationwide.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
            {brands.map((brand, index) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-center p-6 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 transition-colors"
              >
                <img
                  src={brand.logo}
                  alt={`${brand.name} - XXII Century freight partner`}
                  className="max-h-12 w-auto opacity-80 hover:opacity-100 transition-opacity"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SEOContentSection pageKey="freightServices" />
    </Layout>
  );
};

export default FreightServices;
