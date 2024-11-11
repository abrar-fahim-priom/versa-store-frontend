import React from "react";
import { IoCaretForwardOutline } from "react-icons/io5";

const ShopNowButton2 = ({ text = "" }) => {
  return (
    <div className="group w-[125px] text-center">
      <button className="relative font-bold h-auto inline-flex items-center justify-center gap-1 border border-blue-500 rounded bg-white-600 hover:bg-blue-700 transition-colors group py-3 px-4 sm:py-3 sm:px-6 text-sm text-blue-600 hover:text-white disabled:cursor-not-allowed whitespace-nowrap">
        <span className="text-sm ml-3 transition-all duration-300 group-hover:-translate-x-2">
          {text}
        </span>
        <IoCaretForwardOutline
          size={16}
          className="transition-all duration-200 opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
        />
      </button>
    </div>
  );
};

export default ShopNowButton2;
