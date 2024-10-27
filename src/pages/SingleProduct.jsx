import { Dialog, Transition } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { BsLightningCharge } from "react-icons/bs";
import { FaCheck } from "react-icons/fa6";
import { HiMiniArrowUturnLeft } from "react-icons/hi2";
import { LuInfo, LuTruck } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../Components/Header/NavBar";
import Banner from "../Components/Products/Banner";
import ImageShowCase from "../Components/Products/ImageShowCase";
import ProductReviewSection from "../Components/Products/ProductReviewSection.jsx";
import ProductSlider from "../Components/Products/ProductSlider";
import ProductTabs from "../Components/Products/ProductTabs";
import FavoriteToggle from "../Components/ui/FavoriteToggle.jsx";
import QuantityInput from "../Components/ui/QuantityInput";
import useAuth from "../hooks/useAuth";
import { useCart } from "../hooks/useCart.js";
import ButtonPrimary from "../shared/Button/ButtonPrimary";
import ButtonSecondary from "../shared/Button/ButtonSecondary";
import { useGetSingleProductQuery } from "../store/api/productApi";

export default function SingleProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, error } = useGetSingleProductQuery(id);
  const { addToCart, clearCart } = useCart();
  const { auth } = useAuth();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    if (data?.product) {
      setCurrentProduct(data.product);
      setSelectedVariant(data.product.defaultType || "");
    }
  }, [data]);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (!auth) {
      setIsAlertOpen(true);
      return;
    }
    if (currentProduct && quantity > 0) {
      const cartProduct = {
        ...currentProduct,
        selectedType: selectedVariant,
      };
      addToCart(cartProduct, quantity);
      console.log(
        `Added ${quantity} of ${currentProduct.name} (${selectedVariant}) to cart.`
      );
    }
  };

  const handleBuyNow = () => {
    if (!auth) {
      setIsAlertOpen(true);
      return;
    }
    if (currentProduct && quantity > 0) {
      clearCart();
      const cartProduct = {
        ...currentProduct,
        selectedType: selectedVariant,
      };
      addToCart(cartProduct, quantity);
      navigate("/checkout");
    }
  };

  const handleVariantChange = (variantType) => {
    setSelectedVariant(variantType);
    if (variantType === data.product.defaultType) {
      setCurrentProduct(data.product);
    } else {
      const selectedVariantData = data.product.variant.find(
        (v) => v.type === variantType
      );
      if (selectedVariantData) {
        setCurrentProduct({
          ...data.product,
          price: selectedVariantData.price,
          description: selectedVariantData.description,
        });
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!currentProduct) return <div>Product not found</div>;

  const productImages = currentProduct.images.map((image) => image.url);
  const discountedPrice =
    currentProduct.price * (1 - currentProduct.discount / 100);

  console.log(currentProduct);

  return (
    <>
      <NavBar />
      <div className="bg-neutral-100 z-50 dark:bg-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <ImageShowCase shots={productImages} />
            </div>

            <div className="lg:col-span-4 mt-2">
              <span className="mb-2  text-s text-blue-500">
                {currentProduct?.addedBy?.shopName}
              </span>
              <FavoriteToggle auth={auth} productId={currentProduct._id} />
              <h1 className="mb-0 text-3xl dark:text-white font-bold">
                {currentProduct.name}
              </h1>

              <div className="mb-5 space-y-1">
                <h1 className="text-2xl font-semibold">
                  <span className="text-green-700">
                    ${discountedPrice.toFixed(2)}
                  </span>{" "}
                  {currentProduct.discount > 0 && (
                    <span className="text-neutral-500 line-through">
                      ${currentProduct.price.toFixed(2)}
                    </span>
                  )}
                </h1>
                <p className="text-sm dark:text-white">Tax included.</p>
              </div>

              {currentProduct.variant && currentProduct.variant.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm mb-2">Select Type:</h4>
                  <div className="flex flex-wrap gap-2">
                    <ButtonSecondary
                      onClick={() =>
                        handleVariantChange(currentProduct.defaultType)
                      }
                      className={
                        selectedVariant === currentProduct.defaultType
                          ? "bg-blue-100 dark:bg-blue-500"
                          : ""
                      }
                    >
                      {currentProduct.defaultType}
                    </ButtonSecondary>
                    {currentProduct.variant.map((v) => (
                      <ButtonSecondary
                        key={v._id}
                        onClick={() => handleVariantChange(v.type)}
                        className={
                          selectedVariant === v.type
                            ? "bg-blue-100 dark:bg-blue-500"
                            : ""
                        }
                      >
                        {v.type}
                      </ButtonSecondary>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <p className="text-neutral-500 dark:text-neutral-300">
                  {currentProduct.description}
                </p>
              </div>

              <div className="mb-6">
                <h4 className="text-sm dark:text-white">Quantity:</h4>
                <div className="flex gap-2">
                  <QuantityInput
                    min={1}
                    max={currentProduct.stock}
                    defaultValue={1}
                    onChange={handleQuantityChange}
                  />
                  <ButtonSecondary className="w-full" onClick={handleAddToCart}>
                    Add to cart
                  </ButtonSecondary>
                </div>
              </div>

              <div className="mb-5 mt-2 flex items-center gap-5">
                <ButtonPrimary onClick={handleBuyNow} className="">
                  Buy Now
                </ButtonPrimary>
              </div>

              <div className="mb-6 flex">
                <div className="p-1 text-green-700">
                  <FaCheck />
                </div>
                <div className="dark:text-white">
                  <p>Pickup available at shop location</p>
                  <p className="mb-1">Usually ready in 24 hours</p>
                  <p className="text-sm">View store information</p>
                </div>
              </div>

              <div className="divide-y divide-neutral-300 dark:divide-neutral-400">
                <div className="flex gap-4 py-4">
                  <div>
                    <BsLightningCharge className="dark:text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm text-red-600">
                      {currentProduct.stock} in Stock Now
                    </h3>
                    <p className="mt-1 text-neutral-500 dark:text-neutral-300">
                      Upgrade your tech collection with the latest must-have
                      item, available now in limited quantities.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 py-4">
                  <div>
                    <LuTruck className="dark:text-white" />
                  </div>
                  <div>
                    <h3 className="flex items-start dark:text-white gap-2 text-sm font-semibold">
                      <span className="inline-block">Next Day Delivery</span>{" "}
                      <LuInfo className="inline-block" size={12} />
                    </h3>
                    <p className="text-neutral-500 dark:text-neutral-300">
                      Lightning-fast shipping, guaranteed.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 py-4">
                  <div className="text-primary dark:text-white">
                    <HiMiniArrowUturnLeft />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-primary dark:text-white">
                      Free 90-day returns
                    </h3>
                    <p className="text-neutral-500 dark:text-neutral-300">
                      Shop risk-free with easy returns.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-8 flex items-center justify-between gap-4 rounded-md border-2 border-blue-600 px-9 py-4 dark:border-neutral-400">
                <div>
                  <h3 className="text-sm font-semibold dark:text-white">
                    Packaging Note:
                  </h3>
                  <p className="text-neutral-500 dark:text-neutral-300">
                    Research and development value proposition graphical user
                    interface investor. Startup business plan user experience
                  </p>
                </div>
                <div className="text-primary">
                  <LuInfo />
                </div>
              </div>

              <div className="mb-8 rounded-md bg-primary px-10 py-4 text-white">
                <div>
                  <span className="mb-5 inline-block">VersaStore</span>
                  <h3 className="font-semibold">
                    Discount & Free shipping on Your first purchase.
                  </h3>
                  <button href="/" className="text-yellow-500">
                    {` First-Timer's Deal`}
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-12">
              <ProductTabs />
              <ProductReviewSection productId={currentProduct?._id} />
              <ProductSlider
                title="Similar Items You Might Like"
                subText="Based on what customers bought"
              />
              <Banner />
            </div>
          </div>
        </div>
      </div>

      <Transition appear show={isAlertOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsAlertOpen(false)}
        >
          <Transition.Child
            as={React.Fragment}
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
                as={React.Fragment}
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
                      Please login to add items to your cart.
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
}
