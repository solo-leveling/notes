import { Outlet, NavLink } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme.jsx";
import { useAuth } from "../../hooks/useAuth.jsx";
import {
  Menu,
  Settings,
  Home,
  FileText,
  UserCircle,
  Sun,
  Moon,
} from "lucide-react";

const navItems = [
  { path: "/", label: "Dashboard", icon: Home },
  { path: "/notes", label: "Notes", icon: FileText },
  { path: "/profile", label: "Profile", icon: UserCircle },
  { path: "/settings", label: "Settings", icon: Settings },
];

const AppShell = () => {
  const { toggleTheme, isDarkMode } = useTheme();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="mx-auto flex min-h-screen max-w-[1440px] gap-6 px-4 py-5 lg:px-8">
        <aside className="hidden w-72 shrink-0 rounded-[28px] border border-surface bg-card p-6 shadow-soft lg:flex lg:flex-col">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-muted">
                Notes Studio
              </p>
              <h1 className="mt-3 text-2xl font-semibold">Workspace</h1>
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-surface text-muted transition hover:border-primary hover:text-primary"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          <nav className="space-y-2">
            {navItems.map(({ path, label, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-primary text-white shadow-soft"
                      : "text-muted hover:bg-surface hover:text-text"
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto rounded-3xl border border-surface bg-surface p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">
              Account
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                {user?.username?.[0]?.toUpperCase() || "U"}
              </div>
              <div>
                <p className="font-semibold">{user?.username || "User"}</p>
                <p className="text-xs text-muted">{user?.email}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={logout}
              className="mt-4 w-full rounded-2xl border border-surface bg-transparent py-3 text-sm font-semibold text-muted transition hover:bg-slate-50"
            >
              Log out
            </button>
          </div>
        </aside>

        <main className="flex-1">
          <div className="flex items-center justify-between gap-4 rounded-[28px] border border-surface bg-card p-5 shadow-soft lg:hidden">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-muted">
                Notes Studio
              </p>
              <h2 className="mt-1 text-lg font-semibold">Workspace</h2>
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-surface text-muted transition hover:border-primary hover:text-primary"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppShell;
