import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu, Clock, Globe, Percent, Gift } from "lucide-react";

const techBenefits = [
  { icon: Cpu, title: "AI Fuel Manager", desc: "AI tracks fuel prices and routing to keep your biggest cost down." },
  { icon: Clock, title: "Detention Tool", desc: "Automatic detention tracking so your waiting time gets billed." },
  { icon: Globe, title: "Shipper Network", desc: "Direct access to vetted Fortune 500 shipper freight." },
  { icon: Percent, title: "Fuel Discounts", desc: "Discounted diesel at major truck stops nationwide." },
  { icon: Gift, title: "Extra Perks", desc: "Safety, referral, and loyalty bonuses on top of your pay." },
];

export const TechBenefitsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-16 sm:py-20 bg-card border-y border-border relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.08)_0%,_transparent_60%)] pointer-events-none" />
      <div className="absolute -top-24 left-1/3 w-72 h-72 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-24 h-1 bg-gradient-to-r from-primary to-transparent" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12"
        >
          <span className="label-tag mb-4 inline-flex">Powered by Technology</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground">
            Built-In <span className="text-gradient">Tech &amp; Benefits</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4 text-sm sm:text-base">
            Everything you need to run leaner and earn more — engineered right into the XXII Century platform.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {techBenefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.05 * index }}
              className="group relative rounded-2xl bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/10 p-5 overflow-hidden hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
            >
              {/* hover accent line */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* hover glow */}
              <div className="absolute -top-12 -right-12 w-28 h-28 bg-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary/25 to-accent/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-primary/40 transition-all duration-300">
                <benefit.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="relative font-bold text-sm text-foreground mb-1.5">{benefit.title}</h3>
              <p className="relative text-xs text-muted-foreground leading-relaxed">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
