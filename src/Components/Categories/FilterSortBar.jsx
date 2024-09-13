import { Dialog, Transition } from "@headlessui/react";
import React, { useState } from "react";
import { AiOutlineControl } from "react-icons/ai";
import { MdClose } from "react-icons/md";

const FilterSection = ({ title, options, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="py-4">
      <button
        className="flex justify-between w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{title}</span>
        <span>{isOpen ? "-" : "+"}</span>
      </button>
      {isOpen && (
        <div className="mt-2 space-y-2">
          {options.map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => onChange(option)}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const FilterSortBar = ({ onApplyFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    brand: [],
    category: [],
    priceRange: [0, 1000],
    availability: "",
  });

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => {
      if (Array.isArray(prevFilters[filterType])) {
        if (prevFilters[filterType].includes(value)) {
          return {
            ...prevFilters,
            [filterType]: prevFilters[filterType].filter(
              (item) => item !== value
            ),
          };
        } else {
          return {
            ...prevFilters,
            [filterType]: [...prevFilters[filterType], value],
          };
        }
      } else {
        return {
          ...prevFilters,
          [filterType]: value,
        };
      }
    });
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded flex items-center justify-center"
      >
        <AiOutlineControl className="mr-2" /> Filter and Sort
      </button>

      <Transition show={isOpen} as={React.Fragment}>
        <Dialog
          onClose={() => setIsOpen(false)}
          className="fixed inset-0 z-10 overflow-y-auto"
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>

            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Filter and Sort
                </Dialog.Title>
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4"
                >
                  <MdClose className="text-2xl" />
                </button>

                <div className="mt-4">
                  <FilterSection
                    title="Brand"
                    options={["Apple", "Samsung", "Google"]}
                    selected={filters.brand}
                    onChange={(value) => handleFilterChange("brand", value)}
                  />
                  <FilterSection
                    title="Category"
                    options={["Phones", "Laptops", "Accessories"]}
                    selected={filters.category}
                    onChange={(value) => handleFilterChange("category", value)}
                  />
                  <FilterSection
                    title="Availability"
                    options={["In Stock", "Out of Stock"]}
                    selected={[filters.availability]}
                    onChange={(value) =>
                      handleFilterChange("availability", value)
                    }
                  />
                  {/* Add more filter sections as needed */}
                </div>

                <div className="mt-6">
                  <button
                    onClick={handleApplyFilters}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default FilterSortBar;
