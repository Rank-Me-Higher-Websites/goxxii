import { Layout } from "@/components/layout/Layout";
import { FAQSection } from "@/components/sections/FAQSection";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: ["224-240-6441", "630-948-0501"],
    action: "tel:+12242406441",
    actionLabel: "Call Now",
  },
  {
    icon: Mail,
    title: "Email",
    details: ["hr@goxxii.com", "dispatch@goxxii.com"],
    action: "mailto:hr@goxxii.com",
    actionLabel: "Send Email",
  },
  {
    icon: MapPin,
    title: "Location",
    details: ["Chicago, IL", "Serving Nationwide"],
    action: "https://maps.google.com/?q=Chicago,IL",
    actionLabel: "Get Directions",
  },
  {
    icon: Clock,
    title: "Hours",
    details: ["Mon-Fri: 8AM - 6PM", "Dispatch: 24/7"],
    action: null,
    actionLabel: null,
  },
];

const Contact = () => (
  <Layout>
    {/* Hero Section */}
    <section className="relative pt-32 pb-16 bg-gradient-to-br from-primary/10 via-background to-cyan-500/5">
      <div className="container-custom">
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
            Contact XXII Century
          </h1>
          <p className="text-muted-foreground text-lg">
            Have questions about joining our team or our services? We're here to help. 
            Reach out to our team and we'll get back to you as soon as possible.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Contact Cards */}
    <section className="section-padding">
      <div className="container-custom">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              className="p-6 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-3">
                {item.title}
              </h3>
              <div className="space-y-1 mb-4">
                {item.details.map((detail, i) => (
                  <p key={i} className="text-muted-foreground text-sm">
                    {detail}
                  </p>
                ))}
              </div>
              {item.action && (
                <Button variant="hero" size="sm" className="w-full" asChild>
                  <a
                    href={item.action}
                    target={item.action.startsWith("http") ? "_blank" : undefined}
                    rel={item.action.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {item.actionLabel}
                  </a>
                </Button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="section-padding bg-card">
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
                  href="https://intelliapp.driverapponline.com/c/goxxii?r=Eve"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apply To Drive
                </a>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <a href="tel:+12242406441" className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Call: 224-240-6441
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    <FAQSection />
  </Layout>
);

export default Contact;
