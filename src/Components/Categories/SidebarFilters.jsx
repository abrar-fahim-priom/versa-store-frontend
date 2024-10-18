import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import React, { useEffect, useMemo, useState } from "react";

const SidebarFilters = ({ products, onFilterChange }) => {
  // console.log(products);
  const priceRange = useMemo(() => {
    const prices = products.map((p) => p.price);
    return [Math.floor(Math.min(...prices)), Math.ceil(Math.max(...prices))];
  }, [products]);

  const [filters, setFilters] = useState({
    brands: [],
    priceRange: priceRange,
    stockStatus: [],
    discount: [],
    rating: [],
  });

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
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handlePriceChange = (value, index = null) => {
    let newPriceRange;
    if (index !== null) {
      // Handle input field change
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
      // Handle slider change
      newPriceRange = [
        Math.max(priceRange[0], value[0]),
        Math.min(priceRange[1], value[1]),
      ];
    }
    handleFilterChange("priceRange", newPriceRange);
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
      <h3 className="font-medium mb-3">Price Range</h3>
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
