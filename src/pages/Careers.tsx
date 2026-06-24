import { useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead, SEO_CONTENT } from "@/components/SEOHead";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import {
  getOrganizationSchema,
  getLocalBusinessSchema,
  getBreadcrumbSchema,
  getFAQSchema,
  getJobPostingSchema,
  getServiceSchema,
  careersFaqsPlain,
} from "@/data/schemaData";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Truck, Users, Shield, CheckCircle, DollarSign, Clock, MapPin, Phone, Mail, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { FAQSection } from "@/components/sections/FAQSection";
import { SEOContentSection } from "@/components/sections/SEOContentSection";
import heroBackground from "@/assets/heroes/truck-green.png";
import truckMountainsImg from "@/assets/truck-mountains.jpg";

const positions = [
  {
    icon: Headphones,
    title: "OTR Dispatcher",
    description: "Coordinate freight movements, communicate with drivers, and optimize routes for maximum efficiency.",
    benefits: ["Competitive Salary", "Remote Options", "Growth Opportunities", "Team Environment"],
    slug: "otr-dispatcher",
    date: "February 26, 2026",
  },
  {
    icon: Truck,
    title: "Owner-Operator, Nationwide",
    description: "Maximize your earnings with access to premium freight, AI-powered tools, and an 80% revenue share.",
    benefits: ["80% Revenue Share", "Fuel Discounts", "Safety Bonuses", "Customer Lanes"],
    slug: "owner-operator-nationwide",
    date: "February 20, 2026",
  },
  {
    icon: Users,
    title: "Company Driver",
    description: "Join our team with competitive pay at 68 + 2 CPM, modern equipment, and a supportive work environment.",
    benefits: ["68 + 2 CPM", "Weekly Pay", "Paid Training", "Health Benefits"],
    slug: "company-driver",
    date: "February 15, 2026",
  },
];

const whyJoin = [
  {
    icon: DollarSign,
    title: "Competitive Pay",
    description: "Earn more with our industry-leading rates, bonuses, and weekly settlements.",
  },
  {
    icon: Clock,
    title: "Flexible Schedules",
    description: "Choose routes that work for you with regional, OTR, and dedicated options.",
  },
  {
    icon: MapPin,
    title: "Consistent Miles",
    description: "Stay loaded with our extensive shipper network and AI-optimized routing.",
  },
  {
    icon: Shield,
    title: "24/7 Support",
    description: "Dispatch, roadside assistance, and a team that has your back around the clock.",
  },
];

const PositionCard = ({ position }: { position: typeof positions[number] }) => (
  <div className="h-full p-8 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 group">
    <div className="flex items-center justify-between mb-4">
      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
        <position.icon className="w-7 h-7 text-primary" />
      </div>
      <span className="text-xs text-muted-foreground bg-background px-3 py-1 rounded-full border border-border">
        {position.date}
      </span>
    </div>
    <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
      {position.title}
    </h3>
    <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
      {position.description}
    </p>
    <ul className="space-y-2 mb-6">
      {position.benefits.map((benefit) => (
        <li key={benefit} className="flex items-center gap-2 text-sm text-foreground">
          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
          {benefit}
        </li>
      ))}
    </ul>
    <Button variant="hero" className="w-full" asChild>
      <Link to={`/careers/${position.slug}`} aria-label={`View details for ${position.title} position`}>
        View Details <ArrowRight className="w-4 h-4 ml-2" />
      </Link>
    </Button>
  </div>
);

