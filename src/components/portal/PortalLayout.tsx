import { useAuth, useLogout } from "@/hooks/use-auth";
import { Navigate, Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Users, ClipboardCheck, LogOut, Menu, X, Link as LinkIcon, DoorOpen
} from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.svg";

const navItems = [
  { path: "/portal", label: "Dashboard", icon: LayoutDashboard },
  { path: "/portal/drivers", label: "Drivers", icon: Users },
  { path: "/portal/retention", label: "Check-Ins", icon: ClipboardCheck },
  { path: "/portal/exit-surveys", label: "Exit Surveys", icon: DoorOpen },
  { path: "/portal/survey-links", label: "Survey Links", icon: LinkIcon },
];

export default function PortalLayout() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const logout = useLogout();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/portal/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background flex" data-testid="portal-layout">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-60 bg-[hsl(222_47%_6%)] border-r border-border flex flex-col transform transition-transform duration-200 lg:translate-x-0 lg:static ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <img src={logo} alt="XXII Century" className="h-8" />
            <div className="text-[10px] text-muted-foreground/60 uppercase tracking-[0.15em] font-medium leading-tight">
              OPS
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-muted-foreground hover:text-foreground" data-testid="button-close-sidebar">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 mt-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path ||
              (item.path !== "/portal" && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                data-testid={`nav-${item.label.toLowerCase().replace(/\s/g, "-")}`}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border">
          <div className="px-3 py-2 mb-1">
            <div className="text-sm text-foreground font-medium">{user?.name}</div>
            <div className="text-xs text-muted-foreground capitalize">{user?.role}</div>
          </div>
          <button
            onClick={() => logout.mutate()}
            data-testid="button-logout"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 w-full transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border px-4 lg:px-6 h-12 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-muted-foreground hover:text-foreground"
            data-testid="button-menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </header>

        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
