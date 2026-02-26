import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle } from "lucide-react";

const requirements = [
  "Motor Carrier Authority",
  "DOT Number",
  "Auto Liability Insurance",
  "Cargo Liability Insurance",
  "Non-Owned Trailer Interchange Insurance",
];

export const FleetRequirementsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 bg-muted/30">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-10"
          >
            <span className="text-primary font-medium uppercase tracking-wider text-sm">
              What's Needed?
            </span>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6 uppercase">
              Program Requirements
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed">
              We set high standards and in turn, we expect you to pass through our strict quality assurance mandate in order to join our Power Only Trucking program. Here's what you'll need:
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {requirements.map((req, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-3 glass p-4 rounded-xl w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.75rem)]"
              >
                <CheckCircle className="w-6 h-6 text-primary shrink-0" />
                <span className="text-foreground font-medium">{req}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
