"use client";

import { Popover, Transition } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutHeader from "../Components/Checkout/CheckoutHeader.jsx";
import CheckoutProducts from "../Components/Checkout/CheckoutProducts.jsx";
import OrderDetailsLeft from "../Components/Checkout/OrderDetailsLeft.jsx";
import { useApiWithAuth } from "../hooks/useApiWithAuth.js";
import { useCart } from "../hooks/useCart.js";
import { useCreateOrderMutation } from "../store/api/orderApi.js";

const DELIVERY_CHARGE = 50;

export default function Checkout() {
  const {
    cart,
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  useApiWithAuth();
  const [createOrder] = useCreateOrderMutation();
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState("");

  useEffect(() => {
    const calculatedSubtotal = cart.reduce((total, item) => {
      const itemPrice = item.price * (1 - item.discount / 100);
      return total + itemPrice * item.quantity;
    }, 0);
    setSubtotal(calculatedSubtotal);
    setTotal(calculatedSubtotal + DELIVERY_CHARGE);
  }, [cart]);

  const formatOrderData = (formData) => {
    const products = cart.map((item) => ({
      product: item._id,
      count: item.quantity,
    }));

    return {
      orderName: formData.fullName,
      price: subtotal,
      products,
      deliveryCharge: DELIVERY_CHARGE,
      totalPrice: total,
      orderMethod: formData.paymentMethod,
      division: formData.division,
      district: formData.district,
      subDistrict: formData.subDistrict,
      phoneNumber: formData.phoneNumber,
      houseNo: formData.houseNo,
      postCode: formData.postCode,
    };
  };

  const handleSubmit = async (formData) => {
    try {
      const orderData = formatOrderData(formData);
      const response = await createOrder(orderData).unwrap();
      console.log("Order response:", response);

      // Check if the response includes a payment URL (online payment)
      if (response?.url) {
        setTooltipMessage(
          "Order created successfully! Redirecting to payment..."
        );
        setShowTooltip(true);
        clearCart();

        // Delay before redirecting to the payment URL
        setTimeout(() => {
          window.location.href = response.url;
        }, 1500);
      } else if (response?.orderMethod === "cash") {
        // Handle the cash payment scenario
        clearCart();
        setTooltipMessage("Order created successfully with cash payment!");
        setShowTooltip(true);

        // Redirect to the home page after showing the success message
        setTimeout(() => {
          setShowTooltip(false);
          navigate("/");
        }, 1500);
      } else {
        // Fallback case if neither payment method is specified
        setTooltipMessage(
          "Order created successfully, please check your email for details."
        );
        setShowTooltip(true);
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      setTooltipMessage("Error creating order. Please try again.");
      setShowTooltip(true);
    }

    // Hide tooltip after 2 seconds
    setTimeout(() => setShowTooltip(false), 2000);
  };

  return (
    <>
      <CheckoutHeader />
      <div className="nc-CheckoutPage dark:bg-gray dark:text-white relative">
        <div className="absolute left-0 top-0 -z-10 dark:text-white size-full border-neutral-200 bg-white p-4 dark:border-neutral-600 dark:bg-neutral-900 lg:w-1/2 lg:border-r" />
        <main className="container pb-8 lg:pb-28">
          <div className="flex flex-col lg:flex-row">
            <div className="w-full pt-4 lg:basis-1/2 lg:p-9">
              <OrderDetailsLeft onSubmit={handleSubmit} />
            </div>

            <div className="relative dark:bg-gray dark:text-white w-full lg:basis-1/2">
              <div className="sticky top-0 pt-4 lg:p-9">
                <div className="space-y-2">
                  {cart.map((item) => (
                    <CheckoutProducts key={item._id} item={item} />
                  ))}
                </div>

                <div className="mt-10 border-t border-neutral-300 pt-6 text-sm dark:border-neutral-600">
                  <div className="mt-4 flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="mt-2 flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="font-semibold">
                      ${DELIVERY_CHARGE.toFixed(2)}
                    </span>
                  </div>
                  <div className="mt-2 flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Tooltip using Popover and Transition */}
                <Popover className="relative">
                  <Transition
                    show={showTooltip}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel
                      static
                      className="absolute z-10 w-64 px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl"
                    >
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="p-4 bg-white dark:bg-neutral-800 text-sm">
                          {tooltipMessage}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </Popover>

                <button
                  type="submit"
                  form="checkout-form"
                  className="w-full lg:hidden mt-8 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
          <div className="mt-4 border-t border-neutral-300 pt-4 dark:border-neutral-600 lg:hidden">
            <p className="text-sm text-neutral-500">
              All rights reserved Stock Modern
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
