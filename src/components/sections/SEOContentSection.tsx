import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { TrendingUp, Shield, Cpu, Users, Clock, DollarSign, Truck, Star } from "lucide-react";
import truckMountains from "@/assets/xxii-mack-mountains.jpg";

interface SEOContentSectionProps {
  pageKey: "home" | "ownerOperators" | "companyDrivers" | "fleetProgram" | "freightServices" | "about" | "careers" | "blog" | "contact";
  sideImage?: string;
  sideImageAlt?: string;
}

const keyPoints: Record<string, { icon: any; label: string }[]> = {
  home: [
    { icon: DollarSign, label: "90% Revenue Share" },
    { icon: Cpu, label: "AI-Powered Dispatch" },
    { icon: Shield, label: "No Hidden Fees" },
    { icon: TrendingUp, label: "Fortune 500 Freight" },
    { icon: Clock, label: "24/7 Support" },
    { icon: Star, label: "15+ Years Trusted" },
  ],
  ownerOperators: [
    { icon: DollarSign, label: "90% Linehaul Pay" },
    { icon: Shield, label: "No Forced Dispatch" },
    { icon: Cpu, label: "AI Fuel Discounts" },
    { icon: Clock, label: "Weekly Settlements" },
  ],
  companyDrivers: [
    { icon: DollarSign, label: "65 CPM Starting" },
    { icon: Shield, label: "Full Benefits" },
    { icon: Truck, label: "Late-Model Equipment" },
    { icon: Users, label: "Home Weekly" },
  ],
  fleetProgram: [
    { icon: TrendingUp, label: "Premium Freight" },
    { icon: Shield, label: "Full Autonomy" },
    { icon: Cpu, label: "Real-Time Visibility" },
    { icon: Clock, label: "24/7 Support" },
  ],
  freightServices: [
    { icon: TrendingUp, label: "97% On-Time" },
    { icon: Cpu, label: "GPS Tracking" },
    { icon: Shield, label: "Vetted Carriers" },
    { icon: Truck, label: "Nationwide Coverage" },
  ],
};

const defaultImages: Record<string, { src: string; alt: string }> = {
  home: { src: truckMountains, alt: "XXII Century Mack truck in snowy mountains" },
};

