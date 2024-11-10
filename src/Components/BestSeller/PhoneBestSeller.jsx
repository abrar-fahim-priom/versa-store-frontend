import React, { useEffect, useState } from "react";

import { useGetProductsQuery } from "../../store/api/productApi.js";
import ProductCard from "../Products/ProductCard.jsx";
import { GroupCardsSkeleton } from "../ui/SkeletonLoaders.jsx";

const PhoneBestSeller = () => {
  const categoryId = "670564515858fa34536cdef8";
  const [queryParams, setQueryParams] = useState({
    category: categoryId,
    page: 1,
    limit: 10,
  });

  const { data, isLoading, error } = useGetProductsQuery(queryParams);

  console.log(data);
  const topPhoneProducts = data?.data?.products || [];

  useEffect(() => {
    setQueryParams({
      category: categoryId,
      page: 1,
      limit: 10,
    });
  }, [categoryId]);

  if (isLoading) {
    return <GroupCardsSkeleton />;
  }

  if (error) {
    console.error("Error fetching popular products:", error);
    return (
      <div>Error loading Best Phones of this week. Please try again later.</div>
    );
  }

  return (
    <section>
      <div className="container pb-8 mt-10 xl:pb-16">
        <div>
          <ul className="grid grid-cols-6 gap-2 lg:grid-rows-2">
            <li className="col-span-6 md:col-span-4 xl:col-span-2">
              <div className="h-full rounded-md bg-white p-6 dark:bg-neutral-800 lg:p-12">
                <span className="mb-2 text-xs text-blue-500">
                  FEATURED Phones
                </span>
                <h2 className="mb-4 dark:text-white text-2xl font-bold leading-tight tracking-tight lg:text-[28px]">
                  Top 10 Phones of This Week
                </h2>
                <p className="mb-8 text-neutral-500 dark:text-neutral-300">
                  Looking for the latest and greatest in phones ? We have
                  samsung apple xiaomi etc
                </p>
              </div>
            </li>
            {topPhoneProducts &&
              topPhoneProducts.map((product) => (
                <li
                  key={product._id}
                  className="col-span-3 md:col-span-2 xl:col-span-1"
                >
                  <ProductCard
                    className="w-full hover:shadow-lg hover:border-blue-400 hover:border h-full"
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

export default PhoneBestSeller;
