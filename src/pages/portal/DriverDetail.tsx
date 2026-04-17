import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeft, Phone, Mail, Truck, Calendar, User, Check, Clock, ChevronDown, ChevronRight
} from "lucide-react";
import { surveyQuestions } from "@/data/surveyQuestions";

const valueLabels: Record<string, string> = {
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
  yes: "Yes",
  no: "No",
};

function formatValue(value: any): string {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "number") return String(value);
  return valueLabels[value] || String(value);
}

export default function DriverDetail() {
  const { id } = useParams();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const { data: driver, isLoading } = useQuery({
    queryKey: ["/api/portal/drivers", id],
    queryFn: async () => {
      const res = await fetch(`/api/portal/drivers/${id}`, { credentials: "include" });
      if (!res.ok) throw new Error("Not found");
      return res.json();
    },
  });

  const { data: checkIns = [] } = useQuery({
    queryKey: ["/api/portal/check-ins", { driverId: Number(id) }],
    queryFn: async () => {
      const res = await fetch(`/api/portal/check-ins?driverId=${id}`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
  });

  const toggleExpand = (type: string) => {
    setExpanded(prev => ({ ...prev, [type]: !prev[type] }));
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-40 bg-border rounded animate-pulse" />
        <div className="h-48 bg-card border border-border rounded-xl animate-pulse" />
      </div>
    );
  }

  if (!driver) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Driver not found</p>
        <Link to="/portal/drivers" className="text-primary text-sm mt-2 inline-block" data-testid="link-back-fallback">Back to Drivers</Link>
      </div>
    );
  }

  const completedTypes = checkIns.filter((c: any) => c.status === "completed").map((c: any) => c.checkInType);

  const stages = [
    { type: "week1", label: "Week 1", sublabel: "Orientation and Onboarding", color: "blue" },
    { type: "week2", label: "Week 2", sublabel: "First Week with XXII Century", color: "cyan" },
    { type: "week3", label: "Week 3", sublabel: "Second Week with XXII Century", color: "violet" },
    { type: "week4", label: "Week 4", sublabel: "Partnership Fit with XXII Century", color: "emerald" },
  ];

  const colorMap: Record<string, { border: string; bg: string; dot: string; text: string; headerBg: string }> = {
    blue: { border: "border-blue-500/30", bg: "bg-blue-500/5", dot: "bg-blue-500", text: "text-blue-400", headerBg: "hover:bg-blue-500/10" },
    cyan: { border: "border-cyan-400/30", bg: "bg-cyan-400/5", dot: "bg-cyan-400", text: "text-cyan-400", headerBg: "hover:bg-cyan-400/10" },
    violet: { border: "border-violet-400/30", bg: "bg-violet-400/5", dot: "bg-violet-400", text: "text-violet-400", headerBg: "hover:bg-violet-400/10" },
    emerald: { border: "border-emerald-400/30", bg: "bg-emerald-400/5", dot: "bg-emerald-400", text: "text-emerald-400", headerBg: "hover:bg-emerald-400/10" },
  };

  return (
    <div className="space-y-6" data-testid="driver-detail-page">
      <div className="flex items-center gap-3">
        <Link to="/portal/drivers" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-back">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground font-display tracking-tight">{driver.firstName} {driver.lastName}</h1>
          <DriverStatus status={driver.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div className="bg-card/80 backdrop-blur border border-border rounded-xl p-5">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-lg text-foreground font-semibold border border-border">
                {driver.firstName[0]}{driver.lastName[0]}
              </div>
              <div>
                <div className="text-foreground font-medium">{driver.firstName} {driver.lastName}</div>
                <div className="text-xs text-muted-foreground">
                  Hired {new Date(driver.hireDate).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {driver.phone && <InfoRow icon={Phone} value={driver.phone} />}
              {driver.email && <InfoRow icon={Mail} value={driver.email} />}
              {driver.truckNumber && <InfoRow icon={Truck} value={`Truck #${driver.truckNumber}`} />}
              {driver.recruiter && <InfoRow icon={User} value={`Recruiter: ${driver.recruiter}`} />}
              <InfoRow icon={Calendar} value={`Hired: ${new Date(driver.hireDate).toLocaleDateString()}`} />
            </div>
          </div>

          <div className="bg-card/80 backdrop-blur border border-border rounded-xl p-5">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Progress</h3>
            <div className="flex gap-2">
              {stages.map(s => {
                const done = completedTypes.includes(s.type);
                const c = colorMap[s.color];
                return (
                  <div key={s.type} className="flex-1 text-center">
                    <div className={`text-[10px] py-1 rounded font-medium ${
                      done ? `${c.bg} ${c.text} border ${c.border}` : "bg-muted/50 text-muted-foreground/40 border border-transparent"
                    }`}>
                      {s.label.replace("Week ", "W")}
                    </div>
                  </div>
                );
              })}
            </div>
            {completedTypes.length === 4 && (
              <div className="mt-3 flex items-center gap-2 text-accent text-xs font-medium">
                <Check className="w-3.5 h-3.5" />
                All surveys complete
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-sm font-semibold text-foreground font-display">Survey Responses</h2>

          {stages.map((stage) => {
            const done = completedTypes.includes(stage.type);
            const checkIn = checkIns.filter((c: any) => c.checkInType === stage.type)
              .sort((a: any, b: any) => (a.status === "completed" ? -1 : 1))[0];
            const pending = checkIn && checkIn.status === "pending";
            const c = colorMap[stage.color];
            const isExpanded = expanded[stage.type] || false;
            const responses = (checkIn?.responses || {}) as Record<string, any>;
            const survey = surveyQuestions[stage.type];

            return (
              <div
                key={stage.type}
                className={`border rounded-xl overflow-hidden transition-all ${
                  done ? `${c.border}` : "border-border"
                }`}
                data-testid={`stage-${stage.type}`}
              >
                <button
                  onClick={() => done && toggleExpand(stage.type)}
                  className={`w-full flex items-center justify-between px-4 py-3 transition-all ${
                    done ? `${c.bg} ${c.headerBg} cursor-pointer` : "bg-background cursor-default"
                  }`}
                  data-testid={`button-toggle-${stage.type}`}
                >
                  <div className="flex items-center gap-3">
                    {done ? (
                      <div className={`w-6 h-6 rounded-full ${c.dot} flex items-center justify-center`}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    ) : pending ? (
                      <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center">
                        <Clock className="w-3 h-3 text-yellow-400" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-border" />
                    )}
                    <div className="text-left">
                      <div className={`text-sm font-medium ${done ? c.text : "text-foreground"}`}>{stage.label} — {stage.sublabel}</div>
                      {done && checkIn?.completedAt && (
                        <div className="text-[10px] text-muted-foreground mt-0.5">
                          Completed {new Date(checkIn.completedAt).toLocaleDateString()}
                        </div>
                      )}
                      {pending && <div className="text-[10px] text-yellow-400 mt-0.5">In Progress</div>}
                      {!done && !pending && <div className="text-[10px] text-muted-foreground/50 mt-0.5">Not started</div>}
                    </div>
                  </div>

                  {done && (
                    isExpanded
                      ? <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      : <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>

                {done && isExpanded && survey && (
                  <div className="border-t border-border/50 divide-y divide-border/30">
                    {survey.questions.map((q) => {
                      const val = responses[q.key];
                      if (val === undefined || val === null || val === "") return null;

                      const isNegative = q.key === "considered_leaving" && val === "yes";
                      const isPositive = (q.key === "feel_supported" || q.key === "feel_respected" || q.key === "routine_established" || q.key === "miles_consistent") && val === "yes";

                      return (
                        <div key={q.key} className="px-4 py-3" data-testid={`response-${q.key}`}>
                          <div className="text-[10px] text-muted-foreground mb-0.5">{q.label}</div>
                          <div className={`text-sm ${
                            isNegative ? "text-destructive" : isPositive ? "text-accent" : "text-foreground"
                          }`}>
                            {formatValue(val)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, value }: { icon: any; value: string }) {
  return (
    <div className="flex items-center gap-3 text-sm text-muted-foreground">
      <Icon className="w-4 h-4 shrink-0" />
      <span>{value}</span>
    </div>
  );
}

function DriverStatus({ status }: { status: string }) {
  const colors: Record<string, string> = {
    active: "text-accent",
    inactive: "text-muted-foreground",
    terminated: "text-destructive",
  };
  return <span className={`text-xs capitalize ${colors[status] || "text-muted-foreground"}`}>{status}</span>;
}
