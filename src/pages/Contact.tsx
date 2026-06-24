import { useMemo, useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead, SEO_CONTENT } from "@/components/SEOHead";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import {
  getOrganizationSchema,
  getLocalBusinessSchema,
  getBreadcrumbSchema,
  getFAQSchema,
  getContactPageSchema,
  contactFaqsPlain,
} from "@/data/schemaData";
import { FAQSection } from "@/components/sections/FAQSection";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Truck, Users, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { SEOContentSection } from "@/components/sections/SEOContentSection";
import heroBackground from "@/assets/heroes/truck-white-field.png";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: ["630-914-6037"],
    action: "tel:+16309146037",
    actionLabel: "Call Now",
  },
  {
    icon: Mail,
    title: "Email",
    details: ["milos@goxxii.com", "dispatch@goxxii.com"],
    action: "mailto:milos@goxxii.com",
    actionLabel: "Send Email",
  },
  {
    icon: MapPin,
    title: "Location",
    details: ["7501 Lemont Rd Ste 200", "Woodridge, IL 60517, United States"],
    action: "https://maps.google.com/?q=7501+Lemont+Rd+Ste+200+Woodridge+IL+60517",
    actionLabel: "Get Directions",
  },
  {
    icon: Clock,
    title: "Hours",
    details: ["Mon-Fri: 8AM - 6PM", "Dispatch: 24/7"],
    action: "/careers",
    actionLabel: "View Careers",
  },
];

const contactReasons = [
  {
    icon: Truck,
    title: "Driver Recruiting",
    description: "Interested in owner operator or company driver positions? Our recruiting team responds within 24 hours to discuss pay, routes, and requirements.",
  },
  {
    icon: Users,
    title: "Fleet Partnerships",
    description: "Small carriers and fleet owners looking for steady freight can learn about our partnership programs and dedicated lane opportunities.",
  },
  {
    icon: Building,
    title: "Shipping Inquiries",
    description: "Businesses needing reliable freight shipping services can request quotes for dry van, FTL, and expedited transport nationwide.",
  },
];

const ContactCard = ({ item }: { item: typeof contactInfo[number] }) => (
  <>
    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
      <item.icon className="w-6 h-6 text-primary" />
    </div>
    <h3 className="font-display text-lg font-bold text-foreground mb-3">
      {item.title}
    </h3>
    <div className="space-y-1 mb-4 flex-1">
      {item.details.map((detail, i) => (
        <p key={i} className="text-muted-foreground text-sm">{detail}</p>
      ))}
    </div>
    {item.action && (
      item.action.startsWith("/") ? (
        <Button variant="hero" size="sm" className="w-full" asChild>
          <Link to={item.action}>{item.actionLabel}</Link>
        </Button>
      ) : (
        <Button variant="hero" size="sm" className="w-full" asChild>
          <a
            href={item.action}
            target={item.action.startsWith("http") ? "_blank" : undefined}
            rel={item.action.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {item.actionLabel}
          </a>
        </Button>
      )
    )}
  </>
);

const ContactMobileCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <div className="sm:hidden">
      <Carousel setApi={setApi} opts={{ align: "start", loop: true }} className="w-full">
        <CarouselContent className="-ml-3">
          {contactInfo.map((item) => (
            <CarouselItem key={item.title} className="pl-3 basis-[85%]">
              <div className="p-6 rounded-2xl border border-border bg-card flex flex-col h-full">
                <ContactCard item={item} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex justify-center gap-2 mt-4">
        {contactInfo.map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-primary" : "bg-muted-foreground/30"}`}
          />
        ))}
      </div>
    </div>
  );
};

const Contact = () => {
  const schemas = useMemo(() => [
    getOrganizationSchema(),
    getLocalBusinessSchema(),
    getBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Contact", path: "/contact" },
    ]),
    getFAQSchema(contactFaqsPlain),
    getContactPageSchema(),
  ], []);

  return (
    <Layout>
      <SEOHead
        title={SEO_CONTENT.contact.title}
        description={SEO_CONTENT.contact.description}
        keywords={SEO_CONTENT.contact.keywords}
        canonicalPath="/contact"
      />
      <SchemaMarkup schemas={schemas} />
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${heroBackground})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background pointer-events-none" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-primary text-sm font-semibold uppercase tracking-wider mb-4 block">
              Get In Touch
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Contact XXII Century Trucking
            </h1>
            <p className="text-muted-foreground text-lg mb-4">
              Have questions about joining our team or our freight services? Our <strong className="text-foreground">Woodridge, Illinois</strong> team is ready to help you take the next step in your trucking career.
            </p>
            <p className="text-muted-foreground mb-8">
              Whether you're exploring <Link to="/owner-operators" className="text-primary hover:underline">owner operator opportunities</Link>, <Link to="/company-drivers" className="text-primary hover:underline">CDL-A company driver positions</Link>, or <Link to="/freight-shipping-services" className="text-primary hover:underline">freight shipping solutions</Link>, we respond quickly and honestly.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <a
                  href="https://intelliapp.driverapponline.com/c/goxxii?r=bodan"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apply To Drive
                </a>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <a href="tel:+16309146037" className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Call Us
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="mt-8 md:mt-12" />

      {/* Contact Cards */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Desktop grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="p-6 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all duration-300 flex flex-col"
              >
                <ContactCard item={item} />
              </motion.div>
            ))}
          </div>

          {/* Mobile carousel */}
          <ContactMobileCarousel />
        </div>
      </section>

      {/* Why Contact Us Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              How Can We Help You Today?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              XXII Century serves professional drivers, fleet owners, and businesses across the nation. Here's what our team can assist you with:
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {contactReasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="p-6 rounded-xl border border-border bg-card"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <reason.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  {reason.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 text-center"
          >
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Our Chicago-area headquarters serves as the hub for our nationwide operations. From here, we coordinate <Link to="/freight-shipping-services" className="text-primary hover:underline">freight logistics</Link>, dispatch our network of <Link to="/owner-operators" className="text-primary hover:underline">independent owner operators</Link>, and support our <Link to="/company-drivers" className="text-primary hover:underline">company driver team</Link>. Whatever your trucking needs, <Link to="/careers" className="text-primary hover:underline">explore our job openings</Link> or reach out directly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Google Maps Embed */}
      <section className="section-padding-sm bg-card">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="heading-section text-foreground mb-2">Our Location</h2>
            <p className="text-muted-foreground">7501 Lemont Rd Ste 200, Woodridge, IL 60517</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden border border-border"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3439.888603579934!2d-88.01496617794307!3d41.750511826388085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e500278400037%3A0x1967b72b8a792753!2sXXII%20Century%20Inc!5e0!3m2!1sen!2slt!4v1767799536937!5m2!1sen!2slt"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="XXII Century Inc Location"
            />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-strong rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
            <div className="relative z-10">
              <h2 className="heading-section text-foreground mb-4">
                Ready to Start Your Trucking Career?
              </h2>
              <p className="body-large max-w-2xl mx-auto mb-8">
                Apply now and join hundreds of drivers who have found their home at XXII Century
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg" asChild>
                  <a
                    href="https://intelliapp.driverapponline.com/c/goxxii?r=bodan"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Apply To Drive
                  </a>
                </Button>
                <Button variant="heroOutline" size="lg" asChild>
                  <a href="tel:+16309146037" className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    Call: 630-914-6037
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <SEOContentSection pageKey="contact" />
      <FAQSection pageKey="contact" />
    </Layout>
  );
};

export default Contact;
