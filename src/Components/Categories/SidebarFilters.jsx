import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import React, { useEffect, useMemo, useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";

const SidebarFilters = ({ products, onFilterChange }) => {
  const [filters, setFilters] = useState({
    brands: [],
    priceRange: [0, 0],
    stockStatus: [],
    discount: [],
    rating: [],
  });

  const [isVisible, setIsVisible] = useState(false);

  // Rest of your existing memoized values and effects remain the same...
  const priceRange = useMemo(() => {
    if (!products.length) return [0, 0];
    const prices = products.map((p) => p.price);
    return [Math.floor(Math.min(...prices)), Math.ceil(Math.max(...prices))];
  }, [products]);

  const uniqueValues = useMemo(
    () => ({
      brands: [...new Set(products.map((p) => p.brand))],
      stockStatus: ["In Stock", "Out of Stock"],
      discount: ["On Sale", "Regular Price"],
      rating: [1, 2, 3, 4, 5],
    }),
    [products]
  );

  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      priceRange: priceRange,
    }));
  }, [priceRange]);

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  // Close sidebar when clicking outside on mobile and tablet
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById("sidebar-filters");
      const toggleButton = document.getElementById("sidebar-toggle");

      if (
        isVisible &&
        sidebar &&
        !sidebar.contains(event.target) &&
        toggleButton &&
        !toggleButton.contains(event.target)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isVisible]);

  // Your existing handler functions remain the same...
  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handlePriceChange = (value, index = null) => {
    let newPriceRange;
    if (index !== null) {
      newPriceRange = [...filters.priceRange];
      newPriceRange[index] = Math.max(
        priceRange[0],
        Math.min(priceRange[1], Number(value))
      );
      if (index === 0) {
        newPriceRange[0] = Math.min(newPriceRange[0], newPriceRange[1]);
      } else {
        newPriceRange[1] = Math.max(newPriceRange[0], newPriceRange[1]);
      }
    } else {
      newPriceRange = [
        Math.max(priceRange[0], value[0]),
        Math.min(priceRange[1], value[1]),
      ];
    }
    handleFilterChange("priceRange", newPriceRange);
  };

  const renderCheckboxGroup = (title, items, filterType) => (
    <div className="relative dark:text-white flex flex-col p-5">
      <h3 className="font-medium mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <input
              id={`${filterType}-${item}`}
              className="size-5 rounded border-2 border-neutral-300"
              type="checkbox"
              checked={filters[filterType].includes(item)}
              onChange={() => {
                const updatedFilter = filters[filterType].includes(item)
                  ? filters[filterType].filter((i) => i !== item)
                  : [...filters[filterType], item];
                handleFilterChange(filterType, updatedFilter);
              }}
            />
            <label htmlFor={`${filterType}-${item}`} className="text-sm">
              {item}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderPriceRange = () => (
    <div className="relative flex flex-col p-5">
      <h3 className="font-medium dark:text-white mb-3">Price Range</h3>
      <Slider
        range
        min={priceRange[0]}
        max={priceRange[1]}
        value={filters.priceRange}
        onChange={(value) => handlePriceChange(value)}
        allowCross={false}
      />
      <div className="flex justify-between mt-4 gap-4">
        <input
          type="number"
          className="w-1/2 px-2 py-1 border rounded"
          value={filters.priceRange[0]}
          onChange={(e) => handlePriceChange(e.target.value, 0)}
          min={priceRange[0]}
          max={priceRange[1]}
        />
        <input
          type="number"
          className="w-1/2 px-2 py-1 border rounded"
          value={filters.priceRange[1]}
          onChange={(e) => handlePriceChange(e.target.value, 1)}
          min={priceRange[0]}
          max={priceRange[1]}
        />
      </div>
    </div>
  );

  return (
    <>
      {/* Toggle Button for Mobile and Tablet */}
      <button
        id="sidebar-toggle"
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-4 z-50 lg:hidden flex items-center px-4 py-2 bg-primary text-white rounded-full shadow-lg"
      >
        {isVisible ? (
          <IoMdClose className="mr-2" size={24} />
        ) : (
          <BiMenuAltLeft className="mr-2" size={24} />
        )}
        Filters
      </button>

      {/* Overlay for mobile and tablet */}
      {isVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsVisible(false)}
        />
      )}

      {/* Sidebar Filters */}
      <div
        id="sidebar-filters"
        className={`
          fixed lg:relative inset-y-0 left-0 z-40 lg:z-0
          w-80 lg:w-auto
          transform ${
            isVisible ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0
          transition-transform duration-300 ease-in-out
          bg-white dark:bg-slate-600 
          shadow-lg lg:shadow rounded-lg
          overflow-y-auto h-screen lg:h-auto
          lg:block
        `}
      >
        <div className="lg:hidden flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-medium dark:text-white">Filters</h2>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        <div className="divide-y dark:divide-gray-700">
          {renderCheckboxGroup("Brands", uniqueValues.brands, "brands")}
          {renderPriceRange()}
          {renderCheckboxGroup(
            "Stock Status",
            uniqueValues.stockStatus,
            "stockStatus"
          )}
          {renderCheckboxGroup("Discount", uniqueValues.discount, "discount")}
          {renderCheckboxGroup("Rating", uniqueValues.rating, "rating")}
        </div>
      </div>
    </>
  );
};

export default SidebarFilters;
