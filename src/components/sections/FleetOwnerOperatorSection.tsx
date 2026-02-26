import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Fuel, Clock, Network, Gift, DollarSign, Award, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import car1 from "@/assets/gallery/car-1.png";
import car2 from "@/assets/gallery/car-2.png";
import car3 from "@/assets/gallery/car-3.png";

const benefits = [
  { icon: Truck, text: "Access to Premium Freight" },
  { icon: Network, text: "Dedicated Shippers Network" },
  { icon: Fuel, text: "AI-Powered Fuel Management" },
  { icon: Clock, text: "AI-Powered Delay and Layout Tool" },
  { icon: DollarSign, text: "Large Fleet Volume Fuel Discount" },
  { icon: Shield, text: "Large Trailer Network System" },
  { icon: Award, text: "Safety & Inspection Bonuses" },
  { icon: Gift, text: "Unlimited Referral Bonus" },
];

const galleryImages = [car1, car2, car3];

export const FleetOwnerOperatorSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 bg-background relative overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-medium uppercase tracking-wider text-sm">
              Owner Operator Opportunities
            </span>
            
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-4">
              Built for Owner Operators Ready to Succeed
            </h2>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              XXII Century's <Link to="/owner-operators" className="text-primary hover:underline">owner operator program</Link> delivers what independent truckers need most: consistent high-paying loads, transparent settlements, and zero hidden fees. Our Fortune 500 freight network ensures you're never scrambling for loads on broker boards. Whether you prefer dedicated regional runs or flexible OTR schedules, we match opportunities to your goals.
            </p>

            <ul className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <benefit.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground/90">{benefit.text}</span>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
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

          {/* Right Gallery */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-3 gap-3"
          >
            {galleryImages.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`rounded-xl overflow-hidden ${
                  index === 0 ? "col-span-2 row-span-2" : ""
                }`}
              >
                <img
                  src={img}
                  alt={`XXII Century Driver ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
