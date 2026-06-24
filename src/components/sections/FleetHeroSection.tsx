import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import driverFleet from "@/assets/driver-fleet.png";
import heroBackground from "@/assets/heroes/truck-fleet-mack.jpg";

export const FleetHeroSection = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBackground}
          alt="XXII Century fleet of trucks"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/70" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 pt-20 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight mb-6">
            <span className="text-primary">XXII Century</span> Fleet Program for Owner Operators
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
            Partnering with Fortune 500 companies - ensuring top pay, exclusive benefits, and dedicated support every step of the way.
          </p>
          
          <p className="text-base text-muted-foreground mb-8 max-w-3xl mx-auto">
            Whether you're an <Link to="/owner-operators" className="text-primary hover:underline">independent owner operator</Link> looking for premium freight or a <Link to="/company-drivers" className="text-primary hover:underline">CDL-A driver seeking stable employment</Link>, our fleet program delivers the consistency and support you need to succeed. <Link to="/contact" className="text-primary hover:underline">Contact our team</Link> to learn how we can help grow your trucking business.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button variant="hero" size="lg" asChild>
              <a
                href="https://intelliapp.driverapponline.com/c/goxxii?r=Eve"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ChevronRight className="w-5 h-5" />
                Apply To Drive
              </a>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <a href="tel:+16309146037" className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Call 630-914-6037
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
