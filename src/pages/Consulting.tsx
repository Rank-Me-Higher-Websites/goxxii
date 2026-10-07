import { useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  ChevronRight, Phone, Route, Network, Calculator, Users, Truck, Fuel, BarChart3, Check,
  ShieldCheck, TrendingDown, TrendingUp, Clock, DollarSign, FileText, Map, Target, Handshake,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead, SEO_CONTENT } from "@/components/SEOHead";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  getOrganizationSchema,
  getLocalBusinessSchema,
  getBreadcrumbSchema,
  getServiceSchema,
  getFAQSchema,
} from "@/data/schemaData";
import heroBackground from "@/assets/xxii-new-2.jpg";
import photoDispatch from "@/assets/office-dispatch.jpg";
import photoLane from "@/assets/xxii-truck-road-clean.png";
import photoDriver from "@/assets/driver-truck-blue.jpg";
import photoFleet from "@/assets/xxii-truck-chicago.jpg";

// Main office line — consulting is a company touchpoint, not recruiting (see routeMetaMap copy rules).
const PHONE = { display: "(630) 948-0501", tel: "+16309480501" };

// Tile colour pairs, matching the tinted-icon style used on Freight Services.
const TINT = {
  blue: "bg-blue-500/15 text-blue-400",
  green: "bg-green-500/15 text-green-400",
  violet: "bg-purple-500/15 text-purple-400",
  orange: "bg-orange-500/15 text-orange-400",
  red: "bg-red-500/15 text-red-400",
  teal: "bg-teal-500/15 text-teal-400",
} as const;

interface Lane {
  name: string;
  rpm: string;
  margin: number;
  verdict: "Grow" | "Reprice" | "Cut";
}

const sampleLanes: Lane[] = [
  { name: "Chicago, IL → Atlanta, GA", rpm: "$2.71/mi", margin: 18, verdict: "Grow" },
  { name: "Joliet, IL → Dallas, TX", rpm: "$2.48/mi", margin: 11, verdict: "Grow" },
  { name: "Atlanta, GA → Chicago, IL", rpm: "$1.62/mi", margin: -7, verdict: "Reprice" },
  { name: "Dallas, TX → Laredo, TX", rpm: "$1.38/mi", margin: -14, verdict: "Cut" },
];

const verdictStyle: Record<Lane["verdict"], string> = {
  Grow: "bg-green-500/15 text-green-400",
  Reprice: "bg-primary/20 text-blue-300",
  Cut: "bg-red-500/15 text-red-400",
};

const stats = [
  { value: "17+", label: "Years in Trucking" },
  { value: "97%", label: "On-Time Delivery" },
  { value: "100+", label: "Active Drivers" },
  { value: "24/7", label: "Dispatch Support" },
];

const leaks: { icon: LucideIcon; title: string; description: string }[] = [
  { icon: Route, title: "Long deadhead legs", description: "Empty miles that never show up on the rate confirmation." },
  { icon: TrendingDown, title: "Backhauls priced to fill, not to pay", description: "Cheap return loads that drag your network average down." },
  { icon: Clock, title: "Unbilled detention", description: "Hours at the dock that cost you drive time and never get invoiced." },
  { icon: Users, title: "Customers that cost more than they pay", description: "High dwell, slow payment, and accessorial disputes buried in good-looking rates." },
];

