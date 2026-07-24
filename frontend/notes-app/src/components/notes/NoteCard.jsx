import { useMemo } from "react";
import { Star, Trash2, Edit3, Tag, ArrowUpRight } from "lucide-react";

const NoteCard = ({ note, viewMode, onEdit, onDelete, onPin }) => {
  const formattedDate = useMemo(
    () =>
      new Date(note.createOn).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    [note.createOn],
  );

  return (
    <article
      className={`group rounded-3xl border border-surface bg-card p-6 transition duration-200 ${viewMode === "list" ? "flex items-start gap-6" : ""}`}
    >
      <div className="flex-1">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-primary">
              {formattedDate}
            </p>
            <h3 className="mt-3 text-xl font-semibold">{note.title}</h3>
          </div>
          <button
            type="button"
            onClick={onPin}
            className={`rounded-2xl border px-3 py-2 text-sm font-semibold transition ${note.isPinned ? "border-primary bg-primary/10 text-primary" : "border-surface text-muted hover:border-primary hover:text-primary"}`}
            aria-label={note.isPinned ? "Unpin note" : "Pin note"}
          >
            <Star size={16} />
          </button>
        </div>

        <p className="text-sm leading-6 text-muted max-h-20 overflow-hidden">
          {note.content}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {(note.tags || []).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-2 rounded-full border border-surface bg-surface px-3 py-1 text-xs text-muted"
            >
              <Tag size={12} /> {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3 text-sm text-muted sm:mt-0 sm:flex-col sm:items-end">
        <span>{formattedDate}</span>
        <button
          type="button"
          onClick={onEdit}
          className="button-ghost inline-flex items-center gap-2"
        >
          <Edit3 size={16} /> Edit
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="button-ghost inline-flex items-center gap-2 text-rose-600 hover:text-rose-700"
        >
          <Trash2 size={16} /> Delete
        </button>
      </div>
    </article>
  );
};

export default NoteCard;
