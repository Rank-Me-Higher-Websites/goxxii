import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export const TechPoweredSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-secondary relative overflow-hidden">
      {/* Background gradient animation */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="heading-section text-foreground mb-6">
            Precision Powered by Technology & People
          </h2>
          <p className="body-large mb-10">
            XXII Century utilizes highly advanced shipping methods and cutting-edge technology in our operations and business processes. In addition, we invest in our human resources. We hire only the best candidates. We have a record-breaking success rate and many repeat happy customers!
          </p>
          <a
            href="tel:+16309146037"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm bg-[hsl(142,60%,42%)] text-white shadow-[0_0_16px_hsl(142,60%,42%,0.35)] hover:shadow-[0_0_24px_hsl(142,60%,42%,0.5)] hover:bg-[hsl(142,60%,48%)] transition-all duration-300"
          >
            <Phone className="w-5 h-5" />
            Call Today
          </a>
        </motion.div>
      </div>
    </section>
  );
};
