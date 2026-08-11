import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Trophy,
  Fuel,
  ShieldCheck,
  Gauge,
  Users,
  CalendarClock,
  Award,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { getOrganizationSchema, getBreadcrumbSchema } from "@/data/schemaData";
import { Button } from "@/components/ui/button";
import {
  REWARD_PROGRAM,
  PROGRAM_STATS,
  type RewardKind,
  type RewardCategory,
  type Audience,
} from "@/data/rewardsProgram";
import { BOARDS } from "@/data/loyaltyDemo";

/* Each category carries its own accent so the eye can navigate the page. */
interface Accent {
  icon: React.ComponentType<{ className?: string }>;
  tile: string;
  text: string;
  line: string;
  glow: string;
}

const ACCENT: Record<string, Accent> = {
  A: { icon: CalendarClock, tile: "bg-sky-400/10", text: "text-sky-300", line: "from-sky-400/70", glow: "bg-sky-500/20" },
  B: { icon: Gauge, tile: "bg-violet-400/10", text: "text-violet-300", line: "from-violet-400/70", glow: "bg-violet-500/20" },
  C: { icon: Fuel, tile: "bg-amber-400/10", text: "text-amber-300", line: "from-amber-400/70", glow: "bg-amber-500/20" },
  D: { icon: ShieldCheck, tile: "bg-emerald-400/10", text: "text-emerald-300", line: "from-emerald-400/70", glow: "bg-emerald-500/20" },
  E: { icon: Users, tile: "bg-rose-400/10", text: "text-rose-300", line: "from-rose-400/70", glow: "bg-rose-500/20" },
};

const KIND_BADGE: Record<RewardKind, string> = {
  digital: "bg-emerald-400/12 text-emerald-300 ring-1 ring-emerald-400/25",
  branded: "bg-slate-300/10 text-slate-300 ring-1 ring-slate-300/20",
  perk: "bg-cyan-400/12 text-cyan-300 ring-1 ring-cyan-400/25",
};

const KIND_HINT: Record<RewardKind, string> = {
  digital: "Certificate or badge",
  branded: "XXII gear",
  perk: "Status or perk",
};

const WHO_LABEL: Record<Audience, string> = { both: "BOTH", company: "COMPANY" };

