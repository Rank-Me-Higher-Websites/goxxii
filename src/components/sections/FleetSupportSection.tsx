import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Gift, DollarSign, Headphones, Award, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { icon: Gift, value: "$1,000", label: "Referral Bonus" },
  { icon: DollarSign, value: "$300K+", label: "Average Annual Income" },
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
            17 years strong in trucking. XXII Century is all about reliability, safety, satisfaction, and transparency. With deep industry know-how, we tackle every challenge head-on, delivering the quality service you can count on.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="glass p-4 md:p-6 rounded-xl text-center"
            >
              <stat.icon className="w-7 h-7 md:w-10 md:h-10 text-primary mx-auto mb-2 md:mb-3" />
              <div className="text-xl md:text-3xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide">
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
          <Button variant="heroOutline" size="lg" asChild>
            <a href="tel:+16309146037" className="inline-flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Reach Us Now: 630-914-6037
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
