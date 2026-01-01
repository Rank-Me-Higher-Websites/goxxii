import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-background relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="heading-section text-foreground mb-8">
              XXII Century - Built Around Truck Drivers, Backed by Trust
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 text-lg text-muted-foreground leading-relaxed mb-10"
          >
            <p>
              With over 15 years in the industry, XXII Century understands what matters most to drivers — <strong className="text-foreground">steady freight, real support, and respect on the road</strong>. Based in Chicago, we work closely with both <strong className="text-foreground">CDL company drivers and owner-operators</strong>, offering flexible opportunities that match your goals and lifestyle.
            </p>
            <p>
              For <strong className="text-foreground">owner-operators</strong>, we provide a reliable freight network, fast settlements, and the freedom to run your business with confidence — <strong className="text-foreground">without the headaches</strong>. Company drivers benefit from dedicated support, competitive pay, and consistent miles.
            </p>
            <p>
              Whether you&apos;re running local, regional, or long-haul routes, our team is here 24/7 to keep you moving. At XXII Century, you can expect <strong className="text-foreground">clear communication, fair treatment, and a team that truly works with you — not just for you</strong>.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/about">Explore More</Link>
            </Button>
            <Button variant="accent" size="lg" asChild>
              <a href="tel:+12242406441" className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
