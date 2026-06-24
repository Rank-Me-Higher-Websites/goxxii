import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Phone, Star, Users, Truck, Fuel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QualifyFormDialog } from "@/components/QualifyFormDialog";
import heroDriver from "@/assets/hero-driver.png";

export const HeroSection = () => {
  const [qualifyOpen, setQualifyOpen] = useState(false);

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-x-hidden">
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
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-40 left-10 w-96 h-96 bg-accent/15 rounded-full blur-[120px]" />
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-cyan-500/10 rounded-full blur-[80px]" />

      {/* Accent corners */}
      <div className="absolute top-0 left-0 w-1 h-24 sm:h-32 bg-gradient-to-b from-primary to-transparent" />
      <div className="absolute top-0 left-0 w-24 sm:w-32 h-1 bg-gradient-to-r from-primary to-transparent" />
      <div className="absolute bottom-0 right-0 w-1 h-24 sm:h-32 bg-gradient-to-t from-accent to-transparent" />
      <div className="absolute bottom-0 right-0 w-24 sm:w-32 h-1 bg-gradient-to-l from-accent to-transparent" />

      {/* Content */}
      <div className="container-custom relative z-10 pt-20 pb-8 sm:pt-24 sm:pb-12">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
          {/* Left: Copy */}
          <div className="text-center lg:text-left max-w-full">
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
              <span className="block text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-2 sm:mb-3">
                XXII Century Trucking - Chicago&apos;s Driver-First CDL-A Carrier
              </span>
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
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <Truck className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">Drop &amp; Hook</div>
                  <div className="text-xs text-muted-foreground">No-Touch Only</div>
                </div>
              </div>
            </motion.div>

            {/* Fuel Guarantee Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.22 }}
              className="flex flex-wrap items-center justify-center gap-2 mb-5 px-3 py-2 rounded-xl bg-accent/10 border border-accent/30 w-full max-w-md mx-auto lg:mx-0"
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
              <Button
                variant="hero"
                size="default"
                className="group pulse-glow sm:h-14 sm:px-10 sm:text-base"
                onClick={() => setQualifyOpen(true)}
                data-testid="button-apply-now"
              >
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                <span className="sm:hidden whitespace-nowrap">Apply Now</span>
                <span className="hidden sm:inline whitespace-nowrap">Apply Now - Only 3 Spots Left</span>
              </Button>
              <Button variant="heroOutline" size="default" className="sm:h-14 sm:px-10 sm:text-base" asChild>
                <a href="tel:+16309146037">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span className="whitespace-nowrap">630-914-6037</span>
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
                <p className="text-xs font-semibold text-foreground">- Mike D., Owner Operator</p>
              </div>
            </motion.div>
          </div>

          {/* Right: VSL Video + Apply CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex flex-col"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-card">
              <video
                className="w-full h-auto"
                controls
                playsInline
                autoPlay
                muted
                preload="auto"
                poster="https://vz-2fd304ff-2c7.b-cdn.net/abd64adf-5822-4788-9d14-2bc7bc6e7d46/thumbnail.jpg"
              >
                <source src="https://vz-2fd304ff-2c7.b-cdn.net/abd64adf-5822-4788-9d14-2bc7bc6e7d46/playlist.m3u8" type="application/x-mpegURL" />
                <source src="https://vz-2fd304ff-2c7.b-cdn.net/abd64adf-5822-4788-9d14-2bc7bc6e7d46/play_720p.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Apply Now CTA below video */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-5"
            >
              <Button
                variant="hero"
                size="lg"
                className="w-full h-14 text-base font-bold uppercase tracking-wider pulse-glow-uniform group"
                onClick={() => setQualifyOpen(true)}
                data-testid="button-apply-now-vsl"
              >
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                Apply Now - See If You Qualify
              </Button>
            </motion.div>

            {/* Social proof row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-4 flex items-center justify-between"
            >
              <div className="glass-strong rounded-xl px-4 py-3 border border-accent/30 inline-flex">
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
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
                <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                <span>Takes 30 seconds to apply</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <QualifyFormDialog open={qualifyOpen} onOpenChange={setQualifyOpen} />
    </section>
  );
};
