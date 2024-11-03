import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaEnvelope,
  FaLock,
  FaMapMarkerAlt,
  FaStore,
  FaUser,
} from "react-icons/fa";
import { MdPhotoCamera } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import Field from "../../Components/Common/Field.jsx";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import ButtonSecondary from "../../shared/Button/ButtonSecondary";
import ContinueWithGoogle from "./ContinueWithGoogle.jsx";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    clearErrors,
    setValue,
    setError,
  } = useForm({
    defaultValues: {
      registerFor: "customer",
    },
  });

  const [serverError, setServerError] = useState(null);
  const [shopPhotoName, setShopPhotoName] = useState("");
  const [loading, setLoading] = useState(false);
  const registerForValue = watch("registerFor");

  useEffect(() => {
    if (registerForValue !== "vendor") {
      clearErrors([
        "shopName",
        "shopType",
        "shopAddress",
        "shopLicenseNo",
        "shopPhoto",
      ]);
    }
  }, [registerForValue, clearErrors]);

  const onSubmit = async (data) => {
    // Reset server error before submission
    setServerError(null);
    setLoading(true);

    try {
      const formData = new FormData();

      // Append all text fields
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("registerFor", data.registerFor);

      if (data.registerFor === "vendor") {
        formData.append("shopName", data.shopName);
        formData.append("shopLicenseNo", data.shopLicenseNo);
        formData.append("shopType", data.shopType);
        formData.append("shopAddress", data.shopAddress);

        // Append file
        if (data.shopPhoto) {
          formData.append("shopPhoto", data.shopPhoto, data.shopPhoto.name);
        }
      }

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data?.success) {
        navigate("/login", { replace: true });
      }
    } catch (error) {
      const errorData = error.response?.data;
      console.error("Registration failed:", errorData || error.message);

      // Centralized error handling similar to login form
      if (
        errorData?.statusCode === 400 &&
        errorData.message === "Input validation failed"
      ) {
        const uniqueErrors = new Set();
        errorData.errors?.forEach((err) => {
          if (!uniqueErrors.has(err.path)) {
            setError(err.path, { type: "manual", message: err.msg });
            uniqueErrors.add(err.path);
          }
        });
      } else {
        // Set a generic server error if specific error handling doesn't apply
        setServerError(
          errorData?.message ||
            "An unexpected error occurred. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const ErrorMessage = ({ message }) => (
    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-md text-sm flex items-center">
      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        />
      </svg>
      {message}
    </div>
  );

  return (
    <div>
      <h2 className="text-3xl dark:text-white font-semibold">
        Create an Account
      </h2>
      <div className="">
        <div className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <Field label="Full Name" htmlFor="fullName">
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    {...register("fullName", {
                      required: "Full name is required",
                    })}
                    type="text"
                    id="fullName"
                    placeholder="John Doe"
                    className="w-full rounded-sm h-12 pl-10 pr-4 py-3 dark:text-white border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary dark:placeholder:text-neutral-300 dark:focus:border-neutral-500"
                  />
                </div>
                {errors.fullName && (
                  <ErrorMessage message={errors.fullName.message} />
                )}
              </Field>
              <Field label="Email Address" htmlFor="email">
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
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
                    className="w-full rounded-sm h-12 pl-10 pr-4 py-3 dark:text-white border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary dark:placeholder:text-neutral-300 dark:focus:border-neutral-500"
                  />
                </div>
                {errors.email && (
                  <ErrorMessage message={errors.email.message} />
                )}
              </Field>
              <Field label="Password" htmlFor="password">
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    {...register("password", {
                      required: "Password is required",
                      validate: {
                        complexity: (value) => {
                          const minLength = 8;
                          const hasUppercase = /[A-Z]/.test(value);
                          const hasLowercase = /[a-z]/.test(value);
                          const hasNumber = /\d/.test(value);
                          const hasSpecialChar = /[@$!%*?&]/.test(value);

                          if (value.length < minLength) {
                            return "Password must be at least 8 characters";
                          }
                          if (
                            !(
                              hasUppercase &&
                              hasLowercase &&
                              hasNumber &&
                              hasSpecialChar
                            )
                          ) {
                            return "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character";
                          }
                          return true;
                        },
                      },
                    })}
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    className="w-full rounded-sm h-12 pl-10 pr-4 dark:text-white py-3 border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary dark:placeholder:text-neutral-300 dark:focus:border-neutral-500"
                  />
                </div>
                {errors.password && (
                  <ErrorMessage message={errors.password.message} />
                )}
                <p className="text-sm text-gray-500 mt-1">
                  Password should be minimum 8 characters, including at least 1
                  uppercase letter, 1 lowercase letter, 1 number, and 1 special
                  character.
                </p>
              </Field>
              <Field label="Register as" htmlFor="registerFor">
                <div className="space-y-2 dark:text-white">
                  <label className="flex dark:text-white items-center">
                    <input
                      {...register("registerFor", {
                        required: "Please select a role",
                      })}
                      type="radio"
                      value="customer"
                      defaultChecked // Add this to set a default value
                      className="mr-2"
                    />
                    Customer
                  </label>
                  <label className="flex dark:text-white items-center">
                    <input
                      {...register("registerFor", {
                        required: "Please select a role",
                      })}
                      type="radio"
                      value="vendor"
                      className="mr-2"
                    />
                    Vendor
                  </label>
                </div>
                {errors.registerFor && (
                  <ErrorMessage message={errors.registerFor.message} />
                )}
              </Field>
              {registerForValue === "vendor" && (
                <>
                  <Field label="Shop Name" htmlFor="shopName">
                    <div className="relative">
                      <FaStore className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        {...register("shopName", {
                          required: "Shop name is required",
                        })}
                        type="text"
                        id="shopName"
                        placeholder="Enter your shop name"
                        className="w-full rounded-sm h-12 pl-10 pr-4 py-3 dark:text-white border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary dark:placeholder:text-neutral-300 dark:focus:border-neutral-500"
                      />
                    </div>
                    {errors.shopName && (
                      <ErrorMessage message={errors.shopName.message} />
                    )}
                  </Field>
                  <Field label="Shop Type" htmlFor="shopType">
                    <div className="relative">
                      <FaStore className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        {...register("shopType", {
                          required: "Shop type is required",
                        })}
                        type="text"
                        id="shopType"
                        placeholder="e.g., Electronics, Clothing, etc."
                        className="w-full rounded-sm h-12 pl-10 pr-4 py-3 dark:text-white border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary dark:placeholder:text-neutral-300 dark:focus:border-neutral-500"
                      />
                    </div>
                    {errors.shopType && (
                      <ErrorMessage message={errors.shopType.message} />
                    )}
                  </Field>
                  <Field label="Shop Address" htmlFor="shopAddress">
                    <div className="relative">
                      <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        {...register("shopAddress", {
                          required: "Shop address is required",
                        })}
                        type="text"
                        id="shopAddress"
                        placeholder="Enter your shop address"
                        className="w-full rounded-sm h-12 pl-10 pr-4 py-3 dark:text-white border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary dark:placeholder:text-neutral-300 dark:focus:border-neutral-500"
                      />
                    </div>
                    {errors.shopAddress && (
                      <ErrorMessage message={errors.shopAddress.message} />
                    )}
                  </Field>
                  <Field label="Shop License Number" htmlFor="shopLicenseNo">
                    <div className="relative">
                      <FaStore className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        {...register("shopLicenseNo", {
                          required: "Shop license number is required",
                        })}
                        type="text"
                        id="shopLicenseNo"
                        placeholder="Enter your shop license number"
                        className="w-full rounded-sm h-12 pl-10 pr-4 py-3 dark:text-white border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary dark:placeholder:text-neutral-300 dark:focus:border-neutral-500"
                      />
                    </div>
                    {errors.shopLicenseNo && (
                      <ErrorMessage message={errors.shopLicenseNo.message} />
                    )}
                  </Field>
                  <Field label="Shop Photo" htmlFor="shopPhoto">
                    <div className="relative">
                      <MdPhotoCamera className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="file"
                        id="shopPhoto"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          setShopPhotoName(file?.name || "");
                          setValue("shopPhoto", file);
                          console.log("File selected:", file);
                        }}
                      />
                      <label
                        htmlFor="shopPhoto"
                        className="w-full rounded-sm h-12 pl-10 pr-4 py-3 dark:text-white border border-neutral-300 bg-transparent flex items-center cursor-pointer"
                      >
                        {shopPhotoName || "Choose a shop photo"}
                      </label>
                    </div>
                    {errors.shopPhoto && (
                      <ErrorMessage message={errors.shopPhoto.message} />
                    )}
                  </Field>
                </>
              )}
            </div>
            <div className="mt-8 gap-2 space-y-2 lg:flex lg:space-y-0">
              {registerForValue === "customer" && (
                <ButtonSecondary>
                  <ContinueWithGoogle
                    text="login_with"
                    setError={setServerError}
                    setLoading={setLoading}
                  />
                </ButtonSecondary>
              )}
              <ButtonPrimary
                showPointer
                type="submit"
                className="w-full lg:w-1/2"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </ButtonPrimary>
              <ButtonSecondary
                showPointer
                onClick={() => navigate("/login")}
                className="w-full lg:w-1/2"
              >
                Back to Login
              </ButtonSecondary>
            </div>
          </form>
          {serverError && <ErrorMessage message={serverError} />}
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