const services: { icon: LucideIcon; tint: keyof typeof TINT; title: string; description: string; points: string[] }[] = [
  {
    icon: Route, tint: "blue", title: "Lane Profitability Analysis",
    description: "We rank every lane by true margin, not just rate per mile, so you know which lanes to grow, reprice, or drop.",
    points: ["Margin by lane after deadhead, dwell, tolls, and fuel", "Headhaul vs. backhaul breakdown", "Grow / reprice / cut recommendation per lane"],
  },
  {
    icon: Network, tint: "green", title: "Freight Network Optimization",
    description: "We redesign your network for density and balance so trucks stay loaded and drivers get home on schedule.",
    points: ["Balanced lane loops and freight density mapping", "Domicile and drop-yard placement", "Dedicated vs. OTR mix analysis"],
  },
  {
    icon: Calculator, tint: "violet", title: "Cost-Per-Mile Modeling",
    description: "A ground-up cost model for your fleet, benchmarked against industry data, so you know your real floor rate.",
    points: ["Fixed, variable, and driver cost per truck", "Break-even and target rate per lane", "Industry benchmark comparison"],
  },
  {
    icon: Users, tint: "orange", title: "Customer & Contract Profitability",
    description: "Profitability scorecards for every shipper, plus data-backed pricing for RFPs and contract renewals.",
    points: ["Revenue, dwell, accessorials, and payment terms", "RFP bid pricing and renewal strategy", "Detention and accessorial recovery"],
  },
  {
    icon: Truck, tint: "red", title: "Asset Utilization & Deadhead Reduction",
    description: "We find the scheduling and load-planning gaps that leave trucks parked or running empty, then close them.",
    points: ["Miles per truck per week", "Empty-mile percentage by lane and terminal", "Idle equipment and trailer pool review"],
  },
  {
    icon: Fuel, tint: "teal", title: "Fuel & Driver Performance Analytics",
    description: "MPG, idle time, and route efficiency by driver and truck, with incentive programs that reward results. We run the same program on our own fleet.",
    points: ["Weekly MPG and idle-time tracking", "Fuel-efficiency bonus program design", "Driver performance leaderboards"],
  },
];

const steps = [
  { n: "01", title: "Data Audit", description: "We pull load history from your TMS, ELD, fuel cards, and accounting, and handle the cleanup.", when: "Week 1" },
  { n: "02", title: "Diagnose", description: "We map every lane, customer, and truck by true profitability and put a dollar value on each leak.", when: "Weeks 2–3" },
  { n: "03", title: "Redesign", description: "You get a prioritized action plan: what to reprice, what to drop, and where to add trucks.", when: "Week 4" },
  { n: "04", title: "Track & Adjust", description: "Weekly KPI dashboards and check-ins keep the gains in place as freight markets shift.", when: "Ongoing" },
];

const deliverables: { icon: LucideIcon; tint: keyof typeof TINT; label: string }[] = [
  { icon: Route, tint: "blue", label: "Lane profitability report" },
  { icon: Calculator, tint: "violet", label: "True cost-per-mile model" },
  { icon: FileText, tint: "orange", label: "Customer scorecards" },
  { icon: Map, tint: "green", label: "Network map with changes" },
  { icon: DollarSign, tint: "red", label: "Rate floor & bid guide" },
  { icon: Target, tint: "teal", label: "90-day roadmap" },
];

const kpis = [
  { label: "Revenue / mile", value: "$2.41", change: "▲ 6.2%" },
  { label: "Cost / mile", value: "$1.98", change: "▼ 3.1%" },
  { label: "Deadhead", value: "13.4%", change: "▼ 7.6 pts" },
  { label: "Fleet MPG", value: "7.4", change: "▲ 0.5" },
];

const whyPoints: { icon: LucideIcon; tint: keyof typeof TINT; title: string; description: string }[] = [
  { icon: Truck, tint: "blue", title: "Operators, Not Theorists", description: "We deal with the same rates, regulations, and driver market you do." },
  { icon: ShieldCheck, tint: "green", title: "Your Data Stays Yours", description: "NDA before any data is shared. We work inside the TMS and ELD you already use." },
  { icon: Handshake, tint: "violet", title: "Action Over Reports", description: "Every finding has a clear next step, an owner, and a dollar value." },
];

const audiences: { icon: LucideIcon; tint: keyof typeof TINT; title: string; description: string }[] = [
  { icon: TrendingUp, tint: "blue", title: "Growing Fleets", description: "You're adding trucks, but margins stay flat. We show you where growth is leaking." },
  { icon: FileText, tint: "green", title: "Dedicated & Contract Carriers", description: "Defend your rates at renewal with real cost data, not gut feel." },
  { icon: Users, tint: "orange", title: "Owner-Operator Fleets", description: "Build lane discipline and cost control before you scale." },
];

