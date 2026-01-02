import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, CheckCircle, Phone, Mail, Calendar, Briefcase, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const jobDetails: Record<string, {
  title: string;
  date: string;
  intro: string;
  responsibilities: string[];
  requirements: string[];
  offers: string[];
  location: string;
  type: string;
}> = {
  "otr-dispatcher": {
    title: "OTR Dispatcher",
    date: "March 20, 2025",
    intro: "We are expanding and inviting you to join our dispatch team! We want to hear from you if you have experience in a similar position!",
    responsibilities: [
      "Planning and managing truck routes",
      "Ongoing communication with drivers and clients",
      "Real-time problem-solving",
      "Efficient use of transport management systems",
    ],
    requirements: [
      "At least 2 years of experience as a dispatcher or fleet manager",
      "Strong communication skills and the ability to solve problems effectively",
      "Responsibility, the ability to work independently and as part of a team",
    ],
    offers: [
      "A stable position in a growing company",
      "Competitive salary and an attractive bonus system",
      "Training and opportunities for professional growth",
      "A friendly team and a modern work environment",
    ],
    location: "Remote / On-site",
    type: "Full-time",
  },
  "owner-operator-nationwide": {
    title: "Owner-Operator, Nationwide",
    date: "March 15, 2025",
    intro: "XXII Century is looking for motivated and experienced Owner-Operators to join our growing network. We provide consistent loads, transparent settlements, and dedicated support to help you maximize your earnings. Drive independently while benefiting from a strong partnership with a reliable company that values your professionalism and hard work.",
    responsibilities: [
      "Transport freight safely and efficiently across assigned routes",
      "Ensure timely pickups and deliveries while maintaining high standards of customer service",
      "Maintain accurate and thorough documentation, including logs, bills of lading, and trip reports",
      "Adhere to all federal, state, and local regulations, including Hours of Service (HOS) compliance",
      "Properly secure loads and conduct pre-trip and post-trip inspections",
      "Communicate effectively with dispatchers and logistics managers to ensure smooth operations",
      "Maintain the truck in good condition and ensure it meets safety and operational standards",
    ],
    requirements: [
      "Valid Commercial Driver's License (CDL)",
      "Minimum of 2 years of experience as an Owner-Operator or Company Driver",
      "Own a well-maintained and reliable truck that meets safety requirements",
      "Strong knowledge of U.S. traffic laws and regulations",
      "Excellent driving skills, attention to detail, and organizational abilities",
      "Willingness to handle long-haul trips and flexible schedules",
      "Proven track record of safe driving and professional conduct",
    ],
    offers: [
      "Competitive pay with weekly settlements and transparent payment structure",
      "Consistent freight with dedicated lanes and flexible scheduling",
      "Fuel discounts, maintenance support, and other cost-saving programs",
      "Partnership with a trusted company that values your independence and hard work",
      "Professional support from our logistics and dispatch teams",
    ],
    location: "Nationwide",
    type: "Contract / Partnership",
  },
  "company-driver": {
    title: "Company Driver",
    date: "February 20, 2025",
    intro: "XXII Century is seeking a reliable and experienced Company Driver to transport goods across the United States.",
    responsibilities: [
      "Safely and efficiently transport freight according to assigned routes",
      "Adhere to all federal, state, and local traffic laws and regulations",
      "Perform regular maintenance checks and ensure the vehicle is in good working condition",
      "Maintain accurate records (hours of service logs, load and delivery reports, etc.)",
      "Communicate effectively with dispatchers and logistics managers",
      "Ensure proper securing of cargo and adherence to safety standards",
    ],
    requirements: [
      "Valid Commercial Driver's License (CDL)",
      "Minimum of 2 years of experience",
      "Strong knowledge of U.S. traffic laws and regulations",
      "Excellent driving skills and vehicle handling abilities",
      "Ability to work independently and maintain a responsible approach to tasks",
      "Willingness to undertake long-haul trips and potential night shifts",
    ],
    offers: [
      "Competitive pay with opportunities for additional bonuses",
      "Stable work schedule with optional extra shifts",
      "Training programs and support for professional growth",
      "Health insurance and other employee benefits",
      "A friendly and supportive team environment",
    ],
    location: "Nationwide",
    type: "Full-time",
  },
};

const CareerDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const job = slug ? jobDetails[slug] : null;

  if (!job) {
    return (
      <Layout>
        <section className="min-h-[60vh] flex items-center justify-center pt-24">
          <div className="text-center">
            <h1 className="font-display text-3xl font-bold text-foreground mb-4">Position Not Found</h1>
            <p className="text-muted-foreground mb-6">The job listing you're looking for doesn't exist.</p>
            <Button variant="hero" asChild>
              <Link to="/careers">View All Positions</Link>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden" aria-label={`${job.title} job listing`}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-cyan-500/10" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-400 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              to="/careers" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Careers
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 text-xs bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20">
                <Calendar className="w-3 h-3" /> {job.date}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs bg-card text-muted-foreground px-3 py-1 rounded-full border border-border">
                <MapPin className="w-3 h-3" /> {job.location}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs bg-card text-muted-foreground px-3 py-1 rounded-full border border-border">
                <Clock className="w-3 h-3" /> {job.type}
              </span>
            </div>

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {job.title}
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed">
              {job.intro}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Responsibilities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-foreground">Job Responsibilities</h2>
                </div>
                <ul className="space-y-3 pl-2">
                  {job.responsibilities.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Requirements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-cyan-500" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-foreground">Requirements</h2>
                </div>
                <ul className="space-y-3 pl-2">
                  {job.requirements.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* What We Offer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-accent" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-foreground">What We Offer</h2>
                </div>
                <ul className="space-y-3 pl-2">
                  {job.offers.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="sticky top-24"
              >
                <div className="p-6 rounded-2xl border border-border bg-card">
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">
                    Start Your Career with XXII Century
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    If you are responsible, communicative, and looking for challenges – this position is for you!
                  </p>

                  <Button variant="hero" className="w-full mb-4" size="lg" asChild>
                    <a
                      href="https://intelliapp.driverapponline.com/c/goxxii?r=Eve"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Apply now for ${job.title} position`}
                    >
                      Apply Now <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>

                  <div className="pt-4 border-t border-border space-y-3">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                      Questions? Contact us
                    </p>
                    <a 
                      href="tel:630-948-0501" 
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Phone className="w-4 h-4" /> 630-948-0501
                    </a>
                    <a 
                      href="mailto:hr@goxxii.com" 
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Mail className="w-4 h-4" /> hr@goxxii.com
                    </a>
                  </div>
                </div>

                {/* Other positions */}
                <div className="mt-6 p-6 rounded-2xl border border-border bg-background">
                  <h4 className="font-display text-sm font-bold text-foreground mb-4">Other Positions</h4>
                  <ul className="space-y-2">
                    {Object.entries(jobDetails)
                      .filter(([key]) => key !== slug)
                      .map(([key, val]) => (
                        <li key={key}>
                          <Link 
                            to={`/careers/${key}`}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                          >
                            <ArrowRight className="w-3 h-3" /> {val.title}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gradient-to-br from-primary/10 via-background to-cyan-500/10">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              We look forward to welcoming you to our team!
            </h2>
            <p className="text-muted-foreground mb-6">
              XXII Century Inc – Drive with us!
            </p>
            <Button variant="hero" size="lg" asChild>
              <a
                href="https://intelliapp.driverapponline.com/c/goxxii?r=Eve"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply To Drive <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default CareerDetail;
