import React from "react";

const Banner = () => {
  return (
    <div className="flex flex-col items-center justify-between bg-primary p-3 lg:flex-row">
      <h3 className="whitespace-nowrap text-xl font-semibold text-yellow-500">
        Earn Cashback on Every Purchase
      </h3>
      <p className="text-sm text-white">
        Get a percentage back on all purchases
      </p>
    </div>
  );
};

export default Banner;
