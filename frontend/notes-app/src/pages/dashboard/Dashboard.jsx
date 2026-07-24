import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Clock3,
  Pin,
  Star,
  Archive,
  CalendarDays,
} from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import { useAuth } from "../../hooks/useAuth.jsx";

const fetchNotes = async () => {
  const response = await axiosInstance.get("/all-notes");
  return response.data.data || [];
};

const Dashboard = () => {
  const { data: notes = [], isLoading } = useQuery({
    queryKey: ["dashboard-notes"],
    queryFn: fetchNotes,
  });
  const { user } = useAuth();
  const navigate = useNavigate();

  const summary = useMemo(() => {
    const pinned = notes.filter((note) => note.isPinned).length;
    const recentNotes = [...notes]
      .sort(
        (a, b) =>
          new Date(b.createOn).getTime() - new Date(a.createOn).getTime(),
      )
      .slice(0, 3);
    const tags = new Set(notes.flatMap((note) => note.tags || []));
    return { total: notes.length, pinned, recentNotes, tagsCount: tags.size };
  }, [notes]);

  return (
    <section className="space-y-6">
      <div className="rounded-[28px] border border-surface bg-card p-8 shadow-soft">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted">
              Welcome back,
            </p>
            <h1 className="mt-3 text-3xl font-semibold">
              {user?.username || "Notes user"}
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              A modern note workspace built to keep your writing, projects, and
              ideas polished.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/notes/new")}
            className="button-primary inline-flex items-center gap-2 self-start"
          >
            <Plus size={18} /> Create note
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total notes", value: summary.total, icon: Star },
          { label: "Pinned", value: summary.pinned, icon: Pin },
          { label: "Tags", value: summary.tagsCount, icon: Archive },
          { label: "Recent", value: summary.recentNotes.length, icon: Clock3 },
        ].map(({ label, value, icon: Icon }) => (
          <article
            key={label}
            className="rounded-[24px] border border-surface bg-card p-6 shadow-soft"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted">{label}</p>
                <p className="mt-3 text-3xl font-semibold">
                  {isLoading ? "—" : value}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                <Icon size={20} />
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr,0.9fr]">
        <section className="rounded-[28px] border border-surface bg-card p-6 shadow-soft">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-muted">
                Recent notes
              </p>
              <h2 className="mt-3 text-xl font-semibold">Edit history</h2>
            </div>
            <button
              type="button"
              onClick={() => navigate("/notes")}
              className="button-ghost inline-flex items-center gap-2"
            >
              <Search size={16} /> Search
            </button>
          </div>

          <div className="space-y-4">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="h-24 rounded-3xl bg-surface" />
              ))
            ) : summary.recentNotes.length ? (
              summary.recentNotes.map((note) => (
                <div
                  key={note._id}
                  role="button"
                  tabIndex={0}
                  onClick={() => navigate(`/notes/${note._id}`)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      navigate(`/notes/${note._id}`);
                    }
                  }}
                  className="cursor-pointer rounded-3xl border border-surface p-4 transition hover:border-primary/30 hover:bg-surface"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-base font-semibold">{note.title}</h3>
                      <p className="mt-2 text-sm text-muted line-clamp-2">
                        {note.content}
                      </p>
                    </div>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {new Date(note.createOn).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-3xl border border-dashed border-surface p-8 text-center text-sm text-muted">
                No notes yet. Create your first note to start organizing ideas.
              </div>
            )}
          </div>
        </section>

        <section className="rounded-[28px] border border-surface bg-card p-6 shadow-soft">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-muted">
                Activity
              </p>
              <h2 className="mt-3 text-xl font-semibold">Workspace insights</h2>
            </div>
            <CalendarDays size={20} className="text-muted" />
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-surface p-4">
              <p className="text-sm text-muted">Pinned notes</p>
              <p className="mt-3 text-2xl font-semibold">{summary.pinned}</p>
            </div>
            <div className="rounded-3xl border border-surface p-4">
              <p className="text-sm text-muted">Label diversity</p>
              <p className="mt-3 text-2xl font-semibold">{summary.tagsCount}</p>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Dashboard;
