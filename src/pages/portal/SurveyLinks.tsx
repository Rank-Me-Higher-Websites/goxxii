import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useState } from "react";
import { Link as LinkIcon, Copy, Check, Send, ExternalLink, RefreshCw } from "lucide-react";

const WEEKS = ["week1", "week2", "week3", "week4"] as const;
const WEEK_LABELS: Record<string, string> = {
  week1: "Week 1",
  week2: "Week 2",
  week3: "Week 3",
  week4: "Week 4",
};

export default function SurveyLinks() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailResult, setEmailResult] = useState<any>(null);

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

  const sendEmails = useMutation({
    mutationFn: () =>
      apiRequest("/api/portal/send-survey-emails", { method: "POST" }),
    onSuccess: (data) => {
      setEmailResult(data);
    },
    onError: (err: any) => {
      setEmailResult({ error: err.message });
    },
  });

  const baseUrl = window.location.origin;
  const registerUrl = `${baseUrl}/survey/register`;

  const copyToClipboard = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const getDriverProgress = (driverId: number) => {
    const completed = checkIns
      .filter((c: any) => c.driverId === driverId && c.status === "completed")
      .map((c: any) => c.checkInType);
    return { completed, total: 4, count: completed.length };
  };

  const activeDrivers = drivers.filter((d: any) => d.status === "active");

  return (
    <div className="space-y-6" data-testid="survey-links-page">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-display tracking-tight">Survey Links</h1>
          <p className="text-muted-foreground text-sm mt-1">Share survey links with drivers or send automated emails</p>
        </div>
        <button
          onClick={() => sendEmails.mutate()}
          disabled={sendEmails.isPending}
          data-testid="button-send-emails"
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-4 py-2.5 rounded-lg text-sm transition-all disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          {sendEmails.isPending ? "Sending..." : "Send Survey Emails"}
        </button>
      </div>

      {emailResult && (
        <div className={`border rounded-xl p-4 ${
          emailResult.error
            ? "bg-destructive/10 border-destructive/20"
            : "bg-accent/10 border-accent/20"
        }`} data-testid="email-result">
          {emailResult.error ? (
            <p className="text-sm text-destructive">{emailResult.error}</p>
          ) : (
            <div>
              <p className="text-sm text-accent font-medium mb-2">
                Sent {emailResult.sent} of {emailResult.total} emails
              </p>
              {emailResult.results?.map((r: any, i: number) => (
                <div key={i} className="text-xs text-muted-foreground flex items-center gap-2 py-0.5">
                  <span>{r.name}</span>
                  <span className={r.status === "sent" ? "text-accent" : r.status === "all_complete" ? "text-muted-foreground" : "text-destructive"}>
                    {r.status === "sent" ? `Sent (${r.week})` : r.status === "all_complete" ? "All complete" : r.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="bg-card/80 backdrop-blur border border-border rounded-xl p-5">
        <div className="flex items-center gap-2 mb-2">
          <LinkIcon className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground font-display">Public Registration Link</h2>
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          Share this link with new drivers — they can register themselves and start their Week 1 survey.
        </p>
        <div className="flex items-center gap-2">
          <code className="flex-1 bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground font-mono truncate" data-testid="text-register-url">
            {registerUrl}
          </code>
          <button
            onClick={() => copyToClipboard(registerUrl, "register")}
            className="bg-secondary hover:bg-secondary/80 border border-border px-3 py-2.5 rounded-lg transition-all"
            data-testid="button-copy-register"
          >
            {copiedKey === "register" ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4 text-foreground" />}
          </button>
        </div>
      </div>

      <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-border flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground font-display">Individual Driver Links</h2>
          <span className="text-xs text-muted-foreground">{activeDrivers.length} active drivers</span>
        </div>

        {isLoading ? (
          <div className="p-5 animate-pulse">
            <div className="h-12 bg-border rounded mb-2" />
            <div className="h-12 bg-border rounded mb-2" />
            <div className="h-12 bg-border rounded" />
          </div>
        ) : activeDrivers.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground text-sm">No active drivers</div>
        ) : (
          <div className="divide-y divide-border">
            {activeDrivers.map((driver: any) => {
              const progress = getDriverProgress(driver.id);
              const hasToken = !!driver.surveyToken;

              return (
                <div key={driver.id} className="px-5 py-4" data-testid={`row-driver-${driver.id}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-[10px] text-foreground font-medium border border-border shrink-0">
                      {driver.firstName[0]}{driver.lastName[0]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm text-foreground font-medium truncate">{driver.firstName} {driver.lastName}</div>
                      <div className="text-[10px] text-muted-foreground">
                        {driver.email || "No email"} • {progress.count}/{progress.total} surveys
                      </div>
                    </div>
                    {!hasToken && (
                      <button
                        onClick={() => regenerateToken.mutate(driver.id)}
                        disabled={regenerateToken.isPending}
                        className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 bg-primary/10 px-2.5 py-1.5 rounded-lg border border-primary/20 transition-colors"
                        data-testid={`button-generate-${driver.id}`}
                      >
                        <RefreshCw className="w-3 h-3" />
                        Generate Link
                      </button>
                    )}
                  </div>

                  {hasToken && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <code className="flex-1 bg-background border border-border rounded-lg px-3 py-1.5 text-xs text-muted-foreground font-mono truncate" data-testid={`text-generic-url-${driver.id}`}>
                          {`${baseUrl}/survey/${driver.surveyToken}`}
                        </code>
                        <button
                          onClick={() => copyToClipboard(`${baseUrl}/survey/${driver.surveyToken}`, `generic-${driver.id}`)}
                          className="p-1.5 rounded-lg border border-border hover:border-primary/30 transition-all"
                          title="Copy generic survey link"
                          data-testid={`button-copy-generic-${driver.id}`}
                        >
                          {copiedKey === `generic-${driver.id}` ? <Check className="w-3 h-3 text-accent" /> : <Copy className="w-3 h-3 text-muted-foreground" />}
                        </button>
                        <a
                          href={`${baseUrl}/survey/${driver.surveyToken}`}
                          target="_blank"
                          rel="noopener"
                          className="p-1.5 rounded-lg border border-border hover:border-primary/30 transition-all"
                          title="Open generic survey"
                          data-testid={`link-open-generic-${driver.id}`}
                        >
                          <ExternalLink className="w-3 h-3 text-muted-foreground" />
                        </a>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {WEEKS.map((w) => {
                        const isDone = progress.completed.includes(w);
                        const weekUrl = `${baseUrl}/survey/${driver.surveyToken}/${w}`;
                        const copyKey = `${driver.id}-${w}`;
                        const isCopied = copiedKey === copyKey;

                        return (
                          <div
                            key={w}
                            className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs ${
                              isDone
                                ? "bg-accent/5 border-accent/20 text-accent"
                                : "bg-background border-border text-foreground"
                            }`}
                            data-testid={`week-link-${driver.id}-${w}`}
                          >
                            {isDone ? (
                              <Check className="w-3 h-3 shrink-0" />
                            ) : null}
                            <span className={`font-medium truncate ${isDone ? "line-through opacity-60" : ""}`}>
                              {WEEK_LABELS[w]}
                            </span>
                            <div className="ml-auto flex items-center gap-1 shrink-0">
                              {!isDone && (
                                <>
                                  <button
                                    onClick={() => copyToClipboard(weekUrl, copyKey)}
                                    className="p-1 rounded hover:bg-secondary transition-all"
                                    title={`Copy ${WEEK_LABELS[w]} link`}
                                    data-testid={`button-copy-${driver.id}-${w}`}
                                  >
                                    {isCopied ? <Check className="w-3 h-3 text-accent" /> : <Copy className="w-3 h-3 text-muted-foreground" />}
                                  </button>
                                  <a
                                    href={weekUrl}
                                    target="_blank"
                                    rel="noopener"
                                    className="p-1 rounded hover:bg-secondary transition-all"
                                    title={`Open ${WEEK_LABELS[w]} survey`}
                                    data-testid={`link-open-${driver.id}-${w}`}
                                  >
                                    <ExternalLink className="w-3 h-3 text-muted-foreground" />
                                  </a>
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                      </div>
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
