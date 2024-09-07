import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import Field from "../../Components/Common/Field.jsx";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import ButtonSecondary from "../../shared/Button/ButtonSecondary";

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <div>
      <h2 className="text-3xl dark:text-white font-semibold">Login</h2>
      <div className="">
        <div className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <Field label="" error={errors.email} htmlFor="email">
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
                  className="w-full rounded-sm h-12 px-4 py-3 dark:text-white border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary dark:placeholder:text-neutral-300 dark:focus:border-neutral-500"
                />
              </Field>
              <Field label="" error={errors.password} htmlFor="password">
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
                  className="w-full rounded-sm h-12 dark:text-white px-4 py-3 border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary dark:placeholder:text-neutral-300 dark:focus:border-neutral-500"
                />
                <Link
                  to="/forgot-pass"
                  className="mt-2 inline-block text-sm text-primary underline dark:text-neutral-300"
                >
                  Forgot password
                </Link>
              </Field>
              <Field label="Choose role" error={errors.role} htmlFor="role">
                <div className="space-y-2 dark:text-white">
                  <label className="flex dark:text-white items-center">
                    <input
                      {...register("role", {
                        required: "Role selection is required",
                      })}
                      type="radio"
                      value="customer"
                      className="mr-2"
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
                      className="mr-2"
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
                      className="mr-2"
                    />
                    Admin
                  </label>
                </div>
              </Field>
            </div>
            <div className="mt-8 gap-2 space-y-2 lg:flex lg:space-y-0">
              <ButtonPrimary
                showPointer
                type="submit"
                className="w-full lg:w-1/2"
              >
                Sign In
              </ButtonPrimary>
              <ButtonSecondary
                showPointer
                onClick={() => navigate("/account/signup")}
                className="w-full lg:w-1/2"
              >
                Create Account
              </ButtonSecondary>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
