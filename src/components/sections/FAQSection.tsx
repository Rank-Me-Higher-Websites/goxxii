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

type FAQ = { question: string; answer: ReactNode };

const homeFaqs: FAQ[] = [
  {
    question: "What types of trucking jobs does XXII Century offer?",
    answer: (
      <div className="space-y-3">
        <p>We offer both <Link to="/owner-operators" className="text-primary hover:underline">owner operator</Link> and <Link to="/company-drivers" className="text-primary hover:underline">company driver</Link> CDL-A positions. Routes include local, regional, and OTR lanes across the U.S. and Canada, hauling for Fortune 500 shippers.</p>
        <p>Browse all open positions on our <Link to="/careers" className="text-primary hover:underline">careers page</Link>.</p>
      </div>
    ),
  },
  {
    question: "Where is XXII Century based?",
    answer: (
      <p>Our headquarters are in <strong className="text-foreground">Chicago, Illinois</strong>. We operate freight lanes nationwide and into Canada. Learn more on our <Link to="/about" className="text-primary hover:underline">about page</Link>.</p>
    ),
  },
  {
    question: "How do I apply to drive with XXII Century?",
    answer: (
      <div className="space-y-3">
        <p>Apply online through our <a href="https://intelliapp.driverapponline.com/c/goxxii?r=Eve" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">driver application</a>. Our recruiting team typically responds within 24 hours. You can also reach us via the <Link to="/contact" className="text-primary hover:underline">contact page</Link>.</p>
      </div>
    ),
  },
  {
    question: "Does XXII Century offer freight shipping services?",
    answer: (
      <p>Yes. We provide <Link to="/freight-shipping-services" className="text-primary hover:underline">dry van, refrigerated, and flatbed freight services</Link> for shippers and brokers. Our network covers the continental U.S. and Canada with dedicated and spot capacity.</p>
    ),
  },
  {
    question: "How long has XXII Century been in business?",
    answer: (
      <p>XXII Century has been in the trucking industry for over <strong className="text-foreground">16 years</strong>, building a reputation for reliability, safety, and transparent partnerships. Meet our <Link to="/about" className="text-primary hover:underline">leadership team</Link> to learn about the people behind the company.</p>
    ),
  },
];

const ownerOperatorFaqs: FAQ[] = [
  {
    question: "What percentage do owner operators keep at XXII Century?",
    answer: (
      <p>Owner operators receive competitive linehaul rates with <strong className="text-foreground">transparent settlements and zero hidden fees</strong>. There are no forced dispatch fees or trailer rental surprises. View full details on our <Link to="/owner-operators" className="text-primary hover:underline">owner operator program page</Link>.</p>
    ),
  },
  {
    question: "Do I need my own trailer to be an owner operator?",
    answer: (
      <p>No. XXII Century offers a large trailer network including dry vans, reefers, and flatbeds. You can use our trailers or bring your own. Learn about trailer options on our <Link to="/fleet-program" className="text-primary hover:underline">fleet program page</Link>.</p>
    ),
  },
  {
    question: "What fuel discounts are available for owner operators?",
    answer: (
      <p>We provide <strong className="text-foreground">large fleet volume fuel discounts</strong> at major truck stops nationwide. Our AI-powered fuel management tool helps you find the cheapest fuel on your route, saving you money on every trip.</p>
    ),
  },
  {
    question: "Can I choose my own routes as an owner operator?",
    answer: (
      <p>Yes. We offer flexible scheduling with both dedicated lanes and open-board freight. Whether you prefer local Chicago-area runs or long-haul OTR, we match loads to your preferences. <Link to="/contact" className="text-primary hover:underline">Talk to recruiting</Link> about available lanes.</p>
    ),
  },
  {
    question: "Is there a referral bonus for owner operators?",
    answer: (
      <p>Yes — we offer an <strong className="text-foreground">unlimited referral bonus program</strong>. Refer qualified drivers and earn $1,000 per referral with no cap. Contact our <Link to="/contact" className="text-primary hover:underline">recruiting team</Link> for details.</p>
    ),
  },
];

