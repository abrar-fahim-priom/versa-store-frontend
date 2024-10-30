import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useGetCategoriesQuery } from "../../store/api/productApi";
import Darkmode from "../ui/Darkmode";
import UserAccount from "./UserAccount";

const BottomNavMobile = () => {
  const [openCategory, setOpenCategory] = React.useState(null);

  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useGetCategoriesQuery();

  const navLinks = [
    { id: "1", href: "/home", name: "Home" },
    { id: "2", href: "/profile/orders", name: "My Orders" },

    { id: "3", href: "/contact", name: "Contact" },
  ];

  if (categoriesLoading) {
    return (
      <div className="w-full p-4">
        <div className="flex items-center justify-center">
          <div className="loader">Loading...</div>
        </div>
      </div>
    );
  }

  if (categoriesError) {
    return <div className="p-4 text-red-500">Error loading categories</div>;
  }

  const categories = categoriesData?.categories || [];

  const toggleCategory = (categoryName) => {
    setOpenCategory(openCategory === categoryName ? null : categoryName);
  };

  return (
    <div className="w-full bg-white dark:bg-neutral-800 shadow-lg">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-around">
          <Darkmode />
          <UserAccount />
        </div>

        {/* Categories */}
        <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
          {categories.map((category) => (
            <div key={category._id} className="w-full">
              <div
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() => toggleCategory(category.name)}
              >
                <Link
                  to={`/categories/${category._id}`}
                  className="font-semibold text-neutral-700 dark:text-neutral-200 hover:text-primary flex-1"
                >
                  {category.name.charAt(0).toUpperCase() +
                    category.name.slice(1)}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Help section */}
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-700">
          <ul className="flex flex-col">
            {navLinks.map((navItem) => (
              <li
                key={navItem.id}
                className="font-semibold text-neutral-700 dark:text-neutral-200 hover:text-primary mb-4 border-b border-neutral-200 dark:border-neutral-700 "
              >
                <NavLink to={navItem.href}>{navItem.name}</NavLink>
              </li>
            ))}
          </ul>
          <p className="text-sm text-neutral-500 dark:text-neutral-200 text-center">
            Need help? Call Us:{" "}
            <a
              href="tel:+8801717856707"
              className="font-semibold text-black dark:text-white block mt-1"
            >
              +8801717856707
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BottomNavMobile;
