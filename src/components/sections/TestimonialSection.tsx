import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Play, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export const TestimonialSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-background relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-1/3 h-1/2 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Video Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative aspect-video rounded-2xl overflow-hidden glass"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <button className="w-20 h-20 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform duration-300 glow-blue">
                <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
              </button>
            </div>
            <div className="absolute bottom-4 left-4 glass-strong rounded-lg px-4 py-2">
              <span className="text-sm font-semibold text-foreground">Watch Story</span>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-primary font-semibold uppercase tracking-wider text-sm mb-4 block">
              TRUE LIFE STORY!
            </span>
            <h2 className="heading-section text-foreground mb-4">
              Trucking Veteran
            </h2>
            <p className="body-large mb-8">
              After 27 years on the road, one experienced trucker shares how she finally found the company she calls her dream team.
            </p>

            <Button variant="accent" size="lg" asChild>
              <a href="tel:+12242406441" className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Contact Us
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
