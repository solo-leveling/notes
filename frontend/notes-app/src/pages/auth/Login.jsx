import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth.jsx";
import { loginUser } from "../../services/authService.js";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

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
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-4 py-12">
      <div className="w-full max-w-xl rounded-[32px] border border-surface bg-card p-10 shadow-soft">
        <div className="mb-8 space-y-2 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-muted">
            Welcome back
          </p>
          <h1 className="text-3xl font-semibold">Log in to your account</h1>
          <p className="text-sm text-muted">
            Secure note access with modern authentication UI.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-900">
              Email or username
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                {...register("identifier", {
                  required: "Email or username is required",
                })}
                type="text"
                className="input-base pl-11"
                placeholder="you@example.com"
              />
            </div>
            {errors.identifier && (
              <p className="mt-2 text-sm text-rose-600">
                {errors.identifier.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-900">
              Password
            </label>
            <div className="relative">
              <input
                {...register("password", { required: "Password is required" })}
                type={showPassword ? "text" : "password"}
                className="input-base pr-12"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-rose-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
              />
              Remember me
            </label>
            <button type="button" className="text-primary underline">
              Forgot password?
            </button>
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
            {isSubmitting ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-muted">
          Don’t have an account?{" "}
          <Link to="/signup" className="font-semibold text-primary">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
