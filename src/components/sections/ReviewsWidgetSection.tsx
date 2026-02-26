import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

export const ReviewsWidgetSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!widgetRef.current) return;
    const script = document.createElement("script");
    script.src = "https://cdn.trustindex.io/loader.js?e683cf1656ee8452a4467ec649c";
    script.defer = true;
    script.async = true;
    widgetRef.current.appendChild(script);

    return () => {
      script.remove();
    };
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
            className="w-full min-h-[300px] glass rounded-2xl p-8"
          />
        </motion.div>
      </div>
    </section>
  );
};
