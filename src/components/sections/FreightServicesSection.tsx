import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-background relative">
      <div className="container-custom relative z-10">
        {/* Fleet Introduction - Sticky scroll layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16 lg:mb-24 items-start lg:min-h-[130vh]">
          {/* Truck images - tall column with extra height for sticky scroll */}
          <motion.div
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

          {/* Text content - sticky on scroll */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:sticky lg:top-32 lg:self-start"
          >
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
          </motion.div>
        </div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-12"
        >
          <h2 className="heading-section text-foreground">
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
