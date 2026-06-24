import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Truck, Users, DollarSign, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const careerOptions = [
  {
    icon: Truck,
    title: "Owner Operators",
    description: "Access premium freight, AI-powered tools, and unlimited earning potential with your own truck.",
    link: "/owner-operators",
    highlight: "80% Revenue Share",
  },
  {
    icon: Users,
    title: "Company Drivers",
    description: "Enjoy competitive pay at 68 + 2 CPM, modern equipment, and a supportive team environment.",
    link: "/company-drivers",
    highlight: "68 + 2 CPM",
  },
  {
    icon: Shield,
    title: "Fleet Program",
    description: "Grow your fleet with our comprehensive support, volume discounts, and customer lanes.",
    link: "/fleet-program",
    highlight: "Fleet Benefits",
  },
];

const benefits = [
  "Weekly Settlements",
  "Safety Bonuses",
  "Referral Rewards",
  "24/7 Support",
  "Modern Equipment",
  "Flexible Routes",
];

export const CareerSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="section-padding bg-gradient-to-b from-background to-card relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400 rounded-full blur-3xl" />
      </div>
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider mb-2 block">
            Join Our Team
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Career Opportunities
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg mb-4">
            Whether you own your truck or want to drive ours, XXII Century offers industry-leading pay, 
            benefits, and support for drivers at every stage of their career.
          </p>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            We're actively hiring for <Link to="/owner-operators" className="text-primary hover:underline">owner operator trucking jobs</Link>, <Link to="/company-drivers" className="text-primary hover:underline">CDL-A company driver roles</Link>, and <Link to="/fleet-program" className="text-primary hover:underline">fleet partnership programs</Link>. Have questions? <Link to="/contact" className="text-primary hover:underline">Contact our recruiting team</Link> today.
          </p>
        </motion.div>

        {/* Career Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {careerOptions.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * index }}
              className="group relative"
            >
              <Link to={option.link} className="block h-full">
                <div className="h-full p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
                  {/* Highlight Badge */}
                  <div className="absolute -top-3 right-6">
                    <span className="px-3 py-1 bg-gradient-to-r from-primary to-cyan-400 text-white text-xs font-bold rounded-full">
                      {option.highlight}
                    </span>
                  </div>
                  
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <option.icon className="w-7 h-7 text-primary" />
                  </div>
                  
                  <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {option.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4">
                    {option.description}
                  </p>
                  
                  <div className="flex items-center text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                    Learn More <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Benefits Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          {benefits.map((benefit, index) => (
            <div
              key={benefit}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
            >
              <DollarSign className="w-4 h-4" />
              {benefit}
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Button variant="hero" size="lg" asChild>
            <a
              href="https://intelliapp.driverapponline.com/c/goxxii?r=bodan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              Apply Now <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
