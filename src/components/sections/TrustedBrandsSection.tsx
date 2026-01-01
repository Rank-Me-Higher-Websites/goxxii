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
    <section className="py-16 sm:py-20 bg-background">
      <div className="container-custom">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-3xl md:text-4xl font-display font-bold uppercase tracking-tight mb-12"
        >
          Trusted by Leading Brands
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          {brands.map((brand) => (
            <motion.div
              key={brand.name}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="bg-muted/50 rounded-xl p-6 flex items-center justify-center min-h-[120px] cursor-pointer hover:bg-muted hover:shadow-lg transition-all duration-300"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-h-12 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
