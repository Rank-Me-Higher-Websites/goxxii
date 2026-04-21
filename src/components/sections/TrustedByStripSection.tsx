import { motion } from "framer-motion";
import americanPacific from "@assets/customers/american-pacific.png";
import magickWoods from "@assets/customers/magickwoods.png";
import globalHarvest from "@assets/customers/global-harvest.png";
import musser from "@assets/customers/musser.png";
import ndPaper from "@assets/customers/nd-paper.png";
import imcOutdoor from "@assets/customers/imc-outdoor.png";
import dinos from "@assets/customers/dinos-logistics.png";
import arrive from "@assets/customers/arrive-logistics.png";
import forsla from "@assets/customers/forsla.png";
import martins from "@assets/customers/martins-milk.png";

interface Logo {
  name: string;
  src: string;
}

const logos: Logo[] = [
  { name: "American Pacific", src: americanPacific },
  { name: "MagickWoods", src: magickWoods },
  { name: "Global Harvest Foods", src: globalHarvest },
  { name: "Musser Biomass and Wood Products", src: musser },
  { name: "ND Paper", src: ndPaper },
  { name: "IMC Outdoor Living", src: imcOutdoor },
  { name: "Dino's Logistics", src: dinos },
  { name: "Arrive Logistics", src: arrive },
  { name: "FORSLA", src: forsla },
  { name: "Martin's Milk Service", src: martins },
];

export const TrustedByStripSection = () => {
  return (
    <section
      className="py-12 sm:py-16 bg-[#0a1628] border-y border-white/5 relative overflow-hidden"
      data-testid="section-trusted-by"
    >
      <div className="container-custom relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-white/50 mb-8 sm:mb-12"
          data-testid="text-trusted-by-eyebrow"
        >
          Trusted by Shippers &amp; Brokers Nationwide
        </motion.p>

        {/* Desktop / tablet: wrapping centered grid */}
        <div className="hidden sm:flex flex-wrap items-center justify-center gap-x-12 gap-y-10 md:gap-x-16 md:gap-y-12">
          {logos.map((logo, i) => (
            <motion.img
              key={logo.name}
              src={logo.src}
              alt={logo.name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="h-12 md:h-14 w-auto max-w-[200px] object-contain"
              loading="lazy"
              data-testid={`img-logo-${i}`}
            />
          ))}
        </div>

        {/* Mobile: continuous marquee */}
        <div
          className="sm:hidden relative overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <div className="flex items-center gap-12 animate-[marquee_45s_linear_infinite] w-max">
            {[...logos, ...logos].map((logo, i) => (
              <img
                key={`${logo.name}-${i}`}
                src={logo.src}
                alt={logo.name}
                className="h-10 w-auto max-w-[160px] object-contain flex-shrink-0"
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};
