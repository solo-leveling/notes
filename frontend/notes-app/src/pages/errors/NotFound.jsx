import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="flex min-h-[calc(100vh-2rem)] items-center justify-center px-4 py-20">
    <div className="w-full max-w-3xl rounded-[32px] border border-surface bg-card p-10 shadow-soft text-center">
      <p className="text-sm uppercase tracking-[0.25em] text-muted">
        404 error
      </p>
      <h1 className="mt-4 text-4xl font-semibold">Page not found</h1>
      <p className="mt-4 text-sm text-muted">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="button-primary mt-8 inline-flex items-center justify-center"
      >
        Return to dashboard
      </Link>
    </div>
  </div>
);

export default NotFound;
