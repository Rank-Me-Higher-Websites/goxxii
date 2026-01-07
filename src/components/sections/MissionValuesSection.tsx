import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Target, Heart, Lightbulb, Handshake } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Integrity & Transparency",
    description: "No hidden fees. We believe in honest, straightforward partnerships.",
  },
  {
    icon: Target,
    title: "Respect for the Grind",
    description: "We value your time, safety, and skills on the road.",
  },
  {
    icon: Lightbulb,
    title: "Forward Thinking",
    description: "Tech-driven solutions to cut deadhead and minimize downtime.",
  },
  {
    icon: Handshake,
    title: "Partnership",
    description: "You control your business; we provide the profitable support.",
  },
];

export const MissionValuesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="section-padding bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="label-tag mb-4 inline-flex">Driven by You</span>
            <h2 className="heading-section text-foreground mb-6">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              At XXII Century, our mission is to move America forward by
              empowering the people behind the wheel. We connect <Link to="/owner-operators" className="text-primary hover:underline">owner-operators</Link> and <Link to="/company-drivers" className="text-primary hover:underline">truck drivers</Link> with premium freight, cutting-edge tools and
              dedicated support to help them grow stronger, earn more and drive
              smarter every day.
            </p>
            
            <p className="text-muted-foreground leading-relaxed mt-4">
              Whether you're exploring <Link to="/careers" className="text-primary hover:underline">CDL driver jobs</Link> or looking to <Link to="/fleet-program" className="text-primary hover:underline">partner your fleet</Link>, our team is committed to building lasting relationships that benefit everyone involved.
            </p>
            
            <div className="mt-8 p-6 bg-primary/10 rounded-xl border border-primary/20">
              <p className="text-primary font-display font-semibold text-xl">
                "Powered to Drive for a Better Future"
              </p>
            </div>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="label-tag mb-4 inline-flex">What We Stand For</span>
            <h2 className="heading-section text-foreground mb-6">Our Values</h2>
            
            <div className="grid gap-4">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex gap-4 p-4 rounded-xl bg-secondary/50 border border-border/30 hover:border-primary/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground mb-1">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
