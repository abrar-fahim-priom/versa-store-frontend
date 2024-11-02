import React from "react";
import { BiErrorCircle, BiMap, BiPhone, BiStore } from "react-icons/bi";

const ShopHeader = ({ shopData }) => {
  if (!shopData) {
    return (
      <div className="w-full rounded-lg border shadow-lg border-red-500 bg-white dark:bg-gray-800">
        <div className="p-6 flex items-center justify-center text-red-500">
          <BiErrorCircle className="w-5 h-5 mr-2" />
          <span>Unable to load shop information. Please try again later.</span>
        </div>
      </div>
    );
  }

  const {
    shopName = "Shop Not Available",
    shopAddress = "Address Not Available",
    phone = "Phone Not Available",
    shopType = "Type Not Available",
    shopPhoto = null,
  } = shopData;

  return (
    <div className="w-full shadow-lg container rounded-lg mt-3 border border-cyan-600 dark:border-gray-700 overflow-hidden bg-white dark:bg-slate-800">
      <div className="grid grid-cols-[auto,1fr] gap-3 md:gap-6 items-center">
        {/* Shop Info Section */}
        <div className="p-3 md:p-6 flex flex-col justify-center ">
          <div className="space-y-1 md:space-y-3">
            <h2 className="text-lg md:text-2xl dark:text-white font-bold text-gray-900">
              {shopName}
            </h2>
            <div className="flex dark:text-white items-center text-gray-600 ">
              <BiMap className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              <span>{shopAddress}</span>
            </div>
            <div className="flex dark:text-white items-center text-gray-600 ">
              <BiPhone className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              <span>{phone}</span>
            </div>
            <div className="flex dark:text-white items-center text-gray-600 ">
              <BiStore className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              <span>{shopType}</span>
            </div>
          </div>
        </div>

        {/* Shop Image Section */}
        <div className="relative w-full h-32 md:h-full">
          {shopPhoto ? (
            <img
              src={shopPhoto}
              alt={`${shopName} shop front`}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "/api/placeholder/400/320";
                e.target.alt = "Shop image not available";
              }}
            />
          ) : (
            <div className="absolute inset-0 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <div className="text-center dark:text-white text-gray-500">
                <BiStore className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-2" />
                <p>No shop image available</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopHeader;
