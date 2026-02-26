import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

export const ReviewsWidgetSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // TrustIndex widget script can be added here
    // Example: paste your TrustIndex embed script and it will render inside the widget container
  }, []);

  return (
    <section ref={ref} className="section-padding bg-background relative">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="label-tag mb-3">What Our Drivers Say</span>
          <h2 className="heading-section text-foreground">
            Trusted by Drivers Nationwide
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full"
        >
          {/* TrustIndex Widget Container */}
          <div
            ref={widgetRef}
            id="trustindex-widget"
            className="w-full min-h-[300px] flex items-center justify-center glass rounded-2xl p-8"
          >
            <p className="text-muted-foreground text-sm">
              Reviews widget will load here — paste your TrustIndex embed code to activate.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
