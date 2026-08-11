import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Award, BadgeCheck, Loader2, Lock, ArrowRight, Trophy } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { KIND_META, type EarnedAward, type RewardKind } from "@/data/rewardsProgram";

interface StatusResponse {
  found: boolean;
  driver?: { firstName: string; lastName: string };
  stats?: { tenureDays: number; tenureYears: number };
  earned?: EarnedAward[];
  nextMilestone?: { target: number; current: number; remaining: number } | null;
}

function KindBadge({ kind }: { kind: RewardKind }) {
  const styles: Record<RewardKind, string> = {
    digital: "bg-green-500/15 text-green-300 ring-1 ring-green-500/30",
    branded: "bg-slate-400/10 text-slate-300 ring-1 ring-slate-400/25",
    perk: "bg-cyan-500/15 text-cyan-300 ring-1 ring-cyan-500/30",
  };
  return (
    <span className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wider ${styles[kind]}`}>
      {KIND_META[kind].label}
    </span>
  );
}

const DriverRewards = () => {
  const { token } = useParams<{ token: string }>();
  const [data, setData] = useState<StatusResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetch(`/api/rewards/status/${token}`)
      .then((r) => r.json())
      .then((d) => alive && setData(d))
      .catch(() => alive && setData({ found: false }))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [token]);

  if (loading) {
    return (
      <Layout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-300" />
        </div>
      </Layout>
    );
  }

  if (!data?.found) {
    return (
      <Layout>
        <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-5 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
            <Lock className="h-6 w-6 text-white/60" />
          </span>
          <h1 className="mt-5 text-2xl font-bold text-white">Rewards link not found</h1>
          <p className="mt-3 text-white/60">
            This rewards link is invalid or expired. Check the link in your latest
            XXII Century email, or explore the full program below.
          </p>
          <Button asChild className="mt-6 rounded-full px-6">
            <Link to="/loyalty">See the rewards program</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const name = `${data.driver?.firstName ?? ""} ${data.driver?.lastName ?? ""}`.trim();
  const earned = data.earned ?? [];
  const next = data.nextMilestone;
  const pct = next ? Math.round((next.current / next.target) * 100) : 100;

  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900" />
        <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/20 blur-[110px]" />
        <div className="relative mx-auto max-w-4xl px-5 pt-20 pb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-green-300 ring-1 ring-green-500/25">
            <Trophy className="h-3.5 w-3.5" /> Your Rewards
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {name || "Welcome, driver"}
          </h1>
          <p className="mt-4 text-white/60">
            {data.stats?.tenureDays != null && (
              <>
                {data.stats.tenureDays.toLocaleString()} days on the road with XXII
                Century{data.stats.tenureYears ? ` · ${data.stats.tenureYears} year${data.stats.tenureYears > 1 ? "s" : ""}` : ""}.
              </>
            )}
          </p>

          <div className="mt-8 inline-flex gap-8 rounded-2xl bg-white/[0.03] px-8 py-4 ring-1 ring-white/10">
            <div>
              <div className="text-3xl font-extrabold text-white">{earned.length}</div>
              <div className="text-xs uppercase tracking-widest text-white/50">Awards earned</div>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <div className="text-3xl font-extrabold text-green-400">
                {earned.reduce((n, a) => n + a.rewards.filter((r) => r.kind === "digital").length, 0)}
              </div>
              <div className="text-xs uppercase tracking-widest text-white/50">Certificates</div>
            </div>
          </div>
        </div>
      </section>

      {/* NEXT MILESTONE */}
      {next && (
        <section className="mx-auto max-w-4xl px-5 pt-10">
          <div className="rounded-2xl bg-navy-800/60 p-6 ring-1 ring-white/10">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-white">Next milestone</span>
              <span className="text-white/50">
                {next.remaining.toLocaleString()} days to go
              </span>
            </div>
            <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-400 to-green-400 transition-all"
                style={{ width: `${Math.min(100, Math.max(4, pct))}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between text-xs text-white/40">
              <span>{next.current.toLocaleString()} days</span>
              <span>{next.target.toLocaleString()} days</span>
            </div>
          </div>
        </section>
      )}

      {/* EARNED AWARDS */}
      <section className="mx-auto max-w-4xl px-5 py-12">
        <h2 className="mb-5 text-xl font-bold text-white">Awards you've earned</h2>
        {earned.length === 0 ? (
          <div className="rounded-2xl bg-navy-800/60 p-8 text-center ring-1 ring-white/10">
            <Award className="mx-auto h-8 w-8 text-white/30" />
            <p className="mt-3 text-white/60">
              Your first award is on its way — keep those wheels turning. Milestones
              land here the moment you hit them.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {earned.map((a) => (
              <div
                key={a.ruleId}
                className="rounded-2xl bg-navy-800/60 p-5 ring-1 ring-white/10"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/15 ring-1 ring-green-500/25">
                    <BadgeCheck className="h-5 w-5 text-green-300" />
                  </span>
                  <span className="font-mono text-xs text-white/40">{a.ruleId}</span>
                </div>
                <h3 className="mt-3 font-bold text-white">{a.event}</h3>
                <p className="text-xs uppercase tracking-widest text-white/40">{a.category}</p>
                <div className="mt-3 space-y-1.5">
                  {a.rewards.map((rw, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <KindBadge kind={rw.kind} />
                      <span className="text-sm text-white/75">{rw.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Button asChild variant="outline" className="rounded-full px-6">
            <Link to="/loyalty">
              See everything you can earn <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default DriverRewards;
