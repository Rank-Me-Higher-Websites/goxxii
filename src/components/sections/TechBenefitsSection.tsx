import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu, Clock, Globe, Percent, Gift } from "lucide-react";

const techBenefits = [
  {
    icon: Cpu,
    title: "AI-Powered Fuel Manager",
    description: "Optimize your fuel costs with intelligent route planning",
  },
  {
    icon: Clock,
    title: "AI Detention & Layover Tool",
    description: "Never miss a detention charge again",
  },
  {
    icon: Globe,
    title: "Dedicated Shippers Network",
    description: "Access premium freight from trusted partners",
  },
  {
    icon: Percent,
    title: "Exclusive Fuel Discounts",
    description: "Save big with our fleet volume discounts",
  },
  {
    icon: Gift,
    title: "Additional Extra Perks",
    description: "Bonuses, incentives, and more rewards",
  },
];

export const TechBenefitsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-card relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="heading-section text-foreground">
            Built-In Tech & Benefits for Smarter Driving
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {techBenefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="glass rounded-2xl p-6 text-center hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <benefit.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground text-sm leading-tight">
                {benefit.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
