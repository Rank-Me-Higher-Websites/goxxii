import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (100vh)
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      
      if (scrollY > heroHeight * 0.8 && !isDismissed) {
        setIsVisible(true);
      } else if (scrollY < heroHeight * 0.5) {
        setIsVisible(false);
        setIsDismissed(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 lg:hidden"
        >
          <div className="glass-strong rounded-2xl p-4 shadow-2xl border border-border/50 relative overflow-visible">
            {/* Dismiss button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsDismissed(true);
                setIsVisible(false);
              }}
              className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-foreground active:scale-95 transition-all z-[60] touch-manipulation"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Urgency text */}
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="text-xs font-semibold text-accent">Limited Spots Available — Apply Today</span>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <Button variant="hero" className="flex-1 pulse-glow whitespace-nowrap" asChild>
                <a
                  href="https://intelliapp.driverapponline.com/c/goxxii?r=Eve"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <ChevronRight className="w-4 h-4 flex-shrink-0" />
                  <span>Apply Now</span>
                </a>
              </Button>
              <Button variant="heroOutline" className="flex-shrink-0" asChild>
                <a href="tel:+16309146037" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Call
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