const seoContent = {
  home: {
    heading: "Why Choose XXII Century for Your Trucking Career",
    paragraphs: [
      "XXII Century has been a trusted name in the <strong>Chicago trucking industry</strong> for over 15 years. We specialize in connecting skilled CDL-A drivers with high-paying freight opportunities from Fortune 500 companies. Whether you're searching for owner operator positions with 90% linehaul pay or company driver roles offering 65 CPM with full benefits, our team is committed to your success on the road.",
      "Our technology-driven approach sets us apart from traditional carriers. AI-powered dispatch optimizes your routes for maximum earnings while minimizing empty miles. Real-time load matching ensures you're never left searching for freight, and our 24/7 support team handles logistics so you can focus on driving. We invest in tools that put more money in your pocket.",
      "From the moment you apply, we prioritize transparency and respect. No hidden fees, no surprise deductions—just honest partnerships that help you build a sustainable trucking career. Join hundreds of drivers who have found their home with a carrier that truly values their contribution to keeping America moving."
    ],
    links: [
      { text: "Explore owner operator opportunities", href: "/owner-operators" },
      { text: "Learn about company driver benefits", href: "/company-drivers" },
      { text: "Partner your fleet with us", href: "/fleet-program" },
      { text: "View current job openings", href: "/careers" },
    ],
  },
  ownerOperators: {
    heading: "Independent Trucking Excellence with XXII Century",
    paragraphs: [
      "Owner operators choose XXII Century because we understand what it takes to run a <strong>successful independent trucking business</strong>. Our 90% linehaul revenue share means you keep more of every load, while our exclusive Fortune 500 contracts provide the steady freight volume you need to plan ahead and grow your operation without gambling on spot market rates.",
      "Unlike carriers that nickel-and-dime you with hidden fees, we believe in complete transparency. No ELD charges, no dispatch fees, no forced dispatch—just straightforward partnerships that respect your autonomy as a business owner. Our AI-powered fuel network delivers industry-leading discounts, and weekly settlements mean your money arrives reliably every Friday.",
      "Based in the <strong>Chicago logistics hub</strong>, we offer strategic access to major shipping lanes across the Midwest and nationwide. Whether you prefer dedicated routes for predictable schedules or flexible OTR runs for maximum earning potential, our experienced dispatch team works with you to build a schedule that fits your lifestyle and income goals."
    ],
    links: [
      { text: "Apply for independent driver positions", href: "https://intelliapp.driverapponline.com/c/goxxii?r=Eve", external: true },
      { text: "Compare company driver opportunities", href: "/company-drivers" },
      { text: "Read driver success stories", href: "/blog" },
      { text: "Contact our recruiting team", href: "/contact" },
    ],
  },
  companyDrivers: {
    heading: "Stable Trucking Careers with Full Support",
    paragraphs: [
      "XXII Century offers <strong>CDL-A company driver positions</strong> designed for professionals who want consistent earnings without the overhead of truck ownership. Starting at 63 CPM with performance bonuses, our drivers earn $83,000–$95,000 annually while enjoying comprehensive health benefits, 401k matching, and paid time off that lets you recharge.",
      "Our modern fleet features late-model equipment with the latest safety technology, ensuring comfortable and efficient runs mile after mile. Automatic pay increases every 75,000 miles reward your loyalty and experience, while safety bonuses and fuel incentives put extra money in your pocket throughout the year. We recognize hard work.",
      "We understand that <strong>home time matters</strong>. That's why we offer flexible scheduling options, dedicated lanes, and regional routes that keep you closer to family. Our dispatch team respects your preferences and works to balance your earning potential with your personal life—because trucking shouldn't mean sacrificing everything else."
    ],
    links: [
      { text: "Submit your driver application", href: "https://intelliapp.driverapponline.com/c/goxxii?r=Eve", external: true },
      { text: "Explore owner operator programs", href: "/owner-operators" },
      { text: "Meet our leadership team", href: "/about" },
      { text: "Browse available positions", href: "/careers" },
    ],
  },
  fleetProgram: {
    heading: "Grow Your Fleet with a Trusted Carrier Partner",
    paragraphs: [
      "Fleet owners and small carriers partner with XXII Century to access <strong>premium freight without sacrificing control</strong> of their operations. Our fleet partnership program provides consistent load volumes from established shippers, competitive rates, and dedicated dispatch support—everything you need to scale your trucking business profitably.",
      "We've spent over 15 years building relationships with Fortune 500 companies who value reliability and professionalism. As a fleet partner, you benefit from these connections while maintaining full autonomy over your trucks and drivers. No forced dispatch, no micromanagement—just steady freight and transparent settlements every week.",
      "Our technology platform gives you real-time visibility into load assignments, settlements, and performance metrics. Combined with 24/7 support from our experienced team, you'll have the tools and resources to <strong>maximize utilization</strong> and grow your fleet with confidence in any market conditions."
    ],
    links: [
      { text: "Start your fleet partnership", href: "/contact" },
      { text: "Individual owner operator options", href: "/owner-operators" },
      { text: "Discover our freight capabilities", href: "/freight-shipping-services" },
      { text: "Learn about our company values", href: "/about" },
    ],
  },
  freightServices: {
    heading: "Reliable Logistics Solutions for Your Business",
    paragraphs: [
      "XXII Century delivers comprehensive <strong>freight shipping services</strong> backed by a vetted network of professional carriers and cutting-edge logistics technology. From dry van and full truckload shipments to expedited delivery and specialized handling, we provide solutions tailored to your supply chain needs across the continental United States.",
      "Our shipper partnerships are built on performance, not promises. Real-time GPS tracking, geofencing alerts, and predictive analytics give you complete visibility into every shipment. On-time delivery rates exceed 97%, and our proactive communication keeps you informed from pickup to final delivery without chasing updates.",
      "Whether you're moving products across the Midwest or coordinating <strong>nationwide distribution</strong>, our team has the expertise to optimize your freight strategy. We handle carrier vetting, rate negotiation, and load management so you can focus on growing your business while we handle the logistics."
    ],
    links: [
      { text: "Request a freight quote", href: "/contact" },
      { text: "Join our carrier network", href: "/fleet-program" },
      { text: "CDL driver career opportunities", href: "/careers" },
      { text: "About our logistics company", href: "/about" },
    ],
  },
  about: {
    heading: "A Driver-First Trucking Company Since 2009",
    paragraphs: [
      "XXII Century was founded with a simple mission: <strong>treat drivers the way they deserve to be treated</strong>. For over 15 years, we've built a Chicago-based trucking company that puts people first—offering fair pay, honest communication, and genuine support for every member of our team whether they run their own truck or drive ours.",
      "Our growth from a small local carrier to a nationwide logistics partner reflects our commitment to doing things right. We've earned the trust of Fortune 500 shippers by delivering consistent results, and we've built a loyal driver community by keeping our promises. When we say no hidden fees, we mean it—every time.",
      "Today, XXII Century serves drivers and shippers across the country while staying true to our <strong>Midwest roots and values</strong>. Our leadership team brings decades of industry experience, and our 24/7 support staff treats every call like it matters—because it does. That's the XXII Century difference."
    ],
    links: [
      { text: "Join our driving team", href: "/careers" },
      { text: "Owner operator job details", href: "/owner-operators" },
      { text: "Company driver positions available", href: "/company-drivers" },
      { text: "Get in touch with our team", href: "/contact" },
    ],
  },
  careers: {
    heading: "Build Your Future in the Trucking Industry",
    paragraphs: [
      "XXII Century is actively hiring <strong>CDL-A drivers, dispatchers, and logistics professionals</strong> who share our passion for excellence. We offer multiple career paths—from high-earning owner operator partnerships to stable company driver positions with full benefits—designed to match your goals and lifestyle preferences.",
      "Our hiring process is straightforward and respectful of your time. Apply online in minutes, speak with a recruiter within 24 hours, and get on the road quickly with our streamlined onboarding. We provide paid orientation, equipment training, and ongoing support to set you up for success from day one—no games, no waiting.",
      "Beyond competitive pay, we invest in your <strong>long-term career growth</strong>. Performance bonuses, safety incentives, and automatic raises reward your hard work, while our driver community offers networking opportunities and industry insights. This isn't just a job—it's a career you can build on for years to come."
    ],
    links: [
      { text: "Explore owner operator earnings", href: "/owner-operators" },
      { text: "Company driver pay and benefits", href: "/company-drivers" },
      { text: "Learn about fleet partnerships", href: "/fleet-program" },
      { text: "Questions? Contact recruiting", href: "/contact" },
    ],
  },
  blog: {
    heading: "Expert Insights for Professional Drivers",
    paragraphs: [
      "Our <strong>trucking industry blog</strong> delivers actionable advice for owner operators, company drivers, and anyone considering a career behind the wheel. From maximizing fuel efficiency to navigating regulatory changes, we share the knowledge our team has gained over 15+ years in the logistics industry to help you succeed.",
      "Stay informed about market trends, equipment innovations, and best practices that can boost your earnings and improve your quality of life on the road. Whether you're a seasoned professional or exploring trucking for the first time, our articles are written by industry experts who understand the real challenges drivers face daily.",
      "We also spotlight driver success stories and company updates that showcase what it's <strong>really like to work with XXII Century</strong>. Real experiences from real drivers—not marketing fluff—help you make informed decisions about your trucking career and which carrier deserves your talent."
    ],
    links: [
      { text: "View owner operator job openings", href: "/owner-operators" },
      { text: "Company driver career opportunities", href: "/company-drivers" },
      { text: "Browse all open positions", href: "/careers" },
      { text: "Reach out to our team", href: "/contact" },
    ],
  },
  contact: {
    heading: "Connect with Our Chicago Trucking Team",
    paragraphs: [
      "Ready to take the next step in your trucking career? Our <strong>recruiting team in Woodridge, Illinois</strong> is available Monday through Friday to answer your questions about owner operator programs, company driver positions, and fleet partnerships. We respond quickly because we know your time is valuable—usually within a few hours.",
      "For drivers already on our team, our 24/7 dispatch and support line ensures you're never alone on the road. Whether you need load assistance, routing help, or just someone to talk through a challenge, we're here for you around the clock. Real support from real people who understand trucking.",
      "Shippers and freight partners can also reach out to discuss <strong>logistics solutions tailored to your business</strong> needs. From rate quotes to capacity planning, our team has the experience to help you move freight efficiently and reliably whether you're shipping regionally or nationwide."
    ],
    links: [
      { text: "Apply for trucking positions", href: "/careers" },
      { text: "Owner operator program details", href: "/owner-operators" },
      { text: "Company driver opportunities", href: "/company-drivers" },
      { text: "Freight and shipping services", href: "/freight-shipping-services" },
    ],
  },
};

