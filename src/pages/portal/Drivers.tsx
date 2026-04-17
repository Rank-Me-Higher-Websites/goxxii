import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { UserPlus, Search, X, Users as UsersIcon } from "lucide-react";

export default function Drivers() {
  const [searchParams] = useSearchParams();
  const [showAddForm, setShowAddForm] = useState(searchParams.get("new") === "true");
  const [search, setSearch] = useState("");

  const { data: drivers = [], isLoading } = useQuery({
    queryKey: ["/api/portal/drivers"],
  });

  const { data: checkIns = [] } = useQuery({
    queryKey: ["/api/portal/check-ins"],
  });

  const filtered = drivers.filter((d: any) =>
    `${d.firstName} ${d.lastName} ${d.truckNumber || ""}`.toLowerCase().includes(search.toLowerCase())
  );

  const getProgress = (driverId: number) => {
    const completed = checkIns
      .filter((c: any) => c.driverId === driverId && c.status === "completed")
      .map((c: any) => c.checkInType);
    return { week1: completed.includes("week1"), week2: completed.includes("week2"), week3: completed.includes("week3"), week4: completed.includes("week4") };
  };

  return (
    <div className="space-y-6" data-testid="drivers-page">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-display tracking-tight">Drivers</h1>
          <p className="text-muted-foreground text-sm mt-1">{drivers.length} total</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          data-testid="button-add-driver"
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-4 py-2.5 rounded-lg text-sm transition-all"
        >
          <UserPlus className="w-4 h-4" />
          Add Driver
        </button>
      </div>

      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or truck number..."
          className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-2.5 text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none transition-all"
          data-testid="input-search"
        />
      </div>

      {isLoading ? (
        <div className="bg-card/80 border border-border rounded-xl overflow-hidden">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-14 border-b border-border animate-pulse bg-border/20" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-card/80 border border-border rounded-xl p-12 text-center">
          <UsersIcon className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground">{search ? "No drivers match your search" : "No drivers yet"}</p>
        </div>
      ) : (
        <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
          <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_140px] gap-4 px-5 py-2.5 border-b border-border text-[10px] text-muted-foreground uppercase tracking-wider">
            <span>Driver</span>
            <span>Truck</span>
            <span>Contact</span>
            <span>Status</span>
            <span>Progress</span>
          </div>
          <div className="divide-y divide-border">
            {filtered.map((driver: any) => {
              const progress = getProgress(driver.id);
              return (
                <Link
                  key={driver.id}
                  to={`/portal/drivers/${driver.id}`}
                  className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_140px] gap-2 md:gap-4 px-5 py-3 hover:bg-secondary/30 transition-all items-center"
                  data-testid={`card-driver-${driver.id}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-[11px] text-foreground font-semibold border border-border shrink-0">
                      {driver.firstName[0]}{driver.lastName[0]}
                    </div>
                    <span className="text-sm text-foreground font-medium truncate">{driver.firstName} {driver.lastName}</span>
                  </div>

                  <div className="text-xs text-muted-foreground truncate">
                    {driver.truckNumber ? `#${driver.truckNumber}` : "—"}
                  </div>

                  <div className="text-xs text-muted-foreground truncate">
                    {driver.phone || driver.email || "—"}
                  </div>

                  <div>
                    <DriverStatus status={driver.status} />
                  </div>

                  <div className="flex gap-1">
                    <ProgressPill done={progress.week1} label="W1" />
                    <ProgressPill done={progress.week2} label="W2" />
                    <ProgressPill done={progress.week3} label="W3" />
                    <ProgressPill done={progress.week4} label="W4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {showAddForm && <AddDriverModal onClose={() => setShowAddForm(false)} />}
    </div>
  );
}

function ProgressPill({ done, label }: { done: boolean; label: string }) {
  return (
    <span
      className={`flex-1 text-center text-[10px] py-1 rounded font-medium ${
        done
          ? "bg-accent/15 text-accent border border-accent/20"
          : "bg-muted/50 text-muted-foreground/40 border border-transparent"
      }`}
    >
      {label}
    </span>
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

function AddDriverModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    firstName: "", lastName: "", phone: "", email: "",
    truckNumber: "", recruiter: "",
    hireDate: new Date().toISOString().split("T")[0],
  });
  const [error, setError] = useState("");

  const createDriver = useMutation({
    mutationFn: (data: any) =>
      apiRequest("/api/portal/drivers", { method: "POST", body: JSON.stringify(data) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/portal/drivers"] });
      queryClient.invalidateQueries({ queryKey: ["/api/portal/stats"] });
      onClose();
    },
    onError: (err: any) => setError(err.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createDriver.mutate({ ...form, hireDate: new Date(form.hireDate).toISOString(), status: "active" });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-card border border-border rounded-xl w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground font-display">Add New Driver</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors" data-testid="button-close-modal">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="First Name" value={form.firstName} onChange={(v) => setForm({ ...form, firstName: v })} required tid="input-first-name" />
            <Field label="Last Name" value={form.lastName} onChange={(v) => setForm({ ...form, lastName: v })} required tid="input-last-name" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} tid="input-phone" />
            <Field label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} type="email" tid="input-email" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Truck Number" value={form.truckNumber} onChange={(v) => setForm({ ...form, truckNumber: v })} tid="input-truck" />
            <Field label="Recruiter" value={form.recruiter} onChange={(v) => setForm({ ...form, recruiter: v })} tid="input-recruiter" />
          </div>
          <Field label="Hire Date" value={form.hireDate} onChange={(v) => setForm({ ...form, hireDate: v })} type="date" required tid="input-hire-date" />

          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-2.5 text-destructive text-sm">{error}</div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={createDriver.isPending}
              data-testid="button-save-driver"
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5 rounded-lg text-sm transition-all disabled:opacity-50"
            >
              {createDriver.isPending ? "Saving..." : "Add Driver"}
            </button>
            <button type="button" onClick={onClose} data-testid="button-cancel" className="px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground border border-border transition-all">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required = false, tid }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean; tid: string;
}) {
  return (
    <div>
      <label className="block text-sm text-muted-foreground mb-1.5">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} data-testid={tid}
        className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none transition-all" />
    </div>
  );
}
