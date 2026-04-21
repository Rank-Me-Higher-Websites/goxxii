import { motion } from "framer-motion";
import { useState } from "react";

interface Customer {
  name: string;
  domain: string;
}

const customers: Customer[] = [
  { name: "Menards", domain: "menards.com" },
  { name: "American Pacific", domain: "cedarsafe.com" },
  { name: "MagickWoods", domain: "magickwoods.com" },
  { name: "Global Harvest Foods", domain: "globalharvestfoods.com" },
  { name: "Musser Lumber", domain: "musserlumber.com" },
  { name: "Rural Retreat Transport", domain: "ruralretreattransport.com" },
  { name: "ND Paper", domain: "ndpaper.com" },
  { name: "IMC Outdoor Living", domain: "imcoutdoorliving.com" },
  { name: "Dino's Logistics", domain: "dinoslogistics.com" },
  { name: "Arrive", domain: "arrivelogistics.com" },
  { name: "TTS, LLC", domain: "ttsllc.com" },
  { name: "FORSLA", domain: "forsla.com" },
  { name: "Universal Traffic Service", domain: "utsi.com" },
  { name: "Martins Milk Service", domain: "martinsmilkservice.com" },
  { name: "Sub-Zero", domain: "subzero-wolf.com" },
];

const logoUrl = (domain: string) =>
  `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

const Tile = ({ customer, index }: { customer: Customer; index: number }) => {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors duration-200 min-h-[56px]"
      data-testid={`tile-customer-${index}`}
    >
      {!failed && (
        <img
          src={logoUrl(customer.domain)}
          alt=""
          onError={() => setFailed(true)}
          className="w-7 h-7 rounded-md object-contain bg-white p-0.5 flex-shrink-0"
          loading="lazy"
        />
      )}
      <span
        className="font-display text-sm md:text-[15px] font-bold tracking-wide text-white/85 whitespace-nowrap"
        data-testid={`text-customer-${index}`}
      >
        {customer.name}
      </span>
    </div>
  );
};

export const TrustedByStripSection = () => {
  return (
    <section
      className="py-10 sm:py-14 bg-[#0a1628] border-y border-white/5 relative overflow-hidden"
      data-testid="section-trusted-by"
    >
      <div className="container-custom relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-white/50 mb-6 sm:mb-8"
          data-testid="text-trusted-by-eyebrow"
        >
          Trusted by Shippers &amp; Brokers Nationwide
        </motion.p>

        {/* Desktop / tablet: wrapping flex grid */}
        <div className="hidden sm:flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {customers.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
            >
              <Tile customer={c} index={i} />
            </motion.div>
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
          <div className="flex items-center gap-3 animate-[marquee_45s_linear_infinite] w-max">
            {[...customers, ...customers].map((c, i) => (
              <Tile key={`${c.name}-${i}`} customer={c} index={i} />
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
