import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.svg";

export default function PublicRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "", lastName: "", phone: "", email: "",
    truckNumber: "", recruiter: "",
  });
  const [error, setError] = useState("");

  const register = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch("/api/survey/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Registration failed");
      }
      return res.json();
    },
    onSuccess: (data) => {
      navigate(`/survey/${data.token}`);
    },
    onError: (err: any) => setError(err.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    register.mutate(form);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden" data-testid="register-page">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-accent/10 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-lg relative z-10">
        <div className="text-center mb-8">
          <img src={logo} alt="XXII Century" className="h-14 mx-auto mb-3" />
          <h1 className="text-2xl font-bold text-foreground font-display tracking-tight">Driver Check-In</h1>
          <p className="text-muted-foreground text-sm mt-1">Register to begin your retention survey</p>
        </div>

        <div className="bg-card/80 backdrop-blur-xl border border-border rounded-xl p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-1.5">First Name *</label>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  required
                  data-testid="input-first-name"
                  className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none transition-all"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1.5">Last Name *</label>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  required
                  data-testid="input-last-name"
                  className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none transition-all"
                  placeholder="Smith"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-1.5">Phone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  data-testid="input-phone"
                  className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none transition-all"
                  placeholder="(555) 555-0123"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1.5">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  data-testid="input-email"
                  className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none transition-all"
                  placeholder="driver@email.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-1.5">Truck Number</label>
                <input
                  type="text"
                  value={form.truckNumber}
                  onChange={(e) => setForm({ ...form, truckNumber: e.target.value })}
                  data-testid="input-truck"
                  className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none transition-all"
                  placeholder="2847"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1.5">Recruiter</label>
                <input
                  type="text"
                  value={form.recruiter}
                  onChange={(e) => setForm({ ...form, recruiter: e.target.value })}
                  data-testid="input-recruiter"
                  className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none transition-all"
                  placeholder="Who recruited you?"
                />
              </div>
            </div>

            {error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-2.5 text-destructive text-sm" data-testid="text-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={register.isPending}
              data-testid="button-register"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg text-sm transition-all disabled:opacity-50"
            >
              {register.isPending ? "Registering..." : "Start Survey"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-muted-foreground/50 mt-6">
          XXII Century Trucking - Your feedback helps us improve
        </p>
      </div>
    </div>
  );
}
