import { motion } from "framer-motion";
import { useParams, Navigate } from "react-router-dom";
import {
  ChevronRight, Phone, Star, Check, Truck, Clock, Shield,
  DollarSign, MapPin, Fuel, Users, Package, Wrench, ParkingCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { useMemo } from "react";
import {
  getOrganizationSchema,
  getLocalBusinessSchema,
  getBreadcrumbSchema,
  getJobPostingSchema,
} from "@/data/schemaData";
import heroDriver from "@/assets/hero-driver.png";

const recruiterData: Record<string, { name: string; phone: string; phoneFormatted: string }> = {
  ben: { name: "Ben", phone: "+17735725012", phoneFormatted: "(773) 572-5012" },
  milos: { name: "Milos", phone: "+16309146037", phoneFormatted: "(630) 914-6037" },
};

const perks = [
  { icon: DollarSign, label: "65 CPM", sub: "Empty & Loaded" },
  { icon: Fuel, label: "+2 CPM", sub: "Fuel Bonus Day 1" },
  { icon: Truck, label: "Drop & Hook", sub: "70–80% No-Touch" },
  { icon: MapPin, label: "3,000+ Mi", sub: "Weekly Miles" },
];

const highlights = [
  "New & Brand New Volvos and Freightliners",
  "Trucks Equipped with Fridges, Microwaves, Inverters, APU & Disc Brakes",
  "Dedicated Lanes – Consistent freight, steady miles",
  "Dry Van Only – No-touch freight",
  "Midwest, East, North & South Running Areas",
  "Extra Stops, Detentions & Layovers – Paid!",
  "Friend Referral Bonus ($1,500)",
  "Weekly Direct Deposits",
  "1099 Position",
];

const timeOff = [
  "2 Weeks OTR = 2 Days Off",
  "3 Weeks OTR = 3 Days Off",
  "4 Weeks OTR = 4+ Days Off",
  "Additional day off for each extra week out",
];

const extras = [
  { icon: Users, text: "Passenger & Pet/Rider Policy" },
  { icon: Fuel, text: "Fuel Cards Provided" },
  { icon: Shield, text: "I-Pass & Pre-Pass" },
  { icon: ParkingCircle, text: "Gated Parking Lot" },
  { icon: Wrench, text: "24/7 Dispatch & Roadside Assistance" },
  { icon: Package, text: "Transport Provided!" },
];

const requirements = [
  "2 Years CDL-A Experience",
  "Clean Record",
  "No DUI / No SAP",
  "Desire to Make Money!",
];

const DriverFunnel = () => {
  const { recruiter } = useParams<{ recruiter: string }>();
  const data = recruiterData[recruiter || ""];

  const schemas = useMemo(() => [
    getOrganizationSchema(),
    getLocalBusinessSchema(),
    getBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "OTR Driver", path: `/${recruiter}` },
    ]),
    getJobPostingSchema({
      title: "OTR Company Driver – Drop & Hook",
      description: "65 CPM empty & loaded + 2 CPM fuel bonus. Drop & hook dry van. New Volvos & Freightliners. $2,100–$2,400/week potential.",
      employmentType: "CONTRACTOR",
      minSalary: 109200,
      maxSalary: 124800,
    }),
  ], [recruiter]);

  if (!data) return <Navigate to="/404" replace />;

  return (
    <Layout>
      <SEOHead
        title="OTR Driver Jobs – $2,100–$2,400/Week | XXII Century"
        description="65 CPM + 2 CPM fuel bonus. Drop & hook dry van, new trucks, dedicated lanes. Apply now for OTR company driver positions."
        keywords="OTR driver jobs, CDL-A jobs, drop and hook trucking, company driver 65 CPM, dry van jobs, trucking jobs Chicago"
        canonicalPath={`/${recruiter}`}
      />
      <SchemaMarkup schemas={schemas} />

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[85svh] flex items-center overflow-x-hidden">
        <div className="absolute inset-0">
          <img src={heroDriver} alt="Professional OTR truck driver" className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        </div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-40 left-10 w-96 h-96 bg-accent/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-cyan-500/10 rounded-full blur-[80px]" />
        <div className="absolute top-0 left-0 w-1 h-24 bg-gradient-to-b from-primary to-transparent" />
        <div className="absolute top-0 left-0 w-24 h-1 bg-gradient-to-r from-primary to-transparent" />
        <div className="absolute bottom-0 right-0 w-1 h-24 bg-gradient-to-t from-accent to-transparent" />
        <div className="absolute bottom-0 right-0 w-24 h-1 bg-gradient-to-l from-accent to-transparent" />

        <div className="container-custom relative z-10 pt-20 pb-8">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
            {/* Left: Copy */}
            <div className="text-center lg:text-left max-w-full overflow-hidden">
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 rounded-full glass-strong border border-accent/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                <span className="text-xs font-semibold text-accent uppercase tracking-wide">Now Hiring – Limited Spots</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight leading-[1.1] mb-2">
                <span className="text-gradient">$2,100–$2,400/Week</span>
                <br />
                <span className="text-foreground text-xl sm:text-2xl md:text-3xl">Drop & Hook OTR Driver</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-muted-foreground text-sm max-w-xl mx-auto lg:mx-0 mb-4">
                <span className="text-foreground font-semibold">65 CPM Empty & Loaded + 2 CPM Fuel Bonus</span> starting Day 1. Get a raise every 6 months. New trucks, dedicated lanes, dry van only.
              </motion.p>

              {/* Stat Pills */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-wrap justify-center lg:justify-start gap-3 mb-5">
                {perks.map((p) => (
                  <div key={p.label} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                      <p.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground">{p.label}</div>
                      <div className="text-xs text-muted-foreground">{p.sub}</div>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="flex flex-row gap-3 items-center justify-center lg:justify-start">
                <Button variant="hero" size="default" className="group pulse-glow sm:h-14 sm:px-10 sm:text-base" asChild>
                  <a href="https://intelliapp.driverapponline.com/c/goxxii?r=Eve" target="_blank" rel="noopener noreferrer">
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                    <span>Apply Now</span>
                  </a>
                </Button>
                <Button variant="heroOutline" size="default" className="sm:h-14 sm:px-10 sm:text-base" asChild>
                  <a href={`tel:${data.phone}`}>
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span className="whitespace-nowrap">{data.phoneFormatted}</span>
                  </a>
                </Button>
              </motion.div>
            </div>

            {/* Right: VSL Video */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-card">
                <div
                  dangerouslySetInnerHTML={{
                    __html: `
                      <style>
                        wistia-player[media-id='j33b6mpgm1']:not(:defined) {
                          background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/j33b6mpgm1/swatch');
                          display: block;
                          filter: blur(5px);
                          padding-top: 56.25%;
                        }
                      </style>
                      <wistia-player media-id="j33b6mpgm1" aspect="1.7777777777777777" muted="false" autoplay="false"></wistia-player>
                    `
                  }}
                />
              </div>

              {/* Floating social proof */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-4 glass-strong rounded-xl px-4 py-3 border border-accent/30 hidden lg:inline-flex"
              >
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground border-2 border-card">M</div>
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-xs font-bold text-accent-foreground border-2 border-card">J</div>
                    <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-xs font-bold text-white border-2 border-card">R</div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">12 drivers joined</p>
                    <p className="text-xs text-muted-foreground">this week</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section className="py-6 bg-secondary border-y border-border">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { value: "$2,400", label: "Weekly Potential" },
              { value: "65 CPM", label: "Empty & Loaded" },
              { value: "70-80%", label: "Drop & Hook" },
              { value: "3,000+", label: "Weekly Miles" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-xl sm:text-2xl font-display font-bold text-gradient">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HIGHLIGHTS ═══ */}
      <section className="py-10 bg-background">
        <div className="container-custom">
          <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-4 text-center">What You Get</h2>
          <div className="grid sm:grid-cols-2 gap-2 max-w-3xl mx-auto">
            {highlights.map((item) => (
              <motion.div key={item} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-start gap-2 py-2 px-3 rounded-lg glass-strong border border-border/50">
                <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-sm text-foreground">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TIME ON/OFF ═══ */}
      <section className="py-8 bg-secondary">
        <div className="container-custom max-w-2xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-4">
            <Clock className="inline w-5 h-5 text-primary mr-2 -mt-0.5" />
            Time On / Off
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {timeOff.map((item) => (
              <div key={item} className="flex items-center gap-2 py-2 px-3 rounded-lg glass-strong border border-primary/20">
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ REQUIREMENTS ═══ */}
      <section className="py-8 bg-background">
        <div className="container-custom max-w-2xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-4">Requirements</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {requirements.map((r) => (
              <div key={r} className="flex items-center gap-2 py-2 px-3 rounded-lg glass-strong border border-accent/20">
                <Shield className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-sm text-foreground">{r}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EXTRAS ═══ */}
      <section className="py-8 bg-secondary">
        <div className="container-custom max-w-3xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-4 text-center">Extra Perks</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
            {extras.map((e) => (
              <div key={e.text} className="flex items-center gap-2 py-2 px-3 rounded-lg glass-strong border border-border/50">
                <e.icon className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground">{e.text}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground text-center mt-3">
            Total Insurance Deductible: $2,500 ($100 deducted weekly)
          </p>
        </div>
      </section>

      {/* ═══ BOTTOM CTA ═══ */}
      <section className="py-10 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
        <div className="container-custom relative z-10 text-center">
          <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-2">Ready to Earn $2,100–$2,400/Week?</h2>
          <p className="text-sm text-muted-foreground mb-5">Takes 2 min • No commitment • CDL-A Required</p>
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            <Button variant="hero" size="lg" className="group pulse-glow" asChild>
              <a href="https://intelliapp.driverapponline.com/c/goxxii?r=Eve" target="_blank" rel="noopener noreferrer">
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                Apply Now
              </a>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <a href={`tel:${data.phone}`}>
                <Phone className="w-4 h-4" />
                Call {data.name}: {data.phoneFormatted}
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIAL ═══ */}
      <section className="py-8 bg-secondary">
        <div className="container-custom max-w-md mx-auto">
          <div className="glass-strong rounded-xl p-4 border border-border/50 text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-accent text-accent" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground italic mb-2">
              "Best carrier I have worked with in 20 years. Pay is always on time, support is amazing."
            </p>
            <p className="text-sm font-semibold text-foreground">— Mike D., OTR Driver</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DriverFunnel;