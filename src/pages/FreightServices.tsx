import { useMemo, useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead, SEO_CONTENT } from "@/components/SEOHead";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import {
  getOrganizationSchema,
  getLocalBusinessSchema,
  getBreadcrumbSchema,
  getServiceSchema,
  getFAQSchema,
  freightServicesFaqsPlain,
} from "@/data/schemaData";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, MapPin, Shield, LineChart, Clock, Fuel, Route, Radio, ShieldCheck, RefreshCcw, Package, BarChart3, FileText, Brain, Truck, Map, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";
import freightTruck from "@/assets/xxii-volvo-truck-4.jpg";
import heroBackground from "@/assets/xxii-new-1.jpg";
import freightBroker from "@/assets/freight-broker.png";
import freightShipper from "@/assets/freight-shipper.png";
import { SEOContentSection } from "@/components/sections/SEOContentSection";
import { TrustedByStripSection } from "@/components/sections/TrustedByStripSection";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { DedicatedLanesSection } from "@/components/sections/DedicatedLanesSection";
import { CarrierNetworkSection } from "@/components/sections/CarrierNetworkSection";
import { TruckFeaturesSection } from "@/components/sections/TruckFeaturesSection";
import { QuoteFormDialog } from "@/components/QuoteFormDialog";

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

