import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Check, DollarSign, Shield, TrendingUp, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import companyDriver from "@/assets/company-driver.jpg";

const benefits = [
  { icon: DollarSign, text: "63 CPM + Bonuses" },
  { icon: TrendingUp, text: "Consistent Miles" },
  { icon: Shield, text: "Full Benefits" },
  { icon: MessageSquare, text: "AI Detention Pay" },
];

export const CompanyDriverSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="company-drivers" ref={ref} className="section-padding bg-secondary relative overflow-hidden scroll-mt-20">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-accent/5 to-transparent pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="img-hover-glow rounded-xl border border-border overflow-hidden">
              <img
                src={companyDriver}
                alt="Professional company driver in modern truck cab"
                className="w-full h-56 sm:h-72 lg:h-80 object-cover"
              />
            </div>
            {/* Floating pay badge */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.4, type: "spring" }}
              className="absolute -bottom-3 -right-3 sm:bottom-4 sm:right-4 glass-strong rounded-xl px-4 py-3 border border-primary/30"
            >
              <div className="text-xl sm:text-2xl font-display font-bold text-gradient">63¢/mi</div>
              <div className="text-xs text-muted-foreground">Starting Pay</div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="order-1 lg:order-2 text-center lg:text-left"
          >
            <span className="label-tag mb-3">Company Drivers</span>
            <h2 className="heading-section text-foreground mb-2">
              Steady Pay, Zero Hassle
            </h2>
            <p className="text-sm text-muted-foreground mb-5">
              Get consistent miles, competitive CPM, and full benefits without the overhead of ownership. Own your own truck? Explore our <Link to="/owner-operators" className="text-muted-foreground hover:text-primary underline underline-offset-2">owner operator program</Link>.
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.15 + index * 0.08 }}
                  whileHover={{ backgroundColor: "hsl(142 70% 45% / 0.08)" }}
                  className="glass-strong rounded-xl p-3 flex items-center gap-3 cursor-pointer border-emerald-500/30 hover:border-emerald-500/60 transition-colors duration-300"
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-emerald-500/20">
                    <benefit.icon className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {benefit.text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Additional perks */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-5">
              {["Health Insurance", "401k Match", "Paid Time Off", "Home Weekly"].map((perk) => (
                <span key={perk} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-full">
                  <Check className="w-3 h-3 text-primary" />
                  {perk}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
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
                <Link to="/company-drivers">Details</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
