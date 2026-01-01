import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import truck1 from "@/assets/truck-1.png";
import truck2 from "@/assets/truck-2.png";

const benefits = [
  "Access to Premium Freight",
  "Dedicated Shippers Network",
  "AI-Powered Fuel Management",
  "AI-Powered Delay and Layout Tool",
  "Large Fleet Volume Fuel Discount",
  "Large Trailer Network System",
  "Safety & Inspection Bonuses",
  "Unlimited Referral Bonus",
];

export const OwnerOperatorSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-secondary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary to-transparent" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-semibold uppercase tracking-wider text-sm mb-4 block">
              Owner Operator Opportunities
            </span>
            <h2 className="heading-section text-foreground mb-6">
              Built for Owner Operators Ready to Succeed
            </h2>

            <ul className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-muted-foreground">{benefit}</span>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" asChild>
                <a
                  href="https://intelliapp.driverapponline.com/c/goxxii?r=Eve"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ChevronRight className="w-5 h-5" />
                  Apply To Drive
                </a>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <Link to="/owner-operators">Learn More</Link>
              </Button>
            </div>
          </motion.div>

          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="glass rounded-2xl overflow-hidden">
                  <img
                    src={truck1}
                    alt="Truck driver selfie"
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="glass rounded-2xl p-6 text-center">
                  <div className="text-4xl font-display font-bold text-gradient mb-2">15+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="glass rounded-2xl p-6 text-center">
                  <div className="text-4xl font-display font-bold text-gradient-accent mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">Happy Drivers</div>
                </div>
                <div className="glass rounded-2xl overflow-hidden">
                  <img
                    src={truck2}
                    alt="XXII Century truck"
                    className="w-full h-64 object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 glass-strong rounded-xl px-4 py-3"
            >
              <div className="text-sm font-semibold text-accent">Top Pay Guaranteed</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
