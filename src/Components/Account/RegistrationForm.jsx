import React, { useState } from "react";
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
  } = useForm();

  const [shopPhotoName, setShopPhotoName] = useState("");
  const registerForValue = watch("registerFor");

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission
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
              <Field
                label="Full Name"
                error={errors.fullName}
                htmlFor="fullName"
              >
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
              </Field>
              <Field label="Email Address" error={errors.email} htmlFor="email">
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
              </Field>
              <Field
                label="Password"
                error={errors.password}
                htmlFor="password"
              >
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
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
                    placeholder="Enter your password"
                    className="w-full rounded-sm h-12 pl-10 pr-4 dark:text-white py-3 border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary dark:placeholder:text-neutral-300 dark:focus:border-neutral-500"
                  />
                </div>
              </Field>
              <Field
                label="Register as"
                error={errors.registerFor}
                htmlFor="registerFor"
              >
                <div className="space-y-2 dark:text-white">
                  <label className="flex dark:text-white items-center">
                    <input
                      {...register("registerFor", {
                        required: "Please select a role",
                      })}
                      type="radio"
                      value="customer"
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
                  <label className="flex dark:text-white items-center">
                    <input
                      {...register("registerFor", {
                        required: "Please select a role",
                      })}
                      type="radio"
                      value="admin"
                      className="mr-2"
                    />
                    Admin
                  </label>
                </div>
              </Field>
              {registerForValue === "vendor" && (
                <>
                  <Field
                    label="Shop Name"
                    error={errors.shopName}
                    htmlFor="shopName"
                  >
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
                  </Field>
                  <Field
                    label="Shop Type"
                    error={errors.shopType}
                    htmlFor="shopType"
                  >
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
                  </Field>
                  <Field
                    label="Shop Address"
                    error={errors.shopAddress}
                    htmlFor="shopAddress"
                  >
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
                  </Field>
                  <Field
                    label="Shop Photo"
                    error={errors.shopPhoto}
                    htmlFor="shopPhoto"
                  >
                    <div className="relative">
                      <MdPhotoCamera className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        {...register("shopPhoto", {
                          required: "Shop photo is required",
                        })}
                        type="file"
                        id="shopPhoto"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          setShopPhotoName(e.target.files[0]?.name || "")
                        }
                      />
                      <label
                        htmlFor="shopPhoto"
                        className="w-full rounded-sm h-12 pl-10 pr-4 py-3 dark:text-white border border-neutral-300 bg-transparent flex items-center cursor-pointer"
                      >
                        {shopPhotoName || "Choose a shop photo"}
                      </label>
                    </div>
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
