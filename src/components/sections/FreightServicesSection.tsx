import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import trucksFleet from "@/assets/trucks-fleet.png";
import { Lightbulb, Ship, Wrench, Award } from "lucide-react";

const services = [
  {
    icon: Lightbulb,
    title: "Custom Solutions for Every Need",
    description: "We take a hands-on approach and prioritize every customer, no matter the job size.",
  },
  {
    icon: Ship,
    title: "Tech-Enabled Logistics Solutions",
    description: "XXII Century provides 24/7 Dry Van, FTL, and Expedited shipping—delivered with precision and reliability.",
  },
  {
    icon: Wrench,
    title: "Extensive Fleet. Extensive Service.",
    description: "Our AI-powered fleet optimizes routes, tracks performance, and stays road-ready with proactive maintenance.",
  },
  {
    icon: Award,
    title: "Driven by Excellence. Powered by People.",
    description: "At XXII Century, we keep drivers motivated with great pay, modern equipment, and a supportive environment.",
  },
];

export const FreightServicesSection = () => {
  const ref = useRef(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const leftColRef = useRef<HTMLDivElement | null>(null);
  const partnersRef = useRef<HTMLDivElement | null>(null);
  const servicesHeadingRef = useRef<HTMLHeadingElement | null>(null);

  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const bottomContentRef = useRef<HTMLDivElement | null>(null);

  const [maxShift, setMaxShift] = useState(0);
  const [maxBottomShift, setMaxBottomShift] = useState(0);

  useLayoutEffect(() => {
    if (isMobile) {
      setMaxShift(0);
      setMaxBottomShift(0);
      return;
    }

    const compute = () => {
      if (!leftColRef.current || !partnersRef.current) return;

      const leftHeight = leftColRef.current.getBoundingClientRect().height;
      const rightHeight = partnersRef.current.getBoundingClientRect().height;

      setMaxShift(Math.max(0, leftHeight - rightHeight));

      // Extra travel for bottom content (stats + why drivers choose us)
      if (bottomContentRef.current) {
        const bottomHeight = bottomContentRef.current.getBoundingClientRect().height;
        setMaxBottomShift(Math.max(0, leftHeight - rightHeight + bottomHeight * 0.5));
      }
    };

    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [isMobile]);

  const { scrollYProgress } = useScroll({
    target: introRef,
    offset: ["start end", "end start"],
  });

  // Move the right-side content down while scrolling through this grid.
  const partnersY = useTransform(scrollYProgress, [0.1, 0.7], [0, maxShift]);
  // Extra downward travel for stats & "Why Drivers Choose Us"
  const bottomY = useTransform(scrollYProgress, [0.3, 0.9], [0, maxBottomShift]);

  return (
    <section ref={ref} className="section-padding bg-background relative">
      <div className="container-custom relative z-10">
        {/* Fleet Introduction - Parallax scroll layout */}
        <div
          ref={introRef}
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16 lg:mb-24 items-start"
        >
          {/* Truck images - column */}
          <motion.div
            ref={leftColRef}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl overflow-hidden">
              <img
                src={trucksFleet}
                alt="XXII Century Fleet - Dry Van and Refrigerated Trucks"
                className="w-full h-auto"
              />
            </div>
            {/* Additional content to create scroll height */}
            <div className="hidden lg:block glass rounded-2xl p-6 space-y-4">
              <h3 className="font-display font-semibold text-foreground text-lg">Our Fleet Includes:</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  53' Dry Van Trailers
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Refrigerated Units for Temperature-Sensitive Freight
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Late-Model Tractors with Modern Amenities
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  GPS-Tracked Equipment for Real-Time Visibility
                </li>
              </ul>
            </div>
            <div className="hidden lg:block glass rounded-2xl p-6">
              <p className="text-muted-foreground text-sm leading-relaxed">
                Every truck in our fleet is maintained to the highest standards, ensuring driver safety and on-time deliveries. We invest in our equipment because we invest in our drivers.
              </p>
            </div>
          </motion.div>

          {/* Text content - right column */}
          <motion.div
            ref={partnersRef}
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ y: partnersY }}
            className="space-y-6"
          >
            <div>
              <h2 className="heading-section text-foreground mb-6">
                Your Trusted Trucking Partners
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  At XXII Century, we support <Link to="/careers" className="text-foreground font-semibold hover:text-primary transition-colors">CDL truck drivers in Chicago and across the U.S.</Link> with dependable routes, steady freight, and a professional logistics network. Whether you&apos;re hauling <Link to="/freight-shipping-services" className="text-foreground font-semibold hover:text-primary transition-colors">dry van</Link>, <Link to="/freight-shipping-services" className="text-foreground font-semibold hover:text-primary transition-colors">temperature-controlled freight</Link>, intermodal, or <Link to="/freight-shipping-services" className="text-foreground font-semibold hover:text-primary transition-colors">full truckload</Link>, our asset-based fleet and optimized routing help you stay efficient and on the move.
                </p>
                <p>
                  We&apos;re more than a carrier — we&apos;re a <Link to="/owner-operators" className="text-foreground font-semibold hover:text-primary transition-colors">driver-focused partner</Link> built on communication, predictable miles, and on-time freight delivery. Our system is designed to reduce wait times, keep loads consistent, and help <Link to="/company-drivers" className="text-foreground font-semibold hover:text-primary transition-colors">drivers get from point A to point B</Link> with confidence.
                </p>
              </div>
              <Button variant="heroOutline" size="lg" className="mt-8" asChild>
                <Link to="/freight-shipping-services">Learn More</Link>
              </Button>
            </div>

            {/* Stats Grid + Why Drivers - extra parallax to fill empty space */}
            <motion.div ref={bottomContentRef} style={{ y: bottomY }}>
              <div className="hidden lg:grid grid-cols-2 gap-4 pt-6">
                <div className="glass rounded-xl p-5 text-center">
                  <div className="text-3xl font-display font-bold text-primary mb-1">15+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="glass rounded-xl p-5 text-center">
                  <div className="text-3xl font-display font-bold text-accent mb-1">97%</div>
                  <div className="text-sm text-muted-foreground">On-Time Delivery</div>
                </div>
                <div className="glass rounded-xl p-5 text-center">
                  <div className="text-3xl font-display font-bold text-primary mb-1">500+</div>
                  <div className="text-sm text-muted-foreground">Active Drivers</div>
                </div>
                <div className="glass rounded-xl p-5 text-center">
                  <div className="text-3xl font-display font-bold text-accent mb-1">24/7</div>
                  <div className="text-sm text-muted-foreground">Dispatch Support</div>
                </div>
              </div>

              <div className="hidden lg:block glass rounded-xl p-5 mt-4">
                <h4 className="font-display font-semibold text-foreground mb-3">Why Drivers Choose Us</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    Fortune 500 freight partners
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    Weekly settlements with no hidden fees
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    Modern equipment &amp; AI-powered dispatch
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-12"
        >
          <h2 ref={servicesHeadingRef} className="heading-section text-foreground">
            Flexible Trucking Routes for Drivers Backed by Our Team
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + 0.1 * index }}
              className="glass rounded-2xl p-6 text-center hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="accent" size="lg" asChild>
            <a href="mailto:hr@goxxii.com">Partner with XXII</a>
          </Button>
        </div>
      </div>
    </section>
  );
};
