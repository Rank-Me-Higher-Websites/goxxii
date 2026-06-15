import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, ShieldCheck, TrendingDown, TrendingUp, Fuel, Timer } from "lucide-react";

const awards = [
  {
    icon: Award,
    trendIcon: TrendingDown,
    award: "Safety Award",
    title: "Severe Speeding",
    detail: "Top 10% carrier in our class",
    value: "<0.01%",
    delta: "100% better",
    self: { value: "<0.01%", width: "3%" },
    benchmark: { value: "0.05%", width: "100%" },
  },
  {
    icon: Timer,
    trendIcon: TrendingDown,
    award: "Efficiency Award",
    title: "Idling",
    detail: "Engine idle time",
    value: "14%",
    delta: "44% less idle",
    self: { value: "14%", width: "56%" },
    benchmark: { value: "25%", width: "100%" },
  },
  {
    icon: Fuel,
    trendIcon: TrendingUp,
    award: "Efficiency Award",
    title: "Miles Per Gallon",
    detail: "Avg fuel economy",
    value: "7.8",
    delta: "20% better",
    self: { value: "7.8", width: "100%" },
    benchmark: { value: "6.5", width: "83%" },
  },
];

export const AwardsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="section-padding bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.06)_0%,_transparent_55%)]" />
      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 lg:mb-14"
        >
          <span className="label-tag mb-4 inline-flex">Samsara Verified</span>
          <h2 className="heading-section text-foreground">
            Award-Winning Fleet Performance
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            Independently verified by Samsara telematics — top-tier safety and
            efficiency, benchmarked against thousands of carriers in our class.
          </p>
        </motion.div>

        {/* Awards grid — three equal cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 max-w-6xl mx-auto">
          {awards.map((award, i) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            >
              <AwardCard award={award} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AwardCard = ({ award }: { award: (typeof awards)[number] }) => {
  return (
    <div className="relative h-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#0f1f3d] via-[#0a1628] to-[#0a1628] border border-white/10 shadow-xl shadow-primary/5">
      <div className="absolute -top-20 -right-20 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl" />

      <div className="relative flex h-full flex-col p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <award.icon className="w-6 h-6 text-white" strokeWidth={2.2} />
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
              Samsara Verified
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-300/90 mb-1">
          {award.award}
        </div>
        <div className="text-xl font-display font-bold text-white leading-tight">
          {award.title}
        </div>
        <div className="text-xs text-white/50 mb-5">{award.detail}</div>

        {/* Metric + trend (pinned toward the bottom for equal alignment) */}
        <div className="mt-auto flex items-end justify-between mb-4">
          <span className="text-4xl font-display font-bold text-white tracking-tight">
            {award.value}
          </span>
          <div className="flex items-center gap-1 text-emerald-400 mb-1.5">
            <award.trendIcon className="w-4 h-4" />
            <span className="text-xs font-bold">{award.delta}</span>
          </div>
        </div>

        {/* Comparison vs benchmark */}
        <div className="space-y-2.5">
          <div>
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="text-emerald-300 font-semibold">XXII Century</span>
              <span className="text-emerald-300 font-semibold">{award.self.value}</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500"
                style={{ width: award.self.width }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="text-white/50">Industry Avg</span>
              <span className="text-white/50">{award.benchmark.value}</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full rounded-full bg-white/30"
                style={{ width: award.benchmark.width }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
