import { motion } from "framer-motion";
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
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export const TrustedBrandsSection = () => {
  return (
    <section className="py-14 sm:py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-[#0a1628] via-[#0d1e36] to-[#0a1628]">
      {/* Subtle radial gradient overlay */}
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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6"
        >
          {brands.map((brand) => (
            <motion.div
              key={brand.name}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="group relative bg-[#1a2d4a] rounded-xl sm:rounded-2xl p-3 sm:p-5 flex items-center justify-center min-h-[100px] sm:min-h-[140px] cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 border border-[#2a3d5a]/50 hover:border-primary/30"
            >
              <div className="bg-white rounded-lg p-3 sm:p-4 w-full h-full flex items-center justify-center min-h-[60px] sm:min-h-[80px] group-hover:shadow-inner transition-all duration-300">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-8 sm:max-h-10 md:max-h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
