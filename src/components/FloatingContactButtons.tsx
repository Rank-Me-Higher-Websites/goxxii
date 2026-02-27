import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, X } from "lucide-react";

export const FloatingContactButtons = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      
      if (scrollY > heroHeight * 0.5) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsExpanded(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-6 right-6 z-50 hidden lg:flex flex-col items-end gap-3"
        >
          {/* Expanded buttons */}
          <AnimatePresence>
            {isExpanded && (
              <>
                <motion.a
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ delay: 0.1 }}
                  href="tel:+16309480501"
                  className="flex items-center gap-2 px-4 py-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                >
                  <Phone className="w-5 h-5" />
                  <span className="font-semibold text-sm">Call Us</span>
                </motion.a>
                <motion.a
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  href="sms:+16309480501"
                  className="flex items-center gap-2 px-4 py-3 rounded-full bg-accent text-accent-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-semibold text-sm">Text Us</span>
                </motion.a>
              </>
            )}
          </AnimatePresence>

          {/* Main toggle button */}
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 ${
              isExpanded 
                ? "bg-muted text-muted-foreground" 
                : "bg-primary text-primary-foreground pulse-glow"
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {isExpanded ? (
              <X className="w-6 h-6" />
            ) : (
              <Phone className="w-6 h-6" />
            )}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
