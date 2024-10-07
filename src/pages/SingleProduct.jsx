import React, { useState } from "react";
import { BsLightningCharge } from "react-icons/bs";
import { FaCheck } from "react-icons/fa6";
import { HiMiniArrowUturnLeft } from "react-icons/hi2";
import { LuInfo, LuTruck } from "react-icons/lu";
import { useLocation } from "react-router-dom";
import NavBar from "../Components/Header/NavBar";
import Banner from "../Components/Products/Banner";
import ImageShowCase from "../Components/Products/ImageShowCase";
import ProductReviewSection from "../Components/Products/ProductReviewSection.jsx";
import ProductSlider from "../Components/Products/ProductSlider";
import ProductTabs from "../Components/Products/ProductTabs";
import QuantityInput from "../Components/ui/QuantityInput";
import { useCart } from "../hooks/useCart.js";
import ButtonPrimary from "../shared/Button/ButtonPrimary";
import ButtonSecondary from "../shared/Button/ButtonSecondary";

export default function SingleProduct() {
  const location = useLocation();
  const { product: initialProduct } = location.state || {};
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(
    initialProduct?.defaultType || ""
  );
  const [product, setProduct] = useState(initialProduct);
  console.log(product);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (product && quantity > 0) {
      const cartProduct = {
        ...product,
        selectedType: selectedVariant,
      };
      addToCart(cartProduct, quantity);
      console.log(
        `Added ${quantity} of ${product.name} (${selectedVariant}) to cart.`
      );
    }
  };

  const handleVariantChange = (variantType) => {
    let newProduct;
    if (variantType === initialProduct.defaultType) {
      newProduct = { ...initialProduct };
    } else {
      const newVariant = initialProduct.variant.find(
        (v) => v.type === variantType
      );
      if (newVariant) {
        newProduct = {
          ...initialProduct,
          currentPrice: newVariant.currentPrice,
          previousPrice: newVariant.previousPrice,
          description: newVariant.description,
          type: newVariant.type,
        };
      } else {
        newProduct = { ...initialProduct };
      }
    }
    setSelectedVariant(variantType);
    setProduct(newProduct);
  };

  const productImages = product.shots?.length
    ? product.shots // Use shots if available
    : product.images?.map((image) => image.url); // Fallback to images array

  return (
    <>
      <NavBar />
      <div className="bg-neutral-100 z-50 dark:bg-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <ImageShowCase shots={productImages} />
            </div>

            <div className="lg:col-span-4">
              <span className="mb-2 text-xs text-blue-500">STOCKMART</span>
              <h1 className="mb-0 text-3xl dark:text-white font-bold">
                {product?.name}
              </h1>

              <div className="mb-5 space-y-1">
                <h1 className="text-2xl font-semibold">
                  <span className="text-green-700">
                    ${product?.currentPrice}
                  </span>{" "}
                  <span className="text-neutral-500 line-through">
                    ${product?.previousPrice}
                  </span>
                </h1>
                <p className="text-sm dark:text-white">Tax included.</p>
              </div>

              {initialProduct?.variant && initialProduct.variant.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm mb-2">Select Type:</h4>
                  <div className="flex flex-wrap gap-2">
                    <ButtonSecondary
                      onClick={() =>
                        handleVariantChange(initialProduct.defaultType)
                      }
                      className={
                        selectedVariant === initialProduct.defaultType
                          ? "bg-blue-100 dark:bg-blue-500"
                          : ""
                      }
                    >
                      {initialProduct.defaultType}
                    </ButtonSecondary>
                    {initialProduct.variant.map((v) => (
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
                  {product?.description}
                </p>
              </div>

              <div className="">
                <h4 className="text-sm dark:text-white">Quantity:</h4>
                <div className="flex gap-2">
                  <QuantityInput
                    min={1}
                    max={10}
                    defaultValue={1}
                    onChange={handleQuantityChange}
                  />
                  <ButtonSecondary className="w-full" onClick={handleAddToCart}>
                    Add to cart
                  </ButtonSecondary>
                </div>
              </div>

              <div className="mb-5 mt-2 flex items-center gap-5">
                <ButtonPrimary className="">Buy Now</ButtonPrimary>
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
                    <h3 className="text-sm text-red-600">2 in Stock Now</h3>
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
              <ProductReviewSection />
              <ProductSlider
                title="Similar Items You Might Like"
                subText="Based on what customers bought"
              />
              <Banner />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
