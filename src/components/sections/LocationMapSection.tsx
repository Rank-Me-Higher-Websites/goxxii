import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const LocationMapSection = () => {
  return (
    <section className="section-padding bg-card">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="label-tag mb-4">Find Us</span>
          <h2 className="heading-section text-foreground mb-4">
            Visit XXII Century
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Located in the heart of the Midwest, we're perfectly positioned to serve drivers nationwide
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="p-6 rounded-xl border border-border bg-background">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-display font-bold text-foreground mb-1">Address</h3>
                  <p className="text-muted-foreground text-sm">Chicago, IL</p>
                  <p className="text-muted-foreground text-sm">Serving Nationwide</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-background">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-display font-bold text-foreground mb-1">Phone</h3>
                  <a href="tel:224-240-6441" className="text-muted-foreground text-sm hover:text-primary transition-colors block">224-240-6441</a>
                  <a href="tel:630-948-0501" className="text-muted-foreground text-sm hover:text-primary transition-colors block">630-948-0501</a>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-background">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-display font-bold text-foreground mb-1">Email</h3>
                  <a href="mailto:hr@goxxii.com" className="text-muted-foreground text-sm hover:text-primary transition-colors block">hr@goxxii.com</a>
                  <a href="mailto:dispatch@goxxii.com" className="text-muted-foreground text-sm hover:text-primary transition-colors block">dispatch@goxxii.com</a>
                </div>
              </div>
            </div>

            <Button variant="hero" className="w-full" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 rounded-2xl overflow-hidden border border-border"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3439.888603579934!2d-88.01496617794307!3d41.750511826388085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e500278400037%3A0x1967b72b8a792753!2sXXII%20Century%20Inc!5e0!3m2!1sen!2slt!4v1767799536937!5m2!1sen!2slt"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="XXII Century Inc Location"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