function CategoryBlock({ category }: { category: RewardCategory }) {
  const a = ACCENT[category.key] ?? ACCENT.A;
  const Icon = a.icon ?? Award;
  const companyOnly = category.rules.every((r) => r.who === "company");

  return (
    <section className="relative">
      {/* header */}
      <div className="mb-4 flex items-center gap-3.5">
        <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${a.tile}`}>
          <Icon className={`h-[18px] w-[18px] ${a.text}`} />
        </span>
        <div className="min-w-0">
          <h2 className="text-[15px] font-bold tracking-tight text-white">{category.label}</h2>
          <p className="text-xs text-white/35">{category.blurb}</p>
        </div>
        <span className="ml-auto shrink-0 rounded-full bg-white/[0.06] px-2.5 py-1 text-[11px] font-semibold text-white/45">
          {category.rules.length}
        </span>
      </div>

      {/* card */}
      <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] ring-1 ring-white/10">
        {/* accent rule */}
        <div className={`h-px bg-gradient-to-r ${a.line} to-transparent`} />

        <div className="hidden gap-5 px-6 pb-2.5 pt-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/30 lg:grid lg:grid-cols-12">
          <div className="lg:col-span-4">Milestone</div>
          <div className="lg:col-span-2">Who</div>
          <div className="lg:col-span-6">Reward</div>
        </div>

        <div className="divide-y divide-white/[0.05]">
          {category.rules.map((rule) => (
            <div
              key={rule.id}
              className="grid grid-cols-1 gap-3 px-6 py-4 transition-colors hover:bg-white/[0.025] lg:grid-cols-12 lg:items-center lg:gap-5"
            >
              {/* milestone */}
              <div className="lg:col-span-4">
                <div className="text-[15px] font-semibold text-white">{rule.event}</div>
                <div className="mt-0.5 text-[13px] text-white/40">{rule.when}</div>
              </div>

              {/* who */}
              <div className="lg:col-span-2">
                <span
                  className={`inline-flex items-center rounded-md px-2 py-1 text-[10px] font-bold tracking-[0.1em] ${
                    rule.who === "company"
                      ? "bg-amber-400/10 text-amber-300 ring-1 ring-amber-400/25"
                      : "bg-white/[0.06] text-white/45"
                  }`}
                >
                  {WHO_LABEL[rule.who]}
                </span>
              </div>

              {/* rewards */}
              <div className="space-y-2 lg:col-span-6">
                {rule.rewards.map((rw, j) => (
                  <div key={j} className="flex items-start gap-2.5">
                    <span
                      className={`inline-flex shrink-0 items-center rounded-md px-2 py-0.5 text-[10px] font-bold tracking-[0.08em] ${KIND_BADGE[rw.kind]}`}
                    >
                      {rw.kind.toUpperCase()}
                    </span>
                    <span className="text-[14px] leading-relaxed text-white/75">{rw.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {companyOnly && (
        <p className="mt-3 flex items-start gap-2 text-xs text-white/35">
          <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-amber-400/70" />
          Owner-operators fuel their own trucks, so the MPG programme is company drivers only.
        </p>
      )}
    </section>
  );
}

const MEDAL = [
  "bg-gradient-to-br from-amber-300 to-amber-500 text-navy-900",
  "bg-white/15 text-white/80",
  "bg-orange-500/25 text-orange-200",
];

const Loyalty = () => {
  const schemas = useMemo(
    () => [
      getOrganizationSchema(),
      getBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Driver Rewards", path: "/loyalty" },
      ]),
    ],
    [],
  );

  return (
    <Layout>
      <SEOHead
        title="Driver Rewards Program | XXII Century Trucking"
        description="XXII Century recognizes drivers for time on the road, miles driven, fuel efficiency, safe driving and referrals. See this month's leaderboard and everything we reward."
        keywords="truck driver rewards, driver recognition program, CDL driver bonuses, safe driver awards"
        canonicalPath="/loyalty"
      />
      <SchemaMarkup schemas={schemas} />

      {/* HERO */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60 ring-1 ring-white/10">
            <Award className="h-3.5 w-3.5 text-emerald-300" />
            Driver Rewards
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Every mile earns something.
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-white/50">
            Time on the road, miles driven, fuel saved and safe trips — all
            recognized automatically.
          </p>

          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl bg-white/[0.04] px-8 py-4 ring-1 ring-white/10">
            <span className="text-sm text-white/45">
              <span className="mr-1.5 text-xl font-bold text-white">
                {PROGRAM_STATS.milestones}
              </span>
              milestones
            </span>
            <span className="hidden h-6 w-px bg-white/10 sm:block" />
            <span className="text-sm text-white/45">
              <span className="mr-1.5 text-xl font-bold text-white">
                {PROGRAM_STATS.categories}
              </span>
              ways to earn
            </span>
            <span className="hidden h-6 w-px bg-white/10 sm:block" />
            <span className="text-sm text-white/45">
              <span className="mr-1.5 text-xl font-bold text-white">0</span>
              forms to fill in
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-24">
        {/* LEADERBOARD */}
        <section className="mt-8">
          <div className="mb-4 flex items-center gap-2.5">
            <Trophy className="h-4 w-4 text-amber-300" />
            <h2 className="text-[15px] font-bold tracking-tight text-white">This month</h2>
            <span className="ml-auto text-sm text-white/35">August 2026</span>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {BOARDS.map((b) => (
              <div
                key={b.key}
                className="overflow-hidden rounded-2xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] ring-1 ring-white/10"
              >
                <div className="h-px bg-gradient-to-r from-amber-400/60 to-transparent" />
                <div className="flex items-baseline justify-between px-5 pb-3 pt-4">
                  <h3 className="text-[13px] font-semibold text-white">{b.title}</h3>
                  <span className="text-[10px] uppercase tracking-wider text-white/30">
                    {b.unit}
                  </span>
                </div>

                {b.note && (
                  <div className="px-5 pb-2 text-[10px] uppercase tracking-wider text-amber-300/60">
                    {b.note}
                  </div>
                )}

                <ol className="px-3 pb-3">
                  {b.rows.map((row, i) => (
                    <li
                      key={row.name}
                      className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-white/[0.03]"
                    >
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                          MEDAL[i] ?? "bg-white/[0.06] text-white/35"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span
                        className={`min-w-0 flex-1 truncate text-sm ${
                          i === 0 ? "font-semibold text-white" : "text-white/65"
                        }`}
                      >
                        {row.name}
                      </span>
                      <span className="shrink-0 font-mono text-sm tabular-nums text-white/85">
                        {row.value}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>

        {/* LEGEND */}
        <div className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-white/[0.07] pb-4">
          <h2 className="text-[15px] font-bold tracking-tight text-white">What we reward</h2>
          <div className="ml-auto flex flex-wrap gap-x-5 gap-y-2">
            {(Object.keys(KIND_HINT) as RewardKind[]).map((k) => (
              <span key={k} className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold tracking-[0.08em] ${KIND_BADGE[k]}`}
                >
                  {k.toUpperCase()}
                </span>
                <span className="text-xs text-white/35">{KIND_HINT[k]}</span>
              </span>
            ))}
          </div>
        </div>

        {/* MATRIX */}
        <div className="mt-8 space-y-12">
          {REWARD_PROGRAM.map((cat) => (
            <CategoryBlock key={cat.key} category={cat} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Button asChild className="rounded-full px-7">
            <Link to="/careers">
              Drive with XXII <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Loyalty;
