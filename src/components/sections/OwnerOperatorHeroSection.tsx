import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ChevronLeft, DollarSign, TrendingDown, Clock, Route, Star, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import driverBlue from "@/assets/driver-truck-blue.jpg";
import heroBackground from "@/assets/heroes/truck-green.png";
import car1 from "@/assets/gallery/car-1.png";
import car2 from "@/assets/gallery/car-2.png";
import car3 from "@/assets/gallery/car-3.png";
import car4 from "@/assets/gallery/car-4.png";
import car5 from "@/assets/gallery/car-5.png";

const struggles = [
  { emoji: "💸", title: "Spot Market GAMBLING", desc: "Fighting for $2/mile scraps while brokers profit more from your work than you do" },
  { emoji: "🔧", title: "Equipment WEARING", desc: "Long hauls destroying your truck with high maintenance costs eating your profits" },
  { emoji: "📉", title: "Income UNCERTAINTY", desc: "Not knowing if you'll have freight next week to pay your bills and support your family" },
  { emoji: "⏰", title: "Payment DELAYS", desc: "Wondering IF and WHEN you'll get paid for loads already delivered weeks ago" },
  { emoji: "🛣️", title: "Empty Miles NIGHTMARES", desc: "Driving hundreds of unpaid miles because the \"good freight\" is always somewhere else" },
];

const benefits = [
  "Earn $2.50-$4+/mile vs spot market scraps",
  "Keep 80% of gross while we handle logistics",
  "Freight guarantee to stop you hunting loads",
  "Shorter Average Runs at better rates",
  "Money hits your account Friday morning",
  "Exclusive Fortune 500 Contract Security",
  "24/7 Professional Dispatch Support",
  "AI fuel/routing to maximize profits",
  "Earn $1,000 per qualified driver referred",
];

const advantages = [
  { icon: "🚛", title: "Guaranteed Freight", desc: "97% dedicated freight means no more hunting loads on broker boards or wondering where your next paycheck comes from." },
  { icon: "🛡️", title: "Premium Rate Protection", desc: "You'll have the security of rates with long-term contracts that don't fluctuate when markets crash or fuel prices spike." },
  { icon: "📍", title: "Shorter High-Value Routes", desc: "Make the same money driving 400-600 miles instead of 1,000+ mile runs that destroy your truck and your life." },
  { icon: "💰", title: "80% of Gross Revenue", desc: "Keep 80% of every load's profit while we handle freight sourcing and logistics – you maintain control of your earnings" },
  { icon: "🔧", title: "In-House Maintenance", desc: "Get your truck fixed while you're home instead of breaking down on the road with our in-house trusted service stations." },
  { icon: "🏠", title: "Guaranteed Home Time", desc: "Your home time plans won't fall through – we understand family comes first and plan routes accordingly" },
  { icon: "📞", title: "24/7 Dispatch Support", desc: "Professional dispatch team handling logistics, routing, and customer service so you focus on driving and earning." },
  { icon: "🤖", title: "AI-Powered Management", desc: "Smart fuel management, detention tracking, and route optimization that maximizes your efficiency and profits." },
  { icon: "💵", title: "Friday Payment Guarantee", desc: "Your money hits your account every Friday morning – no delays, no excuses, no stress about when you'll get paid." },
];

const galleryImages = [car1, car2, car3, car5];

const stats = [
  { value: "2009", label: "Established in" },
  { value: "$300K+", label: "Average Annual Income" },
  { value: "500+", label: "Successful Partnerships" },
  { value: "24/7", label: "Dispatch Support" },
];

