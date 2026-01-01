import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export const LiveTruckSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-card relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent mb-6">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-semibold">Real-Time Tracking</span>
          </div>

          <h2 className="heading-section text-foreground mb-6">
            LIVE TRUCK AVAILABILITY
          </h2>

          <p className="body-large mb-10">
            Get accurate, real-time access to available trucks and planned routes — up to 4 days in advance.
          </p>

          <Button variant="gradient" size="xl" asChild>
            <a
              href="https://app.openroadtms.com/available_trucks/KkqF6-_5iDsQDGfuPRikbg"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              See Available Trucks
              <ExternalLink className="w-5 h-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
