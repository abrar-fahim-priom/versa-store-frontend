import React from "react";
import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../../store/api/productApi";
import LoaderGradient from "../ui/LoaderGradient";

// import PhoneBar from "./PhoneBar";

const BottomNav = () => {
  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useGetCategoriesQuery();

  // Placeholder dropdown menu options (you might want to replace this with actual data)
  const dropDownMenuOptions = [
    { href: "#", label: "Samsung" },
    { href: "#", label: "Apple" },
    { href: "#", label: "Xiaomi" },
  ];

  if (categoriesLoading) {
    return <LoaderGradient />;
  }

  if (categoriesError) {
    return <div>Error loading categories</div>;
  }

  const categories = categoriesData?.categories || [];

  return (
    <div className="container relative">
      <div className="hidden border-t border-neutral-300 py-6 dark:border-neutral-600 md:block xl:block">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-base font-semibold">
            {categories.map((category) => (
              <div key={category._id} className="relative group ml-6">
                <Link
                  to={`/categories/${category._id}`}
                  className="font-semibold text-neutral-700 dark:text-neutral-200 hover:text-primary"
                >
                  {category.name.charAt(0).toUpperCase() +
                    category.name.slice(1)}
                </Link>
                {category.name === "mobile" && (
                  <ul className="absolute left-0 hidden z-10 min-w-full bg-white border border-blue-500 px-2 py-4 shadow-lg dark:bg-neutral-800 group-hover:block">
                    {dropDownMenuOptions.map((linkItem) => (
                      <li key={linkItem.label}>
                        <Link
                          to={linkItem.href}
                          className="inline-block w-full dark:text-white px-3 py-2 font-medium hover:text-primary"
                        >
                          {linkItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
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
