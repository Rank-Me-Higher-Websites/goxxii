import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import truck1 from "@/assets/truck-1.png";
import truck2 from "@/assets/truck-2.png";

const benefits = [
  "Premium Freight Access",
  "AI Fuel Management",
  "Fast Settlements",
  "Dedicated Support 24/7",
  "Safety & Inspection Bonuses",
  "Unlimited Referral Bonus",
];

export const OwnerOperatorSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="section-padding bg-secondary relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="label-tag mb-4">Owner Operators</span>
            <h2 className="heading-section text-foreground mb-4 accent-line pb-6">
              Built for Success
            </h2>

            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Check className="w-4 h-4 text-accent flex-shrink-0" />
                  <span>{benefit}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
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
                <Link to="/owner-operators">Learn More</Link>
              </Button>
            </div>
          </motion.div>

          {/* Images - More compact on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-5 gap-3">
              <div className="col-span-3 space-y-3">
                <div className="img-hover-lift rounded-lg border border-border">
                  <img
                    src={truck1}
                    alt="Truck driver"
                    className="w-full h-40 sm:h-52 object-cover"
                  />
                </div>
                <div className="glass rounded-lg p-4 text-center card-stack">
                  <div className="text-2xl sm:text-3xl font-display font-bold text-gradient">15+</div>
                  <div className="text-xs text-muted-foreground">Years Experience</div>
                </div>
              </div>
              <div className="col-span-2 space-y-3 pt-6">
                <div className="glass rounded-lg p-4 text-center">
                  <div className="text-2xl sm:text-3xl font-display font-bold text-accent">500+</div>
                  <div className="text-xs text-muted-foreground">Drivers</div>
                </div>
                <div className="img-hover-lift rounded-lg border border-border">
                  <img
                    src={truck2}
                    alt="XXII Century truck"
                    className="w-full h-40 sm:h-52 object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
