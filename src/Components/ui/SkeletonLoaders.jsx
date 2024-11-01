import React from "react";

export const ProductSkeleton = () => (
  <div className="animate-pulse h-full rounded-md bg-gray-100 dark:bg-neutral-800 p-6 lg:p-12 flex flex-col">
    <div className="h-4 w-1/2 bg-gray-200 dark:bg-neutral-700 rounded mb-4"></div>
    <div className="h-6 w-3/4 bg-gray-200 dark:bg-neutral-700 rounded mb-4"></div>
    <div className="h-4 w-full bg-gray-200 dark:bg-neutral-700 rounded mb-6"></div>
    <div className="h-10 w-2/3 bg-gray-200 dark:bg-neutral-700 rounded mt-auto"></div>
  </div>
);

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
