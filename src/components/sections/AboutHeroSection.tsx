import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import trucksFleet from "@/assets/trucks-fleet.png";

export const AboutHeroSection = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={trucksFleet}
          alt="XXII Century truck fleet"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
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
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            We work with drivers and carriers to deliver reliable trucking and
            logistics services — built for performance, flexibility, and growth.
          </p>
          <Button variant="hero" size="lg" asChild>
            <a href="tel:630-948-0501" className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Get In Touch
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
