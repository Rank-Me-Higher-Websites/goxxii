import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What jobs are available?",
    answer: "Owner operator and company CDL positions — local, regional, and OTR. Dedicated routes with consistent home time and steady freight.",
  },
  {
    question: "How do I apply?",
    answer: "Apply online or call a recruiter. We answer questions about pay, routes, insurance, and onboarding. Fast approval process.",
  },
  {
    question: "How fast can I start?",
    answer: "Most drivers start within days. Quick onboarding, doc verification, and immediate dispatch once cleared.",
  },
  {
    question: "Why choose XXII Century?",
    answer: "Premium freight, AI tools, fast settlements, 24/7 support. 15+ years experience. Fortune 500 partnerships.",
  },
];

export const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="section-padding bg-background">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            <span className="label-tag mb-4">Get Started</span>
            <h2 className="heading-section text-foreground mb-4">
              Ready to Drive?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-4">
              Questions about <Link to="/owner-operators" className="text-primary hover:underline">owner operator earnings</Link> or <Link to="/company-drivers" className="text-primary hover:underline">company driver benefits</Link>? Our recruiting team responds quickly and honestly.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground mb-6">
              Whether you're exploring <Link to="/careers" className="text-primary hover:underline">trucking job openings</Link> or have specific questions about our programs, we're here to help you make the right decision for your career.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="hero" size="default" asChild>
                <a href="tel:+16309480501" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Call
                </a>
              </Button>
              <Button variant="heroOutline" size="default" asChild>
                <a href="mailto:hr@goxxii.com" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </a>
              </Button>
            </div>
          </motion.div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="rounded-lg border border-border bg-card px-4 overflow-hidden"
                >
                  <AccordionTrigger className="text-left text-sm font-semibold text-foreground hover:text-primary hover:no-underline py-3">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground pb-3">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
