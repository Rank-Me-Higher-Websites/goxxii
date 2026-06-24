import { useState } from "react";
import { useLogin, useAuth } from "@/hooks/use-auth";
import { Navigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import logo from "@/assets/logo.svg";

export default function Login() {
  const { isAuthenticated, isLoading } = useAuth();
  const login = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/portal" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login.mutateAsync({ username: form.username, password: form.password });
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden" data-testid="login-page">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-accent/10 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <img src={logo} alt="XXII Century" className="h-16 mx-auto mb-4" />
          <p className="text-muted-foreground text-sm tracking-widest uppercase font-medium">Operations Portal</p>
        </div>

        <div className="bg-card/80 backdrop-blur-xl border border-border rounded-xl p-6 shadow-[0_25px_50px_-12px_hsl(0_0%_0%/0.5)]">
          <h2 className="text-xl font-semibold text-foreground mb-6 font-display tracking-tight">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">Username</label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none transition-all"
                placeholder="Enter username"
                required
                autoComplete="username"
                data-testid="input-username"
              />
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none transition-all pr-10"
                  placeholder="Enter password"
                  required
                  autoComplete="current-password"
                  data-testid="input-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="button-toggle-password"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-2.5 text-destructive text-sm" data-testid="text-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={login.isPending}
              data-testid="button-submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5 rounded-lg text-sm transition-all disabled:opacity-50 shadow-[0_0_20px_hsl(221_78%_52%/0.3)]"
            >
              {login.isPending ? "..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-muted-foreground/50 mt-6">
          XXII Century Trucking - Secure Internal Portal
        </p>
      </div>
    </div>
  );
}
