import { motion } from "framer-motion";
import { useParams, Navigate } from "react-router-dom";
import { useState, useMemo } from "react";
import {
  ChevronRight, ChevronsRight, Phone, Star, Check, Truck, Clock, Shield,
  DollarSign, MapPin, Fuel, Users, Package, Wrench, ParkingCircle,
  BadgeCheck, Zap, ArrowRight, AlertTriangle, CheckSquare, Diamond
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { QualifyFormDialog } from "@/components/QualifyFormDialog";
import {
  getOrganizationSchema,
  getLocalBusinessSchema,
  getBreadcrumbSchema,
  getJobPostingSchema,
} from "@/data/schemaData";
import heroDriver from "@/assets/hero-driver.png";
import truckRoad from "@/assets/driver-volvo-selfie.png";
import dispatchOffice from "@/assets/dispatch-clean.jpg";

const recruiterData: Record<string, { name: string; phone: string; phoneFormatted: string }> = {
  ben: { name: "Ben", phone: "+17735725012", phoneFormatted: "(773) 572-5012" },
  milos: { name: "Milos", phone: "+16309146037", phoneFormatted: "(630) 914-6037" },
};

const perks = [
  { icon: DollarSign, label: "68 + 2 CPM", sub: "Empty & Loaded" },
  { icon: Fuel, label: "+2 CPM", sub: "Fuel Bonus Day 1" },
  { icon: Truck, label: "Drop & Hook", sub: "70–80% No-Touch", highlight: true },
  { icon: MapPin, label: "3,000+ Mi", sub: "Weekly Miles" },
];

const highlights = [
  { icon: Truck, title: "New Volvos & Freightliners", desc: "Brand new equipment with all the comforts" },
  { icon: Package, title: "Fridges, Microwaves, APU", desc: "Inverters & disc brakes on every truck" },
  { icon: MapPin, title: "Customer Lanes", desc: "Consistent freight, steady miles every week" },
  { icon: Shield, title: "Dry Van Only", desc: "No-touch freight — less hassle" },
  { icon: Fuel, title: "Midwest, East, N & S", desc: "Wide running areas, more opportunities" },
  { icon: DollarSign, title: "Stops & Detention Paid", desc: "Extra stops, layovers — all compensated" },
  { icon: Users, title: "$1,500 Referral Bonus", desc: "Bring a friend, earn a bonus" },
  { icon: DollarSign, title: "Weekly Direct Deposits", desc: "Get paid every week, on time" },
  { icon: Star, title: "1099 Position", desc: "Independent contractor flexibility" },
  { icon: Clock, title: "Raises Every 6 Months", desc: "Consistent pay increases on schedule" },
];

const timeOff = [
  { weeks: "2", days: "2", label: "Weeks OTR", result: "Days Off" },
  { weeks: "3", days: "3", label: "Weeks OTR", result: "Days Off" },
  { weeks: "4", days: "4+", label: "Weeks OTR", result: "Days Off" },
];

const extras = [
  { icon: Users, text: "Passenger & Pet/Rider Policy" },
  { icon: Fuel, text: "Fuel Cards Provided" },
  { icon: Shield, text: "I-Pass & Pre-Pass" },
  { icon: ParkingCircle, text: "Gated Parking Lot" },
  { icon: Wrench, text: "24/7 Dispatch & Roadside Assistance" },
  { icon: Package, text: "Transport Provided!" },
];

const whatsIncluded = [
  { text: "80% of Gross Revenue" },
  { text: "Friday Paydays (Every Week)" },
  { text: "Free ELD & PrePass" },
  { text: "24/7 Dispatch Support" },
  { text: "Free Quarterly Inspections" },
  { text: "Serious Fuel Discounts" },
  { text: "Cargo & Liability Insurance" },
  { text: "No Hidden Fees Ever" },
];

const requirements = [
  { icon: BadgeCheck, text: "2 Years CDL-A Experience", emphasis: true },
  { icon: Shield, text: "Clean Record", emphasis: false },
  { icon: Shield, text: "No DUI / No SAP", emphasis: false },
  { icon: Zap, text: "Desire to Make Money!", emphasis: true },
];

const DriverFunnel = () => {
  const { recruiter } = useParams<{ recruiter: string }>();
  const data = recruiterData[recruiter || ""];
  const [qualifyOpen, setQualifyOpen] = useState(false);
  const schemas = useMemo(() => [
    getOrganizationSchema(),
    getLocalBusinessSchema(),
    getBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "OTR Driver", path: `/${recruiter}` },
    ]),
    getJobPostingSchema({
      title: "OTR Company Driver – Drop & Hook",
      description: "68 + 2 CPM empty & loaded. Drop & hook dry van. New Volvos & Freightliners. $2,200–$2,400/week potential.",
      employmentType: "CONTRACTOR",
      minSalary: 109200,
      maxSalary: 124800,
    }),
  ], [recruiter]);

  if (!data) return <Navigate to="/404" replace />;

  return (
    <Layout onApplyClick={() => setQualifyOpen(true)}>
      <SEOHead
        title="OTR Driver Jobs – $2,100–$2,400/Week | XXII Century"
        description="68 + 2 CPM fuel bonus. Drop & hook dry van, new trucks, customer lanes. Apply now for OTR company driver positions."
        keywords="OTR driver jobs, CDL-A jobs, drop and hook trucking, company driver 68 + 2 CPM, dry van jobs, trucking jobs Chicago"
        canonicalPath={`/${recruiter}`}
      />
      <SchemaMarkup schemas={schemas} />

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-fit lg:min-h-[85svh] flex items-center overflow-x-hidden">
        <div className="absolute inset-0">
          <img src={heroDriver} alt="Professional OTR truck driver" className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        </div>
        <div className="hidden lg:block absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
        <div className="hidden lg:block absolute bottom-40 left-10 w-96 h-96 bg-accent/15 rounded-full blur-[120px]" />
        <div className="absolute top-0 left-0 w-1 h-24 bg-gradient-to-b from-primary to-transparent" />
        <div className="absolute top-0 left-0 w-24 h-1 bg-gradient-to-r from-primary to-transparent" />

        <div className="relative z-10 pt-6 pb-4 lg:pt-20 lg:pb-8 px-4 sm:px-6 w-full max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-10">
            <div className="max-w-2xl flex-1">
              <div className="text-left max-w-full">
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-1.5 mb-1 px-2.5 py-0.5 rounded-full glass-strong border border-accent/30">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
                  </span>
                  <span className="text-[9px] lg:text-xs font-semibold text-accent uppercase tracking-wide">Now Hiring – Limited Spots</span>
                </motion.div>

                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight leading-[1.1] mb-1 lg:mb-2">
                  <span className="text-gradient">$2,100–$2,400/Week</span>
                  <br />
                  <span className="text-foreground text-base sm:text-2xl md:text-3xl">Drop & Hook OTR Driver</span>
                </motion.h1>

                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-muted-foreground text-xs lg:text-sm max-w-xl mb-2 lg:mb-4">
                  <span className="text-foreground font-semibold">68 + 2 CPM Empty & Loaded</span> starting Day 1. <span className="text-accent font-semibold">70–80% Drop &amp; Hook</span> — no-touch freight, less waiting, more miles. New trucks, customer lanes, dry van only.
                </motion.p>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 lg:gap-3 mb-3 lg:mb-5">
                  {perks.map((p) => (
                    <div
                      key={p.label}
                      className={`flex items-center gap-1.5 ${p.highlight ? "rounded-lg border border-accent/40 bg-accent/10 px-2 py-1 -my-1 shadow-[0_0_18px_hsl(var(--accent)/0.25)]" : ""}`}
                    >
                      <div className={`w-6 h-6 lg:w-8 lg:h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${p.highlight ? "bg-accent/25" : "bg-primary/20"}`}>
                        <p.icon className={`w-3 h-3 lg:w-4 lg:h-4 ${p.highlight ? "text-accent" : "text-primary"}`} />
                      </div>
                      <div className="min-w-0">
                        <div className={`text-[11px] lg:text-sm font-bold leading-tight ${p.highlight ? "text-accent" : "text-foreground"}`}>{p.label}</div>
                        <div className="text-[9px] lg:text-xs text-muted-foreground leading-tight">{p.sub}</div>
                      </div>
                    </div>
                  ))}
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="flex flex-row gap-2 items-center">
                  <Button
                    variant="hero"
                    size="default"
                    className="h-11 px-5 text-sm lg:h-14 lg:px-10 lg:text-base group pulse-glow-uniform flex-1 sm:flex-none"
                    onClick={() => setQualifyOpen(true)}
                    data-testid="button-apply-now-left"
                  >
                    <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                    <span className="whitespace-nowrap">Apply Now</span>
                  </Button>
                  <Button variant="heroOutline" size="default" className="h-11 px-5 text-sm lg:h-14 lg:px-10 lg:text-base flex-1 sm:flex-none" asChild>
                    <a href={`tel:${data.phone}`}>
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      <span className="whitespace-nowrap">{data.phoneFormatted}</span>
                    </a>
                  </Button>
                </motion.div>
              </div>
            </div>

            <div className="w-full lg:max-w-[560px] flex-shrink-0 mx-auto lg:mx-0 flex flex-col">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="relative rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl bg-card">
                  <video
                    className="w-full h-auto"
                    controls
                    playsInline
                    autoPlay
                    muted
                    preload="auto"
                    poster="https://vz-2fd304ff-2c7.b-cdn.net/abd64adf-5822-4788-9d14-2bc7bc6e7d46/thumbnail.jpg"
                  >
                    <source src="https://vz-2fd304ff-2c7.b-cdn.net/abd64adf-5822-4788-9d14-2bc7bc6e7d46/playlist.m3u8" type="application/x-mpegURL" />
                    <source src="https://vz-2fd304ff-2c7.b-cdn.net/abd64adf-5822-4788-9d14-2bc7bc6e7d46/play_720p.mp4" type="video/mp4" />
                  </video>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-2 lg:mt-4 flex items-center justify-center"
              >
                <div className="flex items-center gap-1.5 text-[11px] lg:text-xs text-foreground font-bold">
                  <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                  <span>Takes 30 seconds to apply</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section className="py-4 lg:py-6 bg-secondary border-y border-border">
        <div className="container-custom">
          <div className="grid grid-cols-4 gap-2 md:gap-4 text-center">
            {[
              { value: "$2,400", label: "Weekly Potential" },
              { value: "68 + 2", label: "CPM" },
              { value: "70-80%", label: "Drop & Hook" },
              { value: "3,000+", label: "Weekly Miles" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-sm sm:text-xl lg:text-2xl font-display font-bold text-gradient">{s.value}</div>
                <div className="text-[9px] sm:text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHAT YOU GET ═══ */}
      <section className="py-5 lg:py-6 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="container-custom relative z-10 px-4">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-3 lg:mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-1.5 lg:mb-2">
              <Package className="w-3 h-3" /> Full Package
            </span>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-display font-black text-foreground tracking-tight">What You Get</h2>
          </motion.div>
          <div className="flex flex-col lg:flex-row lg:items-stretch gap-3 lg:gap-4 max-w-5xl mx-auto">
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2 flex-1">
              {highlights.map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}
                  className="rounded-lg bg-secondary/80 border border-border/40 hover:border-accent/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-2 px-2.5 py-2.5 sm:flex-col sm:items-center sm:text-center sm:gap-2 sm:px-4 sm:py-4">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-accent/10 flex items-center justify-center flex-shrink-0 border border-accent/20">
                      <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-[11px] sm:text-xs font-black text-foreground leading-tight tracking-tight">{item.title}</h3>
                      <p className="text-[9px] sm:text-[10px] text-muted-foreground/70 leading-snug mt-0.5 hidden sm:block">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="hidden lg:block lg:w-[380px] flex-shrink-0 rounded-lg overflow-hidden">
              <img src={truckRoad} alt="XXII Century truck" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ WHAT'S INCLUDED ═══ */}
      <section className="py-8 lg:py-16 bg-secondary relative overflow-hidden border-y border-border/30">
        <div className="absolute inset-0">
          <img src={dispatchOffice} alt="" className="w-full h-full object-cover opacity-[0.08]" />
        </div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        <div className="container-custom max-w-4xl mx-auto relative z-10 px-4">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-4 lg:mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 lg:px-4 lg:py-1.5 rounded-full bg-accent/10 border border-accent/20 text-[10px] lg:text-xs font-bold text-accent uppercase tracking-[0.2em] mb-2 lg:mb-4">
              <Clock className="w-3 h-3 lg:w-3.5 lg:h-3.5" /> What's Included
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-black text-foreground tracking-tight leading-tight">
              Everything You Need.
              <br />
              <span className="text-gradient">Nothing You Don't.</span>
            </h2>
            <p className="text-xs lg:text-sm text-muted-foreground mt-2 lg:mt-3 max-w-lg mx-auto">
              No surprise fees. No mystery deductions. Just one clear percentage—
              <br className="hidden sm:block" />
              and you keep everything else.
            </p>
          </motion.div>

          <div className="flex justify-center mb-3 lg:mb-6">
            <Diamond className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-accent fill-accent" />
          </div>
          <div className="w-16 lg:w-24 h-0.5 bg-accent mx-auto mb-5 lg:mb-8 rounded-full" />

          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 max-w-xl mx-auto mb-6 lg:mb-10 gap-2.5 sm:gap-4">
            {whatsIncluded.map((item) => (
              <div key={item.text} className="flex items-center gap-2.5 sm:gap-3">
                <CheckSquare className="w-4 h-4 lg:w-5 lg:h-5 text-accent fill-accent/20 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-foreground">{item.text}</span>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-center justify-center mb-4 lg:mb-5">
            <Button variant="hero" size="default" className="w-full sm:w-auto h-12 lg:h-14 px-8 lg:px-10 text-sm lg:text-base font-bold uppercase tracking-wider" asChild>
              <a href={`tel:${data.phone}`} data-testid="button-call-included">
                <Phone className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                Call: {data.phoneFormatted}
              </a>
            </Button>
            <Button
              variant="heroOutline"
              size="default"
              className="w-full sm:w-auto h-12 lg:h-14 px-8 lg:px-10 text-sm lg:text-base font-bold uppercase tracking-wider group"
              onClick={() => setQualifyOpen(true)}
              data-testid="button-apply-included"
            >
              <ChevronsRight className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
              Apply Now
            </Button>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center">
            <div className="inline-flex items-center gap-2 text-[10px] lg:text-xs text-muted-foreground/70">
              <AlertTriangle className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-amber-500" />
              <span>We only accept drivers we're confident we can make more money.</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ TIME ON/OFF ═══ */}
      <section className="py-5 lg:py-6 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-[120px]" />
        <div className="container-custom max-w-5xl mx-auto relative z-10 px-4">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-3 lg:mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1.5 lg:mb-2">
              <Clock className="w-3 h-3" /> Flexible Schedule
            </span>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-display font-black text-foreground tracking-tight">Time On / Time Off</h2>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-stretch gap-3 lg:gap-4">
            <div className="flex-1 flex flex-col justify-center gap-2 lg:gap-3">
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                {timeOff.map((item, i) => (
                  <motion.div key={item.weeks} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    className="relative rounded-xl bg-secondary/60 backdrop-blur-sm border border-primary/15 hover:border-primary/35 transition-all duration-300 p-3 lg:p-4 text-center group"
                  >
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-9 h-9 lg:w-11 lg:h-11 rounded-full bg-gradient-to-br from-primary/25 to-primary/5 flex items-center justify-center mb-1.5 lg:mb-2 border border-primary/20 shadow-[0_0_15px_-5px_hsl(var(--primary)/0.3)]">
                        <span className="text-lg lg:text-xl font-display font-black text-primary">{item.weeks}</span>
                      </div>
                      <p className="text-[8px] lg:text-[10px] font-bold text-muted-foreground/60 uppercase tracking-[0.1em] mb-1 lg:mb-2">{item.label}</p>
                      <ArrowRight className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-primary/40 mb-1 lg:mb-2 rotate-90" />
                      <div className="text-xl lg:text-2xl font-display font-black bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">{item.days}</div>
                      <p className="text-[8px] lg:text-[10px] font-bold text-muted-foreground/60 uppercase tracking-[0.1em] mt-0.5">{item.result}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="rounded-lg border border-primary/25 bg-gradient-to-r from-primary/[0.06] via-primary/[0.03] to-primary/[0.06] px-3 lg:px-4 py-2 lg:py-2.5 text-center"
              >
                <div className="flex items-center justify-center gap-1.5 lg:gap-2">
                  <Zap className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-primary flex-shrink-0" />
                  <span className="text-[10px] lg:text-xs font-black text-primary tracking-tight">+1 extra day off for each additional week out</span>
                  <Zap className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-primary flex-shrink-0" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ EXTRAS ═══ */}
      <section className="py-5 lg:py-6 bg-background relative overflow-hidden">
        <div className="container-custom max-w-3xl mx-auto relative z-10 px-4">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-3 lg:mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-[10px] font-bold text-accent uppercase tracking-[0.2em]">
              <Star className="w-3 h-3" /> Extra Perks
            </span>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-1.5 sm:gap-2">
            {extras.map((e, i) => (
              <motion.div key={e.text} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                className="group relative rounded-lg bg-secondary/80 border border-border/40 hover:border-accent/30 transition-all duration-300 overflow-hidden"
              >
                <div className="flex items-center gap-2 px-2.5 py-2.5 sm:gap-3 sm:px-3 sm:py-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-accent/10 flex items-center justify-center flex-shrink-0 border border-accent/20">
                    <e.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-black text-foreground tracking-tight flex-1 leading-tight">{e.text}</span>
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent flex-shrink-0 hidden sm:block" />
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex justify-center mt-2.5 lg:mt-3">
            <div className="bg-secondary/80 px-3 lg:px-4 py-1.5 lg:py-2 rounded-full border border-border/30 text-[9px] lg:text-[10px] font-bold text-muted-foreground/70 tracking-wide">
              💡 Total Insurance Deductible: $2,500 ($100 deducted weekly)
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ BOTTOM CTA ═══ */}
      <section className="py-5 lg:py-6 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
        <div className="container-custom relative z-10 text-center px-4">
          <h2 className="text-base sm:text-lg lg:text-xl font-display font-bold text-foreground mb-1">Ready to Earn $2,100–$2,400/Week?</h2>
          <p className="text-[10px] lg:text-xs text-muted-foreground mb-3 lg:mb-4">Takes 2 min • No commitment • CDL-A Required</p>
          <div className="flex flex-col sm:flex-row gap-2 items-center justify-center">
            <Button variant="hero" size="default" className="w-full sm:w-auto h-11 lg:h-12 group pulse-glow" onClick={() => setQualifyOpen(true)} data-testid="button-apply-bottom">
                <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" />
                Apply Now
            </Button>
            <Button variant="heroOutline" size="default" className="w-full sm:w-auto h-11 lg:h-12" asChild>
              <a href={`tel:${data.phone}`}>
                <Phone className="w-4 h-4" />
                Call {data.name}: {data.phoneFormatted}
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIAL ═══ */}
      <section className="py-4 lg:py-5 bg-secondary">
        <div className="container-custom max-w-md mx-auto px-4">
          <div className="bg-secondary/80 rounded-lg p-3 border border-border/50 text-center">
            <div className="flex items-center justify-center gap-0.5 mb-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 lg:w-3.5 lg:h-3.5 fill-accent text-accent" />
              ))}
            </div>
            <p className="text-[11px] lg:text-xs text-muted-foreground italic mb-1.5">
              "Best carrier I have worked with in 20 years. Pay is always on time, support is amazing."
            </p>
            <p className="text-[11px] lg:text-xs font-semibold text-foreground">— Mike D., OTR Driver</p>
          </div>
        </div>
      </section>

      <QualifyFormDialog open={qualifyOpen} onOpenChange={setQualifyOpen} recruiter={recruiter} />
    </Layout>
  );
};

export default DriverFunnel;
