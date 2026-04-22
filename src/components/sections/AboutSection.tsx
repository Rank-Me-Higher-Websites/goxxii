import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Award, ShieldCheck, TrendingDown } from "lucide-react";

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="section-padding bg-background relative">
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* LEFT: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 lg:pl-4 xl:pl-8 text-left"
          >
            <span className="label-tag mb-4 inline-flex">About Us</span>
            <h2 className="heading-section text-foreground mb-6">
              Built Around Drivers
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              <p>
                15+ years in the industry. Chicago-based. We get what matters —{" "}
                <strong className="text-foreground">
                  steady freight, real support, respect on the road
                </strong>
                .
              </p>
              <p>
                For{" "}
                <Link to="/owner-operators" className="text-primary hover:underline">
                  owner-operators
                </Link>
                : reliable freight, fast settlements, freedom to run your business.
                For{" "}
                <Link to="/company-drivers" className="text-primary hover:underline">
                  company drivers
                </Link>
                : dedicated support, competitive pay, consistent miles.
              </p>
              <p>
                24/7 team support.{" "}
                <strong className="text-foreground">
                  Clear communication. Fair treatment. We work with you — not
                  just for you.
                </strong>{" "}
                Ready to explore{" "}
                <Link to="/careers" className="text-primary hover:underline">
                  trucking careers
                </Link>{" "}
                with a carrier that values drivers?
              </p>
            </div>
          </motion.div>

          {/* RIGHT: Safety Award Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <SafetyAwardCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const SafetyAwardCard = () => {
  return (
    <div
      className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0f1f3d] via-[#0a1628] to-[#0a1628] border border-white/10 shadow-2xl shadow-primary/5"
      data-testid="card-safety-award"
    >
      {/* Glow accents */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

      <div className="relative p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
              Samsara Verified
            </span>
          </div>
          <span className="text-[11px] uppercase tracking-wider text-white/40 font-semibold">
            Last 90 Days
          </span>
        </div>

        {/* Award Trophy */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 flex-shrink-0">
            <Award className="w-9 h-9 text-white" strokeWidth={2.2} />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-300/90 mb-1">
              Safety Performance Award
            </div>
            <div className="text-2xl sm:text-[26px] font-display font-bold text-white leading-tight">
              Top 10% Carrier
            </div>
            <div className="text-xs text-white/50 mt-0.5">
              Among Samsara peers in our class
            </div>
          </div>
        </div>

        {/* Metric block */}
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-white/60">
              Severe Speeding
            </span>
            <div className="flex items-center gap-1 text-emerald-400">
              <TrendingDown className="w-3.5 h-3.5" />
              <span className="text-[11px] font-bold">100% better</span>
            </div>
          </div>

          <div className="flex items-end gap-3 mb-3">
            <span className="text-4xl sm:text-5xl font-display font-bold text-white tracking-tight">
              &lt;0.01%
            </span>
            <span className="text-xs text-white/50 mb-1.5">drive time</span>
          </div>

          {/* Comparison bar */}
          <div className="space-y-2">
            <div>
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="text-emerald-300 font-semibold">XXII Century</span>
                <span className="text-emerald-300 font-semibold">&lt;0.01%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500"
                  style={{ width: "2%" }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="text-white/50">Industry Average</span>
                <span className="text-white/50">0.05%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-white/30"
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3">
            <div className="text-lg font-display font-bold text-white">
              36,014
            </div>
            <div className="text-[11px] text-white/50 uppercase tracking-wider">
              Drive Hours
            </div>
          </div>
          <div className="rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3">
            <div className="text-lg font-display font-bold text-white">
              22 min
            </div>
            <div className="text-[11px] text-white/50 uppercase tracking-wider">
              Speeding Time
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
