import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Gift, DollarSign, Headphones, Award, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { icon: Gift, value: "$1,000", label: "Referral Bonus" },
  { icon: DollarSign, value: "$100K", label: "Average Annual Income" },
  { icon: Headphones, value: "24/7", label: "Dispatch Support" },
  { icon: Award, value: "$500", label: "Safety Bonus" },
];

export const FleetSupportSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-medium uppercase tracking-wider text-sm">
            Get The Support You Need
          </span>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-4 uppercase">
            Drive Success with XXII Century: Team Support, Rewards, and Lasting Success
          </h2>

          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            16 years strong in trucking. XXII Century is all about reliability, safety, satisfaction, and transparency. With deep industry know-how, we tackle every challenge head-on, delivering the quality service you can count on.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="glass p-6 rounded-xl text-center"
            >
              <stat.icon className="w-10 h-10 text-primary mx-auto mb-3" />
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Phone CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <a
            href="tel:7735725012"
            className="inline-flex items-center gap-2 text-primary font-bold text-xl hover:underline"
          >
            <Phone className="w-6 h-6" />
            Reach Us Now: 773-572-5012
          </a>
        </motion.div>
      </div>
    </section>
  );
};
