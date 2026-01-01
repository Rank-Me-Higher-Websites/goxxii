import { motion } from "framer-motion";
import lgLogo from "@/assets/brands/lg.png";
import thermafiberLogo from "@/assets/brands/thermafiber.png";
import millerLogo from "@/assets/brands/miller.png";
import westrockLogo from "@/assets/brands/westrock.png";
import petcoLogo from "@/assets/brands/petco.png";
import wisconsinLogo from "@/assets/brands/wisconsin.png";

const brands = [
  { name: "LG", logo: lgLogo },
  { name: "Thermafiber", logo: thermafiberLogo },
  { name: "Miller", logo: millerLogo },
  { name: "WestRock", logo: westrockLogo },
  { name: "Petco", logo: petcoLogo },
  { name: "Wisconsin Paper Council", logo: wisconsinLogo },
];

export const TrustedBrandsSection = () => {
  return (
    <section className="py-12 sm:py-16 bg-secondary overflow-hidden">
      <div className="container-custom mb-8">
        <h3 className="text-center text-lg sm:text-xl font-display font-semibold italic text-foreground">
          Trusted by Leading Brands
        </h3>
      </div>

      {/* Infinite Scroll Marquee */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-r from-secondary to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-l from-secondary to-transparent z-10" />
        
        <motion.div
          animate={{ x: [0, -150 * brands.length] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
          className="flex gap-8 sm:gap-12 items-center"
        >
          {/* Duplicate brands for seamless loop */}
          {[...brands, ...brands, ...brands, ...brands].map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity duration-300"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-8 sm:h-10 w-auto object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
