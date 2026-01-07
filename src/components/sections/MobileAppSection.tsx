import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import mobileApp from "@/assets/mobile-app.png";
import { ChevronRight } from "lucide-react";

export const MobileAppSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="section-padding bg-background relative">
      <div className="container-custom">
        <div className="grid lg:grid-cols-5 gap-6 lg:gap-10 items-center">
          {/* Content - 3 cols */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="lg:col-span-3"
          >
            <span className="label-tag mb-4">Driver App</span>
            <h2 className="heading-section text-foreground mb-4">
              Your Truck, Your Phone
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6">
              24/7 dispatch, real-time loads, digital paperwork, accident reporting, road assistance — all in one app. Efficiency on every mile.
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              <Button variant="hero" size="default" asChild>
                <a
                  href="https://intelliapp.driverapponline.com/c/goxxii?r=Eve"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ChevronRight className="w-4 h-4" />
                  Apply
                </a>
              </Button>
            </div>

          </motion.div>

          {/* Phone - 2 cols */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="relative max-w-[200px] sm:max-w-[240px] mx-auto">
              {/* Soft glow behind phone */}
              <div className="absolute inset-0 bg-primary/10 blur-[60px] scale-125 rounded-full opacity-40" />
              
              <div className="relative">
                <img
                  src={mobileApp}
                  alt="XXII Century Mobile App"
                  className="w-full h-auto drop-shadow-[0_10px_40px_rgba(0,184,212,0.15)]"
                />
                {/* Subtle bottom edge fade */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none opacity-70" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
