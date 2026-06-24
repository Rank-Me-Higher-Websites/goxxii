import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home, Wrench, Award, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import companyTruck from "@/assets/company-truck.png";

const features = [
  { icon: Award, title: "Outstanding", subtitle: "PAY-SCALE" },
  { icon: Home, title: "Better", subtitle: "Home Time" },
  { icon: Wrench, title: "New & Modern", subtitle: "Equipment" },
  { icon: MapPin, title: "Great Place", subtitle: "To Work" },
];

export const FleetCompanyDriverSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 bg-muted/30 relative overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden">
              <img
                src={companyTruck}
                alt="Company truck"
                className="w-full h-auto"
              />
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <span className="text-primary font-medium uppercase tracking-wider text-sm">
              Company Driver Opportunities
            </span>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-4">
              Drive with Confidence, Earn with Pride
            </h2>

            <p className="text-muted-foreground mb-4 leading-relaxed">
              Our <Link to="/company-drivers" className="text-primary hover:underline">company driver positions</Link> offer the stability and benefits you deserve without the hassles of truck ownership. Starting at 68 + 2 CPM with automatic raises every 75,000 miles, plus performance bonuses that reward your dedication on every run.
            </p>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              XXII Century invests in late-model equipment and comprehensive training to set you up for success. From health insurance to 401k matching, our <Link to="/careers" className="text-primary hover:underline">trucking careers</Link> come with the full benefits package professional drivers expect.
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="glass p-4 rounded-xl text-center"
                >
                  <feature.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="font-semibold">{feature.title}</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wide">
                    {feature.subtitle}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Button variant="hero" size="lg" asChild>
                <a
                  href="https://intelliapp.driverapponline.com/c/goxxii?r=bodan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ChevronRight className="w-5 h-5" />
                  Apply To Drive
                </a>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <Link to="/company-drivers">Learn More</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
