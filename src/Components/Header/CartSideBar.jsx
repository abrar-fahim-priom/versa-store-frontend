import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import { useCart } from "../../hooks/useCart.js";

const CartSideBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { cart, removeFromCart, incrementQuantity, decrementQuantity } =
    useCart();
  const { auth } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (auth && cart) {
      setIsLoading(false);
    }
  }, [auth, cart]);

  const handleOpenMenu = () => {
    if (!auth) {
      setIsAlertOpen(true);
      return;
    }
    setIsVisible(true);
  };
  const handleCloseMenu = () => setIsVisible(false);

  const InputNumber = ({ _id, selectedType, quantity }) => {
    return (
      <div className="nc-InputNumber border-2 rounded-md border-primary/15 dark:border-neutral-500 flex items-center justify-between space-x-5">
        <button
          type="button"
          className="flex h-8 w-8 text-black dark:text-white items-center justify-center text-xl"
          onClick={() => decrementQuantity(_id, selectedType)}
          disabled={quantity <= 1}
        >
          -
        </button>
        <span className="block text-black dark:text-white w-6 select-none text-center leading-none">
          {quantity}
        </span>
        <button
          type="button"
          className="flex text-black dark:text-white h-8 w-8 items-center justify-center text-xl"
          onClick={() => incrementQuantity(_id, selectedType)}
        >
          +
        </button>
      </div>
    );
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpenMenu}
        className="relative mx-5 flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
      >
        <span className="absolute -top-1/4 left-3/4 inline-block aspect-square size-4 rounded-full bg-primary text-[10px] text-white">
          {isLoading ? "..." : cart.length}
        </span>
        <CiShoppingCart className="text-black dark:text-white" size={24} />
      </button>

      {auth && (
        <>
          <div
            className={`fixed inset-0 bg-neutral-900/60 z-40 transition-opacity ${
              isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={handleCloseMenu}
          />

          <div
            className={`fixed inset-y-0 right-0 w-full max-w-md md:max-w-[486px] z-50 transition-transform duration-300 transform ${
              isVisible ? "translate-x-0" : "translate-x-full"
            } bg-white dark:bg-gray shadow-lg ring-1 ring-black/5`}
          >
            <div className="relative h-full rounded-md flex flex-col">
              <div className="hiddenScrollbar h-full overflow-y-auto p-5 flex-grow">
                {isLoading ? (
                  <div>Loading cart...</div>
                ) : cart.length === 0 ? (
                  <div>Your cart is empty</div>
                ) : (
                  <div className="flex items-center justify-between">
                    <h3 className="text-4xl text-black dark:text-white font-semibold">
                      Cart{" "}
                      <span className="text-sm font-normal">
                        {cart.length} items
                      </span>
                    </h3>
                    <button
                      type="button"
                      onClick={handleCloseMenu}
                      className="p-2"
                    >
                      <MdClose className="text-2xl text-black dark:text-white" />
                    </button>
                  </div>
                )}
                <div className="divide-y divide-neutral-300">
                  {cart.map((item) => (
                    <div
                      key={`${item._id}-${item.selectedType}`}
                      className="flex gap-5 py-5 last:pb-0"
                    >
                      <div className="relative  size-16 shrink-0 overflow-hidden rounded-xl">
                        <img
                          src={item.images[0].url}
                          alt={item.name}
                          className="size-full object-contain object-center"
                        />
                        <Link
                          onClick={handleCloseMenu}
                          to={`/products/${item._id}`}
                          className="absolute inset-0"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="line-clamp-1 text-black dark:text-white text-ellipsis font-medium">
                              <Link
                                onClick={handleCloseMenu}
                                to={`/products/${item._id}`}
                              >
                                {item.name}
                              </Link>
                            </h3>
                            <span className="font-medium text-black dark:text-white">
                              $
                              {(item.price * (1 - item.discount / 100)).toFixed(
                                2
                              )}
                            </span>
                          </div>
                          <InputNumber
                            _id={item._id}
                            selectedType={item.selectedType}
                            quantity={item.quantity}
                          />
                        </div>
                        <div className="flex w-full items-end justify-between text-sm">
                          <div>
                            <span className="text-gray dark:text-white">
                              Type: {item.selectedType}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() =>
                                removeFromCart(item._id, item.selectedType)
                              }
                              className="underline text-red-500"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subtotal and buttons at the bottom of the cart items */}
              <div className="p-5 bg-white dark:bg-neutral-800 shadow-md">
                <div className="bg-neutral-100 p-6 dark:bg-neutral-800">
                  <span className="flex justify-between text-black dark:text-white font-medium">
                    <span>Subtotal</span>
                    <span>
                      $
                      {cart
                        .reduce(
                          (total, item) =>
                            total +
                            item.price *
                              (1 - item.discount / 100) *
                              item.quantity,
                          0
                        )
                        .toFixed(2)}
                    </span>
                  </span>
                  <p className="block w-2/3 text-sm text-neutral-500">
                    Tax included and Shipping and taxes calculated at checkout.
                  </p>
                </div>
                <div className="mt-5 flex flex-col items-center gap-4">
                  <Link
                    onClick={handleCloseMenu}
                    className="w-full bg-primary text-white p-3 rounded-md text-center"
                    to="/checkout"
                  >
                    Checkout
                  </Link>
                  <Link
                    onClick={handleCloseMenu}
                    className="w-fit text-black dark:text-white text-center bg-gray-100 p-3 rounded-md"
                    to="/cart"
                  >
                    View cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <Transition appear show={isAlertOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsAlertOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Login Required
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Please login to view your cart.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => setIsAlertOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CartSideBar;