const consultingFaqs = [
  { question: "How do I know where my trucking company is actually losing money?", answer: "A consultant can review revenue, cost per mile, fuel, maintenance, payroll, deadhead, detention, insurance, and other operating expenses to identify where margins are being lost." },
  { question: "How can I determine the true cost per mile and break-even rate for my trucks?", answer: "Understanding your real cost per mile, including fixed and variable expenses, is critical for setting profitable load rates, evaluating lanes, and knowing when a load should be rejected." },
  { question: "Why is my fleet running more miles but not making more money?", answer: "Higher mileage does not automatically mean higher profitability. Deadhead, empty miles, poor lane selection, low rates, excessive downtime, and inefficient dispatching can consume additional revenue." },
  { question: "How can I improve my dispatch operation and reduce empty miles?", answer: "A consulting review can identify problems in load planning, lane selection, driver assignment, broker negotiation, backhauls, and communication that may be creating unnecessary miles and lost revenue." },
  { question: "How do I know whether my drivers and trucks are performing profitably?", answer: "Companies should evaluate performance at the truck and driver level, not just look at total company revenue. Metrics such as revenue per truck, loaded miles, empty miles, utilization, fuel costs, and downtime can reveal underperforming assets." },
  { question: "What should I fix first if my trucking company has operational or compliance problems?", answer: "Not every problem has the same financial or safety impact. A consultant can help prioritize issues based on risk, frequency, cost, and root cause rather than simply treating individual violations. FMCSA recommends looking for patterns and underlying management-process failures." },
  { question: "How can I prepare my trucking company for a DOT or safety audit?", answer: "A consulting review can identify gaps in documentation, driver qualification, HOS, vehicle maintenance, drug and alcohol programs, safety procedures, and recordkeeping before they become larger problems." },
  { question: "What systems and SOPs does a growing trucking company need?", answer: "As a carrier grows, informal processes can create bottlenecks and inconsistent decisions. Consultants can help establish clear SOPs for dispatch, safety, maintenance, hiring, driver management, billing, claims, and daily operations." },
  { question: "How can I scale my trucking company without losing control of operations?", answer: "Growing from a small fleet to a larger operation requires more than adding trucks and drivers. Management structure, KPIs, accountability, technology, communication, and standardized processes need to scale with the fleet." },
  { question: "Which trucking KPIs should management actually track every week?", answer: "The right KPI dashboard can give management visibility into revenue per truck, RPM, cost per mile, gross margin, deadhead percentage, fuel economy, utilization, maintenance downtime, driver turnover, safety performance, and other critical indicators." },
];

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
    {children}
  </span>
);

const Tile = ({ icon: Icon, tint, size = "md" }: { icon: LucideIcon; tint: keyof typeof TINT; size?: "sm" | "md" }) => (
  <span className={`grid shrink-0 place-items-center rounded-xl ${TINT[tint]} ${size === "sm" ? "h-10 w-10" : "h-14 w-14"}`}>
    <Icon className={size === "sm" ? "h-5 w-5" : "h-7 w-7"} />
  </span>
);

const BookReviewButton = ({ className = "" }: { className?: string }) => (
  <Button variant="hero" size="lg" asChild className={`whitespace-nowrap ${className}`}>
    <Link to="/contact" className="flex items-center gap-2">
      <ChevronRight className="w-5 h-5" />
      Book a Free Network Review
    </Link>
  </Button>
);

const LaneLedger = () => (
  <div
    role="img"
    aria-label="Sample lane profitability report showing two profitable lanes and two losing lanes"
    className="rounded-2xl border border-border bg-card/90 p-6 shadow-2xl shadow-black/40 backdrop-blur"
  >
    <div className="flex items-baseline justify-between">
      <h3 className="font-display text-xl font-semibold">Lane Profitability</h3>
      <small className="text-xs text-muted-foreground">Sample report</small>
    </div>
    <p className="mb-5 mt-1 text-sm text-muted-foreground">True margin per lane after deadhead, dwell, and fuel</p>
    {sampleLanes.map((lane) => {
      const positive = lane.margin >= 0;
      const width = `${Math.min(Math.abs(lane.margin) * 2, 50)}%`;
      return (
        <div key={lane.name} className="grid grid-cols-[1fr_auto] gap-x-3 gap-y-2 border-t border-border py-3.5">
          <span className="text-sm font-semibold">
            {lane.name}
            <span className={`ml-2 rounded-md px-2 py-0.5 align-middle text-[0.68rem] font-semibold uppercase tracking-wider ${verdictStyle[lane.verdict]}`}>
              {lane.verdict}
            </span>
          </span>
          <span className="text-right text-sm text-muted-foreground">{lane.rpm}</span>
          <div className="col-span-2 flex items-center gap-3">
            <div className="relative h-2 flex-1 rounded-full bg-muted">
              <span className="absolute -bottom-1 -top-1 left-1/2 w-px bg-foreground/20" />
              <span
                className={`absolute inset-y-0 rounded-full ${positive ? "left-1/2 bg-green-400" : "right-1/2 bg-red-400"}`}
                style={{ width }}
              />
            </div>
            <span className={`min-w-[3.5rem] text-right font-display font-semibold ${positive ? "text-green-400" : "text-red-400"}`}>
              {positive ? "+" : "−"}{Math.abs(lane.margin)}%
            </span>
          </div>
        </div>
      );
    })}
    <div className="mt-2 flex items-center justify-between border-t border-border pt-4 text-sm text-muted-foreground">
      <span>Network deadhead</span>
      <b className="font-display text-lg font-semibold text-foreground">21% → 13%</b>
    </div>
  </div>
);

