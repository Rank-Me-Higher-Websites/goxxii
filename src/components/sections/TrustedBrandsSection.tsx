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
    <section className="py-20 sm:py-28 bg-gradient-to-b from-background to-muted/30">
      <div className="container-custom">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-3xl md:text-5xl font-display font-bold uppercase tracking-tight mb-16"
        >
          Trusted by <span className="text-primary">Leading Brands</span>
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6"
        >
          {brands.map((brand) => (
            <motion.div
              key={brand.name}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.08,
                y: -8,
                transition: { duration: 0.25, ease: "easeOut" }
              }}
              className="group relative bg-white dark:bg-slate-800 rounded-2xl p-8 flex items-center justify-center min-h-[140px] cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 border border-border/50 hover:border-primary/30"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-h-14 md:max-h-16 w-auto object-contain relative z-10 transition-transform duration-300 group-hover:scale-105"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};