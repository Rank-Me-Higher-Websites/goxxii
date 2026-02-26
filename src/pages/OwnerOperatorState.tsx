import { useMemo } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, Phone } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import {
  getOrganizationSchema,
  getLocalBusinessSchema,
  getBreadcrumbSchema,
  getFAQSchema,
  getJobPostingSchema,
  getServiceSchema,
} from "@/data/schemaData";
import { TechBenefitsSection } from "@/components/sections/TechBenefitsSection";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { statePages } from "@/data/statePages";
import driverBlue from "@/assets/driver-truck-blue.jpg";
import heroBackground from "@/assets/heroes/truck-green-closeup.jpg";

const stats = [
  { value: "2009", label: "Established in" },
  { value: "$300K+", label: "Average Annual Income" },
  { value: "500+", label: "Successful Partnerships" },
  { value: "24/7", label: "Dispatch Support" },
];

const INTELLIAPP_URL = "https://intelliapp.driverapponline.com/c/goxxii?r=Eve";

const StruggleCarousel = ({ struggles }: { struggles: { emoji: string; title: string; desc: string }[] }) => {
  const [current, setCurrent] = useState(0);
  const itemsPerView = 3;
  const maxIndex = Math.max(0, struggles.length - itemsPerView);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [maxIndex]);

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out gap-6"
          style={{ transform: `translateX(-${current * (100 / itemsPerView + 2)}%)` }}
        >
          {struggles.map((item, index) => (
            <div
              key={index}
              className="glass p-6 rounded-xl flex-shrink-0"
              style={{ width: `calc((100% - ${(itemsPerView - 1) * 24}px) / ${itemsPerView})` }}
            >
              <div className="text-3xl mb-3">{item.emoji}</div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => setCurrent((p) => Math.max(0, p - 1))}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors"
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => setCurrent((p) => Math.min(maxIndex, p + 1))}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors"
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? "bg-primary" : "bg-muted-foreground/30"}`}
          />
        ))}
      </div>
    </div>
  );
};

const OwnerOperatorState = () => {
  const { state } = useParams<{ state: string }>();
  const strugglesRef = useRef(null);
  const strugglesInView = useInView(strugglesRef, { once: true, margin: "-100px" });
  const faqRef = useRef(null);
  const faqInView = useInView(faqRef, { once: true, margin: "-50px" });

  const pageData = state ? statePages[state] : undefined;

  const schemas = useMemo(() => {
    if (!pageData) return [];
    return [
      getOrganizationSchema(),
      getLocalBusinessSchema(),
      getBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Owner Operators", path: "/owner-operators" },
        { name: `${pageData.state} Jobs`, path: `/owner-operators/${pageData.slug}` },
      ]),
      getFAQSchema(pageData.faqs),
      getJobPostingSchema({
        title: `Owner Operator - ${pageData.state}`,
        description: `Owner operator trucking jobs in ${pageData.state}. Earn competitive linehaul pay with Fortune 500 freight. AI-powered tools, weekly settlements, 24/7 dispatch support.`,
        employmentType: "CONTRACTOR",
        minSalary: 150000,
        maxSalary: 300000,
        locationState: pageData.slug === "illinois" ? "IL" : pageData.state,
      }),
      getServiceSchema({
        name: `Owner Operator Program - ${pageData.state}`,
        description: `Independent contractor trucking opportunities in ${pageData.state} with Fortune 500 freight, competitive rates, fuel discounts, and 24/7 dispatch.`,
        url: `/owner-operators/${pageData.slug}`,
        areaServed: pageData.state,
      }),
    ];
  }, [pageData]);

  if (!pageData) {
    return <Navigate to="/owner-operators" replace />;
  }

  return (
    <Layout>
      <SEOHead
        title={pageData.seo.title}
        description={pageData.seo.description}
        keywords={pageData.seo.keywords}
        canonicalPath={`/owner-operators/${pageData.slug}`}
      />
      <SchemaMarkup schemas={schemas} />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${heroBackground})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />

        <div className="container-custom relative z-10 pt-24 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-yellow-400">⭑⭑⭑⭑⭑</span>
              <span className="text-muted-foreground text-sm">16+ years experience</span>
            </div>

            <div className="inline-block glass px-4 py-2 rounded-full mb-6">
              <span className="text-destructive">⚠️</span> {pageData.hero.badge.replace("⚠️ ", "")}
            </div>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight mb-6">
              {pageData.hero.headline} <span className="text-primary">{pageData.hero.highlightedText}</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              {pageData.hero.subtitle}
            </p>

            <Button variant="hero" size="lg" asChild>
              <a
                href={INTELLIAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ChevronRight className="w-5 h-5" />
                Apply & Discover Perks
              </a>
            </Button>
            <p className="text-sm text-muted-foreground mt-4">*For existing CDL drivers with licenses</p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          >
            {stats.map((stat, index) => (
              <div key={index} className="glass p-6 rounded-xl text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <TechBenefitsSection />

      {/* Struggles */}
      <section ref={strugglesRef} className="py-20 bg-muted/30">
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={strugglesInView ? { opacity: 1, y: 0 } : {}}
            className="font-display text-3xl md:text-4xl font-bold text-center mb-12"
          >
            We Know the <span className="text-primary">Struggles</span> for {pageData.state} Owner Operators:
          </motion.h2>

          <StruggleCarousel struggles={pageData.struggles} />

          <div className="text-center mt-8">
            <Button variant="heroOutline" size="lg" asChild>
              <a href="tel:+17735725012" className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Call Now: 773-572-5012
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src={driverBlue}
                alt={`Owner operator truck driver in ${pageData.state}`}
                className="rounded-2xl w-full"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Choose Better - Apply Now:</h3>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                What {pageData.state} Drivers Unlock:
              </h2>

              <ul className="space-y-3 mb-8">
                {pageData.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <Button variant="hero" size="lg" asChild>
                <a
                  href={INTELLIAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ChevronRight className="w-5 h-5" />
                  Apply Now
                </a>
              </Button>
              <p className="text-sm text-destructive mt-3">⚠️ Limited spaces available - apply now</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section ref={faqRef} className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={faqInView ? { opacity: 1, y: 0 } : {}}
            >
              <span className="label-tag mb-4">Get Started</span>
              <h2 className="heading-section text-foreground mb-4">
                {pageData.state} Owner Operator FAQ
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-4">
                Questions about <Link to="/owner-operators" className="text-primary hover:underline">owner operator earnings</Link> or{" "}
                <Link to="/company-drivers" className="text-primary hover:underline">company driver benefits</Link>? Our recruiting team responds quickly and honestly.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-6">
                Whether you're exploring <Link to="/careers" className="text-primary hover:underline">trucking job openings</Link> in {pageData.state} or have specific questions about our programs, we're here to help.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="hero" size="default" asChild>
                  <a href="tel:+17735725012" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Call 773-572-5012
                  </a>
                </Button>
                <Button variant="hero" size="default" asChild>
                  <a
                    href={INTELLIAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ChevronRight className="w-4 h-4" />
                    Apply Now
                  </a>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={faqInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
            >
              <Accordion type="single" collapsible className="space-y-2">
                {pageData.faqs.map((faq, index) => (
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
    </Layout>
  );
};

export default OwnerOperatorState;