const Careers = () => {
  const schemas = useMemo(() => [
    getOrganizationSchema(),
    getLocalBusinessSchema(),
    getBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Careers", path: "/careers" },
    ]),
    getFAQSchema(careersFaqsPlain),
    getServiceSchema({
      name: "Trucking Careers & Employment",
      description: "CDL-A driver, owner operator, and dispatcher career opportunities at XXII Century. Competitive pay, benefits, and career growth in the trucking industry.",
      url: "/careers",
    }),
    getJobPostingSchema({
      title: "OTR Dispatcher",
      description: "Coordinate freight movements, communicate with drivers, and optimize routes for maximum efficiency at XXII Century.",
      employmentType: "FULL_TIME",
      minSalary: 45000,
      maxSalary: 65000,
    }),
    getJobPostingSchema({
      title: "Owner-Operator, Nationwide",
      description: "Maximize your earnings with access to premium Fortune 500 freight, AI-powered tools, and competitive linehaul pay. No forced dispatch.",
      employmentType: "CONTRACTOR",
      minSalary: 150000,
      maxSalary: 300000,
    }),
    getJobPostingSchema({
      title: "Company Driver - CDL-A",
      description: "Join XXII Century as a company driver. Starting at 68 + 2 CPM with automatic raises, full benefits, modern equipment, and weekly pay.",
      employmentType: "FULL_TIME",
      minSalary: 65000,
      maxSalary: 120000,
    }),
  ], []);

  return (
    <Layout>
      <SEOHead 
        title={SEO_CONTENT.careers.title}
        description={SEO_CONTENT.careers.description}
        keywords={SEO_CONTENT.careers.keywords}
        canonicalPath="/careers"
      />
      <SchemaMarkup schemas={schemas} />
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-24" aria-label="Career opportunities at XXII Century trucking company">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${heroBackground})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        
        <div className="container-custom relative z-10 text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-4 tracking-tight">
              Adding a Pace <span className="text-primary">to Future</span>
            </h1>
            <p className="text-muted-foreground text-xl md:text-2xl font-medium mb-6">
              Truck Driver Jobs and More
            </p>
            <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto mb-10 leading-relaxed">
              At <strong className="text-foreground">XXII Century Inc.</strong>, we offer <strong className="text-foreground">trucking industry opportunities</strong> for experienced Company Drivers, independent Owner Operators, and OTR Dispatchers.
              <span className="hidden md:inline"> We are always looking to expand our team with passionate and dedicated individuals. Whether you're an experienced driver or just starting out, we have the perfect role for you.</span>
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <a
                  href="https://intelliapp.driverapponline.com/c/goxxii?r=bodan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                  aria-label="Apply now for truck driver jobs"
                >
                  Get Started <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <a href="tel:+16309146037" className="inline-flex items-center gap-2" aria-label="Call recruiting team">
                  <Phone className="w-5 h-5" /> Contact Us
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="max-w-4xl lg:max-w-none lg:flex-1"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6 text-center lg:text-left">
                Our Values & Culture
              </h2>
              <p className="text-center lg:text-left text-muted-foreground leading-relaxed mb-4">
                We value <strong className="text-foreground">hard work</strong>, <strong className="text-foreground">professionalism</strong>, and <strong className="text-foreground">safety</strong>, 
                and we're committed to offering <strong className="text-primary">competitive pay</strong> and <strong className="text-primary">flexible schedules</strong> to fit your needs. 
                At XXII Century Inc., you'll be part of a dynamic team that's shaping the future of the transportation industry.
              </p>
              <p className="text-center lg:text-left text-muted-foreground leading-relaxed">
                Our <Link to="/owner-operators" className="text-primary hover:underline">owner operator program</Link> offers 80% revenue share for independent truckers, while our <Link to="/company-drivers" className="text-primary hover:underline">company driver positions</Link> provide stable employment with full benefits. Fleet owners can explore our <Link to="/fleet-program" className="text-primary hover:underline">carrier partnership opportunities</Link> for steady freight access.
              </p>
              <div className="text-center lg:text-left mt-6">
                <Button variant="heroOutline" size="lg" asChild>
                  <a
                    href="https://intelliapp.driverapponline.com/c/goxxii?r=bodan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    Apply Now <ArrowRight className="w-5 h-5" />
                  </a>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="hidden lg:block lg:w-[45%] flex-shrink-0"
            >
              <img
                src={truckMountainsImg}
                alt="XXII Century truck driving through snowy mountains"
                className="rounded-2xl object-cover w-full h-[340px] border border-border"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="section-padding" aria-label="Current job openings">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Current CDL Driver Job Openings
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto mb-4">
              We are expanding and inviting professional truck drivers to join our team! Whether you're an experienced OTR driver or looking to transition into the trucking industry, we have positions that match your career goals.
            </p>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              All positions offer competitive pay, comprehensive benefits, and the support you need to succeed. Questions? <Link to="/contact" className="text-primary hover:underline">Contact our recruiting team</Link> or read our <Link to="/blog" className="text-primary hover:underline">driver career guides</Link>.
            </p>
          </motion.div>

          {/* Desktop grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {positions.map((position, index) => (
              <motion.article
                key={position.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="group"
              >
                <PositionCard position={position} />
              </motion.article>
            ))}
          </div>

          {/* Mobile carousel */}
          <div className="md:hidden">
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent className="-ml-3">
                {positions.map((position) => (
                  <CarouselItem key={position.title} className="pl-3 basis-[85%]">
                    <PositionCard position={position} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="section-padding bg-card" aria-label="Benefits of working at XXII Century">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Professional Drivers Choose XXII Century
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto mb-4">
              We're committed to your success on the road with industry-leading support, modern technology, and benefits that actually make a difference in your daily life.
            </p>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              From AI-powered fuel discounts that save you money to 24/7 dispatch support that has your back, we invest in tools and programs that help drivers earn more while working smarter. Learn more <Link to="/about" className="text-primary hover:underline">about our trucking company</Link> and our driver-first approach.
            </p>
          </motion.div>

          {/* Desktop grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyJoin.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="p-6 rounded-xl border border-border bg-background text-center hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Mobile carousel */}
          <div className="sm:hidden">
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent className="-ml-3">
                {whyJoin.map((item) => (
                  <CarouselItem key={item.title} className="pl-3 basis-[85%]">
                    <div className="p-6 rounded-xl border border-border bg-background text-center h-full">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-display text-lg font-bold text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
        </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary/10 via-background to-cyan-500/10" aria-label="Apply for trucking jobs">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Exciting Career Just a Few Clicks Away
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              We're always looking for passionate people to be a part of our team. Find a role that fits you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button variant="hero" size="lg" asChild>
                <a
                  href="https://intelliapp.driverapponline.com/c/goxxii?r=bodan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                  aria-label="Apply to drive with XXII Century"
                >
                  Apply To Drive <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-6 justify-center text-sm">
              <a href="tel:+16309146037" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-4 h-4" /> 630-914-6037
              </a>
              <a href="mailto:milos@goxxii.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-4 h-4" /> milos@goxxii.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <SEOContentSection pageKey="careers" />
      <FAQSection pageKey="careers" />
    </Layout>
  );
};

export default Careers;
