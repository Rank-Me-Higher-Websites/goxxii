import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import companyDriver from "@/assets/company-driver.jpg";

const benefits = [
  "63 CPM competitive pay",
  "AI-powered detention tracking",
  "Safety & inspection bonuses",
  "Transparent communication",
];

export const CompanyDriverSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="section-padding bg-secondary relative overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="relative order-2 lg:order-1"
          >
            <div className="rounded-lg overflow-hidden border border-border">
              <img
                src={companyDriver}
                alt="Company driver"
                className="w-full h-64 sm:h-80 lg:h-96 object-cover"
              />
            </div>
            {/* Pay badge - positioned differently */}
            <div className="absolute bottom-3 left-3 glass-strong rounded-lg px-4 py-2">
              <div className="text-xl font-display font-bold text-gradient">63¢/mi</div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <span className="label-tag mb-4">Company Drivers</span>
            <h2 className="heading-section text-foreground mb-4 accent-line pb-6">
              More Miles. Better Pay.
            </h2>

            <div className="space-y-2 mb-6">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button variant="hero" size="default" asChild>
                <a
                  href="https://intelliapp.driverapponline.com/c/goxxii?r=Eve"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ChevronRight className="w-4 h-4" />
                  Apply
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
