import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Field from "../../Components/Common/Field.jsx";
import useAuth from "../../hooks/useAuth.js";
import { setEncryptedCookie } from "../../lib/CookieStore.js";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import ButtonSecondary from "../../shared/Button/ButtonSecondary";

const LoginForm = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      role: "customer", // Set customer as default selected role
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { role, ...rest } = data;
      const loginData = { ...rest, loginFor: role };

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
        loginData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const { user, tokens, success } = response.data;
      if (success) {
        const { accessToken, refreshToken } = tokens;
        setAuth({ user, accessToken, refreshToken });
        setEncryptedCookie("_at", accessToken, 3 / 1440); // 24 hours expiration
        setEncryptedCookie("_rt", refreshToken, 1); // 1 day
        navigate("/");
      } else {
        setError("root.serverError", {
          type: "validation",
          message: response.data.message,
        });
      }
    } catch (error) {
      const errorData = error.response?.data;
      console.error("Login failed:", errorData || error.message);

      if (
        errorData?.statusCode === 404 &&
        errorData.message === "User not found"
      ) {
        setError("email", { type: "manual", message: "User not found" });
      } else if (errorData?.message === "Input validation failed") {
        const uniqueErrors = new Set();
        errorData.errors?.forEach((err) => {
          if (!uniqueErrors.has(err.path)) {
            setError(err.path, { type: "manual", message: err.msg });
            uniqueErrors.add(err.path);
          }
        });
      } else if (
        errorData?.statusCode === 403 &&
        errorData.message === "User is already logged in"
      ) {
        setError("root.serverError", {
          type: "manual",
          message: "User is already logged in",
        });
      } else {
        setError("root.serverError", {
          type: "manual",
          message: "An unexpected error occurred. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto z-30 p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-md">
      <h2 className="text-3xl dark:text-white font-semibold mb-6 text-center">
        Login
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <Field label="Email" error={errors.email} htmlFor="email">
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              type="email"
              id="email"
              placeholder="example@example.com"
              className="w-full rounded-sm h-12 px-4 py-3 dark:text-white border border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary focus:ring-1 focus:ring-primary dark:placeholder:text-neutral-300 dark:focus:border-neutral-500"
            />
          </Field>

          {errors.email && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-md text-sm flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.email.message}
            </div>
          )}

          <Field label="Password" error={errors.password} htmlFor="password">
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type="password"
              id="password"
              placeholder="Password"
              className="w-full rounded-sm h-12 dark:text-white px-4 py-3 border border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary focus:ring-1 focus:ring-primary dark:placeholder:text-neutral-300 dark:focus:border-neutral-500"
            />
            <Link
              to="/forgot-pass"
              className="mt-2 inline-block text-sm text-primary underline dark:text-neutral-300"
            >
              Forgot password
            </Link>
          </Field>

          {errors.password && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-md text-sm flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.password.message}
            </div>
          )}

          <Field label="Choose role" error={errors.role} htmlFor="role">
            <div className="space-y-2 dark:text-white">
              <label className="flex dark:text-white items-center">
                <input
                  {...register("role", {
                    required: "Role selection is required",
                  })}
                  type="radio"
                  value="customer"
                  className="mr-2 text-primary focus:ring-primary"
                  defaultChecked
                />
                Customer
              </label>
              <label className="flex dark:text-white items-center">
                <input
                  {...register("role", {
                    required: "Role selection is required",
                  })}
                  type="radio"
                  value="vendor"
                  className="mr-2 text-primary focus:ring-primary"
                />
                Vendor
              </label>
              <label className="flex dark:text-white items-center">
                <input
                  {...register("role", {
                    required: "Role selection is required",
                  })}
                  type="radio"
                  value="admin"
                  className="mr-2 text-primary focus:ring-primary"
                />
                Admin
              </label>
            </div>
          </Field>

          {errors.role && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-md text-sm flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.role.message}
            </div>
          )}

          {/* Global error message for server-side errors */}
          {errors.root?.serverError && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm flex items-center">
              <svg
                className="w-6 h-6 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.root.serverError.message}
            </div>
          )}

          <div className="mt-8 gap-2 space-y-2 lg:flex lg:space-y-0">
            <ButtonPrimary
              showPointer
              type="submit"
              className="w-full lg:w-1/2"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </ButtonPrimary>
            <ButtonSecondary
              showPointer
              onClick={() => navigate("/register")}
              className="w-full lg:w-1/2"
              disabled={loading}
            >
              Create Account
            </ButtonSecondary>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
