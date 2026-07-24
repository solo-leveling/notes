import { useState } from "react";
import { useTheme } from "../../hooks/useTheme.jsx";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const [language, setLanguage] = useState("English");
  const [notifications, setNotifications] = useState(true);

  return (
    <section className="rounded-[28px] border border-surface bg-card p-8 shadow-soft">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.25em] text-muted">
          Settings
        </p>
        <h1 className="mt-3 text-3xl font-semibold">Workspace preferences</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[28px] border border-surface bg-surface p-6">
          <h2 className="text-lg font-semibold">Appearance</h2>
          <p className="mt-3 text-sm text-muted">
            Choose the theme that fits your workflow.
          </p>
          <button
            type="button"
            onClick={toggleTheme}
            className="button-primary mt-6"
          >
            Switch to {theme === "dark" ? "Light" : "Dark"} Mode
          </button>
        </div>

        <div className="rounded-[28px] border border-surface bg-surface p-6">
          <h2 className="text-lg font-semibold">Preferences</h2>
          <div className="mt-6 space-y-6">
            <div className="flex items-center justify-between rounded-3xl border border-surface bg-card p-4">
              <div>
                <p className="font-semibold">Language</p>
                <p className="text-sm text-muted">Select app language.</p>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="input-base w-44"
              >
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            <div className="flex items-center justify-between rounded-3xl border border-surface bg-card p-4">
              <div>
                <p className="font-semibold">Notifications</p>
                <p className="text-sm text-muted">Email and desktop updates.</p>
              </div>
              <label className="inline-flex cursor-pointer items-center gap-3 rounded-full bg-surface px-4 py-2">
                <span className="text-sm text-muted">
                  {notifications ? "On" : "Off"}
                </span>
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={() => setNotifications((prev) => !prev)}
                  className="h-5 w-5 rounded border-slate-300 text-primary"
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-[28px] border border-rose-200 bg-rose-50 p-6">
        <p className="text-sm font-semibold text-rose-700">Danger zone</p>
        <p className="mt-2 text-sm text-muted">This action cannot be undone.</p>
        <button
          type="button"
          className="button-ghost mt-4 text-rose-600 hover:bg-rose-100"
        >
          Delete account
        </button>
      </div>
    </section>
  );
};

export default Settings;
