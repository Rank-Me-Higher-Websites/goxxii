import { Layout } from "@/components/layout/Layout";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, MapPin, Shield, LineChart, Clock, Fuel, Route, Radio, ShieldCheck, RefreshCcw, Phone } from "lucide-react";
import freightHero from "@/assets/freight-hero.png";
import freightBroker from "@/assets/freight-broker.png";
import freightShipper from "@/assets/freight-shipper.png";
import lgLogo from "@/assets/brands/lg.png";
import thermafiberLogo from "@/assets/brands/thermafiber.png";
import millerLogo from "@/assets/brands/miller.png";
import westrockLogo from "@/assets/brands/westrock.png";
import petcoLogo from "@/assets/brands/petco.png";
import wisconsinLogo from "@/assets/brands/wisconsin.png";

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
];

const brands = [
  { name: "LG", logo: lgLogo },
  { name: "Thermafiber", logo: thermafiberLogo },
  { name: "Miller", logo: millerLogo },
  { name: "WestRock", logo: westrockLogo },
  { name: "Petco", logo: petcoLogo },
  { name: "Wisconsin Paper Council", logo: wisconsinLogo },
];

const FreightServices = () => {
  const featuresRef = useRef(null);
  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" });
  const fleetRef = useRef(null);
  const fleetInView = useInView(fleetRef, { once: true, margin: "-100px" });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-background">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${freightHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        
        <div className="container-custom relative z-10 pt-24 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="text-muted-foreground uppercase tracking-widest mb-4">Freight Shipping Services</p>
            
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight mb-6">
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
                <a href="tel:+12242406441" className="flex items-center gap-2">
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
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
            <div className="order-2 lg:order-1">
              <p className="text-muted-foreground leading-relaxed">
                Experience fast, reliable, and secure <strong className="text-foreground">freight shipping services</strong> with XXII Century Inc. We provide nationwide coverage, competitive rates, and tailored solutions to fit your business needs. From LTL to full truckload and expedited freight, our expert team ensures your shipments arrive on time, every time. Get transparent quotes, real-time tracking, and exceptional customer support—ship with confidence today!
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
      <section className="py-20 bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                Why Partner With a <span className="text-primary">Freight Broker?</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  At XXII Century, we make logistics simple and stress-free. Partnering with us means no more time wasted sourcing and vetting carriers—we handle it all for you. Our experienced team ensures every carrier is reliable, professional, and fully accountable.
                </p>
                <p>
                  With our strong industry relationships, we deliver competitive rates without compromising service quality. While we manage your freight, you can stay focused on growing your business. No matter the cargo, XXII Century provides a smarter, more efficient way to move freight.
                </p>
              </div>
              <Button variant="hero" size="lg" className="mt-8" asChild>
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
      <section className="py-20 bg-muted/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
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
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                Freight <span className="text-primary">Shippers</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  At XXII Century, our Freight Brokerage Division combines industry expertise with unmatched service and communication. We understand the complexities of modern logistics and are committed to streamlining the freight process for our clients.
                </p>
                <p>
                  Through our <strong className="text-foreground">Trusted Carrier Network</strong>, we connect shippers with thoroughly vetted, high-performing carriers—ensuring every load is handled with precision, safety, and accountability. We don't just move freight; we build lasting partnerships that drive efficiency and growth.
                </p>
              </div>
              <Button variant="hero" size="lg" className="mt-8" asChild>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <a href="tel:+12242406441" className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  (224) 240-6441
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trusted Brands Section */}
      <section className="py-20 bg-gradient-to-b from-[#0a1628] via-[#0d1e36] to-[#0a1628]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.08)_0%,_transparent_70%)]" />
        <div className="container-custom relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-3xl md:text-4xl font-display font-bold uppercase tracking-wider mb-12 text-white"
          >
            Leading Brands Rely on Our <span className="text-primary">Freight Shipping Services</span>
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {brands.map((brand, index) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -8 }}
                className="group relative bg-[#1a2d4a] rounded-2xl p-5 flex items-center justify-center min-h-[140px] cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 border border-[#2a3d5a]/50 hover:border-primary/30"
              >
                <div className="bg-white rounded-lg p-4 w-full h-full flex items-center justify-center min-h-[80px]">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-h-10 md:max-h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FreightServices;
