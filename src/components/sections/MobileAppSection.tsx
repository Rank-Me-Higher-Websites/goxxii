import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import mobileApp from "@/assets/mobile-app.png";
import { ChevronRight } from "lucide-react";

export const MobileAppSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-background relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="heading-section text-foreground mb-6">
              MOBILE APP FOR OUR DRIVERS
            </h2>
            <p className="body-large mb-8">
              Our mobile app is built for professional truck drivers — giving you full control over 24/7 dispatch communication, real-time load updates, digital paperwork, and seamless trip management. With features like accident reporting, road assistance, and secure document sharing, it simplifies every mile. Designed to improve efficiency, reduce downtime, and keep you connected wherever the road takes you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button variant="hero" size="lg" asChild>
                <a
                  href="https://intelliapp.driverapponline.com/c/goxxii?r=Eve"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ChevronRight className="w-5 h-5" />
                  Apply Now
                </a>
              </Button>
            </div>

            {/* App Store Buttons */}
            <div className="flex gap-4">
              <a
                href="#"
                className="glass rounded-xl px-5 py-3 hover:bg-muted/50 transition-colors flex items-center gap-3"
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs text-muted-foreground">Download on the</div>
                  <div className="font-semibold">App Store</div>
                </div>
              </a>
              <a
                href="#"
                className="glass rounded-xl px-5 py-3 hover:bg-muted/50 transition-colors flex items-center gap-3"
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs text-muted-foreground">Get it on</div>
                  <div className="font-semibold">Google Play</div>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-sm">
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <img
                  src={mobileApp}
                  alt="XXII Century Mobile App"
                  className="w-full h-auto drop-shadow-2xl"
                />
              </motion.div>
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-3xl -z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
