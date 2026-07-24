import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Save, Sparkles } from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import { useDebounce } from "../../hooks/useDebounce.jsx";

const fetchNote = async (noteId) => {
  const response = await axiosInstance.get(`/all-notes`);
  return response.data.data.find((item) => item._id === noteId);
};

const NoteEditor = () => {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: { title: "", content: "", tags: "" },
  });

  const noteQuery = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNote(noteId),
    enabled: !!noteId,
  });

  useEffect(() => {
    const note = noteQuery.data;
    if (note) {
      setValue("title", note.title);
      setValue("content", note.content);
      setValue("tags", (note.tags || []).join(", "));
    }
  }, [noteQuery.data, setValue]);

  const content = watch("content");
  const title = watch("title");
  const tags = watch("tags");

  const debouncedContent = useDebounce(content, 400);

  const saveMutation = useMutation({
    mutationFn: async (payload) => {
      if (noteId) {
        return axiosInstance.put(`/edit-note/${noteId}`, payload);
      }
      return axiosInstance.post("/add-note", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  useEffect(() => {
    if (!noteId) return;
    if (!noteQuery.isLoading && noteQuery.isSuccess && !noteQuery.data) {
      navigate("/notes", { replace: true });
    }
  }, [noteId, noteQuery, navigate]);

  useEffect(() => {
    if (isDirty) {
      saveMutation.mutate({
        title,
        content,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      });
    }
  }, [debouncedContent]);

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      tags: values.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };
    await saveMutation.mutateAsync(payload);
    navigate("/notes");
  };

  const wordCount = useMemo(
    () => content.trim().split(/\s+/).filter(Boolean).length,
    [content],
  );

  return (
    <section className="rounded-[28px] border border-surface bg-card p-6 shadow-soft">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="button-ghost inline-flex items-center gap-2"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <div>
            <h1 className="text-2xl font-semibold">
              {noteId ? "Edit note" : "New note"}
            </h1>
            <p className="text-sm text-muted">
              Draft ideas with auto-save and rich note details.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          className="button-primary inline-flex items-center gap-2"
        >
          <Save size={16} /> Save
        </button>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="mb-2 block text-sm font-medium text-[var(--text)]">
            Title
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            type="text"
            className="input-base"
            placeholder="Add a title"
          />
          {errors.title && (
            <p className="mt-2 text-sm text-rose-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[var(--text)]">
            Content
          </label>
          <textarea
            {...register("content", { required: "Content is required" })}
            rows={10}
            className="input-base min-h-[260px] resize-none"
            placeholder="Write your note..."
          />
          {errors.content && (
            <p className="mt-2 text-sm text-rose-500">
              {errors.content.message}
            </p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-[1.5fr,1fr]">
          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--text)]">
              Tags
            </label>
            <input
              {...register("tags")}
              type="text"
              className="input-base"
              placeholder="Add tags separated by commas"
            />
          </div>
          <div className="rounded-3xl border border-surface bg-surface p-4">
            <p className="text-sm text-muted">Auto-save</p>
            <p className="mt-3 text-base font-semibold">
              {saveMutation.isPending ? "Saving..." : "Saved"}
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted">
              <Sparkles size={16} />
              <span>{wordCount} words</span>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default NoteEditor;
