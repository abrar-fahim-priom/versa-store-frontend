import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiTruck } from "react-icons/fi";
import { MdOutlineTakeoutDining } from "react-icons/md";
import { Link } from "react-router-dom";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import Field from "../Common/Field";

const OrderDetailsLeft = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [methodActive, setMethodActive] = useState("Ship");

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-9">
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

        <div id="ShippingAddress" className="scroll-mt-24">
          <div className="">
            <div className="flex items-center justify-between">
              <h3 className="mb-2 text-xl font-semibold">Delivery</h3>
            </div>
            <div className="mb-4 divide-y divide-neutral-300 rounded-md border border-neutral-300 dark:divide-neutral-600 dark:border-neutral-600">
              <div
                className={`flex items-center justify-between p-4 ${
                  methodActive === "Ship" && "bg-blue-50 dark:bg-neutral-800"
                } `}
              >
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="Ship"
                    checked={methodActive === "Ship"}
                    onChange={() => setMethodActive("Ship")}
                    className="mr-2"
                  />
                  Ship
                </label>
                <div className="">
                  <FiTruck />
                </div>
              </div>
              <div
                className={`flex items-center justify-between p-4 ${
                  methodActive === "Pickup" && "bg-blue-50 dark:bg-neutral-800"
                }`}
              >
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="Pickup"
                    checked={methodActive === "Pickup"}
                    onChange={() => setMethodActive("Pickup")}
                    className="mr-2"
                  />
                  Pickup
                </label>
                <div className="">
                  <MdOutlineTakeoutDining />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Field label="Country" error={errors.country} htmlFor="country">
                <select
                  {...register("country", { required: "Country is required" })}
                  id="country"
                  className={`w-full p-3 bg-[#030317] border ${
                    errors.country ? "border-red-500" : "border-neutral-300"
                  } rounded h-12 px-4 py-3 focus:outline-none bg-transparent placeholder:text-neutral-500 focus:border-primary`}
                >
                  <option value="">Select a country</option>
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Israel">Israel</option>
                  <option value="France">France</option>
                  <option value="England">England</option>
                  <option value="Laos">Laos</option>
                  <option value="China">China</option>
                </select>
              </Field>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3">
                <Field
                  label="First Name"
                  error={errors.firstName}
                  htmlFor="firstName"
                >
                  <input
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    type="text"
                    id="firstName"
                    placeholder="First Name"
                    className={`w-full p-3 bg-[#030317] border ${
                      errors.firstName ? "border-red-500" : "border-neutral-300"
                    } rounded h-12 px-4 py-3 focus:outline-none bg-transparent placeholder:text-neutral-500 focus:border-primary`}
                  />
                </Field>

                <Field
                  label="Last Name"
                  error={errors.lastName}
                  htmlFor="lastName"
                >
                  <input
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    type="text"
                    id="lastName"
                    placeholder="Last Name"
                    className={`w-full p-3 bg-[#030317] border ${
                      errors.lastName ? "border-red-500" : "border-neutral-300"
                    } rounded h-12 px-4 py-3 focus:outline-none bg-transparent placeholder:text-neutral-500 focus:border-primary`}
                  />
                </Field>
              </div>

              <Field label="Address" error={errors.address} htmlFor="address">
                <input
                  {...register("address", { required: "Address is required" })}
                  type="text"
                  id="address"
                  placeholder="1234 Main Street"
                  className={`w-full p-3 bg-[#030317] border ${
                    errors.address ? "border-red-500" : "border-neutral-300"
                  } rounded h-12 px-4 py-3 focus:outline-none bg-transparent placeholder:text-neutral-500 focus:border-primary`}
                />
              </Field>

              <Field label="City" error={errors.city} htmlFor="city">
                <input
                  {...register("city", { required: "City is required" })}
                  type="text"
                  id="city"
                  placeholder="City"
                  className={`w-full p-3 bg-[#030317] border ${
                    errors.city ? "border-red-500" : "border-neutral-300"
                  } rounded h-12 px-4 py-3 focus:outline-none bg-transparent placeholder:text-neutral-500 focus:border-primary`}
                />
              </Field>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3">
                <Field label="State" error={errors.state} htmlFor="state">
                  <input
                    {...register("state", { required: "State is required" })}
                    type="text"
                    id="state"
                    placeholder="State"
                    className={`w-full p-3 bg-[#030317] border ${
                      errors.state ? "border-red-500" : "border-neutral-300"
                    } rounded h-12 px-4 py-3 focus:outline-none bg-transparent placeholder:text-neutral-500 focus:border-primary`}
                  />
                </Field>

                <Field
                  label="ZIP Code"
                  error={errors.zipCode}
                  htmlFor="zipCode"
                >
                  <input
                    {...register("zipCode", {
                      required: "ZIP Code is required",
                    })}
                    type="text"
                    id="zipCode"
                    placeholder="ZIP Code"
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
                <h4 className="font-medium">Shipping Method</h4>
                <p className="mt-2 rounded bg-neutral-100 p-4 text-sm text-neutral-500 dark:bg-neutral-800 dark:text-neutral-300">
                  Enter your shipping details to view available shipping methods
                </p>
              </div>
            </div>
          </div>
        </div>

        <div id="PaymentMethod" className="scroll-mt-24">
          {/* PaymentMethod section can be added here */}
        </div>

        <div className="hidden pt-6 lg:block">
          <ButtonPrimary type="submit" className="w-full">
            Pay Now
          </ButtonPrimary>
        </div>

        <div className="hidden border-t border-neutral-300 pt-4 dark:border-neutral-600 lg:block"></div>
      </div>
    </form>
  );
};

export default OrderDetailsLeft;
