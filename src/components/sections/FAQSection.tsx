import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "What jobs are available?",
    answer: (
      <div className="space-y-3">
        <p>
          We hire <strong className="text-foreground">CDL-A</strong> drivers for
          <strong className="text-foreground"> owner operator</strong> and
          <strong className="text-foreground"> company driver</strong> roles across
          Chicago and nationwide.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <Link to="/owner-operators" className="text-primary hover:underline">
              Owner operator opportunities
            </Link>{" "}
            with strong linehaul and transparent settlements
          </li>
          <li>
            <Link to="/company-drivers" className="text-primary hover:underline">
              Company driver positions
            </Link>{" "}
            with consistent miles and weekly pay
          </li>
          <li>Local, regional, and OTR lanes depending on availability</li>
        </ul>
      </div>
    ),
  },
  {
    question: "How do I apply?",
    answer: (
      <div className="space-y-3">
        <p>
          The fastest way is to submit the short application, then we’ll call you to
          confirm experience, lanes, and start date.
        </p>
        <p>
          Use our online application (external):{" "}
          <a
            href="https://intelliapp.driverapponline.com/c/goxxii?r=Eve"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Apply here
          </a>
          . Or contact recruiting via our{" "}
          <Link to="/contact" className="text-primary hover:underline">
            contact page
          </Link>
          .
        </p>
      </div>
    ),
  },
  {
    question: "How fast can I start?",
    answer: (
      <div className="space-y-3">
        <p>
          Many drivers start within a few days once paperwork is verified and you’re
          cleared for dispatch. We keep onboarding simple and communication clear.
        </p>
        <p>
          For exact timing, reach out to recruiting on the{" "}
          <Link to="/contact" className="text-primary hover:underline">
            Contact
          </Link>{" "}
          page.
        </p>
      </div>
    ),
  },
  {
    question: "Why choose XXII Century?",
    answer: (
      <div className="space-y-3">
        <p>
          We’re built for drivers who want steady freight, honest answers, and a
          carrier partner that respects your business.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong className="text-foreground">Fortune 500 freight</strong> and
            dependable lanes
          </li>
          <li>
            <strong className="text-foreground">Transparent pay</strong> (no
            surprise deductions)
          </li>
          <li>
            24/7 support and tech that helps reduce empty miles and delays
          </li>
        </ul>
        <p>
          Want to learn more about our logistics side? See{" "}
          <Link to="/freight-shipping-services" className="text-primary hover:underline">
            freight shipping services
          </Link>{" "}
          or read the official compliance overview at{" "}
          <a
            href="https://www.fmcsa.dot.gov/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            FMCSA
          </a>
          .
        </p>
      </div>
    ),
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
                  <AccordionContent className="text-sm text-muted-foreground pb-3 [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-primary/40 hover:[&_a]:decoration-primary [&_strong]:font-semibold">
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
