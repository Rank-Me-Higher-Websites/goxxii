import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu, Clock, Globe, Percent, Gift } from "lucide-react";

const techBenefits = [
  { icon: Cpu, title: "AI Fuel Manager" },
  { icon: Clock, title: "Detention Tool" },
  { icon: Globe, title: "Shipper Network" },
  { icon: Percent, title: "Fuel Discounts" },
  { icon: Gift, title: "Extra Perks" },
];

export const TechBenefitsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-10 sm:py-14 bg-card border-y border-border relative">
      {/* Accent line top */}
      <div className="absolute top-0 left-0 w-20 h-1 bg-primary" />
      
      <div className="container-custom">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-8"
        >
          Built-In Tech & Benefits
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {techBenefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.05 * index }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-secondary border border-border hover:border-primary/30 transition-colors"
            >
              <benefit.icon className="w-4 h-4 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-foreground">{benefit.title}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
