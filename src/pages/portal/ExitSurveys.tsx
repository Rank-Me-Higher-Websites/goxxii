import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useState } from "react";
import { Copy, Check, ExternalLink, RefreshCw, DoorOpen, LogOut } from "lucide-react";

export default function ExitSurveys() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const { data: drivers = [], isLoading } = useQuery({
    queryKey: ["/api/portal/drivers"],
  });

  const { data: checkIns = [] } = useQuery({
    queryKey: ["/api/portal/check-ins"],
  });

  const regenerateToken = useMutation({
    mutationFn: (driverId: number) =>
      apiRequest(`/api/portal/drivers/${driverId}/regenerate-token`, { method: "POST" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/portal/drivers"] });
    },
  });

  const baseUrl = window.location.origin;

  const copyToClipboard = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const hasCompletedExit = (driverId: number) =>
    checkIns.some(
      (c: any) => c.driverId === driverId && c.checkInType === "exit" && c.status === "completed"
    );

  return (
    <div className="space-y-6" data-testid="exit-surveys-page">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-display tracking-tight">Exit Surveys</h1>
          <p className="text-muted-foreground text-sm mt-1">Share an exit survey link with a departing driver</p>
        </div>
      </div>

      <div className="bg-card/80 backdrop-blur border border-border rounded-xl p-5">
        <div className="flex items-center gap-2 mb-2">
          <DoorOpen className="w-4 h-4 text-rose-400" />
          <h2 className="text-sm font-semibold text-foreground font-display">How it works</h2>
        </div>
        <p className="text-xs text-muted-foreground">
          When a driver is leaving, copy their exit survey link below and send it to them. Their responses come straight back into the portal — just like the weekly surveys.
        </p>
      </div>

      <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-border flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground font-display">Driver Exit Survey Links</h2>
          <span className="text-xs text-muted-foreground">{drivers.length} drivers</span>
        </div>

        {isLoading ? (
          <div className="p-5 animate-pulse">
            <div className="h-12 bg-border rounded mb-2" />
            <div className="h-12 bg-border rounded mb-2" />
            <div className="h-12 bg-border rounded" />
          </div>
        ) : drivers.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground text-sm">No drivers yet</div>
        ) : (
          <div className="divide-y divide-border">
            {drivers.map((driver: any) => {
              const hasToken = !!driver.surveyToken;
              const exitDone = hasCompletedExit(driver.id);
              const exitUrl = `${baseUrl}/survey/${driver.surveyToken}/exit`;

              return (
                <div key={driver.id} className="px-5 py-4" data-testid={`row-driver-${driver.id}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-[10px] text-foreground font-medium border border-border shrink-0">
                      {driver.firstName[0]}{driver.lastName[0]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm text-foreground font-medium truncate">{driver.firstName} {driver.lastName}</div>
                      <div className="text-[10px] text-muted-foreground">
                        {driver.email || "No email"}{driver.truckNumber ? ` • Truck #${driver.truckNumber}` : ""}
                      </div>
                    </div>
                    {exitDone && (
                      <span className="flex items-center gap-1 text-xs text-accent bg-accent/10 px-2.5 py-1 rounded-lg border border-accent/20 shrink-0">
                        <Check className="w-3 h-3" /> Exit survey completed
                      </span>
                    )}
                    {!hasToken && (
                      <button
                        onClick={() => regenerateToken.mutate(driver.id)}
                        disabled={regenerateToken.isPending}
                        className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 bg-primary/10 px-2.5 py-1.5 rounded-lg border border-primary/20 transition-colors shrink-0"
                        data-testid={`button-generate-${driver.id}`}
                      >
                        <RefreshCw className="w-3 h-3" />
                        Generate Link
                      </button>
                    )}
                  </div>

                  {hasToken && (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 shrink-0 text-rose-400">
                        <LogOut className="w-3 h-3" />
                        <span className="text-xs font-medium">Exit Survey</span>
                      </div>
                      <code className="flex-1 bg-rose-500/5 border border-rose-500/20 rounded-lg px-3 py-1.5 text-xs text-muted-foreground font-mono truncate" data-testid={`text-exit-url-${driver.id}`}>
                        {exitUrl}
                      </code>
                      <button
                        onClick={() => copyToClipboard(exitUrl, `exit-${driver.id}`)}
                        className="p-1.5 rounded-lg border border-border hover:border-rose-500/30 transition-all"
                        title="Copy exit survey link"
                        data-testid={`button-copy-exit-${driver.id}`}
                      >
                        {copiedKey === `exit-${driver.id}` ? <Check className="w-3 h-3 text-accent" /> : <Copy className="w-3 h-3 text-muted-foreground" />}
                      </button>
                      <a
                        href={exitUrl}
                        target="_blank"
                        rel="noopener"
                        className="p-1.5 rounded-lg border border-border hover:border-rose-500/30 transition-all"
                        title="Open exit survey"
                        data-testid={`link-open-exit-${driver.id}`}
                      >
                        <ExternalLink className="w-3 h-3 text-muted-foreground" />
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
