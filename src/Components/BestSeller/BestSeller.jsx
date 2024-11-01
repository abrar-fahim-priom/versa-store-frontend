import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonSecondary from "../../shared/Button/ButtonSecondary.jsx";
import { useGetPopularProductsQuery } from "../../store/api/productApi";
import ProductCard from "../Products/ProductCard";
import { GroupCardsSkeleton } from "../ui/SkeletonLoaders.jsx";

const BestSeller = () => {
  const navigate = useNavigate();
  const {
    data: popularProductsData,
    isLoading,
    isError,
    error,
  } = useGetPopularProductsQuery();

  if (isLoading) {
    return <GroupCardsSkeleton />;
  }

  if (isError) {
    console.error("Error fetching popular products:", error);
    return <div>Error loading best sellers. Please try again later.</div>;
  }

  const popularProducts = popularProductsData?.products || [];

  return (
    <section>
      <div className="container pb-8 xl:pb-24">
        <div>
          <ul className="grid grid-cols-6 gap-2 lg:grid-rows-2">
            <li className="col-span-6 md:col-span-4 xl:col-span-2">
              <div className="h-full rounded-md bg-white p-6 dark:bg-neutral-800 lg:p-12">
                <span className="mb-2 text-xs text-blue-500">
                  FEATURED ITEMS
                </span>
                <h2 className="mb-4 dark:text-white text-2xl font-bold leading-tight tracking-tight lg:text-[28px]">
                  Top 10 Bestsellers of This Week
                </h2>
                <p className="mb-8 text-neutral-500 dark:text-neutral-300">
                  Looking for the latest and greatest in electronics? Look no
                  further than our Top 10 Bestsellers of the week! Our expertly
                  curated selection features the hottest gadgets and devices
                  flying off the shelves.
                </p>
                <ButtonSecondary
                  className="btn-primary"
                  onClick={() => navigate("/collections")}
                >
                  Shop More
                </ButtonSecondary>
              </div>
            </li>
            {popularProducts &&
              popularProducts.slice(0, 10).map((product) => (
                <li
                  key={product._id}
                  className="col-span-6 md:col-span-2 xl:col-span-1"
                >
                  <ProductCard
                    className="w-full hover:border-indigo-400 hover:rounded hover:border h-full"
                    product={product}
                  />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default BestSeller;
