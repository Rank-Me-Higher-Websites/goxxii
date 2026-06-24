import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import companyDriver from "@/assets/company-driver.jpg";

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="section-padding bg-background relative">
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* LEFT: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-left"
          >
            <span className="label-tag mb-4 inline-flex">About Us</span>
            <h2 className="heading-section text-foreground mb-6">
              Built Around Drivers
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              <p>
                17+ years in the industry. Chicago-based. We get what matters -{" "}
                <strong className="text-foreground">
                  steady freight, real support, respect on the road
                </strong>
                .
              </p>
              <p>
                For{" "}
                <Link to="/owner-operators" className="text-primary hover:underline">
                  owner-operators
                </Link>
                : reliable freight, fast settlements, freedom to run your business.
                For{" "}
                <Link to="/company-drivers" className="text-primary hover:underline">
                  company drivers
                </Link>
                : dedicated support, competitive pay, consistent miles.
              </p>
              <p>
                24/7 team support.{" "}
                <strong className="text-foreground">
                  Clear communication. Fair treatment. We work with you - not
                  just for you.
                </strong>{" "}
                Ready to explore{" "}
                <Link to="/careers" className="text-primary hover:underline">
                  trucking careers
                </Link>{" "}
                with a carrier that values drivers?
              </p>
            </div>
          </motion.div>

          {/* RIGHT: Driver photo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <img
              src={companyDriver}
              alt="XXII Century company driver beside a branded truck"
              className="rounded-2xl w-full shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
