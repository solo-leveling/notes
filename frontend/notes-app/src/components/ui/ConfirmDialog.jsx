import { motion } from "framer-motion";

const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg rounded-3xl border border-surface bg-card p-8 shadow-soft"
      >
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="mt-4 text-sm leading-6 text-muted">{message}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="button-ghost w-full sm:w-auto"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="button-primary w-full sm:w-auto"
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmDialog;
