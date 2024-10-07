import React, { useEffect, useState } from "react";
import CheckoutHeader from "../Components/Checkout/CheckoutHeader.jsx";
// import CheckoutProducts from "../Components/Checkout/CheckoutProducts.jsx";
import OrderDetailsLeft from "../Components/Checkout/OrderDetailsLeft.jsx";
import { useCart } from "../hooks/useCart.js";
import ButtonPrimary from "../shared/Button/ButtonPrimary.jsx";

export default function Checkout() {
  const {
    cart,
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
  } = useCart();

  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const shippingCost = 200;

  console.log(cart);

  useEffect(() => {
    const calculatedSubtotal = cart.reduce(
      (total, item) => total + item.currentPrice * item.quantity,
      0
    );
    setSubtotal(calculatedSubtotal);
    setTotal(calculatedSubtotal + shippingCost);
  }, [cart]);

  return (
    <>
      <CheckoutHeader />
      <div className="nc-CheckoutPage dark:bg-gray dark:text-white relative">
        <div className="absolute left-0 top-0 -z-10 dark:text-white size-full border-neutral-200 bg-white p-4 dark:border-neutral-600 dark:bg-neutral-900 lg:w-1/2 lg:border-r" />
        <main className="container pb-8 lg:pb-28 ">
          <div className="flex flex-col lg:flex-row">
            <div className="w-full pt-4 lg:basis-1/2 lg:p-9">
              {<OrderDetailsLeft />}
            </div>

            <div className="relative dark:bg-gray dark:text-white w-full lg:basis-1/2">
              <div className="sticky top-0 pt-4 lg:p-9">
                <div className="space-y-2">
                  {/* {cart.map((item) => (
                    <CheckoutProducts key={item.name} item={item} />
                  ))} */}
                </div>

                <div className="mt-10 border-t border-neutral-300 pt-6 text-sm dark:border-neutral-600">
                  <div className="mt-4 flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="mt-2 flex justify-between">
                    <span>Shipping</span>
                    <span className="font-semibold">
                      ${shippingCost.toFixed(2)}
                    </span>
                  </div>
                  <div className="mt-2 flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <ButtonPrimary className="mt-8 w-full lg:hidden">
                  Pay Now
                </ButtonPrimary>
              </div>
            </div>
          </div>
          <div className="mt-4 border-t border-neutral-300 pt-4 dark:border-neutral-600 lg:hidden">
            <p className="text-sm text-neutral-500">
              All rights reserved Stock Mordern
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