// Define industry tools features
const industryTools = [
  {
    icon: RefreshCcw,
    title: "Automatic Load Status Updates",
    description: "Receive automatic status messages generated with geofencing technology for complete peace of mind.",
    color: "from-blue-500/20 to-blue-600/20",
    iconColor: "text-blue-400",
  },
  {
    icon: BarChart3,
    title: "Historical Load Data",
    description: "Access comprehensive historical data for all your loads to make informed business decisions.",
    color: "from-green-500/20 to-green-600/20",
    iconColor: "text-green-400",
  },
  {
    icon: FileText,
    title: "Driver Activity Reports",
    description: "Detailed reports on driver performance and activity for better fleet management.",
    color: "from-purple-500/20 to-purple-600/20",
    iconColor: "text-purple-400",
  },
  {
    icon: Brain,
    title: "Fleet Safety AI",
    description: "Advanced AI-powered safety monitoring to ensure driver and cargo protection on every load.",
    color: "from-orange-500/20 to-orange-600/20",
    iconColor: "text-orange-400",
  },
  {
    icon: ShieldCheck,
    title: "Truck Safety Features",
    description: "State-of-the-art safety equipment and monitoring systems on all XXII Century vehicles.",
    color: "from-red-500/20 to-red-600/20",
    iconColor: "text-red-400",
  },
  {
    icon: Radio,
    title: "GPS Tracking on Trucks and Trailers",
    description: "Real-time GPS tracking for complete visibility of your freight from pickup to delivery.",
    color: "from-teal-500/20 to-teal-600/20",
    iconColor: "text-teal-400",
  },
  {
    icon: Map,
    title: "Customer Active Loads Map",
    description: "Interactive map showing all your active loads in real-time for easy tracking and visibility.",
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-cyan-400",
  },
  {
    icon: Star,
    title: "Elite Drivers",
    description: "Highly trained and experienced professional drivers committed to excellent service delivery.",
    color: "from-yellow-500/20 to-yellow-600/20",
    iconColor: "text-yellow-400",
  },
  {
    icon: Route,
    title: "Route Optimization",
    description: "Smart routing algorithms ensure the most efficient delivery paths for every load.",
    color: "from-indigo-500/20 to-indigo-600/20",
    iconColor: "text-indigo-400",
  },
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
  const [quoteOpen, setQuoteOpen] = useState(false);

  const schemas = useMemo(() => [
    getOrganizationSchema(),
    getLocalBusinessSchema(),
    getBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Freight Shipping Services", path: "/freight-shipping-services" },
    ]),
    getFAQSchema(freightServicesFaqsPlain),
    getServiceSchema({
      name: "Freight Shipping Services",
      description: "Nationwide dry van freight shipping. Real-time tracking, competitive rates, Fortune 500 carrier network, and 24/7 dispatch support.",
      url: "/freight-shipping-services",
    }),
    getServiceSchema({
      name: "Freight Carrier Services",
      description: "Asset-based freight carrier with modern fleet, professional drivers, real-time tracking, and nationwide coverage across the continental U.S.",
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
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/45 to-background/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/25 to-transparent" />
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
              <Button variant="hero" size="lg" onClick={() => setQuoteOpen(true)} className="flex items-center gap-2">
                <ChevronRight className="w-5 h-5" />
                Get Your Quote
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <a href="/contact" className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Ship With Us
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
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        </div>
      </section>

      {/* Dedicated Lanes map - directly below the feature boxes */}
      <DedicatedLanesSection onGetQuote={() => setQuoteOpen(true)} />

      {/* Freight shipping intro + truck photo */}
      <section className="py-14 sm:py-20 bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div className="order-2 lg:order-1 space-y-4 text-center lg:text-left">
              <p className="text-muted-foreground leading-relaxed">
                Experience fast, reliable, and secure <strong className="text-foreground">freight shipping services</strong> with XXII Century Inc. We specialize in <strong className="text-foreground">dry van customer freight</strong> with nationwide coverage, competitive rates, and tailored solutions to fit your business needs. Our expert team ensures your shipments arrive on time, every time.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We run <strong className="text-foreground">50%+ drop & hook freight</strong> - no-touch loads on established customer lanes. Less waiting at docks means more miles and more money. Get transparent quotes, real-time tracking, and exceptional support. Ready to move your freight?{" "}
                <button type="button" onClick={() => setQuoteOpen(true)} className="text-primary hover:underline font-medium">
                  Get your quote
                </button>{" "}
                or <Link to="/contact" className="text-primary hover:underline">ship with us</Link> today.
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <img
                src={freightTruck}
                alt="XXII Century green freight truck on the highway"
                className="rounded-2xl w-full shadow-2xl"
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
                  XXII Century operates a modern, asset-based fleet built for reliability and performance. With our own trucks, trailers, and professional drivers, we maintain full control over every shipment-delivering consistent service quality that third-party solutions simply can't match.
                </p>
                <p>
                  Our in-house operations team, advanced tracking technology, and commitment to on-time delivery mean your freight is always in capable hands. We run primarily <strong className="text-foreground">drop & hook customer freight</strong> on proven lanes - faster turnaround, fewer dock delays, and consistent volume for our customers.
                </p>
                <p>
                  Ready to streamline your shipping? Our <Link to="/fleet-program" className="text-primary hover:underline">fleet program</Link> keeps dedicated capacity available for your freight, and our logistics team builds lane plans around your volume.
                </p>
              </div>
              <Button variant="hero" size="lg" className="mt-8 mx-auto lg:mx-0" onClick={() => setQuoteOpen(true)}>
                <ChevronRight className="w-5 h-5" />
                Get Your Quote
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

      {/* Industry-Leading Tools Section */}
      <section ref={fleetRef} className="py-24 relative overflow-hidden bg-[#07111f]">
        {/* Subtle background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />
        {/* Glow blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/8 rounded-full blur-[120px] pointer-events-none" />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={fleetInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 px-3 py-1 rounded-full border border-primary/30 bg-primary/10">
              Technology
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">
              Industry-Leading Tools Built to{" "}
              <span className="text-primary">Streamline Your Logistics</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Enterprise-grade technology on every load — real-time visibility, AI safety monitoring, and automated updates from pickup to delivery.
            </p>
          </motion.div>

          {/* Mobile: Carousel */}
          <MobileFeatureCarousel features={industryTools} />

          {/* Desktop: Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {industryTools.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={fleetInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.07 }}
                className="group relative p-6 rounded-2xl border border-white/8 bg-white/3 hover:bg-white/6 hover:border-white/16 transition-all duration-300 cursor-default"
              >
                {/* Top accent line */}
                <div className={`absolute top-0 left-6 right-6 h-px bg-gradient-to-r ${feature.color.replace('/20', '/60').replace('from-', 'from-').replace('to-', 'to-')} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className={`w-11 h-11 mb-5 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center ring-1 ring-white/10`}>
                  <feature.icon className={`w-5 h-5 ${feature.iconColor}`} />
                </div>
                <h3 className="font-semibold text-white text-base mb-2 leading-snug">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CarrierNetworkSection onGetQuote={() => setQuoteOpen(true)} />

      <TruckFeaturesSection />

      <AwardsSection />

      {/* Ready to Ship CTA */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-background to-accent/10">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Ready to <span className="text-primary">Ship With XXII?</span>
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto mb-8">
              Get a transparent rate on your lanes in minutes. Dedicated capacity, drop & hook freight, real-time tracking, and a logistics team that answers the phone - so your freight keeps moving and your docks keep clear.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="lg" onClick={() => setQuoteOpen(true)} className="flex items-center gap-2">
                <ChevronRight className="w-5 h-5" />
                Get Your Quote
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <a href="/contact" className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Ship With Us
                </a>
              </Button>
            </div>
            <p className="text-muted-foreground text-sm mt-6">
              Prefer to talk?{" "}
              <a href="tel:+16309146037" className="text-primary hover:underline font-medium">
                630-914-6037
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Freight Shippers Section (moved to bottom) */}
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
                  At XXII Century, our Freight Division combines industry expertise with unmatched service and communication. We specialize in <strong className="text-foreground">customer freight</strong> - established lanes with consistent volume for shippers who need reliability. We understand the complexities of modern logistics and are committed to streamlining the freight process across the continental United States.
                </p>
                <p>
                  Through our <strong className="text-foreground">Trusted Carrier Network</strong>, we connect shippers with thoroughly vetted, high-performing carriers on dedicated customer lanes. The majority of our loads are <strong className="text-foreground">drop & hook</strong> - fast, no-touch freight that keeps freight moving and dock times minimal. We don't just move freight; we build lasting partnerships that drive efficiency and growth.
                </p>
                <p>
                  Ready to ship with us? <Link to="/contact" className="text-primary hover:underline">Contact our logistics team</Link> for a custom rate on your lanes, or learn more <Link to="/about" className="text-primary hover:underline">about our trucking company</Link> and our commitment to excellence.
                </p>
              </div>
              <Button variant="hero" size="lg" className="mt-8 mx-auto lg:mx-0" asChild>
                <a href="/contact" className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Ship With Us
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trusted By logo marquee (same as home page) */}
      <TrustedByStripSection />

      <SEOContentSection pageKey="freightServices" />

      <QuoteFormDialog open={quoteOpen} onOpenChange={setQuoteOpen} />
    </Layout>
  );
};

export default FreightServices;
