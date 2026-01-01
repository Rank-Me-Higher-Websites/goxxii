import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import yourTrailer from "@/assets/your-trailer.png";
import ourTrailer from "@/assets/our-trailer.png";

export const TrailerOptionsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-card relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Your Truck, Your Trailer */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="glass rounded-2xl overflow-hidden group"
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={yourTrailer}
                alt="Your Truck, Your Trailer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
            </div>
            <div className="p-8">
              <h3 className="font-display text-3xl font-bold text-foreground mb-4">
                YOUR TRUCK, YOUR TRAILER
              </h3>
              <p className="text-muted-foreground mb-6">
                Reduce your overhead spending when you book loads through our vast freight network. Get pre-qualified today!
              </p>
              <Button variant="heroOutline" asChild>
                <Link to="/contact">Join our team</Link>
              </Button>
            </div>
          </motion.div>

          {/* Your Truck, Our Trailer */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass rounded-2xl overflow-hidden group"
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={ourTrailer}
                alt="Your Truck, Our Trailer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
            </div>
            <div className="p-8">
              <h3 className="font-display text-3xl font-bold text-foreground mb-4">
                YOUR TRUCK, OUR TRAILER
              </h3>
              <p className="text-muted-foreground mb-6">
                You don&apos;t have to purchase your own trailer, you can use ours! Increase your profit margin with fewer equipment purchases.
              </p>
              <Button variant="hero" asChild>
                <Link to="/power-fleet">Explore Power Fleet</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
