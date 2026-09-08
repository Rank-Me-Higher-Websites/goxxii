import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useState } from "react";
import { Gift, Award, Play, Check, ExternalLink, Loader2 } from "lucide-react";

interface GiftRow {
  id: number;
  driverId: number;
  driverName: string;
  truckNumber: string | null;
  phone: string | null;
  event: string;
  category: string;
  rewards: Array<{ kind: string; label: string }>;
  createdAt: string;
}

interface AwardRow {
  id: number;
  driverId: number;
  ruleId: string;
  event: string;
  category: string;
  periodKey: string;
  rewards: Array<{ kind: string; label: string }>;
  certUrl: string | null;
  emailStatus: string;
  fulfillment: string;
  createdAt: string;
}

const EMAIL_BADGE: Record<string, string> = {
  sent: "bg-emerald-500/10 text-emerald-400",
  pending: "bg-amber-500/10 text-amber-400",
  failed: "bg-red-500/10 text-red-400",
  skipped: "bg-secondary text-muted-foreground",
};

export default function Rewards() {
  const [runResult, setRunResult] = useState<any>(null);

  const { data: gifts = [], isLoading: giftsLoading } = useQuery<GiftRow[]>({
    queryKey: ["/api/portal/gifts"],
  });
  const { data: awards = [] } = useQuery<AwardRow[]>({
    queryKey: ["/api/portal/awards"],
  });

  const markShipped = useMutation({
    mutationFn: (id: number) => apiRequest(`/api/portal/gifts/${id}/shipped`, { method: "POST", body: JSON.stringify({}) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/portal/gifts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/portal/awards"] });
    },
  });

  const runCycle = useMutation({
    mutationFn: (dryRun: boolean) =>
      apiRequest(`/api/rewards/run?dryRun=${dryRun ? 1 : 0}`, { method: "POST", body: JSON.stringify({}) }),
    onSuccess: (data) => {
      setRunResult(data);
      queryClient.invalidateQueries({ queryKey: ["/api/portal/gifts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/portal/awards"] });
    },
    onError: (err: any) => setRunResult({ error: err.message }),
  });

  const branded = (row: { rewards: Array<{ kind: string; label: string }> }) =>
    row.rewards.filter((r) => r.kind === "branded").map((r) => r.label);

  return (
    <div className="space-y-6" data-testid="rewards-page">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-display tracking-tight">Driver Rewards</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Certificates go out automatically. Physical gifts land here for the team to ship.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => runCycle.mutate(true)}
            disabled={runCycle.isPending}
            data-testid="button-dry-run"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm border border-border text-muted-foreground hover:text-foreground hover:bg-secondary/50 disabled:opacity-50"
          >
            {runCycle.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            Preview run
          </button>
          <button
            onClick={() => runCycle.mutate(false)}
            disabled={runCycle.isPending}
            data-testid="button-run-cycle"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-primary text-primary-foreground font-medium hover:opacity-90 disabled:opacity-50"
          >
            <Award className="w-4 h-4" />
            Run awards now
          </button>
        </div>
      </div>

      {runResult && (
        <div className="rounded-lg border border-border bg-card p-4 text-sm" data-testid="run-result">
          {runResult.error ? (
            <p className="text-red-400">{runResult.error}</p>
          ) : (
            <>
              <p className="text-foreground font-medium">
                {runResult.dryRun ? "Preview" : "Run"} · {runResult.period} · fleet data: {runResult.fleetSource}
              </p>
              <p className="text-muted-foreground mt-1">
                {runResult.driversEvaluated} drivers evaluated · {runResult.newAwards} new award(s) ·{" "}
                {runResult.emailsSent} email(s) sent · {runResult.giftsQueued} gift(s) queued
              </p>
              {runResult.warnings?.length > 0 && (
                <ul className="mt-2 space-y-1 text-xs text-amber-400">
                  {runResult.warnings.map((w: string, i: number) => <li key={i}>! {w}</li>)}
                </ul>
              )}
            </>
          )}
        </div>
      )}

      <section>
        <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground uppercase tracking-wide mb-3">
          <Gift className="w-4 h-4 text-primary" /> Gift queue
          <span className="text-muted-foreground font-normal normal-case">({gifts.length} waiting)</span>
        </h2>
        {giftsLoading ? (
          <p className="text-muted-foreground text-sm">Loading…</p>
        ) : gifts.length === 0 ? (
          <p className="text-muted-foreground text-sm">Nothing to ship right now.</p>
        ) : (
          <div className="space-y-2">
            {gifts.map((g) => (
              <div key={g.id} className="rounded-lg border border-border bg-card p-4 flex items-start justify-between gap-4 flex-wrap" data-testid={`gift-${g.id}`}>
                <div>
                  <p className="text-foreground font-medium">{g.driverName}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Truck {g.truckNumber || "—"} · {g.phone || "no phone"} · {g.event}
                  </p>
                  <ul className="mt-2 space-y-0.5">
                    {branded(g).map((label, i) => (
                      <li key={i} className="text-sm text-foreground">• {label}</li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => markShipped.mutate(g.id)}
                  disabled={markShipped.isPending}
                  data-testid={`button-shipped-${g.id}`}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm bg-secondary text-foreground hover:bg-secondary/70 disabled:opacity-50"
                >
                  <Check className="w-4 h-4" /> Mark shipped
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground uppercase tracking-wide mb-3">
          <Award className="w-4 h-4 text-primary" /> Recent awards
        </h2>
        {awards.length === 0 ? (
          <p className="text-muted-foreground text-sm">No awards granted yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-secondary/40 text-muted-foreground">
                <tr>
                  <th className="text-left font-medium px-4 py-2">Award</th>
                  <th className="text-left font-medium px-4 py-2">Period</th>
                  <th className="text-left font-medium px-4 py-2">Email</th>
                  <th className="text-left font-medium px-4 py-2">Gift</th>
                  <th className="text-left font-medium px-4 py-2">Certificate</th>
                </tr>
              </thead>
              <tbody>
                {awards.slice(0, 50).map((a) => (
                  <tr key={a.id} className="border-t border-border" data-testid={`award-${a.id}`}>
                    <td className="px-4 py-2">
                      <span className="text-foreground">{a.event}</span>
                      <span className="text-muted-foreground text-xs ml-2">{a.ruleId}</span>
                    </td>
                    <td className="px-4 py-2 text-muted-foreground">{a.periodKey}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-0.5 rounded text-xs ${EMAIL_BADGE[a.emailStatus] || "bg-secondary text-muted-foreground"}`}>
                        {a.emailStatus}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-muted-foreground">{a.fulfillment}</td>
                    <td className="px-4 py-2">
                      {a.certUrl ? (
                        <a href={a.certUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">
                          Open <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
