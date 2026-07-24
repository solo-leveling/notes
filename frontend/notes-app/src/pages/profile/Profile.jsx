import { useAuth } from "../../hooks/useAuth.jsx";

const Profile = () => {
  const { user } = useAuth();

  return (
    <section className="rounded-[28px] border border-surface bg-card p-8 shadow-soft">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-muted">
            Profile
          </p>
          <h1 className="mt-3 text-3xl font-semibold">Account details</h1>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[28px] border border-surface bg-surface p-8">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 text-2xl font-semibold text-primary">
              {user?.username?.[0]?.toUpperCase() || "U"}
            </div>
            <div>
              <p className="text-sm text-muted">Signed in as</p>
              <p className="mt-2 text-xl font-semibold">{user?.username}</p>
            </div>
          </div>

          <div className="space-y-4 text-sm text-muted">
            <div>
              <p className="text-xs uppercase tracking-[0.22em]">Email</p>
              <p className="mt-2 text-base text-[var(--text)]">{user?.email}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.22em]">
                Account created
              </p>
              <p className="mt-2 text-base text-[var(--text)]">
                {new Date(user?.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-surface bg-surface p-8">
          <p className="text-xs uppercase tracking-[0.22em] text-muted">
            Preferences
          </p>
          <div className="mt-6 space-y-4">
            <div className="rounded-3xl border border-surface bg-card p-4">
              <p className="text-sm font-semibold">Theme</p>
              <p className="mt-2 text-sm text-muted">
                Switch between light and dark mode from the workspace controls.
              </p>
            </div>
            <div className="rounded-3xl border border-surface bg-card p-4">
              <p className="text-sm font-semibold">Notifications</p>
              <p className="mt-2 text-sm text-muted">
                Notification settings are available in Settings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
