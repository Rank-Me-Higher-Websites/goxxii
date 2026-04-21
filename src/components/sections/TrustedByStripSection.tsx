import { motion } from "framer-motion";

const customers = [
  "Menards",
  "American Pacific",
  "MagickWoods",
  "Global Harvest Foods",
  "Musser Lumber",
  "Rural Retreat Transport",
  "ND Paper",
  "IMC Outdoor Living",
  "Dino's Logistics",
  "Arrive",
  "TTS, LLC",
  "FORSLA",
  "Universal Traffic Service",
  "Martins Milk Service",
  "Sub-Zero",
];

export const TrustedByStripSection = () => {
  return (
    <section
      className="py-10 sm:py-12 bg-[#0a1628] border-y border-white/5 relative overflow-hidden"
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
        <div className="hidden sm:flex flex-wrap items-center justify-center gap-x-10 gap-y-5 md:gap-x-14 md:gap-y-6">
          {customers.map((name, i) => (
            <motion.span
              key={name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              className="font-display text-base md:text-lg font-bold tracking-wide text-white/70 hover:text-white transition-colors duration-200 whitespace-nowrap"
              data-testid={`text-customer-${i}`}
            >
              {name}
            </motion.span>
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
          <div className="flex gap-10 animate-[marquee_40s_linear_infinite] w-max">
            {[...customers, ...customers].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="font-display text-base font-bold tracking-wide text-white/70 whitespace-nowrap"
              >
                {name}
              </span>
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
