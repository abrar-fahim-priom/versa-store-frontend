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

const RegistrationForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    clearErrors,
    setValue,
  } = useForm({
    defaultValues: {
      registerFor: "customer",
    },
  });

  const [shopPhotoName, setShopPhotoName] = useState("");
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

      // Log formData contents
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
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
      console.log("Registration successful:", response.data);
      // Handle successful registration (e.g., show success message, redirect user)
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data || error.message
      );
      // Handle registration error (e.g., show error message to user)
    }
  };

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
                  <p className="text-red-500 text-sm mt-1">
                    {errors.fullName.message}
                  </p>
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
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
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
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
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
                  <p className="text-red-500 text-sm mt-1">
                    {errors.registerFor.message}
                  </p>
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
                      <p className="text-red-500 text-sm mt-1">
                        {errors.shopName.message}
                      </p>
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
                      <p className="text-red-500 text-sm mt-1">
                        {errors.shopType.message}
                      </p>
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
                      <p className="text-red-500 text-sm mt-1">
                        {errors.shopAddress.message}
                      </p>
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
                      <p className="text-red-500 text-sm mt-1">
                        {errors.shopLicenseNo.message}
                      </p>
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
                      <p className="text-red-500 text-sm mt-1">
                        {errors.shopPhoto.message}
                      </p>
                    )}
                  </Field>
                </>
              )}
            </div>
            <div className="mt-8 gap-2 space-y-2 lg:flex lg:space-y-0">
              <ButtonPrimary
                showPointer
                type="submit"
                className="w-full lg:w-1/2"
              >
                Create Account
              </ButtonPrimary>
              <ButtonSecondary
                showPointer
                onClick={() => navigate("/account/login")}
                className="w-full lg:w-1/2"
              >
                Back to Login
              </ButtonSecondary>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