export const SEOContentSection = ({ pageKey, sideImage, sideImageAlt }: SEOContentSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const content = seoContent[pageKey];
  const badges = keyPoints[pageKey] || [];
  const fallbackImage = defaultImages[pageKey];
  const imageToShow = sideImage || fallbackImage?.src;
  const imageAlt = sideImageAlt || fallbackImage?.alt || "";

  if (!content) return null;

  return (
    <section ref={ref} className="section-padding bg-card/50 border-y border-border relative overflow-hidden">
      {/* Subtle background accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className={`flex flex-col ${imageToShow ? 'lg:flex-row lg:gap-12' : ''}`}>
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className={`${imageToShow ? 'lg:flex-1' : 'max-w-4xl mx-auto'} text-center ${imageToShow ? 'lg:text-left' : ''}`}
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
              {content.heading}
            </h2>

            {/* Key Point Badges */}
            {badges.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.15 }}
                className={`flex flex-wrap gap-2 mb-6 ${imageToShow ? 'justify-center lg:justify-start' : 'justify-center'}`}
              >
                {badges.map((badge, i) => (
                  <motion.span
                    key={badge.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.2 + i * 0.06 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20"
                  >
                    <badge.icon className="w-3.5 h-3.5" />
                    {badge.label}
                  </motion.span>
                ))}
              </motion.div>
            )}
            
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {content.paragraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 * (index + 1) }}
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                  className="[&>strong]:text-foreground [&>strong]:font-semibold"
                />
              ))}
            </div>

            {/* Internal Links */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="mt-8 pt-6 border-t border-border"
            >
              <p className="text-sm text-muted-foreground mb-3">Learn more:</p>
              <div className={`flex flex-wrap gap-3 ${imageToShow ? 'justify-center lg:justify-start' : 'justify-center'}`}>
                {content.links.map((link, index) => (
                  link.external ? (
                    <a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
                    >
                      {link.text}
                    </a>
                  ) : (
                    <Link
                      key={index}
                      to={link.href}
                      className="text-sm text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
                    >
                      {link.text}
                    </Link>
                  )
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Side Image */}
          {imageToShow && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:flex lg:w-[42%] flex-shrink-0 items-center"
            >
              <div className="relative w-full">
                <div className="rounded-2xl overflow-hidden border border-border img-hover-glow">
                  <img
                    src={imageToShow}
                    alt={imageAlt}
                    className="w-full h-[400px] object-cover"
                  />
                </div>
                {/* Decorative accent corner */}
                <div className="absolute -bottom-3 -left-3 w-20 h-20 border-b-2 border-l-2 border-primary/30 rounded-bl-2xl pointer-events-none" />
                <div className="absolute -top-3 -right-3 w-20 h-20 border-t-2 border-r-2 border-primary/30 rounded-tr-2xl pointer-events-none" />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
