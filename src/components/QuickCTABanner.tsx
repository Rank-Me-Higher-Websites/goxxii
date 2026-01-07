import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface QuickCTABannerProps {
  variant?: "default" | "compact";
}

export const QuickCTABanner = ({ variant = "default" }: QuickCTABannerProps) => {
  if (variant === "compact") {
    return (
      <section className="py-8 bg-gradient-to-r from-primary/10 via-background to-accent/10">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
            <p className="text-foreground font-medium">
              Ready to start your trucking career?
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button variant="hero" size="sm" asChild>
                <a
                  href="https://intelliapp.driverapponline.com/c/goxxii?r=Eve"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  Apply Now <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="heroOutline" size="sm" asChild>
                <a href="tel:630-948-0501" className="inline-flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Call Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-primary/15 via-background to-cyan-500/10 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent rounded-full blur-3xl" />
      </div>
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Start Your Journey with XXII Century
          </h2>
          <p className="text-muted-foreground mb-6">
            Join our team of professional drivers and experience the difference of working with a company that values your success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <a
                href="https://intelliapp.driverapponline.com/c/goxxii?r=Eve"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                Apply Now <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <a href="tel:630-948-0501" className="inline-flex items-center gap-2">
                <Phone className="w-5 h-5" /> 630-948-0501
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
