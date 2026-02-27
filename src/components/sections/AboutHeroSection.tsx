import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import trucksFleet from "@/assets/trucks-fleet.png";
import heroBackground from "@/assets/heroes/truck-fleet-mack.jpg";

export const AboutHeroSection = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBackground}
          alt="XXII Century truck fleet"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background" />
      </div>

      <div className="container-custom relative z-10 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
            Trusted Trucking Company -{" "}
            <span className="text-primary">XXII Century</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
            We work with drivers and carriers to deliver reliable trucking and
            logistics services — built for performance, flexibility, and growth.
          </p>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto mb-8">
            Since 2009, XXII Century has connected professional drivers with premium freight opportunities. Explore our <Link to="/owner-operators" className="text-primary hover:underline">owner operator program</Link> with 90% revenue share, or discover <Link to="/company-drivers" className="text-primary hover:underline">company driver positions</Link> starting at 63 CPM with full benefits.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <a
                href="https://intelliapp.driverapponline.com/c/goxxii?r=Eve"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Apply To Drive
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
  );
};
