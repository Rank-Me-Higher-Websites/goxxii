import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Users, UserPlus, ClipboardCheck, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/portal/stats"],
  });

  const { data: drivers = [] } = useQuery({
    queryKey: ["/api/portal/drivers"],
  });

  const { data: checkIns = [] } = useQuery({
    queryKey: ["/api/portal/check-ins"],
  });

  const getDriverCheckIns = (driverId: number) =>
    checkIns.filter((c: any) => c.driverId === driverId);

  const getDriverStage = (driver: any) => {
    const driverCheckIns = getDriverCheckIns(driver.id);
    const completed = driverCheckIns
      .filter((c: any) => c.status === "completed")
      .map((c: any) => c.checkInType);
    if (completed.includes("week4")) return "complete";
    if (completed.includes("week3")) return "week4";
    if (completed.includes("week2")) return "week3";
    if (completed.includes("week1")) return "week2";
    return "week1";
  };

  const activeDrivers = drivers.filter((d: any) => d.status === "active");

  const columns = [
    { id: "week1", label: "Week 1", sublabel: "Orientation and Onboarding", color: "border-t-blue-500", dotColor: "bg-blue-500" },
    { id: "week2", label: "Week 2", sublabel: "First Week with XXII Century", color: "border-t-cyan-400", dotColor: "bg-cyan-400" },
    { id: "week3", label: "Week 3", sublabel: "Second Week with XXII Century", color: "border-t-violet-400", dotColor: "bg-violet-400" },
    { id: "week4", label: "Week 4", sublabel: "Partnership Fit with XXII Century", color: "border-t-emerald-400", dotColor: "bg-emerald-400" },
    { id: "complete", label: "Complete", sublabel: "All Done", color: "border-t-green-500", dotColor: "bg-green-500" },
  ];

  const getColumnDrivers = (columnId: string) =>
    activeDrivers.filter((d: any) => getDriverStage(d) === columnId);

  return (
    <div className="space-y-6" data-testid="dashboard-page">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-display tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Driver retention pipeline</p>
        </div>
        <Link
          to="/portal/drivers?new=true"
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-4 py-2.5 rounded-lg text-sm transition-all"
          data-testid="link-add-driver"
        >
          <UserPlus className="w-4 h-4" />
          Add Driver
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          label="Total Drivers"
          value={stats?.totalDrivers ?? "—"}
          icon={Users}
          loading={statsLoading}
        />
        <StatCard
          label="Active"
          value={stats?.activeDrivers ?? "—"}
          icon={TrendingUp}
          loading={statsLoading}
        />
        <StatCard
          label="Check-Ins"
          value={checkIns.length}
          icon={ClipboardCheck}
          loading={statsLoading}
        />
        <StatCard
          label="Completed Pipeline"
          value={getColumnDrivers("complete").length}
          icon={Users}
          loading={statsLoading}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4" data-testid="kanban-board">
        {columns.map((col) => {
          const colDrivers = getColumnDrivers(col.id);
          return (
            <div
              key={col.id}
              className={`bg-secondary/50 rounded-xl border-t-2 ${col.color} border border-border overflow-hidden`}
              data-testid={`column-${col.id}`}
            >
              <div className="px-4 py-3 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${col.dotColor}`} />
                    <span className="text-sm font-semibold text-foreground font-display">{col.label}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{col.sublabel}</span>
                </div>
                <span className="text-xs text-muted-foreground bg-background px-2 py-0.5 rounded-full border border-border">
                  {colDrivers.length}
                </span>
              </div>

              <div className="px-3 pb-3 space-y-2 min-h-[120px] max-h-[400px] overflow-y-auto">
                {colDrivers.length === 0 ? (
                  <div className="flex items-center justify-center h-[100px] text-xs text-muted-foreground/50">
                    No drivers
                  </div>
                ) : (
                  colDrivers.map((driver: any) => (
                    <DriverCard
                      key={driver.id}
                      driver={driver}
                      stage={col.id}
                      checkIns={getDriverCheckIns(driver.id)}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {checkIns.length > 0 && (
        <div className="bg-card/80 backdrop-blur border border-border rounded-xl">
          <div className="px-5 py-3 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground font-display">Recent Activity</h2>
          </div>
          <div className="divide-y divide-border">
            {checkIns.slice(0, 6).map((ci: any) => {
              const driver = drivers.find((d: any) => d.id === ci.driverId);
              return (
                <Link
                  key={ci.id}
                  to={`/portal/retention/${ci.id}`}
                  className="flex items-center justify-between px-5 py-3 hover:bg-secondary/30 transition-colors"
                  data-testid={`link-activity-${ci.id}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-[10px] text-foreground font-medium border border-border">
                      {driver ? `${driver.firstName[0]}${driver.lastName[0]}` : "?"}
                    </div>
                    <div>
                      <span className="text-sm text-foreground">
                        {driver ? `${driver.firstName} ${driver.lastName}` : "Unknown"}
                      </span>
                      <span className="text-xs text-muted-foreground ml-2">{formatType(ci.checkInType)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusDot status={ci.status} />
                    <span className="text-xs text-muted-foreground">
                      {new Date(ci.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function DriverCard({ driver, stage, checkIns }: { driver: any; stage: string; checkIns: any[] }) {
  const nextType = stage === "complete" ? null : stage;
  const pending = checkIns.find((c: any) => c.status === "pending");

  return (
    <Link
      to={`/portal/drivers/${driver.id}`}
      className="block bg-card border border-border rounded-lg p-3 hover:border-primary/30 transition-all group"
      data-testid={`card-driver-${driver.id}`}
    >
      <div className="flex items-center gap-2.5 mb-2">
        <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-[10px] text-foreground font-medium border border-border group-hover:border-primary/30 transition-colors">
          {driver.firstName[0]}{driver.lastName[0]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm text-foreground font-medium truncate">{driver.firstName} {driver.lastName}</div>
          {driver.truckNumber && (
            <div className="text-[10px] text-muted-foreground">Truck #{driver.truckNumber}</div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          <StepDot done={checkIns.some((c: any) => c.checkInType === "week1" && c.status === "completed")} label="W1" />
          <StepDot done={checkIns.some((c: any) => c.checkInType === "week2" && c.status === "completed")} label="W2" />
          <StepDot done={checkIns.some((c: any) => c.checkInType === "week3" && c.status === "completed")} label="W3" />
          <StepDot done={checkIns.some((c: any) => c.checkInType === "week4" && c.status === "completed")} label="W4" />
        </div>
        {pending && (
          <span className="text-[10px] text-yellow-400 bg-yellow-500/10 px-1.5 py-0.5 rounded border border-yellow-500/20">
            Pending
          </span>
        )}
        {stage !== "complete" && !pending && (
          <span
            className="text-[10px] text-primary hover:text-primary/80 bg-primary/10 px-1.5 py-0.5 rounded border border-primary/20 transition-colors cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.location.href = `/portal/retention/new?driverId=${driver.id}&type=${nextType}`;
            }}
            data-testid={`button-start-${driver.id}`}
          >
            Start
          </span>
        )}
      </div>
    </Link>
  );
}

function StepDot({ done, label }: { done: boolean; label: string }) {
  return (
    <span
      className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${
        done
          ? "bg-accent/15 text-accent border border-accent/20"
          : "bg-muted/50 text-muted-foreground/40 border border-border"
      }`}
    >
      {label}
    </span>
  );
}

function StatCard({ label, value, icon: Icon, loading }: { label: string; value: any; icon: any; loading: boolean }) {
  return (
    <div className="bg-card/80 backdrop-blur border border-border rounded-xl p-4" data-testid={`stat-${label.toLowerCase().replace(/\s/g, "-")}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground">{label}</span>
        <Icon className="w-4 h-4 text-muted-foreground/50" />
      </div>
      <div className="text-xl font-bold text-foreground font-display">
        {loading ? <div className="h-7 w-12 bg-border rounded animate-pulse" /> : value}
      </div>
    </div>
  );
}

function StatusDot({ status }: { status: string }) {
  return (
    <span
      className={`w-1.5 h-1.5 rounded-full ${
        status === "completed" ? "bg-accent" : "bg-yellow-400"
      }`}
    />
  );
}

function formatType(type: string) {
  const map: Record<string, string> = { week1: "Week 1", week2: "Week 2", week4: "Week 4" };
  return map[type] || type;
}
