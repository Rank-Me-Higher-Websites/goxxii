import { motion } from "framer-motion";
import { ChevronRight, Phone, Star, Users, Truck, Fuel } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroDriver from "@/assets/hero-driver.png";

export const HeroSection = () => {

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroDriver}
          alt="Professional truck driver in modern cab"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
      </div>

      {/* Floating gradient shapes */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-40 left-10 w-96 h-96 bg-accent/15 rounded-full blur-[120px]" />
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-cyan-500/10 rounded-full blur-[80px] float" />

      {/* Accent corners */}
      <div className="absolute top-0 left-0 w-1 h-24 sm:h-32 bg-gradient-to-b from-primary to-transparent" />
      <div className="absolute top-0 left-0 w-24 sm:w-32 h-1 bg-gradient-to-r from-primary to-transparent" />
      <div className="absolute bottom-0 right-0 w-1 h-24 sm:h-32 bg-gradient-to-t from-accent to-transparent" />
      <div className="absolute bottom-0 right-0 w-24 sm:w-32 h-1 bg-gradient-to-l from-accent to-transparent" />

      {/* Content */}
      <div className="container-custom relative z-10 pt-20 pb-8 sm:pt-24 sm:pb-12">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
          {/* Left: Copy */}
          <div className="text-center lg:text-left">
            {/* Urgency Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 rounded-full glass-strong border border-accent/30"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="text-xs font-semibold text-accent uppercase tracking-wide">3 Spots Left This Week</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight leading-[1.05] mb-3 sm:mb-4"
            >
              <span className="text-gradient">Owner Operators</span>
              <br />
              <span className="text-foreground">Keep 80% of Gross.</span>
              <br />
              <span className="text-foreground">No Hidden Fees.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto lg:mx-0 mb-4"
            >
              <span className="text-foreground font-semibold">Stop getting robbed by your carrier.</span> No fuel cards skimming you. No dispatch fees eating your check. No ELD charges. You keep what you earn. Fortune 500 freight. Weekly pay. Period.
            </motion.p>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-6 mb-5 w-full"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Truck className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">$8,000+</div>
                  <div className="text-xs text-muted-foreground">Weekly Avg</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Fuel className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">Biggest</div>
                  <div className="text-xs text-muted-foreground">Fuel Discount</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <Star className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">$0 Fees</div>
                  <div className="text-xs text-muted-foreground">Zero Hidden</div>
                </div>
              </div>
            </motion.div>

            {/* Fuel Guarantee Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.22 }}
              className="flex flex-wrap items-center justify-center gap-2 mb-5 px-4 py-2 rounded-xl bg-accent/10 border border-accent/30 max-w-full mx-auto lg:mx-0"
            >
              <Fuel className="w-5 h-5 text-accent flex-shrink-0" />
              <span className="text-sm font-semibold text-accent text-center leading-tight">
                100% Guaranteed Bigger Fuel Discount or We Match It
              </span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-row gap-3 items-center justify-center lg:justify-start"
            >
              <Button variant="hero" size="lg" className="group pulse-glow" asChild>
                <a
                  href="https://intelliapp.driverapponline.com/c/goxxii?r=Eve"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  <span className="sm:hidden whitespace-nowrap">Apply Now</span>
                  <span className="hidden sm:inline whitespace-nowrap">Apply Now — Only 3 Spots Left</span>
                </a>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <a href="tel:+17735725012">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span className="whitespace-nowrap">773-572-5012</span>
                </a>
              </Button>
            </motion.div>

            {/* Company Driver Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-4"
            >
              <a 
                href="#company-drivers" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors underline underline-offset-4"
              >
                Looking for a Company Driver position? Click here →
              </a>
            </motion.div>

            {/* Testimonial Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-6 max-w-sm mx-auto lg:mx-0"
            >
              <div className="glass-strong rounded-xl p-4 border border-border/50">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground italic mb-2">
                  "Best carrier I have worked with in 20 years. Pay is always on time, support is amazing."
                </p>
                <p className="text-xs font-semibold text-foreground">— Mike D., Owner Operator</p>
              </div>
            </motion.div>
          </div>

          {/* Right: VSL Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-card">
              <div 
                dangerouslySetInnerHTML={{
                  __html: `
                    <style>
                      wistia-player[media-id='j33b6mpgm1']:not(:defined) {
                        background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/j33b6mpgm1/swatch');
                        display: block;
                        filter: blur(5px);
                        padding-top: 56.25%;
                      }
                    </style>
                    <wistia-player media-id="j33b6mpgm1" aspect="1.7777777777777777" muted="false" autoplay="false"></wistia-player>
                  `
                }}
              />
            </div>

            {/* Floating social proof - positioned outside video */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-4 glass-strong rounded-xl px-4 py-3 border border-accent/30 hidden lg:inline-flex"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground border-2 border-card">M</div>
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-xs font-bold text-accent-foreground border-2 border-card">J</div>
                  <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-xs font-bold text-white border-2 border-card">R</div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">12 drivers joined</p>
                  <p className="text-xs text-muted-foreground">this week</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
