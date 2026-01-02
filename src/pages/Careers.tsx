import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Truck, Users, Shield, CheckCircle, DollarSign, Clock, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FAQSection } from "@/components/sections/FAQSection";

const positions = [
  {
    icon: Truck,
    title: "Owner Operators",
    description: "Maximize your earnings with access to premium freight, AI-powered tools, and an 88% revenue share.",
    benefits: ["88% Revenue Share", "Fuel Discounts", "Safety Bonuses", "Dedicated Lanes"],
    link: "/owner-operators",
    cta: "Learn More",
  },
  {
    icon: Users,
    title: "Company Drivers",
    description: "Join our team with competitive pay at 63 CPM, modern equipment, and a supportive work environment.",
    benefits: ["63 CPM", "Weekly Pay", "Paid Training", "Health Benefits"],
    link: "/company-drivers",
    cta: "Learn More",
  },
  {
    icon: Shield,
    title: "Fleet Program",
    description: "Grow your fleet with our comprehensive support, volume discounts, and access to premium freight.",
    benefits: ["Volume Discounts", "Dedicated Support", "Fleet Management", "24/7 Dispatch"],
    link: "/fleet-program",
    cta: "Learn More",
  },
];

const whyJoin = [
  {
    icon: DollarSign,
    title: "Top Industry Pay",
    description: "Earn more with our competitive rates, bonuses, and weekly settlements.",
  },
  {
    icon: Clock,
    title: "Flexible Schedules",
    description: "Choose routes that work for you with regional, OTR, and dedicated options.",
  },
  {
    icon: MapPin,
    title: "Consistent Miles",
    description: "Stay loaded with our extensive shipper network and AI-optimized routing.",
  },
  {
    icon: Shield,
    title: "Driver Support",
    description: "24/7 dispatch, roadside assistance, and a team that has your back.",
  },
];

const Careers = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-cyan-500/10" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400 rounded-full blur-3xl" />
        </div>
        
        <div className="container-custom relative z-10 text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary text-sm font-semibold uppercase tracking-wider mb-4 block">
              Join XXII Century
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Build Your Career<br />
              <span className="text-primary">On The Road</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Whether you own your truck or want to drive ours, we offer industry-leading pay, 
              benefits, and support for drivers at every stage of their career.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
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
                  <Phone className="w-5 h-5" /> Call Recruiting
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Positions Section */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Open Positions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our available opportunities and find the perfect fit for your career goals.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {positions.map((position, index) => (
              <motion.div
                key={position.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="group"
              >
                <div className="h-full p-8 rounded-2xl border border-border bg-background hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <position.icon className="w-8 h-8 text-primary" />
                  </div>
                  
                  <h3 className="font-display text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {position.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6">
                    {position.description}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {position.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center gap-2 text-sm text-foreground">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  
                  <Button variant="hero" className="w-full" asChild>
                    <Link to={position.link}>
                      {position.cta} <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Drive with XXII Century?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're committed to your success on the road with industry-leading support and benefits.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyJoin.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="p-6 rounded-xl border border-border bg-card/50 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-gradient-to-br from-primary/10 via-background to-cyan-500/10">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground mb-8">
              Apply online or speak directly with our recruiting team. Most qualified drivers 
              can start driving within just a few days after applying.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button variant="hero" size="lg" asChild>
                <a
                  href="https://intelliapp.driverapponline.com/c/goxxii?r=Eve"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  Apply Online <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-6 justify-center text-sm">
              <a href="tel:630-948-0501" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-4 h-4" /> 630-948-0501
              </a>
              <a href="mailto:hr@goxxii.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-4 h-4" /> hr@goxxii.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <FAQSection />
    </Layout>
  );
};

export default Careers;
