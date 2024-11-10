import React from "react";
import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../../store/api/productApi";
import { CategorySkeleton } from "../ui/SkeletonLoaders";

// import PhoneBar from "./PhoneBar";

const BottomNav = () => {
  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useGetCategoriesQuery();

  if (categoriesLoading) {
    return <CategorySkeleton />;
  }

  if (categoriesError) {
    return <div>Error loading categories</div>;
  }

  const categories = categoriesData?.categories || [];

  return (
    <div className="container">
      <div className="hidden border-t border-neutral-300 py-6 dark:border-neutral-600  xl:block">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-base font-semibold">
            {categories.map((category) => (
              <div key={category._id} className="relative group ml-6">
                <Link
                  to={`/categories/${category._id}`}
                  className="font-semibold text-neutral-700 dark:text-neutral-200 dark:hover:text-primary hover:text-primary"
                >
                  {category.name.charAt(0).toUpperCase() +
                    category.name.slice(1)}
                </Link>
              </div>
            ))}
          </div>

          <div>
            <p className="text-neutral-500 dark:text-neutral-200">
              Need help? Call Us:{" "}
              <span className="font-semibold text-black dark:text-white">
                +8801717856707
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
