import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Plus, ClipboardCheck, Check, Clock } from "lucide-react";

export default function Retention() {
  const { data: checkIns = [], isLoading } = useQuery({
    queryKey: ["/api/portal/check-ins"],
  });

  const { data: drivers = [] } = useQuery({
    queryKey: ["/api/portal/drivers"],
  });

  const grouped = {
    week1: checkIns.filter((c: any) => c.checkInType === "week1"),
    week2: checkIns.filter((c: any) => c.checkInType === "week2"),
    week3: checkIns.filter((c: any) => c.checkInType === "week3"),
    week4: checkIns.filter((c: any) => c.checkInType === "week4"),
    exit: checkIns.filter((c: any) => c.checkInType === "exit"),
  };

  const columns = [
    { id: "week1" as const, label: "Week 1", sublabel: "Orientation and Onboarding", dotColor: "bg-blue-500", borderColor: "border-t-blue-500" },
    { id: "week2" as const, label: "Week 2", sublabel: "First Week with XXII Century", dotColor: "bg-cyan-400", borderColor: "border-t-cyan-400" },
    { id: "week3" as const, label: "Week 3", sublabel: "Second Week with XXII Century", dotColor: "bg-violet-400", borderColor: "border-t-violet-400" },
    { id: "week4" as const, label: "Week 4", sublabel: "Partnership Fit with XXII Century", dotColor: "bg-emerald-400", borderColor: "border-t-emerald-400" },
    { id: "exit" as const, label: "Exit Survey", sublabel: "Departure Feedback", dotColor: "bg-rose-500", borderColor: "border-t-rose-500" },
  ];

  return (
    <div className="space-y-6" data-testid="retention-page">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-display tracking-tight">Retention Check-Ins</h1>
          <p className="text-muted-foreground text-sm mt-1">{checkIns.length} total</p>
        </div>
        <Link
          to="/portal/retention/new"
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-4 py-2.5 rounded-lg text-sm transition-all"
          data-testid="link-new-checkin"
        >
          <Plus className="w-4 h-4" />
          New Check-In
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="bg-secondary/50 border border-border rounded-xl h-64 animate-pulse" />
          ))}
        </div>
      ) : checkIns.length === 0 ? (
        <div className="bg-card/80 border border-border rounded-xl p-12 text-center">
          <ClipboardCheck className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground">No check-ins recorded yet</p>
          <p className="text-muted-foreground/50 text-sm mt-1">Start a retention check-in for any active driver</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4" data-testid="retention-board">
          {columns.map((col) => {
            const items = grouped[col.id];
            return (
              <div
                key={col.id}
                className={`bg-secondary/50 rounded-xl border-t-2 ${col.borderColor} border border-border overflow-hidden`}
                data-testid={`column-${col.id}`}
              >
                <div className="px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${col.dotColor}`} />
                    <div>
                      <span className="text-sm font-semibold text-foreground font-display">{col.label}</span>
                      <span className="text-xs text-muted-foreground ml-2">{col.sublabel}</span>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground bg-background px-2 py-0.5 rounded-full border border-border">
                    {items.length}
                  </span>
                </div>

                <div className="px-3 pb-3 space-y-2 max-h-[500px] overflow-y-auto">
                  {items.length === 0 ? (
                    <div className="flex items-center justify-center h-[80px] text-xs text-muted-foreground/50">
                      No check-ins
                    </div>
                  ) : (
                    items.map((ci: any) => {
                      const driver = drivers.find((d: any) => d.id === ci.driverId);
                      return (
                        <Link
                          key={ci.id}
                          to={`/portal/retention/${ci.id}`}
                          className="block bg-card border border-border rounded-lg p-3 hover:border-primary/30 transition-all"
                          data-testid={`card-checkin-${ci.id}`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-[10px] text-foreground font-medium border border-border">
                                {driver ? `${driver.firstName[0]}${driver.lastName[0]}` : "?"}
                              </div>
                              <span className="text-sm text-foreground font-medium truncate">
                                {driver ? `${driver.firstName} ${driver.lastName}` : "Unknown"}
                              </span>
                            </div>
                            {ci.status === "completed" ? (
                              <Check className="w-3.5 h-3.5 text-accent" />
                            ) : (
                              <Clock className="w-3.5 h-3.5 text-yellow-400" />
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {ci.status === "completed" && ci.completedAt
                              ? `Completed ${new Date(ci.completedAt).toLocaleDateString()}`
                              : `Started ${new Date(ci.createdAt).toLocaleDateString()}`}
                          </div>
                        </Link>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
