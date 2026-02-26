import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import lgLogo from "@/assets/brands/lg.png";
import thermafiberLogo from "@/assets/brands/thermafiber.png";
import millerLogo from "@/assets/brands/miller.png";
import westrockLogo from "@/assets/brands/westrock.png";
import petcoLogo from "@/assets/brands/petco.png";
import wisconsinLogo from "@/assets/brands/wisconsin.png";

const brands = [
  { name: "Miller", logo: millerLogo },
  { name: "WestRock", logo: westrockLogo },
  { name: "Petco", logo: petcoLogo },
  { name: "Wisconsin Paper Council", logo: wisconsinLogo },
  { name: "LG", logo: lgLogo },
  { name: "Thermafiber", logo: thermafiberLogo },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const MobileCarousel = () => {
  const [current, setCurrent] = useState(0);
  const itemsPerView = 2;
  const maxIndex = Math.max(0, brands.length - itemsPerView);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, [maxIndex]);

  return (
    <div className="relative px-8">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out gap-3"
          style={{ transform: `translateX(-${current * (100 / itemsPerView)}%)` }}
        >
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex-shrink-0 bg-[#1a2d4a] rounded-xl p-3 border border-[#2a3d5a]/50"
              style={{ width: `calc((100% - 12px) / ${itemsPerView})` }}
            >
              <div className="bg-white rounded-lg p-4 flex items-center justify-center min-h-[90px]">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-12 w-auto object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => setCurrent((p) => Math.max(0, p - 1))}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#1a2d4a] border border-[#2a3d5a]/50 flex items-center justify-center text-white hover:bg-primary/20 transition-colors"
        aria-label="Previous"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={() => setCurrent((p) => Math.min(maxIndex, p + 1))}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#1a2d4a] border border-[#2a3d5a]/50 flex items-center justify-center text-white hover:bg-primary/20 transition-colors"
        aria-label="Next"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-primary" : "bg-white/30"}`}
          />
        ))}
      </div>
    </div>
  );
};

export const TrustedBrandsSection = () => {
  return (
    <section className="py-14 sm:py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-[#0a1628] via-[#0d1e36] to-[#0a1628]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.08)_0%,_transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(99,102,241,0.05)_0%,_transparent_50%)]" />
      <div className="container-custom relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold uppercase tracking-wider mb-8 sm:mb-12 md:mb-16 text-white"
        >
          Trusted by Leading Brands
        </motion.h2>

        {/* Mobile: Carousel */}
        <div className="block lg:hidden">
          <MobileCarousel />
        </div>

        {/* Desktop: Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="hidden lg:grid grid-cols-6 gap-6"
        >
          {brands.map((brand) => (
            <motion.div
              key={brand.name}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="group relative bg-[#1a2d4a] rounded-2xl p-5 flex items-center justify-center min-h-[140px] cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 border border-[#2a3d5a]/50 hover:border-primary/30"
            >
              <div className="bg-white rounded-lg p-4 w-full h-full flex items-center justify-center min-h-[80px] group-hover:shadow-inner transition-all duration-300">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
