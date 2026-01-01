import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import yourTrailer from "@/assets/your-trailer.png";
import ourTrailer from "@/assets/our-trailer.png";

export const TrailerOptionsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="section-padding bg-card">
      <div className="container-custom">
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Your Truck, Your Trailer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="group relative rounded-lg overflow-hidden border border-border bg-secondary"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={yourTrailer}
                alt="Your Truck, Your Trailer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
              <h3 className="font-display text-lg sm:text-xl font-bold text-foreground mb-2">
                Your Truck, Your Trailer
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                Reduce overhead with our freight network.
              </p>
              <Button variant="heroOutline" size="sm" asChild>
                <Link to="/contact">Join Team</Link>
              </Button>
            </div>
          </motion.div>

          {/* Your Truck, Our Trailer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="group relative rounded-lg overflow-hidden border border-border bg-secondary"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={ourTrailer}
                alt="Your Truck, Our Trailer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
              <h3 className="font-display text-lg sm:text-xl font-bold text-foreground mb-2">
                Your Truck, Our Trailer
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                No trailer purchase needed. Boost margins.
              </p>
              <Button variant="hero" size="sm" asChild>
                <Link to="/power-fleet">Power Fleet</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
