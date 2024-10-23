"use client";

import { Popover, Transition } from "@headlessui/react";
import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useToggleBookmarkMutation } from "../../store/api/productApi";

export default function FavoriteToggle({ auth, productId }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState("");

  const [toggleBookmark, { isLoading }] = useToggleBookmarkMutation();

  const handleToggleFavorite = async () => {
    if (!auth) {
      setTooltipMessage("Please log in to add bookmark");
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
      return;
    }

    try {
      await toggleBookmark(productId).unwrap();
      // Toggle local state after successful API call
      setIsFavorite(!isFavorite);
      setTooltipMessage(
        !isFavorite
          ? "Product added to bookmark"
          : "Product removed from bookmark"
      );
      setShowTooltip(true);
    } catch (error) {
      setTooltipMessage("Error updating bookmark");
      setShowTooltip(true);
    }

    setTimeout(() => setShowTooltip(false), 2000);
  };

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            as="button"
            onClick={handleToggleFavorite}
            disabled={isLoading}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ${
              isLoading ? "opacity-50 blur-[0.5px] cursor-not-allowed" : ""
            }`}
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
              className="absolute z-10 px-4 py-2 mt-3 text-sm font-medium bg-blue-400 text-white transform -translate-x-1/2 rounded-md shadow-sm left-1/2"
            >
              {tooltipMessage}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
