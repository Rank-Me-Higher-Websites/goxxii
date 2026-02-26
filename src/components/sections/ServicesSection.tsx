import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Truck, Snowflake, ChevronRight } from "lucide-react";

import dryVanTruck from "@/assets/dry-van-truck.jpg";
import refrigeratedTruck from "@/assets/refrigerated-truck.jpg";

const services = [
  {
    id: "dry-van",
    icon: Truck,
    title: "Dry Van Trucking Services",
    subtitle: "Nationwide Freight Shipping",
    image: dryVanTruck,
    description:
      "At XXII Century, our Dry Van Division moves your non-perishable freight quickly and reliably across the U.S. We handle both full truckload (FTL) and less-than-truckload (LTL) loads, giving you flexible shipping options that fit your needs.",
    features: [
      "Full Truckload (FTL) & LTL options",
      "On-time delivery guarantee",
      "Fortune 500 freight partners",
      "Dedicated lanes available",
    ],
  },
  {
    id: "refrigerated",
    icon: Snowflake,
    title: "Refrigerated Freight Shipping",
    subtitle: "Temperature-Controlled Transport",
    image: refrigeratedTruck,
    description:
      "We specialize in refrigerated freight shipping across North America. Our fleet of temperature-controlled trucks delivers fresh, frozen, chilled, and dry goods — including meats, produce, flowers, medical supplies, cosmetics, and other temperature-sensitive freight.",
    features: [
      "24/7, 365-day service",
      "Line-Haul, OTR, Dedicated routes",
      "Real-time temperature monitoring",
      "Multi-Stop deliveries",
    ],
  },
];

export const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [activeService, setActiveService] = useState("dry-van");

  const currentService = services.find((s) => s.id === activeService)!;

  return (
    <section ref={ref} className="section-padding bg-secondary">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="label-tag mx-auto mb-4 inline-flex">What We Do</span>
          <h2 className="heading-section text-foreground mb-4">
            Transportation Divisions
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-4">
            At XXII Century, we are a trusted trucking company offering a wide range of <Link to="/freight-shipping-services" className="text-primary hover:underline">freight shipping services</Link> to meet diverse logistics needs. Our experienced team handles everything from standard dry goods to temperature-sensitive cargo.
          </p>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Looking to haul for us? Explore our <Link to="/owner-operators" className="text-primary hover:underline">independent driver opportunities</Link> or <Link to="/company-drivers" className="text-primary hover:underline">CDL-A positions</Link> with competitive pay and consistent freight.
          </p>
        </motion.div>

        {/* Service Tabs */}
        <div className="flex justify-center gap-2 sm:gap-4 mb-10 overflow-x-auto pb-2">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => setActiveService(service.id)}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                activeService === service.id
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-card text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              <span className="flex items-center gap-2">
                <service.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">{service.id === "dry-van" ? "Dry Van" : "Refrigerated"}</span>
              </span>
            </button>
          ))}
        </div>

        {/* Service Content */}
        <motion.div
          key={activeService}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
        >
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
            <img
              src={currentService.image}
              alt={currentService.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </div>

          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <currentService.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold text-foreground">
                  {currentService.title}
                </h3>
                <p className="text-primary text-sm font-medium">
                  {currentService.subtitle}
                </p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">
              {currentService.description}
            </p>

            <ul className="space-y-3 mb-8">
              {currentService.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 text-foreground"
                >
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <ChevronRight className="w-3 h-3 text-primary" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <Button variant="hero" size="default" asChild>
              <a
                href="https://intelliapp.driverapponline.com/c/goxxii?r=Eve"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply Now
              </a>
            </Button>
          </div>
        </motion.div>

        {/* Service Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { value: "$2.50+", label: "Per Mile Consistently" },
            { value: "98%", label: "Utilization Rate" },
            { value: "Zero", label: "Detention Loss" },
            { value: "24/7", label: "Support Available" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-xl bg-card border border-border/50"
            >
              <p className="text-3xl font-display font-bold text-primary mb-2">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
