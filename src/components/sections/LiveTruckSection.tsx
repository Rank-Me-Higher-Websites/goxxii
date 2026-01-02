import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Truck, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export const LiveTruckSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section 
      ref={ref} 
      className="py-6 md:py-10 bg-gradient-to-r from-card via-card/95 to-card relative overflow-hidden"
      aria-label="Live truck availability tracker"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(0,255,136,0.03)_50%,transparent_100%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 md:gap-6"
        >
          {/* Content */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Icon */}
            <div className="hidden sm:flex w-10 h-10 md:w-12 md:h-12 rounded-xl bg-accent/10 border border-accent/20 items-center justify-center flex-shrink-0">
              <Truck className="w-5 h-5 md:w-6 md:h-6 text-accent" />
            </div>
            
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                <span className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-accent">
                  Live Fleet Status
                </span>
              </div>
              <h2 className="font-display text-lg md:text-xl lg:text-2xl font-bold text-foreground leading-tight">
                Available Trucks & Capacity
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-3 flex-wrap">
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Updated every 15 min
                </span>
                <span className="hidden md:inline-flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  Midwest & nationwide routes
                </span>
              </p>
            </div>
          </div>

          {/* CTA */}
          <Button 
            variant="gradient" 
            size="default" 
            className="w-full sm:w-auto flex-shrink-0 text-sm"
            asChild
          >
            <a
              href="https://app.openroadtms.com/available_trucks/KkqF6-_5iDsQDGfuPRikbg"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View available trucks for freight shipping"
              className="flex items-center justify-center gap-2"
            >
              <span>Check Availability</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
