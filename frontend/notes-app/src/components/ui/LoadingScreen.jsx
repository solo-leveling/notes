import { motion } from "framer-motion";

const LoadingScreen = () => (
  <div className="flex min-h-[calc(100vh-2rem)] items-center justify-center px-4 py-20 text-slate-500">
    <motion.div
      className="flex flex-col items-center gap-3 rounded-3xl border border-surface bg-card px-8 py-10 shadow-soft"
      animate={{ opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 1.2, repeat: Infinity }}
    >
      <div className="h-14 w-14 rounded-3xl border border-primary/20 bg-primary/10" />
      <p className="text-sm font-medium">Loading workspace…</p>
    </motion.div>
  </div>
);

export default LoadingScreen;