const companyDriverFaqs: FAQ[] = [
  {
    question: "How can I check my current MPG?",
    answer: (
      <p>MPG is calculated weekly and shown on the <strong className="text-foreground">leaderboard on this site</strong>. You can monitor your progress here at any time.</p>
    ),
  },
  {
    question: "When are the fuel incentive payouts processed?",
    answer: (
      <p>Bonuses are paid on the <strong className="text-foreground">first payroll of the following month</strong>, processed by the Accounting Department.</p>
    ),
  },
  {
    question: "What if I have questions or suggestions about the program?",
    answer: (
      <p>You can reach out to <a href="mailto:mantas@goxxii.com" className="text-primary hover:underline">mantas@goxxii.com</a> directly or submit feedback through the contact form on our <Link to="/contact" className="text-primary hover:underline">contact page</Link>.</p>
    ),
  },
  {
    question: "Do I need to sign up for the fuel incentive program?",
    answer: (
      <p>No — <strong className="text-foreground">all company drivers are automatically included</strong> in the program. No enrollment needed.</p>
    ),
  },
  {
    question: "What happens if two drivers have the same MPG?",
    answer: (
      <p>If two or more drivers achieve the same MPG in a week or month, the driver with the <strong className="text-foreground">lower idling percentage</strong> will be ranked higher on the leaderboard.</p>
    ),
  },
  {
    question: "Are Owner Operators eligible for monthly rewards?",
    answer: (
      <p>No — Owner Operators are <strong className="text-foreground">excluded</strong> from the driver incentive program. This program is for company drivers only.</p>
    ),
  },
];

const fleetProgramFaqs: FAQ[] = [
  {
    question: "What is the XXII Century Power Only program?",
    answer: (
      <p>Our Power Only program lets <Link to="/owner-operators" className="text-primary hover:underline">owner operators</Link> use their own tractor with our trailers to haul freight for Fortune 500 companies. We provide the loads, trailer access, and 24/7 dispatch support — you provide the power unit and driving expertise.</p>
    ),
  },
  {
    question: "What are the requirements to join the fleet program?",
    answer: (
      <div className="space-y-3">
        <p>To qualify you need:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Motor Carrier Authority</li>
          <li>DOT Number</li>
          <li>Auto Liability Insurance</li>
          <li>Cargo Liability Insurance</li>
          <li>Non-Owned Trailer Interchange Insurance</li>
        </ul>
        <p><Link to="/contact" className="text-primary hover:underline">Contact recruiting</Link> if you have questions about any requirement.</p>
      </div>
    ),
  },
  {
    question: "What types of trailers are available in the fleet program?",
    answer: (
      <p>Our trailer network includes <strong className="text-foreground">dry vans, reefers, and flatbeds</strong>. This diversity ensures you can haul a wide range of freight and stay loaded consistently. Learn more about our <Link to="/freight-shipping-services" className="text-primary hover:underline">freight services</Link>.</p>
    ),
  },
  {
    question: "What is the average income for fleet program drivers?",
    answer: (
      <p>Owner operators in our fleet program average <strong className="text-foreground">$100,000+ annually</strong>. Earnings depend on miles driven, freight type, and route preferences. We also offer a $1,000 referral bonus with no cap.</p>
    ),
  },
  {
    question: "Does the fleet program operate in Canada?",
    answer: (
      <p>Yes. We have freight lanes across the <strong className="text-foreground">continental U.S. and Canada</strong>, partnering with major corporations and government agencies on both sides of the border. Visit our <Link to="/about" className="text-primary hover:underline">about page</Link> to learn more about our operations.</p>
    ),
  },
];

