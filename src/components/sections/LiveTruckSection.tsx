import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export const LiveTruckSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-10 sm:py-14 bg-card relative border-y border-border">
      {/* Accent corner */}
      <div className="absolute top-0 right-0 w-20 h-1 bg-accent" />
      <div className="absolute top-0 right-0 w-1 h-20 bg-accent" />
      
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-accent">Live</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground">
              Truck Availability
            </h2>
            <p className="text-sm text-muted-foreground">Real-time access, up to 4 days ahead</p>
          </div>

          <Button variant="gradient" size="default" asChild>
            <a
              href="https://app.openroadtms.com/available_trucks/KkqF6-_5iDsQDGfuPRikbg"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              View Trucks
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
