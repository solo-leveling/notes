import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth.jsx";
import { loginUser } from "../../services/authService.js";
import { Eye, EyeOff, Lock, Mail, NotebookPen, Sparkles, ShieldCheck } from "lucide-react";

const highlights = [
  { icon: Sparkles, text: "Auto-saving notes with instant search" },
  { icon: ShieldCheck, text: "Private by default, encrypted in transit" },
];

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    setErrorMessage("");
    try {
      const response = await loginUser({
        identifier: values.identifier,
        password: values.password,
      });
      login(response.data.accessToken);
      navigate("/");
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message ||
          "Unable to sign in. Please check your details.",
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <aside className="relative hidden w-[42%] flex-col justify-between overflow-hidden bg-[var(--primary)] p-12 text-white lg:flex">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="relative flex items-center gap-2 text-lg font-semibold">
          <NotebookPen size={22} />
          Notes Studio
        </div>

        <div className="relative max-w-sm">
          <p className="text-3xl font-semibold leading-tight">
            Your ideas, organized and always within reach.
          </p>
          <p className="mt-4 text-sm text-white/70">
            A focused workspace for capturing notes, tagging what matters, and
            picking up right where you left off.
          </p>
          <div className="mt-8 space-y-4">
            {highlights.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-sm text-white/85">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <Icon size={16} />
                </span>
                {text}
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-xs text-white/50">
          &copy; {new Date().getFullYear()} Notes Studio
        </p>
      </aside>

      <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-2 text-lg font-semibold lg:hidden">
            <NotebookPen size={22} className="text-primary" />
            Notes Studio
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-semibold sm:text-3xl">
              Log in to your account
            </h1>
            <p className="text-sm text-muted">
              Welcome back — enter your details to continue.
            </p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
              <label
                htmlFor="identifier"
                className="mb-2 block text-sm font-medium text-[var(--text)]"
              >
                Email or username
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  id="identifier"
                  {...register("identifier", {
                    required: "Email or username is required",
                  })}
                  type="text"
                  className="input-base pl-11"
                  placeholder="you@example.com"
                  aria-invalid={errors.identifier ? "true" : "false"}
                />
              </div>
              {errors.identifier && (
                <p className="mt-2 text-sm text-rose-500" role="alert">
                  {errors.identifier.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[var(--text)]"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  id="password"
                  {...register("password", { required: "Password is required" })}
                  type={showPassword ? "text" : "password"}
                  className="input-base pl-11 pr-12"
                  placeholder="Enter your password"
                  aria-invalid={errors.password ? "true" : "false"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition hover:text-[var(--text)]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-rose-500" role="alert">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <label className="inline-flex items-center gap-2 text-muted">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-[var(--border)] text-primary focus:ring-primary"
                />
                Remember me
              </label>
              <button
                type="button"
                className="font-medium text-primary hover:text-[var(--primary-strong)]"
              >
                Forgot password?
              </button>
            </div>

            {errorMessage && (
              <p
                className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-500"
                role="alert"
              >
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              className="button-primary w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-muted">
            Don&rsquo;t have an account?{" "}
            <Link to="/signup" className="font-semibold text-primary">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
