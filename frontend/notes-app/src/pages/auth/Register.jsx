import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTheme } from "../../hooks/useTheme.jsx";
import { registerUser } from "../../services/authService.js";
import { Mail, Lock, User, Eye, EyeOff, NotebookPen, Sparkles, ShieldCheck, Sun, Moon } from "lucide-react";

const highlights = [
  { icon: Sparkles, text: "Auto-saving notes with instant search" },
  { icon: ShieldCheck, text: "Private by default, encrypted in transit" },
];

const Register = () => {
  const { toggleTheme, isDarkMode } = useTheme();
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
      await registerUser(values);
      navigate("/login");
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message || "Unable to create account.",
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
            Start writing in a workspace built to keep up with you.
          </p>
          <p className="mt-4 text-sm text-white/70">
            Create a free account and bring your notes, ideas, and projects
            into one clean, organized place.
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

      <div className="relative flex flex-1 items-center justify-center px-4 py-12 sm:px-6">
        <button
          type="button"
          onClick={toggleTheme}
          className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-surface text-muted transition hover:border-primary hover:text-primary sm:right-6 sm:top-6"
          aria-label="Toggle theme"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-2 text-lg font-semibold lg:hidden">
            <NotebookPen size={22} className="text-primary" />
            Notes Studio
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-semibold sm:text-3xl">
              Create your account
            </h1>
            <p className="text-sm text-muted">
              Fast, secure onboarding for your note-taking workflow.
            </p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-[var(--text)]"
              >
                Username
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  id="username"
                  {...register("username", { required: "Username is required" })}
                  type="text"
                  className="input-base pl-11"
                  placeholder="Your username"
                  aria-invalid={errors.username ? "true" : "false"}
                />
              </div>
              {errors.username && (
                <p className="mt-2 text-sm text-rose-500" role="alert">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[var(--text)]"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email",
                    },
                  })}
                  type="email"
                  className="input-base pl-11"
                  placeholder="you@example.com"
                  aria-invalid={errors.email ? "true" : "false"}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-rose-500" role="alert">
                  {errors.email.message}
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
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                  })}
                  type={showPassword ? "text" : "password"}
                  className="input-base pl-11 pr-12"
                  placeholder="Choose a password"
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
              {isSubmitting ? "Creating account…" : "Create account"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-muted">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-primary">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
