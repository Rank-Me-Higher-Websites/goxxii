import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export const FleetPowerOnlySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <span className="text-primary font-medium uppercase tracking-wider text-sm">
            Power Only Program
          </span>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Reliable Power Only Freight for Experienced Owner Operators
          </h2>

          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            XXII Century proudly offers a Power Only Trucking program designed for experienced and professional owner operators. We partner with major corporations and government agencies across the U.S. and Canada, providing access to consistent freight. Our power-only services include a wide range of trailer types — flatbeds, dry vans and reefers — ensuring flexibility and steady work for qualified drivers.
          </p>

          <Button variant="heroOutline" size="lg" asChild>
            <a href="tel:+16309480501" className="inline-flex items-center gap-2">
              <Phone className="w-5 h-5" />
              630-948-0501
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
