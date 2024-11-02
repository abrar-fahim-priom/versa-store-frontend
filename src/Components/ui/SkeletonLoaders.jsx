import React from "react";

// Base Skeleton Component
const Skeleton = ({ className }) => (
  <div
    className={`animate-pulse bg-slate-200 dark:bg-slate-700 ${className} rounded-md`}
  ></div>
);

export const ProductSkeleton = () => {
  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="grid md:grid-cols-[1fr,1.5fr] gap-8 bg-neutral-100 dark:bg-neutral-800 transition-colors duration-200 p-6 rounded-lg ">
        {/* Product Image Skeleton */}
        <div className="aspect-square">
          <Skeleton className="w-full h-full rounded-lg" />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          {/* Title */}
          <Skeleton className="h-8 w-3/5" />

          {/* Price */}
          <Skeleton className="h-6 w-1/4" />

          {/* Quantity Selector */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/5" />
            <Skeleton className="h-10 w-1/3" />
          </div>

          {/* Buy Now Button */}
          <Skeleton className="h-12 w-full rounded-md" />

          {/* Pickup/Delivery Info */}
          <div className="space-y-4 pt-4">
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
          </div>

          {/* Small Thumbnail */}
          <div className="pt-4">
            <Skeleton className="h-16 w-16 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const CategorySkeleton = () => {
  return (
    <div className="w-full border-b border-neutral-200 dark:border-neutral-700">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
          {/* Generate 7 skeleton items to match the number of categories shown */}
          {[...Array(7)].map((_, index) => (
            <div key={index} className="animate-pulse flex-shrink-0">
              <div className="h-8 w-24 bg-slate-200 dark:bg-slate-700 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const CardSkeleton = () => (
  <div className="animate-pulse h-full bg-gray-100 dark:bg-neutral-800 rounded-md p-4">
    <div className="h-40 bg-gray-200 dark:bg-neutral-700 rounded mb-4"></div>
    <div className="h-4 w-3/4 bg-gray-200 dark:bg-neutral-700 rounded mb-2"></div>
    <div className="h-4 w-1/2 bg-gray-200 dark:bg-neutral-700 rounded"></div>
  </div>
);

export const GroupCardsSkeleton = () => (
  <section>
    <div className="container pb-8 xl:pb-24">
      <ul className="grid grid-cols-6 gap-2 lg:grid-rows-2">
        <li className="col-span-6 md:col-span-4 xl:col-span-2">
          <ProductSkeleton />
        </li>
        {[...Array(10)].map((_, index) => (
          <li key={index} className="col-span-6 md:col-span-2 xl:col-span-1">
            <CardSkeleton />
          </li>
        ))}
      </ul>
    </div>
  </section>
);
