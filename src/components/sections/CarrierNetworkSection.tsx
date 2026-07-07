import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, ShieldCheck, Handshake, ChevronRight, Truck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import driverPolo from "@/assets/company-driver.jpg";
import driverPointing from "@/assets/driver-volvo-selfie.png";
import driverSelfie from "@/assets/driver-selfie-truck.jpg";
import flatbedLoad from "@/assets/oo-truck-cat.jpg";

interface CarrierNetworkSectionProps {
  onGetQuote?: () => void;
}

const photos = [
  { src: driverPolo, alt: "XXII Century company driver beside a white Volvo VNL" },
  { src: driverPointing, alt: "XXII Century owner operator with his Volvo tractor" },
  { src: driverSelfie, alt: "XXII Century driver in a safety vest on the road" },
  { src: flatbedLoad, alt: "XXII Century truck hauling a flatbed load of equipment" },
];

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
  const [lightbox, setLightbox] = useState<number | null>(null);

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
            Elite Drivers, <span className="text-primary">Proven Network</span>
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
            {photos.map((photo, i) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => setLightbox(i)}
                className="group relative block overflow-hidden rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label={`Open photo: ${photo.alt}`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-40 sm:h-52 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </button>
            ))}
          </motion.div>

          {/* Copy + highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
              <p>
                Behind every load is a team that's been doing this for real — not a call center reading scripts. Our in-house drivers bring years on the road and know what it takes to move freight safely and on time, every time. And when volume calls for more capacity, we tap a vetted network of owner-operators we've worked with for years — not random dispatch-board pickups. Same standards, same accountability, no exceptions.
              </p>
              <p className="text-foreground font-medium">
                That's the difference between a carrier who books your freight and one who owns getting it there.
              </p>
            </div>

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

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/90 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-muted/60 border border-border/50 flex items-center justify-center text-foreground hover:bg-muted transition-colors"
              aria-label="Close photo"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.img
              key={lightbox}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              src={photos[lightbox].src}
              alt={photos[lightbox].alt}
              onClick={(e) => e.stopPropagation()}
              className="max-w-full max-h-[85vh] w-auto h-auto rounded-2xl shadow-2xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
