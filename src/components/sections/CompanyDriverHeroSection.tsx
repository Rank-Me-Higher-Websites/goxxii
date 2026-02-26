import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Phone, Home, Wrench, Award, MapPin, DollarSign, Gift, Clock, Heart, Users, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import companyTruck from "@/assets/company-truck.png";
import companyDriver from "@/assets/company-driver.jpg";
import heroBackground from "@/assets/heroes/truck-white-dock.png";

const features = [
  { icon: Award, title: "Outstanding", subtitle: "PAY-SCALE" },
  { icon: Home, title: "Better", subtitle: "Home Time" },
  { icon: Wrench, title: "New & Modern", subtitle: "Equipment" },
  { icon: MapPin, title: "Great Place", subtitle: "To Work" },
];

const stats = [
  { value: "$1000", label: "Referral Bonus" },
  { value: "$90k", label: "Average Annual Income" },
  { value: "$1750", label: "Average Weekly" },
  { value: "65¢", label: "CPM" },
];

const stats2 = [
  { value: "$1000", label: "Referral Bonus" },
  { value: "$100", label: "Layovers" },
  { value: "24/7", label: "Dispatch & Roadside" },
  { value: "$500", label: "Inspection Bonus" },
];

const benefits = [
  { icon: DollarSign, title: "Paid Detention", desc: "Company-matched plan – helping you prepare for retirement." },
  { icon: Award, title: "65 CPM", desc: "Earn $83,000–$95,000 in your first year with XXII Century." },
  { icon: Gift, title: "Driver Bonuses", desc: "Enjoy performance bonuses, monthly rewards, photo contests, and year-round giveaways!" },
  { icon: Heart, title: "Paid Layover", desc: "Awesome health plans to choose from. Includes dental and vision too." },
  { icon: Users, title: "Referral Bonus", desc: "On-site maintenance available—relax at HQ or head home while we service your truck." },
  { icon: MessageSquare, title: "Transparent Feedback", desc: "Drive efficiently, earn more—ask a recruiter for details!" },
];

export const CompanyDriverHeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-background">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        
        <div className="container-custom relative z-10 pt-24 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight mb-6">
              Hiring CDL Company Drivers – <span className="text-primary">Steady Miles, Weekly Pay</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Join XXII Century for reliable routes, top-tier support, and consistent paychecks. We make driving simple and rewarding. Apply now and get rolling!
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="hero" size="lg" asChild>
                <a
                  href="https://intelliapp.driverapponline.com/c/goxxii?r=Eve"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ChevronRight className="w-5 h-5" />
                  Apply To Drive
                </a>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <a href="tel:7735725012" className="flex items-center gap-2">
                  <ChevronRight className="w-5 h-5" />
                  Call Us
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-12 md:mt-16"
          >
            {features.map((feature, index) => (
              <div key={index} className="glass p-3 md:p-6 rounded-xl text-center">
                <feature.icon className="w-7 h-7 md:w-10 md:h-10 text-primary mx-auto mb-2 md:mb-3" />
                <div className="font-bold text-sm md:text-lg">{feature.title}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">{feature.subtitle}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Earning Power Section */}
      <section ref={ref} className="py-20 bg-muted/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                Drive with XXII Century – Company Driver Job with <span className="text-primary">Real Earning Power</span>
              </h2>
              
              <p className="text-muted-foreground mb-6">
                Enjoy weekly direct deposits, cash advances, and extra pay for layovers, stops, and detention time. We're hiring company drivers who want more than miles— <strong className="text-foreground">get paid performance bonuses, safety rewards, fuel incentives, and automatic raises every 75K miles.</strong>
              </p>

              <div className="rounded-2xl overflow-hidden">
                <img src={companyTruck} alt="Company truck" className="w-full h-auto" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center lg:text-left"
            >
              <h3 className="font-display text-2xl font-bold mb-6">
                Our Commitment to CDL Drivers Goes Beyond the Road
              </h3>
              
              <p className="text-muted-foreground mb-8">
                Join XXII Century and experience a carrier that puts CDL drivers first—on and off the road. Whether you're based near <strong className="text-foreground">Lemont, IL</strong> or hauling across the country, we offer <strong className="text-foreground">Class A company drivers</strong> competitive pay, modern equipment, and a reliable support team. From day one, we're committed to your long-term success, with consistent freight and the respect you deserve.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="glass p-4 rounded-xl text-center"
                  >
                    <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Earn All Year Section */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Earn All Year Long
            </h2>
            <p className="text-muted-foreground mb-8">
              One major benefit of working with us is that you are able to consistently earn throughout the entire year, without having to worry about the uncertainty of the freight market.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-2xl text-center mt-8"
          >
            <h3 className="font-display text-2xl font-bold mb-4">
              Join XXII Century Today and Drive Toward a Brighter Future in Trucking!
            </h3>
            <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
              Drive with XXII and get the consistency you deserve! With dedicated lanes and flexible home time options, your schedule works for you. Enjoy paid vacations to recharge, and earn big with safety and performance bonuses recognizing your hard work.
            </p>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Ready to take the wheel? Or would you rather explore <Link to="/owner-operators" className="text-primary hover:underline">owner operator programs</Link> with 90% revenue share? Either way, XXII Century has a <Link to="/careers" className="text-primary hover:underline">trucking career path</Link> that fits your goals.
            </p>
            <Button variant="hero" size="lg" asChild>
              <a href="mailto:hr@goxxii.com">
                Email Us
              </a>
            </Button>
          </motion.div>

          {/* Stats 2 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {stats2.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass p-6 rounded-xl text-center"
              >
                <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl font-bold text-center mb-12"
          >
            Truck Drivers Deserve <span className="text-primary">Exceptional Benefits</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass p-6 rounded-xl hover:border-primary/50 transition-colors"
              >
                <benefit.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.desc}</p>
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
    </>
  );
};
