import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const partners = [
  {
    logo: "https://goxxii.com/wp-content/uploads/2025/08/C._H._Robinson_logo.svg-1.png",
    category: "2024 Fortune-200 Logistics Tech Leader",
    name: "CH Robinson",
    knownFor: "2024 Fortune-200 logistics tech leader; 2024 AI 50 (Forbes)",
    awards: "2024 BNSF Railway Sustainability Award; Top 75 Green Supply Chain",
    whyMatters: "World's Most Admired Companies; Top 5 Logistics",
    reach: "37M shipments/year for 83k customers",
  },
  {
    logo: "https://goxxii.com/wp-content/uploads/2025/08/antiracism-1.jpg",
    category: "Leading Green Building-Materials Brand",
    name: "American Pacific – CedarSafe",
    knownFor: "Member of the U.S. Green Building Council",
    whyMatters: "Industry sustainability credentials",
    reach: "Ships from TN & AR mills → home-center chains nationwide",
  },
  {
    logo: "https://goxxii.com/wp-content/uploads/2025/08/Menards-logo-scaled-1.png",
    category: "2024 Forbes \"America's Top Private Companies\"",
    name: "Menards",
    knownFor: "Large U.S. home-improvement retailer",
    whyMatters: "Forbes America's Top Private Companies",
    reach: "300+ stores • 14 DCs across the Midwest",
  },
  {
    logo: "https://goxxii.com/wp-content/uploads/2025/08/FM-Tool-GSC.jpg",
    category: "Trusted Retail Supply Partner",
    name: "F&M Tool and Plastics",
    knownFor: "Supplier of proprietary storage totes to Target, Lowe's, Walmart, and more",
    whyMatters: "4x sales growth and nationwide + Canadian reach",
    reach: "Regional excellence scaling into national impact",
  },
];

export const IndustryPartnersSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % partners.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + partners.length) % partners.length);
  };

  return (
    <section ref={ref} className="section-padding bg-background relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="heading-section text-foreground mb-4">
            Trusted by Industry Leaders Nationwide
          </h2>
          <p className="text-xl text-muted-foreground">
            We work with Fortune-level brands driven by values
          </p>
          <p className="text-muted-foreground mt-2">
            At XXII Century, it&apos;s not the name but the path that wins
          </p>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="glass rounded-2xl p-8 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex gap-6">
                <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-white">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <div className="flex-1">
                  <span className="text-primary text-sm font-semibold">{partner.category}</span>
                  <h3 className="font-display text-2xl font-bold text-foreground mt-1 mb-3">
                    {partner.name}
                  </h3>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    <li><strong className="text-foreground">Known for:</strong> {partner.knownFor}</li>
                    {partner.awards && (
                      <li><strong className="text-foreground">Awards:</strong> {partner.awards}</li>
                    )}
                    <li><strong className="text-foreground">Why it matters:</strong> {partner.whyMatters}</li>
                    <li><strong className="text-foreground">Reach:</strong> {partner.reach}</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-white mb-4">
                <img
                  src={partners[currentIndex].logo}
                  alt={partners[currentIndex].name}
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <span className="text-primary text-sm font-semibold">
                {partners[currentIndex].category}
              </span>
              <h3 className="font-display text-xl font-bold text-foreground mt-1 mb-3">
                {partners[currentIndex].name}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                <strong className="text-foreground">Known for:</strong> {partners[currentIndex].knownFor}
              </p>
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Reach:</strong> {partners[currentIndex].reach}
              </p>
            </div>
          </motion.div>

          <div className="flex justify-center gap-4 mt-6">
            <Button variant="outline" size="icon" onClick={prevSlide}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              {partners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? "bg-primary w-6" : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
            <Button variant="outline" size="icon" onClick={nextSlide}>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