const KpiDashboard = () => (
  <div role="img" aria-label="Sample weekly KPI dashboard" className="rounded-2xl border border-border bg-card p-6">
    <h3 className="font-display text-xl font-semibold">Weekly KPI Dashboard</h3>
    <p className="mb-5 text-xs text-muted-foreground">Sample view. Built on your own data.</p>
    <div className="grid grid-cols-2 gap-3">
      {kpis.map((kpi) => (
        <div key={kpi.label} className="rounded-xl border border-border bg-muted/40 p-4">
          <span className="text-xs text-muted-foreground">{kpi.label}</span>
          <b className="mt-0.5 block font-display text-2xl font-semibold">{kpi.value}</b>
          <em className="text-xs font-semibold not-italic text-green-400">{kpi.change}</em>
        </div>
      ))}
      <svg className="col-span-2 h-24 w-full" viewBox="0 0 400 90" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="kpi-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="hsl(var(--primary))" stopOpacity=".35" />
            <stop offset="1" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 70 L40 66 L80 72 L120 58 L160 60 L200 48 L240 50 L280 36 L320 30 L360 24 L400 16 L400 90 L0 90Z" fill="url(#kpi-fill)" />
        <path d="M0 70 L40 66 L80 72 L120 58 L160 60 L200 48 L240 50 L280 36 L320 30 L360 24 L400 16" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" />
      </svg>
    </div>
  </div>
);

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" }, transition: { duration: 0.6 } };

const Consulting = () => {
  const servicesRef = useRef(null);
  const servicesInView = useInView(servicesRef, { once: true, margin: "-100px" });

  const schemas = useMemo(() => [
    getOrganizationSchema(),
    getLocalBusinessSchema(),
    getBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Trucking Consulting", path: "/consulting" },
    ]),
    getFAQSchema(consultingFaqs),
    getServiceSchema({
      name: "Trucking Consulting Services",
      description: "Carrier-run consulting for trucking companies: lane profitability analysis, cost-per-mile modeling, freight network optimization, and deadhead reduction.",
      url: "/consulting",
    }),
  ], []);

  return (
    <Layout>
      <SEOHead
        title={SEO_CONTENT.consulting.title}
        description={SEO_CONTENT.consulting.description}
        keywords={SEO_CONTENT.consulting.keywords}
        canonicalPath="/consulting"
      />
      <SchemaMarkup schemas={schemas} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBackground} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/70" />
        </div>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "56px 56px" }}
        />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />

        <div className="container-custom relative z-10 grid items-center gap-12 pt-32 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-28">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Freight Analytics &amp; Network Profitability</p>
            <h1 className="mt-5 mb-6 font-display text-4xl font-bold uppercase leading-[1.08] tracking-tight md:text-5xl lg:text-6xl">
              Trucking Consulting Services <span className="block text-primary">for Profitable Fleets</span>
            </h1>
            <p className="mb-9 max-w-[62ch] text-lg text-muted-foreground">
              Data-driven consulting for trucking companies, from a carrier that runs its own trucks. We analyze lane profitability, cost per mile, and deadhead to show where your fleet loses money and how to fix it.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <BookReviewButton />
              <Button variant="heroOutline" size="lg" asChild>
                <a href="#services" className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  See Our Services
                </a>
              </Button>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <LaneLedger />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-muted/30" aria-label="XXII Century by the numbers">
        <div className="container-custom grid items-center gap-10 py-16 lg:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">Advice Tested on <span className="text-primary">Our Own Fleet</span></h2>
            <p className="mt-3 text-muted-foreground">Every recommendation comes from a carrier that moves freight daily.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat, i) => (
              <div key={stat.label} className="rounded-xl border border-border bg-card px-4 py-6 text-center">
                <b className={`block font-display text-4xl font-bold leading-none ${i % 2 ? "text-accent" : "text-primary"}`}>{stat.value}</b>
                <span className="mt-2.5 block text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-20 md:py-28">
        <div className="container-custom grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div {...fadeUp}>
            <Eyebrow>The Problem</Eyebrow>
            <h2 className="mt-5 mb-6 font-display text-3xl font-bold md:text-5xl">Revenue Is Up. <span className="text-primary">So Why Isn't Profit?</span></h2>
            <p className="text-lg text-muted-foreground">
              Most carriers know their gross revenue and their fuel bill. Few know their <strong className="font-semibold text-foreground">true cost per mile</strong> by lane, customer, or truck.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              Unprofitable freight hides inside fleet averages. Your TMS shows you loads. It doesn't show you which ones lose money.
            </p>
          </motion.div>
          <div className="grid gap-4">
            {leaks.map((leak, i) => (
              <motion.div key={leak.title} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex gap-4 rounded-xl border border-border border-l-[3px] border-l-red-400 bg-card px-5 py-5">
                <leak.icon className="mt-0.5 h-6 w-6 shrink-0 text-red-400" />
                <div>
                  <h3 className="font-semibold">{leak.title}</h3>
                  <p className="text-sm text-muted-foreground">{leak.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" ref={servicesRef} className="scroll-mt-24 bg-muted/30 py-20 md:py-28">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={servicesInView ? { opacity: 1, y: 0 } : {}} className="mx-auto mb-14 max-w-3xl text-center">
            <Eyebrow>Core Services</Eyebrow>
            <h2 className="mt-5 mb-4 font-display text-3xl font-bold md:text-5xl">Consulting Built to <span className="text-primary">Grow Your Margin</span></h2>
            <p className="text-lg text-muted-foreground">Six focused services. Use one to fix a specific leak, or combine them for a full network review.</p>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((svc, i) => (
              <motion.article key={svc.title} initial={{ opacity: 0, y: 24 }} animate={servicesInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex flex-col rounded-2xl border border-border bg-card p-8 transition-colors hover:border-primary/40">
                <div className="mb-6"><Tile icon={svc.icon} tint={svc.tint} /></div>
                <h3 className="mb-2.5 text-xl font-semibold">{svc.title}</h3>
                <p className="text-muted-foreground">{svc.description}</p>
                <ul className="mt-5 grid gap-2.5 border-t border-border pt-5">
                  {svc.points.map((point) => (
                    <li key={point} className="flex gap-2.5 text-sm text-foreground/85">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 md:py-28">
        <div className="container-custom">
          <motion.div {...fadeUp} className="mx-auto mb-14 max-w-3xl text-center">
            <Eyebrow>How It Works</Eyebrow>
            <h2 className="mt-5 mb-4 font-display text-3xl font-bold md:text-5xl">From Raw Data to <span className="text-primary">Real Margin</span></h2>
            <p className="text-lg text-muted-foreground">No new software. We work with the systems you already run.</p>
          </motion.div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {steps.map((step, i) => (
              <motion.div key={step.n} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="lg:px-6 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-border">
                <div className="mb-4 font-display text-6xl font-bold leading-none text-transparent [-webkit-text-stroke:1.5px_hsl(var(--primary))]">{step.n}</div>
                <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                <small className="mt-3 inline-block text-sm font-semibold text-accent">{step.when}</small>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="bg-muted/30 py-20 md:py-28">
        <div className="container-custom grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <motion.div {...fadeUp}>
            <Eyebrow>What You Get</Eyebrow>
            <h2 className="mt-5 mb-4 font-display text-3xl font-bold md:text-5xl">Clear Answers, <span className="text-primary">Not Just Reports</span></h2>
            <p className="text-lg text-muted-foreground">Every finding comes with a next step and the dollar amount it's worth.</p>
            <div className="my-8 grid gap-3.5 sm:grid-cols-2">
              {deliverables.map((d) => (
                <div key={d.label} className="flex items-center gap-3.5 rounded-xl border border-border bg-card px-4 py-3.5 font-medium">
                  <Tile icon={d.icon} tint={d.tint} size="sm" />
                  {d.label}
                </div>
              ))}
            </div>
            <BookReviewButton />
          </motion.div>
          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.15 }}>
            <KpiDashboard />
          </motion.div>
        </div>
      </section>

      {/* Why */}
      <section className="py-20 md:py-28">
        <div className="container-custom grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div {...fadeUp} className="grid grid-cols-2 gap-4">
            {[
              { src: photoDispatch, alt: "XXII Century dispatch and operations team" },
              { src: photoLane, alt: "XXII Century truck on the highway" },
              { src: photoDriver, alt: "XXII Century driver beside a truck" },
              { src: photoFleet, alt: "XXII Century truck in Chicago" },
            ].map((photo) => (
              <img key={photo.alt} src={photo.src} alt={photo.alt} loading="lazy" className="aspect-[4/3] w-full rounded-2xl border border-border object-cover" />
            ))}
          </motion.div>
          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.15 }}>
            <h2 className="mb-5 font-display text-3xl font-bold md:text-5xl">Built by a Carrier, <span className="text-primary">Not a Classroom</span></h2>
            <p className="mb-4 text-lg text-muted-foreground">
              XXII Century runs an asset-based fleet out of Chicagoland. Every framework we recommend was tested on our own trucks, lanes, and drivers first, from lane pricing to our weekly MPG tracking and driver fuel bonus.
            </p>
            <p className="mb-8 text-lg text-foreground">That's the difference between a consultant who reads your numbers and one who has run them.</p>
            <div className="grid gap-6">
              {whyPoints.map((point) => (
                <div key={point.title} className="flex gap-4">
                  <Tile icon={point.icon} tint={point.tint} />
                  <div>
                    <h3 className="mb-1 text-lg font-semibold">{point.title}</h3>
                    <p className="text-muted-foreground">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="bg-muted/30 py-20 md:py-28">
        <div className="container-custom">
          <motion.div {...fadeUp} className="mx-auto mb-14 max-w-3xl text-center">
            <Eyebrow>Who It's For</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-bold md:text-5xl">Built for <span className="text-primary">5 to 500 Trucks</span></h2>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-3">
            {audiences.map((a, i) => (
              <motion.div key={a.title} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }} className="rounded-2xl border border-border bg-card p-8 text-center">
                <div className="mb-5 flex justify-center"><Tile icon={a.icon} tint={a.tint} /></div>
                <h3 className="mb-2.5 font-display text-2xl font-semibold">{a.title}</h3>
                <p className="text-muted-foreground">{a.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28">
        <div className="container-custom">
          <motion.div {...fadeUp} className="mx-auto mb-12 max-w-3xl text-center">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-bold md:text-5xl">Common <span className="text-primary">Questions</span></h2>
          </motion.div>
          <Accordion type="single" collapsible className="mx-auto grid max-w-3xl gap-3.5">
            {consultingFaqs.map((faq, i) => (
              <AccordionItem key={faq.question} value={`faq-${i}`} className="rounded-xl border border-border bg-card px-6">
                <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-800 via-primary to-blue-700">
        <div className="container-custom flex flex-col items-start justify-between gap-8 py-20 lg:flex-row lg:items-center">
          <div>
            <h2 className="max-w-[16ch] font-display text-3xl font-bold uppercase text-white md:text-5xl">Find Your Most Profitable Lanes</h2>
            <p className="mt-3 max-w-[52ch] text-lg text-blue-100">Send us 90 days of load data. We'll show you where margin is leaking at no cost.</p>
          </div>
          <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <Button size="lg" asChild className="whitespace-nowrap bg-white font-bold uppercase tracking-wider text-primary hover:bg-blue-50">
              <Link to="/contact" className="flex items-center gap-2">
                <ChevronRight className="w-5 h-5" />
                Book a Free Network Review
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="whitespace-nowrap border-2 border-white/60 bg-transparent font-bold tracking-wider text-white hover:bg-white/10 hover:text-white">
              <a href={`tel:${PHONE.tel}`} className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                {PHONE.display}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Consulting;
