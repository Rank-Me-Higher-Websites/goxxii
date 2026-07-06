import { useState } from "react";
import { motion } from "framer-motion";
import truckPhoto from "@/assets/xxii-truck-route66.webp";

interface Spot {
  id: number;
  label: string;
  x: number; // % from left
  y: number; // % from top
  edge?: "right"; // keep the label inside the image on narrow screens
}

const SPOTS: Spot[] = [
  { id: 1, label: "Collision Mitigation + Lane Departure Warning", x: 34.8, y: 65 },
  { id: 2, label: "Improved MPG", x: 41.5, y: 59 },
  { id: 3, label: "Advanced Telematics / Remote Diagnostics", x: 58.5, y: 36.5 },
  { id: 4, label: "Enhanced Driver Comfort Package", x: 62, y: 45 },
  { id: 5, label: "FlowBelow Wheel Covers + Aerodynamic Skirts", x: 75.5, y: 74.5, edge: "right" },
];

export const TruckFeaturesSection = () => {
  const [activeSpot, setActiveSpot] = useState<number | null>(null);

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
            Spec'd for <span className="text-primary">Safety &amp; Efficiency</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every truck in our fleet is equipped with modern safety, aero, and telematics packages. Explore the equipment on our Volvo VNLs.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden shadow-2xl"
        >
          <img
            src={truckPhoto}
            alt="XXII Century Volvo VNL truck equipped with collision mitigation, telematics, and FlowBelow aerodynamic packages"
            className="w-full h-auto block"
          />

          {SPOTS.map((spot) => {
            const isActive = activeSpot === spot.id;
            return (
              <div
                key={spot.id}
                className="absolute w-0 h-0"
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              >
                <button
                  type="button"
                  aria-label={spot.label}
                  onMouseEnter={() => setActiveSpot(spot.id)}
                  onMouseLeave={() => setActiveSpot(null)}
                  onFocus={() => setActiveSpot(spot.id)}
                  onBlur={() => setActiveSpot(null)}
                  onClick={() => setActiveSpot(isActive ? null : spot.id)}
                  className="relative -translate-x-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white shadow-[0_2px_10px_rgba(13,30,54,0.35)] flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-110"
                >
                  <span className="absolute inline-flex w-full h-full rounded-full bg-white/60 animate-ping" />
                  <span
                    className={`relative w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-colors ${
                      isActive ? "bg-primary" : "bg-[#2b3a8f]"
                    }`}
                  />
                </button>

                <div
                  className={`absolute top-5 sm:top-7 z-10 pointer-events-none ${
                    spot.edge === "right"
                      ? "right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2"
                      : "left-1/2 -translate-x-1/2"
                  }`}
                >
                  <div
                    className="w-max bg-white rounded-lg shadow-xl px-3 py-2 sm:px-4 sm:py-2.5 text-[11px] sm:text-sm font-bold text-[#0d1e36] text-center max-w-[60vw] sm:max-w-none sm:whitespace-nowrap transition-all duration-200"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: `translateY(${isActive ? 0 : -6}px)`,
                    }}
                  >
                    {spot.label}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        <p className="text-center text-muted-foreground text-sm mt-4 sm:hidden">
          Tap a dot to see the equipment.
        </p>
      </div>
    </section>
  );
};
