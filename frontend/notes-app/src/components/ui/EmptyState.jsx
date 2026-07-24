const EmptyState = ({
  title = "No items yet",
  description = "Create a note to get started.",
  action,
}) => (
  <div className="rounded-3xl border border-dashed border-surface bg-surface p-10 text-center text-sm text-muted">
    <p className="text-base font-semibold text-slate-900">{title}</p>
    <p className="mt-3 max-w-md mx-auto">{description}</p>
    {action ? <div className="mt-6">{action}</div> : null}
  </div>
);

export default EmptyState;
