import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  LayoutGrid,
  List,
  Plus,
  Trash2,
  Star,
  Zap,
} from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import EmptyState from "../../components/ui/EmptyState.jsx";
import NoteCard from "../../components/notes/NoteCard.jsx";

const fetchNotes = async () => {
  const response = await axiosInstance.get("/all-notes");
  return response.data.data || [];
};

const Notes = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: notes = [], isLoading } = useQuery(["notes"], fetchNotes, {
    staleTime: 1000 * 30,
  });
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("updated");

  const filteredNotes = useMemo(() => {
    const normalized = search.toLowerCase();
    return notes
      .filter((note) => {
        const title = note.title.toLowerCase();
        const content = note.content.toLowerCase();
        const tags = (note.tags || []).join(" ").toLowerCase();
        return (
          title.includes(normalized) ||
          content.includes(normalized) ||
          tags.includes(normalized)
        );
      })
      .sort((a, b) => {
        if (sortBy === "pinned") return Number(b.isPinned) - Number(a.isPinned);
        if (sortBy === "title") return a.title.localeCompare(b.title);
        return new Date(b.createOn) - new Date(a.createOn);
      });
  }, [notes, search, sortBy]);

  const handleDelete = async (id) => {
    await axiosInstance.delete(`/delete-note/${id}`);
    queryClient.invalidateQueries(["notes"]);
  };

  const handlePin = async (note) => {
    await axiosInstance.put(`/edit-pin/${note._id}`, {
      isPinned: !note.isPinned,
    });
    queryClient.invalidateQueries(["notes"]);
  };

  return (
    <section className="space-y-6 rounded-[28px] border border-surface bg-card p-6 shadow-soft">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Notes</h1>
          <p className="mt-2 text-sm text-muted">
            Browse your notes, pin favorites, and keep ideas organized.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="button-primary inline-flex items-center gap-2"
            onClick={() => navigate("/notes/new")}
          >
            <Plus size={16} /> Add note
          </button>
          <button
            type="button"
            className="button-ghost inline-flex items-center gap-2"
          >
            <Trash2 size={16} /> Archive
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[1.2fr,0.8fr]">
        <div className="grid gap-4">
          <div className="flex flex-col gap-3 rounded-3xl border border-surface bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search notes, tags, or content..."
                className="input-base pl-11"
                aria-label="Search notes"
              />
            </div>
            <div className="grid grid-cols-3 gap-3 sm:w-[260px]">
              <button
                type="button"
                className="button-ghost inline-flex items-center justify-center gap-2"
                onClick={() => setViewMode("grid")}
                aria-pressed={viewMode === "grid"}
              >
                <LayoutGrid size={16} /> Grid
              </button>
              <button
                type="button"
                className="button-ghost inline-flex items-center justify-center gap-2"
                onClick={() => setViewMode("list")}
                aria-pressed={viewMode === "list"}
              >
                <List size={16} /> List
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="button-ghost inline-flex items-center gap-2"
              onClick={() => setSortBy("updated")}
            >
              Updated
            </button>
            <button
              type="button"
              className="button-ghost inline-flex items-center gap-2"
              onClick={() => setSortBy("pinned")}
            >
              <Pin size={16} /> Pinned
            </button>
            <button
              type="button"
              className="button-ghost inline-flex items-center gap-2"
              onClick={() => setSortBy("title")}
            >
              <Zap size={16} /> Title
            </button>
          </div>

          <div
            className={
              viewMode === "grid" ? "grid gap-4 sm:grid-cols-2" : "space-y-4"
            }
          >
            {isLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-44 rounded-3xl bg-surface" />
              ))
            ) : filteredNotes.length ? (
              filteredNotes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  viewMode={viewMode}
                  onEdit={() => navigate(`/notes/${note._id}`)}
                  onDelete={() => handleDelete(note._id)}
                  onPin={() => handlePin(note)}
                />
              ))
            ) : (
              <EmptyState
                title="No matching notes"
                description="Try another search term or add a new note."
              />
            )}
          </div>
        </div>

        <aside className="rounded-3xl border border-surface bg-surface p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-base font-semibold">Quick actions</h2>
            <Filter size={18} className="text-muted" />
          </div>
          <div className="space-y-4">
            <div className="rounded-3xl border border-surface bg-card p-4">
              <p className="text-sm text-muted">Pinned notes</p>
              <p className="mt-2 text-2xl font-semibold">
                {notes.filter((note) => note.isPinned).length}
              </p>
            </div>
            <div className="rounded-3xl border border-surface bg-card p-4">
              <p className="text-sm text-muted">Total notes</p>
              <p className="mt-2 text-2xl font-semibold">{notes.length}</p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Notes;
