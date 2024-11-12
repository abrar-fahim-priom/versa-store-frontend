import React from "react";
import LoaderGradient from "../ui/LoaderGradient";

export default function CategoriesHeader({ CategoriesData }) {
  const { SingleCategoryData, SingleCategoryLoading, SingleCategoryError } =
    CategoriesData;

  // Handle loading state
  if (SingleCategoryLoading) {
    return <LoaderGradient />;
  }

  // Handle error state
  if (SingleCategoryError) {
    return (
      <div className="container mt-4 pb-4">
        <div className="relative overflow-hidden rounded-md p-6 lg:px-20 lg:py-10">
          <h1 className="mb-4 text-4xl font-semibold text-red-600">
            Error loading category
          </h1>
          <p className="text-slate-600 lg:w-1/3">
            {SingleCategoryError.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 pb-2">
      <div className="relative overflow-hidden rounded-md p-6 lg:px-20 lg:py-10">
        <div className="relative z-10">
          <h1 className="mb-4 text-4xl  font-semibold  capitalize dark:text-gray text-black ">
            {SingleCategoryData?.category?.name}
          </h1>
          <p className="text-gray text-xl rounded    lg:w-1/3">
            Find the collection of best selling{" "}
            {SingleCategoryData?.category?.name} here
          </p>
        </div>
        {SingleCategoryData?.category?.image && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${SingleCategoryData?.category?.image})`,
            }}
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-blue-400 opacity-10"></div>
          </div>
        )}
      </div>
    </div>
  );
}
