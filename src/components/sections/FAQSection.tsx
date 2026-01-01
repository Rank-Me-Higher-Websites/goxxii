import { motion, useInView } from "framer-motion";
import { useRef } from "react";
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
    question: "What types of truck driving jobs are available?",
    answer: "We offer a variety of opportunities for both owner operators and company CDL drivers, including local, regional, and over-the-road (OTR) positions. If you're searching for local owner operator jobs, we provide dedicated routes that offer consistent home time and steady freight. For drivers interested in long-haul or regional work, our dry van owner operator and company dry-van positions deliver reliable miles and strong earning potential.",
  },
  {
    question: "How do I apply for a driving position?",
    answer: "Applying is fast and straightforward. You can apply online through our secure application, or speak directly with a recruiter if you prefer a personal conversation. Our team is available to answer questions about pay, routes, home time, equipment requirements, and details like owner operator semi truck insurance, onboarding, and settlement schedules. Once you submit your application, our staff will walk you through every step of the hiring and onboarding process.",
  },
  {
    question: "How soon can I start driving after applying?",
    answer: "Most qualified drivers can start driving within just a few days after applying. After your application is reviewed, we quickly complete onboarding, verify documentation, assist with any required owner operator semi truck insurance information, and finalize your driver file. As soon as you're cleared, you'll be dispatched with your first load.",
  },
  {
    question: "Why should I choose XXII Century as an owner operator?",
    answer: "XXII Century offers premium freight access, AI-powered fuel management, dedicated shipper networks, and industry-leading support. We provide fast settlements, flexible routes, and treat our drivers as true partners in success. With 15+ years of experience and partnerships with Fortune 500 companies, we deliver the stability and earnings you deserve.",
  },
];

export const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-background relative overflow-hidden">
      <div className="container-custom relative z-10">
        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="heading-section text-foreground mb-4">
            GET IN TOUCH WITH US!
          </h2>
          <p className="body-large mb-8">
            Let us know how we can help. We&apos;d love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <a href="tel:+16309480501" className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <a href="mailto:hr@goxxii.com" className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Email Us
              </a>
            </Button>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <h3 className="font-display text-2xl font-bold text-foreground mb-8 text-center">
            Top Questions from Owner Operators Considering XXII Century
          </h3>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass rounded-xl border-0 px-6 overflow-hidden"
              >
                <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:text-primary hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
