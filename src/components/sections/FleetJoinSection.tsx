import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import truckChicago from "@/assets/gallery/car-5.png";

export const FleetJoinSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 bg-muted/30">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:flex-1"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center lg:text-left">
              Join Our Power Fleet and Grow Your Owner Operator Trucking Career
            </h2>

            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed text-center lg:text-left">
              <p>
                At XXII Century, we empower <Link to="/owner-operators" className="text-primary hover:underline">owner operators</Link> with the tools, freight, and flexibility to build a thriving trucking business. Whether you prefer local routes or long-haul runs across the U.S. and Canada, our Power Fleet program offers competitive pay, flexible scheduling, and the freedom to drive on your terms.
              </p>

              <p>
                From dry vans and reefers to tankers, we connect you with diverse freight options that keep your wheels turning. Our <Link to="/owner-operators" className="text-primary hover:underline">dry van owner operator jobs</Link> are among the most in-demand, with dedicated lanes and consistent miles. Plus, our 24/7 dispatch support team is always ready to assist — day or night.
              </p>

              <p>
                Join the XXII Century Power Fleet today and experience the benefits of a logistics partner dedicated to your growth, independence, and long-term success in the owner operator trucking industry.
              </p>
            </div>

            <div className="flex justify-center lg:justify-start mt-10">
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
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block lg:w-[45%] flex-shrink-0"
          >
            <img
              src={truckChicago}
              alt="XXII Century truck in downtown Chicago"
              className="rounded-2xl object-cover w-full h-[420px] border border-border"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