const StruggleCarousel = ({ struggles }: { struggles: { emoji: string; title: string; desc: string }[] }) => {
  const [current, setCurrent] = useState(0);
  const itemsPerView = 3;
  const maxIndex = Math.max(0, struggles.length - itemsPerView);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [maxIndex]);

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out gap-6"
          style={{ transform: `translateX(-${current * (100 / itemsPerView + 2)}%)` }}
        >
          {struggles.map((item, index) => (
            <div
              key={index}
              className="glass p-6 rounded-xl flex-shrink-0"
              style={{ width: `calc((100% - ${(itemsPerView - 1) * 24}px) / ${itemsPerView})` }}
            >
              <div className="text-3xl mb-3">{item.emoji}</div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => setCurrent((p) => Math.max(0, p - 1))}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors"
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => setCurrent((p) => Math.min(maxIndex, p + 1))}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors"
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? "bg-primary" : "bg-muted-foreground/30"}`}
          />
        ))}
      </div>
    </div>
  );
};

export const OwnerOperatorHeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${heroBackground})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        
        <div className="container-custom relative z-10 pt-24 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-yellow-400">⭑⭑⭑⭑⭑</span>
              <span className="text-muted-foreground text-sm">16+ years experience</span>
            </div>

            <div className="inline-block glass px-4 py-2 rounded-full mb-6">
              <span className="text-destructive">⚠️</span> Tired of inconsistency & high-mile runs eating into your profits?
            </div>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight mb-6">
              Join XXII Century – High-Paying <span className="text-primary">Owner Operator Jobs</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Our Fortune 500 contracts guarantee <strong className="text-foreground">premium</strong> rates. Protecting you from <strong className="text-foreground">market volatility, greedy brokers,</strong> while keeping your truck in <strong className="text-foreground">better condition</strong> and your <strong className="text-foreground">income predictable.</strong>
            </p>

            <Button variant="hero" size="lg" asChild>
              <a
                href="https://intelliapp.driverapponline.com/c/goxxii?r=Eve"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ChevronRight className="w-5 h-5" />
                Apply & Discover Perks
              </a>
            </Button>
            <p className="text-sm text-muted-foreground mt-4">*For existing CDL drivers with licenses</p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          >
            {stats.map((stat, index) => (
              <div key={index} className="glass p-6 rounded-xl text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Struggles Section */}
      <section ref={ref} className="py-20 bg-muted/30">
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="font-display text-3xl md:text-4xl font-bold text-center mb-12"
          >
            We Know the <span className="text-primary">Struggles</span> for Owner Operator Jobs:
          </motion.h2>

          <StruggleCarousel struggles={struggles} />

          <div className="text-center mt-8">
            <Button variant="heroOutline" size="lg" asChild>
              <a href="tel:+17735725012" className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src={driverBlue}
                alt="Truck driver in blue truck"
                className="rounded-2xl w-full"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Choose Better - Apply Now:</h3>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                What You Get Access To:
              </h2>

              <ul className="space-y-3 mb-8">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <Button variant="hero" size="lg" asChild>
                <a
                  href="https://intelliapp.driverapponline.com/c/goxxii?r=Eve"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ChevronRight className="w-5 h-5" />
                  Apply Now
                </a>
              </Button>
              <p className="text-sm text-destructive mt-3">⚠️ Limited spaces available - apply now</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Advantages Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Owner Operator Advantage: <span className="text-primary">2:1 Trailer-to-Truck</span> Setup
            </h2>
            <p className="text-muted-foreground mt-4">
              A trucking company for owner operators focused on long-term success and steady pay
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((adv, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass p-6 rounded-xl hover:border-primary/50 transition-colors"
              >
                <div className="text-3xl mb-4">{adv.icon}</div>
                <h3 className="font-bold text-lg mb-2">{adv.title}</h3>
                <p className="text-muted-foreground text-sm">{adv.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button variant="hero" size="lg" asChild>
              <a
                href="https://intelliapp.driverapponline.com/c/goxxii?r=Eve"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ChevronRight className="w-5 h-5" />
                Apply Now
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Family Gallery */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl font-bold text-center mb-4"
          >
            Welcome to the <span className="text-primary">XXII Family</span>
          </motion.h2>

          <div className="flex gap-4 justify-center py-6">
            {galleryImages.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex-shrink-0 w-48 h-48 rounded-xl overflow-hidden"
              >
                <img
                  src={img}
                  alt={`XXII Century Family ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <h3 className="text-xl font-bold mb-2">The People-First Logistics Company</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
              While other companies leave drivers to fight for $2/mile scraps, we've spent 16+ years building relationships with major shippers who pay premium rates for reliable service.
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Curious how we compare to <Link to="/company-drivers" className="text-primary hover:underline">company driver opportunities</Link>? Or want to learn more <Link to="/about" className="text-primary hover:underline">about our trucking company</Link>? Explore what makes XXII Century different from the carriers that treat drivers like numbers.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