const careersFaqs: FAQ[] = [
  {
    question: "What trucking career paths are available at XXII Century?",
    answer: (
      <div className="space-y-3">
        <p>We offer multiple career paths:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><Link to="/owner-operators" className="text-primary hover:underline">Owner operator</Link> — run your own business with our freight and support</li>
          <li><Link to="/company-drivers" className="text-primary hover:underline">Company driver</Link> — full employment with benefits and steady pay</li>
          <li><Link to="/fleet-program" className="text-primary hover:underline">Fleet program</Link> — Power Only opportunities with trailer access</li>
        </ul>
      </div>
    ),
  },
  {
    question: "Does XXII Century hire drivers in the Chicago area?",
    answer: (
      <p>Yes. Our headquarters are in <strong className="text-foreground">Chicago, IL</strong> and many of our dedicated lanes originate from the Chicagoland area. We have local, regional, and OTR positions based out of Chicago. <Link to="/contact" className="text-primary hover:underline">Reach out</Link> to see what's available near you.</p>
    ),
  },
  {
    question: "What is the hiring process like?",
    answer: (
      <div className="space-y-3">
        <p>Our process is straightforward:</p>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Submit your <a href="https://intelliapp.driverapponline.com/c/goxxii?r=Eve" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">online application</a></li>
          <li>Phone screening with our recruiting team</li>
          <li>Background and MVR verification</li>
          <li>Orientation and dispatch — many drivers start within days</li>
        </ol>
      </div>
    ),
  },
  {
    question: "Are there bonuses for safe driving?",
    answer: (
      <p>Yes. We offer <strong className="text-foreground">safety and inspection bonuses</strong> that reward clean CSA scores and DOT inspections. These are available to both <Link to="/owner-operators" className="text-primary hover:underline">owner operators</Link> and <Link to="/company-drivers" className="text-primary hover:underline">company drivers</Link>.</p>
    ),
  },
  {
    question: "Can I drive for XXII Century if I live outside Illinois?",
    answer: (
      <p>Absolutely. We have drivers across the country. While our base is in Chicago, our freight network spans the <strong className="text-foreground">entire U.S. and Canada</strong>. <Link to="/contact" className="text-primary hover:underline">Contact us</Link> to find lanes near your location.</p>
    ),
  },
];

const contactFaqs: FAQ[] = [
  {
    question: "What is the best way to reach XXII Century recruiting?",
    answer: (
      <p>Call us at <a href="tel:+16309480501" className="text-primary hover:underline font-semibold">630-948-0501</a> or email <a href="mailto:hr@goxxii.com" className="text-primary hover:underline">hr@goxxii.com</a>. You can also apply directly through our <a href="https://intelliapp.driverapponline.com/c/goxxii?r=Eve" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">online application</a>.</p>
    ),
  },
  {
    question: "What are XXII Century's office hours?",
    answer: (
      <p>Our dispatch operates <strong className="text-foreground">24/7</strong>. The recruiting and administrative office is available during standard business hours, Monday through Friday. For urgent matters, our dispatch team is always reachable.</p>
    ),
  },
  {
    question: "Where is XXII Century located?",
    answer: (
      <p>Our main office is in <strong className="text-foreground">Chicago, Illinois</strong>. We serve drivers and shippers across all 48 states and Canada. Visit our <Link to="/about" className="text-primary hover:underline">about page</Link> for more details on our operations.</p>
    ),
  },
  {
    question: "How quickly does the recruiting team respond?",
    answer: (
      <p>We typically respond within <strong className="text-foreground">24 hours</strong> of receiving your application or inquiry. For faster results, call our recruiting line directly at <a href="tel:+16309480501" className="text-primary hover:underline">630-948-0501</a>.</p>
    ),
  },
  {
    question: "Can shippers or brokers contact XXII Century for freight services?",
    answer: (
      <p>Yes. If you need <Link to="/freight-shipping-services" className="text-primary hover:underline">freight shipping services</Link> including dry van, refrigerated, or flatbed capacity, contact our logistics team. We partner with Fortune 500 companies and welcome new shipper relationships.</p>
    ),
  },
  {
    question: "Where can owner operators find tax help?",
    answer: (
      <p>Owner operators often benefit from working with professionals who understand trucking-specific deductions and compliance. You can explore <a href="https://qtatax.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">tax services</a> tailored to the transportation industry to make sure you're maximizing your write-offs each year.</p>
    ),
  },
];

const faqsByPage: Record<string, FAQ[]> = {
  home: homeFaqs,
  ownerOperators: ownerOperatorFaqs,
  companyDrivers: companyDriverFaqs,
  fleetProgram: fleetProgramFaqs,
  careers: careersFaqs,
  contact: contactFaqs,
};

interface FAQSectionProps {
  pageKey?: string;
}

export const FAQSection = ({ pageKey = "home" }: FAQSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const faqs = faqsByPage[pageKey] || homeFaqs;

  return (
    <section ref={ref} className="section-padding bg-background">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-center lg:text-left"
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
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
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
