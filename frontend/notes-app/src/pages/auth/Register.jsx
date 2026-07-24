import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerUser } from "../../services/authService.js";
import { Mail, Lock, User } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
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
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-4 py-12">
      <div className="w-full max-w-xl rounded-[32px] border border-surface bg-card p-10 shadow-soft">
        <div className="mb-8 space-y-2 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-muted">
            Create account
          </p>
          <h1 className="text-3xl font-semibold">
            Get started with Notes Studio
          </h1>
          <p className="text-sm text-muted">
            Fast and secure onboarding for your note-taking workflow.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-900">
              Username
            </label>
            <div className="relative">
              <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                {...register("username", { required: "Username is required" })}
                type="text"
                className="input-base pl-11"
                placeholder="Your username"
              />
            </div>
            {errors.username && (
              <p className="mt-2 text-sm text-rose-600">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-900">
              Email
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
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
              />
            </div>
            {errors.email && (
              <p className="mt-2 text-sm text-rose-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-900">
              Password
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
                type="password"
                className="input-base pl-11"
                placeholder="Choose a password"
              />
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-rose-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {errorMessage && (
            <p className="rounded-3xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
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
  );
};

export default Register;
