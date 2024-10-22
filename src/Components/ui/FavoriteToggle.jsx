"use client";

import { Popover, Transition } from "@headlessui/react";
import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function FavoriteToggle({ productId }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    setShowTooltip(true);
    // Here you would typically call an API to update the favorite status
    console.log(`Product ${productId} favorite status: ${!isFavorite}`);

    // Hide tooltip after 2 seconds
    setTimeout(() => setShowTooltip(false), 2000);
  };

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            as="button"
            onClick={toggleFavorite}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isFavorite ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            {isFavorite ? "Bookmarked" : "Add to Bookmark"}
          </Popover.Button>
          <Transition
            show={showTooltip}
            as={React.Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              static
              className="absolute z-10 px-4 py-2 mt-3 text-sm bg-black font-medium text-white transform -translate-x-1/2 bg-gray-900 rounded-md shadow-sm left-1/2"
            >
              {isFavorite
                ? "Product added to bookmark"
                : "Product removed from bookmark"}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
