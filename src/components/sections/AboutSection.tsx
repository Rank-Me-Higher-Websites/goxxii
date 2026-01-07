import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="section-padding bg-background relative">
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-6"
          >
            <span className="label-tag mx-auto mb-4 inline-flex">About Us</span>
            <h2 className="heading-section text-foreground">
              Built Around Drivers
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed mb-8"
          >
            <p>
              15+ years in the industry. Chicago-based. We get what matters — <strong className="text-foreground">steady freight, real support, respect on the road</strong>.
            </p>
            <p>
              For <Link to="/owner-operators" className="text-primary hover:underline">owner-operators</Link>: reliable freight, fast settlements, freedom to run your business. For <Link to="/company-drivers" className="text-primary hover:underline">company drivers</Link>: dedicated support, competitive pay, consistent miles.
            </p>
            <p>
              24/7 team support. <strong className="text-foreground">Clear communication. Fair treatment. We work with you — not just for you.</strong> Ready to explore <Link to="/careers" className="text-primary hover:underline">trucking careers</Link> with a carrier that values drivers?
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            <Button variant="heroOutline" size="default" asChild>
              <Link to="/about">Learn More</Link>
            </Button>
            <Button variant="accent" size="default" asChild>
              <a href="tel:+12242406441" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
