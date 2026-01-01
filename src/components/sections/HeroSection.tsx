import { motion } from "framer-motion";
import { ChevronRight, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroDriver from "@/assets/hero-driver.png";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[100svh] flex items-end overflow-hidden noise-overlay">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroDriver}
          alt="Truck driver in cab"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
      </div>

      {/* Asymmetric accent bar */}
      <div className="absolute top-0 left-0 w-1 h-32 bg-primary" />
      <div className="absolute top-0 left-0 w-24 h-1 bg-primary" />

      {/* Content */}
      <div className="container-custom relative z-10 pb-16 pt-28 sm:pb-20 sm:pt-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <span className="label-tag">Trucking Excellence Since 2009</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="heading-display mb-4 sm:mb-6"
          >
            <span className="text-gradient">XXII Century</span>
            <br />
            <span className="text-foreground">Top Pay. Real Support.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-base sm:text-lg max-w-xl mb-6 sm:mb-8"
          >
            Owner operators & company drivers — access Fortune 500 freight, AI-powered tools, and a team that has your back.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Button variant="hero" size="lg" asChild>
              <a
                href="https://intelliapp.driverapponline.com/c/goxxii?r=Eve"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ChevronRight className="w-4 h-4" />
                Apply Now
              </a>
            </Button>
            <Button variant="glass" size="lg" asChild>
              <a href="tel:+12242406441">Call 224-240-6441</a>
            </Button>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-6 right-4 sm:right-8 flex items-center gap-2 text-muted-foreground text-xs"
        >
          <span className="hidden sm:inline">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
