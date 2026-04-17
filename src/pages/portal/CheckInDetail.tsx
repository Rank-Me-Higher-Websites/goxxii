import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Check, Clock, User } from "lucide-react";

const questionLabels: Record<string, string> = {
  tools_access: "Access to apps and tools before first load",
  feel_supported: "Felt supported by the team",
  stress_source: "Source of stress",
  promise_match: "Promised terms matched reality",
  promise_mismatch_detail: "Promise mismatch details",
  first_load_explained: "First load clearly explained",
  orientation_clarity: "Orientation clarity",
  missing_first_day: "Missing on first day",
  wish_known: "Wish known before first trip",
  tech_issues: "Technical issues with tools",
  pay_understanding: "Understands pay calculation",
  dispatcher_responsiveness: "Dispatcher responsiveness",
  unexpected_delays: "Unexpected delays",
  feel_respected: "Feels respected by team",
  tension_detail: "Tension details",
  lanes_match: "Workload matches contract",
  comfortable_reporting: "Comfortable reporting problems",
  company_support: "Company support during issues",
  support_example: "Support example",
  routine_established: "Established a good routine",
  routine_blockers: "Routine blockers",
  communication_quality: "Overall communication quality",
  miles_consistent: "Getting promised miles consistently",
  miles_detail: "Miles gap details",
  team_relationship: "Relationship with dispatch/office",
  safety_concerns: "Safety concerns",
  overall_satisfaction: "Overall satisfaction",
  week3_feedback: "Additional feedback",
  pay_aligned: "Pay aligned with expectations",
  home_time_satisfaction: "Home time satisfaction",
  settlement_clarity: "Settlement statements clear",
  top_improvement: "Top improvement suggestion",
  nps_score: "Would recommend (1-10)",
  profitable_long_term: "Profitable long term",
  considered_leaving: "Considered leaving",
  leaving_reason: "Reason for considering leaving",
  dream_feature: "Dream feature for the company",
};

export default function CheckInDetail() {
  const { id } = useParams();

  const { data: checkIn, isLoading } = useQuery({
    queryKey: ["/api/portal/check-ins", id],
    queryFn: async () => {
      const res = await fetch(`/api/portal/check-ins/${id}`, { credentials: "include" });
      if (!res.ok) throw new Error("Not found");
      return res.json();
    },
  });

  const { data: drivers = [] } = useQuery({
    queryKey: ["/api/portal/drivers"],
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-64 bg-border rounded animate-pulse" />
        <div className="h-48 bg-card border border-border rounded-xl animate-pulse" />
      </div>
    );
  }

  if (!checkIn) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Check-in not found</p>
        <Link to="/portal/retention" className="text-primary text-sm mt-2 inline-block" data-testid="link-back-fallback">Back</Link>
      </div>
    );
  }

  const driver = drivers.find((d: any) => d.id === checkIn.driverId);
  const responses = (checkIn.responses || {}) as Record<string, any>;
  const typeLabel = formatType(checkIn.checkInType);

  return (
    <div className="max-w-3xl mx-auto space-y-6" data-testid="checkin-detail-page">
      <div className="flex items-center gap-3">
        <Link to={driver ? `/portal/drivers/${driver.id}` : "/portal/retention"} className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-back">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground font-display tracking-tight">{typeLabel}</h1>
          <div className="flex items-center gap-2 mt-0.5">
            {driver && (
              <Link to={`/portal/drivers/${driver.id}`} className="text-primary text-sm hover:text-primary/80 transition-colors" data-testid="link-driver">
                {driver.firstName} {driver.lastName}
              </Link>
            )}
            <span className="text-muted-foreground text-sm">
              — {new Date(checkIn.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="bg-card/80 backdrop-blur border border-border rounded-xl px-4 py-3 flex items-center gap-2">
          {checkIn.status === "completed" ? (
            <Check className="w-4 h-4 text-accent" />
          ) : (
            <Clock className="w-4 h-4 text-yellow-400" />
          )}
          <span className="text-sm text-foreground capitalize">{checkIn.status}</span>
        </div>
        {checkIn.completedAt && (
          <div className="bg-card/80 backdrop-blur border border-border rounded-xl px-4 py-3">
            <span className="text-sm text-muted-foreground">Completed {new Date(checkIn.completedAt).toLocaleDateString()}</span>
          </div>
        )}
        {driver && (
          <div className="bg-card/80 backdrop-blur border border-border rounded-xl px-4 py-3 flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Truck #{driver.truckNumber || "—"}</span>
          </div>
        )}
      </div>

      <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground font-display">Responses</h2>
        </div>
        <div className="divide-y divide-border">
          {Object.entries(responses).map(([key, value]) => {
            const displayValue = formatValue(value);
            const isNegative = key === "considered_leaving" && value === "yes";
            const isPositive = (key === "feel_supported" || key === "feel_respected") && value === "yes";

            return (
              <div key={key} className="px-5 py-4">
                <div className="text-xs text-muted-foreground mb-1">{questionLabels[key] || key}</div>
                <div className={`text-sm ${
                  isNegative ? "text-destructive" : isPositive ? "text-accent" : "text-foreground"
                }`}>
                  {displayValue}
                </div>
              </div>
            );
          })}
          {Object.keys(responses).length === 0 && (
            <div className="px-5 py-8 text-center text-muted-foreground text-sm">No responses recorded</div>
          )}
        </div>
      </div>
    </div>
  );
}

function formatType(type: string) {
  const map: Record<string, string> = {
    week1: "Week 1 — Orientation and Onboarding",
    week2: "Week 2 — First Week with XXII Century",
    week3: "Week 3 — Second Week with XXII Century",
    week4: "Week 4 — Partnership Fit with XXII Century",
  };
  return map[type] || type;
}

function formatValue(value: any): string {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "number") return String(value);
  if (value === "yes") return "Yes";
  if (value === "no") return "No";
  const labelMap: Record<string, string> = {
    fully: "Fully matched",
    partially: "Partially matched",
    not_matched: "Did not match",
    excellent: "Excellent",
    good: "Good",
    average: "Average",
    poor: "Poor",
    fully_supports: "Fully supports me",
    somewhat_supports: "Somewhat supports",
    leaves_alone: "Leaves me alone",
    somewhat: "Somewhat",
    very_satisfied: "Very Satisfied",
    satisfied: "Satisfied",
    neutral: "Neutral",
    dissatisfied: "Dissatisfied",
    very_dissatisfied: "Very Dissatisfied",
    same_day: "Same day",
    next_day: "Next day",
    few_days: "Took a few days",
    too_long: "Took too long",
    no_issues: "Haven't needed any",
    great: "Great — We work well together",
    strained: "Strained — Some tension",
  };
  return labelMap[value] || String(value);
}
