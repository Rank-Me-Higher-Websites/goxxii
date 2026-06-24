import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import mobileApp from "@/assets/mobile-app.png";
import { ChevronRight, Phone } from "lucide-react";

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
            className="lg:col-span-3 text-center lg:text-left"
          >
            <span className="label-tag mb-4">Driver App</span>
            <h2 className="heading-section text-foreground mb-4">
              Your Truck, Your Phone
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6">
              24/7 dispatch, real-time loads, digital paperwork, accident reporting, road assistance — all in one app. Efficiency on every mile.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
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
              <Button variant="heroOutline" size="default" asChild>
                <a href="tel:+16309146037" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  630-914-6037
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
            <div className="relative max-w-[240px] sm:max-w-[280px] mx-auto group">
              {/* Outer glow */}
              <div className="absolute inset-0 bg-primary/20 blur-[80px] scale-150 rounded-full opacity-50" />
              
              {/* Futuristic frame */}
              <div className="relative p-[3px] rounded-[2.5rem] bg-gradient-to-b from-primary/40 via-primary/10 to-primary/30">
                {/* Inner border glow */}
                <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-b from-primary/20 to-transparent blur-sm" />
                
                <div className="relative bg-background/80 backdrop-blur-sm rounded-[2.3rem] p-3 overflow-hidden">
                  {/* Corner accents */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                  
                  {/* Image container */}
                  <div className="relative overflow-hidden rounded-[1.8rem]">
                    <img
                      src={mobileApp}
                      alt="XXII Century Mobile App"
                      className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Bottom fade */}
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background via-background/70 to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>
              
              {/* Floating scan lines */}
              <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden pointer-events-none opacity-[0.03]">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="w-full h-px bg-foreground" style={{ marginTop: `${12 + i * 12}%` }} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
