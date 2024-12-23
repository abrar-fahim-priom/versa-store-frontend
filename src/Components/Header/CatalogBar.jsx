import React, { useState } from "react";
import { Link } from "react-router-dom";
import banner1 from "../../images/banner-1_4.webp";
import ShopNowButton2 from "../../shared/Button/ShopNowButton2.jsx";
import { useGetCategoriesQuery } from "../../store/api/productApi";
import { CategorySkeleton } from "../ui/SkeletonLoaders.jsx";

const CatalogBar = ({ className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useGetCategoriesQuery();

  const handleOpenMenu = () => setIsVisible(true);
  const handleCloseMenu = () => setIsVisible(false);

  // Split categories into two groups for the two-column layout
  const categories = categoriesData?.categories || [];
  const midPoint = Math.ceil(categories.length / 2);
  const firstColumnCategories = categories.slice(0, midPoint);
  const secondColumnCategories = categories.slice(midPoint);

  if (categoriesLoading) return <CategorySkeleton />;
  if (categoriesError) return <div>Error loading categories</div>;

  return (
    <div className={`flex flex-row ${className}`}>
      <button onClick={handleOpenMenu} className="shop-now-button ">
        <ShopNowButton2 text="Menu" />
      </button>

      {isVisible && (
        <>
          <div
            className="fixed inset-0 bg-neutral-900/60 z-40"
            onClick={handleCloseMenu}
          />
          <div
            className="fixed top-[12%] left-0 right-0 z-50 bg-white dark:bg-neutral-950 shadow-lg ring-1 ring-black/5 overflow-y-auto"
            style={{ height: "70vh" }}
          >
            <div className="container relative w-full h-full py-8">
              <div className="hiddenScrollbar overflow-y-auto py-5">
                <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-2">
                    <h4 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
                      Categories
                    </h4>
                    <div className="space-y-5 text-lg text-neutral-500 dark:text-neutral-300">
                      {firstColumnCategories.map((category) => (
                        <div key={category._id} className="text-base">
                          <Link
                            to={`/categories/${category._id}`}
                            className="hover:text-primary transition-colors"
                            onClick={handleCloseMenu}
                          >
                            {category.name.charAt(0).toUpperCase() +
                              category.name.slice(1)}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-2">
                    <h4 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
                      More Categories
                    </h4>
                    <div className="space-y-5 text-lg text-neutral-500 dark:text-neutral-300">
                      {secondColumnCategories.map((category) => (
                        <div key={category._id} className="text-base">
                          <Link
                            to={`/categories/${category._id}`}
                            className="hover:text-primary  transition-colors"
                            onClick={handleCloseMenu}
                          >
                            {category.name.charAt(0).toUpperCase() +
                              category.name.slice(1)}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-2">
                    <h4 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
                      Navigations
                    </h4>
                    <div className="flex flex-col space-y-5  text-neutral-500 text-base dark:text-neutral-300">
                      <Link
                        to="/"
                        className="hover:text-primary  transition-colors"
                        onClick={handleCloseMenu}
                      >
                        Home
                      </Link>
                      <Link
                        to="/profile"
                        className="hover:text-primary  transition-colors"
                        onClick={handleCloseMenu}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/profile/shop"
                        className="hover:text-primary  transition-colors"
                        onClick={handleCloseMenu}
                      >
                        Shop
                      </Link>
                      <Link
                        to="/profile/orders"
                        className="hover:text-primary  transition-colors"
                        onClick={handleCloseMenu}
                      >
                        My Orders
                      </Link>
                      <Link
                        to="/about"
                        className="hover:text-primary  transition-colors"
                        onClick={handleCloseMenu}
                      >
                        About Us
                      </Link>
                    </div>
                  </div>

                  <div className="col-span-4">
                    <div className="relative aspect-[8/5] overflow-hidden rounded-md p-6">
                      <div className="absolute left-0 top-0 w-full h-full">
                        <img
                          src={banner1}
                          alt="Speakers Banner"
                          className="object-cover object-center w-full h-full transition-transform duration-700 transform scale-105 hover:scale-100"
                        />
                      </div>
                      <div className="relative z-20 flex flex-col justify-center h-full p-6 bg-opacity-70 dark:bg-neutral-900 dark:bg-opacity-70">
                        <h4 className="font-semibold text-gray-800 dark:text-white">
                          Checkout for New Home Appliances
                        </h4>
                        <div className="mt-8">
                          <p className="mb-3 dark:text-white">
                            from:{" "}
                            <span className="text-lg font-semibold text-primary dark:text-white">
                              ৳3500
                            </span>
                          </p>
                          <Link to={`/categories/673339459e0dae6e0e3c5a87`}>
                            <button
                              onClick={handleCloseMenu}
                              className="py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
                            >
                              Shop Now
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CatalogBar;
