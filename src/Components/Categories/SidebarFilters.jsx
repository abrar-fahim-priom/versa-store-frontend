import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import React, { useEffect, useState } from "react";

const SidebarFilters = ({ products, onFilterChange }) => {
  const [filters, setFilters] = useState({
    brands: [],
    priceRange: [0, 1000],
    stockStatus: [],
    discount: [],
    rating: [],
  });

  // Extract unique values for each filter
  const uniqueValues = {
    brands: [...new Set(products.map((p) => p.brand))],
    stockStatus: ["In Stock", "Out of Stock"],
    discount: ["On Sale", "Regular Price"],
    rating: [1, 2, 3, 4, 5],
  };

  const priceRange = [
    Math.min(...products.map((p) => p.currentPrice)),
    Math.max(...products.map((p) => p.currentPrice)),
  ];

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: Array.isArray(prev[filterType])
        ? prev[filterType].includes(value)
          ? prev[filterType].filter((item) => item !== value)
          : [...prev[filterType], value]
        : value,
    }));
  };

  const renderCheckboxGroup = (title, items, filterType) => (
    <div className="relative flex flex-col p-5">
      <h3 className="font-medium mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <input
              id={`${filterType}-${item}`}
              className="size-5 rounded border-2 border-neutral-300"
              type="checkbox"
              checked={filters[filterType].includes(item)}
              onChange={() => handleFilterChange(filterType, item)}
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
      <h3 className="font-medium mb-3">Price Range</h3>
      <Slider
        range
        min={priceRange[0]}
        max={priceRange[1]}
        value={filters.priceRange}
        onChange={(value) => handleFilterChange("priceRange", value)}
      />
      <div className="flex justify-between mt-2 text-sm">
        <span>${filters.priceRange[0]}</span>
        <span>${filters.priceRange[1]}</span>
      </div>
    </div>
  );

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
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
  );
};

export default SidebarFilters;
