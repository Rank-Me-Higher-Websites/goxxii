import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Check, DollarSign, Fuel, Clock, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import truck1 from "@/assets/truck-1.png";
import truck2 from "@/assets/truck-2.png";

const benefits = [
  { icon: DollarSign, text: "90% Linehaul Pay", highlight: true },
  { icon: Fuel, text: "AI Fuel Savings" },
  { icon: Clock, text: "Weekly Settlements" },
  { icon: Headphones, text: "24/7 Live Support" },
];

const perks = [
  "Fortune 500 Freight",
  "No Forced Dispatch",
  "Safety Bonuses",
  "Referral Bonuses",
];

export const OwnerOperatorSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="section-padding bg-secondary relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="label-tag mb-3">Owner Operators</span>
            <h2 className="heading-section text-foreground mb-2">
              Keep More of What You Earn
            </h2>
            <p className="text-sm text-muted-foreground mb-5">
              Industry-leading 90% linehaul pay with premium freight from Fortune 500 shippers. Looking for <Link to="/company-drivers" className="text-muted-foreground hover:text-primary underline underline-offset-2">company driver positions</Link> instead? We have those too.
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + index * 0.08 }}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className={`glass-strong rounded-xl p-3 flex items-center gap-3 cursor-pointer transition-colors duration-300 ${benefit.highlight ? "border-primary/30 hover:border-primary/60 hover:bg-primary/5" : "hover:border-border hover:bg-muted/40"}`}
                >
                  <motion.div 
                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-300 ${benefit.highlight ? "bg-primary/20" : "bg-muted"}`}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    <benefit.icon className={`w-4 h-4 ${benefit.highlight ? "text-primary" : "text-muted-foreground"}`} />
                  </motion.div>
                  <span className={`text-sm font-medium ${benefit.highlight ? "text-foreground" : "text-muted-foreground"}`}>
                    {benefit.text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Perks list */}
            <div className="flex flex-wrap gap-2 mb-5">
              {perks.map((perk, index) => (
                <motion.span 
                  key={perk} 
                  whileHover={{ scale: 1.08, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-full cursor-pointer hover:bg-primary/10 hover:text-foreground transition-colors duration-200"
                >
                  <Check className="w-3 h-3 text-accent" />
                  {perk}
                </motion.span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button variant="hero" size="default" className="group" asChild>
                <a
                  href="https://intelliapp.driverapponline.com/c/goxxii?r=Eve"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  Apply Now
                </a>
              </Button>
              <Button variant="heroOutline" size="default" asChild>
                <Link to="/owner-operators">Learn More</Link>
              </Button>
            </div>
          </motion.div>

          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            <div className="grid grid-cols-5 gap-3">
              <div className="col-span-3 space-y-3">
                <div className="img-hover-lift rounded-xl border border-border overflow-hidden">
                  <img
                    src={truck1}
                    alt="Professional owner operator driver"
                    className="w-full h-36 sm:h-48 object-cover"
                  />
                </div>
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.4 }}
                  className="glass-strong rounded-xl p-3 text-center border border-primary/20"
                >
                  <div className="text-2xl sm:text-3xl font-display font-bold text-gradient">$200K+</div>
                  <div className="text-xs text-muted-foreground">Avg Annual Earnings</div>
                </motion.div>
              </div>
              <div className="col-span-2 space-y-3 pt-8">
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.3 }}
                  className="glass rounded-xl p-3 text-center"
                >
                  <div className="text-2xl sm:text-3xl font-display font-bold text-accent">15+</div>
                  <div className="text-xs text-muted-foreground">Years Strong</div>
                </motion.div>
                <div className="img-hover-lift rounded-xl border border-border overflow-hidden">
                  <img
                    src={truck2}
                    alt="XXII Century branded truck on highway"
                    className="w-full h-36 sm:h-48 object-cover"
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
