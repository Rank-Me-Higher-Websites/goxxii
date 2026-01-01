import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Play, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export const TestimonialSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="section-padding bg-background relative">
      <div className="container-custom">
        <div className="grid lg:grid-cols-5 gap-6 lg:gap-10 items-center">
          {/* Video - 3 cols */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="lg:col-span-3 relative aspect-video rounded-lg overflow-hidden border border-border bg-secondary"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary flex items-center justify-center hover:scale-105 transition-transform">
                <Play className="w-6 h-6 text-primary-foreground ml-0.5" fill="currentColor" />
              </button>
            </div>
            <div className="absolute bottom-3 left-3 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
              27 years on the road
            </div>
          </motion.div>

          {/* Content - 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <span className="label-tag mb-3">Driver Story</span>
            <h2 className="heading-card text-foreground mb-3">
              "Finally found my dream team"
            </h2>
            <p className="text-sm text-muted-foreground mb-5">
              After 27 years trucking, she found the company that treats drivers right.
            </p>

            <Button variant="accent" size="default" asChild>
              <a href="tel:+12242406441" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Talk to Us
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
