import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Plus, LogOut, Check, Clock } from "lucide-react";

export default function ExitSurveys() {
  const { data: checkIns = [], isLoading } = useQuery({
    queryKey: ["/api/portal/check-ins"],
  });

  const { data: drivers = [] } = useQuery({
    queryKey: ["/api/portal/drivers"],
  });

  const exitSurveys = checkIns.filter((c: any) => c.checkInType === "exit");

  return (
    <div className="space-y-6" data-testid="exit-surveys-page">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-display tracking-tight">Exit Surveys</h1>
          <p className="text-muted-foreground text-sm mt-1">{exitSurveys.length} total · Departure feedback</p>
        </div>
        <Link
          to="/portal/retention/new"
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-4 py-2.5 rounded-lg text-sm transition-all"
          data-testid="link-new-exit-survey"
        >
          <Plus className="w-4 h-4" />
          New Check-In
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-secondary/50 border border-border rounded-xl h-28 animate-pulse" />
          ))}
        </div>
      ) : exitSurveys.length === 0 ? (
        <div className="bg-card/80 border border-border rounded-xl p-12 text-center">
          <LogOut className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground">No exit surveys recorded yet</p>
          <p className="text-muted-foreground/50 text-sm mt-1">Share an exit survey link from the Survey Links page when a driver is leaving</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-testid="exit-surveys-grid">
          {exitSurveys.map((ci: any) => {
            const driver = drivers.find((d: any) => d.id === ci.driverId);
            return (
              <Link
                key={ci.id}
                to={`/portal/retention/${ci.id}`}
                className="block bg-card border border-border rounded-xl border-t-2 border-t-rose-500 p-4 hover:border-primary/30 transition-all"
                data-testid={`card-exit-survey-${ci.id}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs text-foreground font-medium border border-border">
                      {driver ? `${driver.firstName[0]}${driver.lastName[0]}` : "?"}
                    </div>
                    <div>
                      <div className="text-sm text-foreground font-medium truncate">
                        {driver ? `${driver.firstName} ${driver.lastName}` : "Unknown"}
                      </div>
                      {driver?.truckNumber && (
                        <div className="text-xs text-muted-foreground">Truck #{driver.truckNumber}</div>
                      )}
                    </div>
                  </div>
                  {ci.status === "completed" ? (
                    <span className="flex items-center gap-1 text-xs text-accent">
                      <Check className="w-3.5 h-3.5" /> Completed
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs text-yellow-400">
                      <Clock className="w-3.5 h-3.5" /> Pending
                    </span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                  {ci.status === "completed" && ci.completedAt
                    ? `Completed ${new Date(ci.completedAt).toLocaleDateString()}`
                    : `Started ${new Date(ci.createdAt).toLocaleDateString()}`}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
