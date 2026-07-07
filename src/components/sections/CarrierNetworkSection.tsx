import { motion } from "framer-motion";
import { Users, ShieldCheck, Handshake, ChevronRight, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import driverPolo from "@/assets/company-driver.jpg";
import driverPointing from "@/assets/driver-volvo-selfie.png";
import driverSelfie from "@/assets/driver-selfie-truck.jpg";
import flatbedLoad from "@/assets/oo-truck-cat.jpg";

interface CarrierNetworkSectionProps {
  onGetQuote?: () => void;
}

const highlights = [
  {
    icon: Users,
    title: "Company Drivers + Owner Operators",
    description: "A blended fleet of experienced CDL-A company drivers and vetted owner-operator partners moving your freight.",
  },
  {
    icon: ShieldCheck,
    title: "Vetted & Safety-Trained",
    description: "Every driver is screened, safety-scored, and held to Samsara-verified standards on every load.",
  },
  {
    icon: Handshake,
    title: "Long-Term Partners",
    description: "Drivers who stay - low turnover means the same trusted professionals handle your dedicated lanes.",
  },
];

export const CarrierNetworkSection = ({ onGetQuote }: CarrierNetworkSectionProps) => {
  return (
    <section className="py-14 sm:py-20 bg-muted/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-primary">Carrier Network</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            An experienced driver team backed by a trusted owner-operator network - the people who keep your freight moving safely, on time, every time.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Photo mosaic */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-3 sm:gap-4"
          >
            <img
              src={driverPolo}
              alt="XXII Century company driver beside a white Volvo VNL"
              className="rounded-2xl w-full h-40 sm:h-52 object-cover shadow-lg"
              loading="lazy"
            />
            <img
              src={driverPointing}
              alt="XXII Century owner operator with his Volvo tractor"
              className="rounded-2xl w-full h-40 sm:h-52 object-cover shadow-lg"
              loading="lazy"
            />
            <img
              src={driverSelfie}
              alt="XXII Century driver in a safety vest on the road"
              className="rounded-2xl w-full h-40 sm:h-52 object-cover shadow-lg"
              loading="lazy"
            />
            <img
              src={flatbedLoad}
              alt="XXII Century truck hauling a flatbed load of equipment"
              className="rounded-2xl w-full h-40 sm:h-52 object-cover shadow-lg"
              loading="lazy"
            />
          </motion.div>

          {/* Copy + highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-muted-foreground leading-relaxed mb-8">
              Behind every XXII Century load is a professional you can count on. Our Chicago-based team pairs seasoned company drivers with a hand-picked network of owner-operators - all vetted, safety-trained, and committed to drop & hook freight that keeps your docks clear and your shipments on schedule.
            </p>

            <div className="space-y-5">
              {highlights.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              {onGetQuote && (
                <Button variant="hero" size="lg" onClick={onGetQuote} className="flex items-center gap-2">
                  <ChevronRight className="w-5 h-5" />
                  Get Your Quote
                </Button>
              )}
              <Button variant="heroOutline" size="lg" asChild>
                <a href="/contact" className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Ship With Us
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
