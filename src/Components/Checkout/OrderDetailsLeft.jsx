import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoCashSharp } from "react-icons/io5";
import { PiCreditCard } from "react-icons/pi";
import { Link } from "react-router-dom";
import { BangladeshData } from "../../data/BangladeshData";
import Field from "../Common/Field";

const OrderDetailsLeft = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  const [zillas, setZillas] = useState([]);
  const [upazillas, setUpazillas] = useState([]);

  const selectedDivision = watch("division");
  const selectedZilla = watch("zilla");
  const selectedPaymentMethod = watch("paymentMethod");

  useEffect(() => {
    if (selectedDivision) {
      setZillas(Object.keys(BangladeshData[selectedDivision]));
      setValue("zilla", "");
      setValue("upazilla", "");
    } else {
      setZillas([]);
      setUpazillas([]);
    }
  }, [selectedDivision, setValue]);

  useEffect(() => {
    if (selectedDivision && selectedZilla) {
      setUpazillas(BangladeshData[selectedDivision][selectedZilla]);
      setValue("upazilla", "");
    } else {
      setUpazillas([]);
    }
  }, [selectedDivision, selectedZilla, setValue]);

  const ErrorMessage = ({ message }) => (
    <p className="mt-1 text-sm text-red-500">{message}</p>
  );

  return (
    <form id="checkout-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-9 dark:text-white">
        {/* Contact Info section */}
        <div id="ContactInfo" className="scroll-mt-24">
          <div className="z-0">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Contact</h3>
                <span>
                  <Link
                    to="/account/login"
                    className="text-sm text-primary underline"
                  >
                    Log In
                  </Link>
                </span>
              </div>
              <Field label="" error={errors.phone} htmlFor="phone">
                <input
                  {...register("phone", {
                    required: "Phone is required",
                    pattern: {
                      value: /^\+?[0-9]{10,}$/,
                      message: "Please enter a valid phone number",
                    },
                  })}
                  type="tel"
                  id="phone"
                  placeholder="+880"
                  className={`w-full p-3 bg-[#030317] border ${
                    errors.phone ? "border-red-500" : "border-neutral-300"
                  } rounded h-12 px-4 py-3 focus:outline-none bg-transparent placeholder:text-neutral-500 focus:border-primary`}
                />
              </Field>
            </div>
          </div>
        </div>

        {/* Shipping Address section */}
        <div id="ShippingAddress" className="scroll-mt-24">
          <div className="">
            <div className="flex items-center justify-between">
              <h3 className="mb-2 text-xl font-semibold">Delivery</h3>
            </div>

            <div className="space-y-2">
              <Field label="" error={errors.orderName} htmlFor="orderName">
                <input
                  {...register("orderName", {
                    required: "Order name is required",
                    minLength: {
                      value: 3,
                      message: "Order name must be at least 3 characters",
                    },
                  })}
                  type="text"
                  id="orderName"
                  placeholder="Order Name"
                  className={`w-full p-3 bg-[#030317] border ${
                    errors.orderName ? "border-red-500" : "border-neutral-300"
                  } rounded h-12 px-4 py-3 focus:outline-none bg-transparent placeholder:text-neutral-500 focus:border-primary`}
                />
              </Field>

              {/* Division dropdown */}
              <Field label="" error={errors.division} htmlFor="division">
                <select
                  {...register("division", {
                    required: "Division is required",
                  })}
                  id="division"
                  className={`w-full p-3 bg-[#030317] border ${
                    errors.division ? "border-red-500" : "border-neutral-300"
                  } rounded h-12 px-4 py-3 focus:outline-none bg-transparent placeholder:text-neutral-500 focus:border-primary`}
                >
                  <option value="">Select Division</option>
                  {Object.keys(BangladeshData).map((division) => (
                    <option key={division} value={division}>
                      {division}
                    </option>
                  ))}
                </select>
              </Field>

              {/* Zilla dropdown */}
              <Field label="" error={errors.zilla} htmlFor="zilla">
                <select
                  {...register("zilla", {
                    required: "Zilla is required",
                  })}
                  id="zilla"
                  className={`w-full p-3 bg-[#030317] border ${
                    errors.zilla ? "border-red-500" : "border-neutral-300"
                  } rounded h-12 px-4 py-3 focus:outline-none bg-transparent placeholder:text-neutral-500 focus:border-primary`}
                  disabled={!selectedDivision}
                >
                  <option value="">Select Zilla</option>
                  {zillas.map((zilla) => (
                    <option key={zilla} value={zilla}>
                      {zilla}
                    </option>
                  ))}
                </select>
              </Field>

              {/* Upazilla dropdown */}
              <Field label="" error={errors.upazilla} htmlFor="upazilla">
                <select
                  {...register("upazilla", {
                    required: "Upazilla is required",
                  })}
                  id="upazilla"
                  className={`w-full p-3 bg-[#030317] border ${
                    errors.upazilla ? "border-red-500" : "border-neutral-300"
                  } rounded h-12 px-4 py-3 focus:outline-none bg-transparent placeholder:text-neutral-500 focus:border-primary`}
                  disabled={!selectedZilla}
                >
                  <option value="">Select Upazilla</option>
                  {upazillas.map((upazilla) => (
                    <option key={upazilla} value={upazilla}>
                      {upazilla}
                    </option>
                  ))}
                </select>
              </Field>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3">
                <Field label="" error={errors.address} htmlFor="address">
                  <input
                    {...register("address", {
                      required: "Address is required",
                      minLength: {
                        value: 5,
                        message: "Address must be at least 5 characters",
                      },
                    })}
                    type="text"
                    id="address"
                    placeholder="House No & Street Name"
                    className={`w-full p-3 bg-[#030317] border ${
                      errors.address ? "border-red-500" : "border-neutral-300"
                    } rounded h-12 px-4 py-3 focus:outline-none bg-transparent placeholder:text-neutral-500 focus:border-primary`}
                  />
                </Field>
                <Field label="" error={errors.zipCode} htmlFor="zipCode">
                  <input
                    {...register("zipCode", {
                      required: "ZIP Code is required",
                      pattern: {
                        value: /^\d{4,6}$/,
                        message: "Please enter a valid ZIP code",
                      },
                    })}
                    type="text"
                    id="zipCode"
                    placeholder="Postal Code"
                    className={`w-full p-3 bg-[#030317] border ${
                      errors.zipCode ? "border-red-500" : "border-neutral-300"
                    } rounded h-12 px-4 py-3 focus:outline-none bg-transparent placeholder:text-neutral-500 focus:border-primary`}
                  />
                </Field>
              </div>

              <div className="">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    {...register("newsAndOffers")}
                    className="mr-2"
                  />
                  <span className="text-sm">Email me news and offers</span>
                </label>
              </div>

              <div className="pt-6">
                <h4 className="font-medium">Payment Method</h4>
                <p className="mt-2 rounded bg-neutral-100 p-4 text-sm text-neutral-500 dark:bg-neutral-800 dark:text-neutral-300">
                  Enter your shipping details to view available shipping methods
                </p>
              </div>
            </div>
            <Field
              label=""
              error={errors.paymentMethod}
              htmlFor="paymentMethod"
            >
              <div className="mb-4 divide-y divide-neutral-300 rounded-md border border-neutral-300 dark:divide-neutral-600 dark:border-neutral-600">
                <div
                  className={`flex items-center justify-between p-4 ${
                    selectedPaymentMethod === "COD" &&
                    "bg-blue-50 dark:bg-neutral-800"
                  } `}
                >
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="COD"
                      {...register("paymentMethod", {
                        required: "Payment method is required",
                      })}
                      className="mr-2"
                    />
                    Cash On Delivery
                  </label>
                  <div className="">
                    <IoCashSharp />
                  </div>
                </div>
                <div
                  className={`flex items-center justify-between p-4 ${
                    selectedPaymentMethod === "Online" &&
                    "bg-blue-50 dark:bg-neutral-800"
                  }`}
                >
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="Online"
                      {...register("paymentMethod", {
                        required: "Payment method is required",
                      })}
                      className="mr-2"
                    />
                    Online Payment
                  </label>
                  <div className="">
                    <PiCreditCard />
                  </div>
                </div>
              </div>
            </Field>
          </div>
        </div>

        <div id="PaymentMethod" className="scroll-mt-24">
          {/* PaymentMethod section can be added here */}
        </div>

        <div className="hidden pt-6 lg:block">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-3 py-2 rounded-lg"
          >
            Pay Now
          </button>
        </div>

        <div className="hidden border-t border-neutral-300 pt-4 dark:border-neutral-600 lg:block">
          <p className="text-sm text-neutral-500">
            All rights reserved Stock Mordern
          </p>
        </div>
      </div>
    </form>
  );
};

export default OrderDetailsLeft;
