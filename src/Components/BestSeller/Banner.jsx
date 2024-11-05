import React from "react";
import bannerMid from "../../images/new_arrival/BANNER LOW RES.jpg";

const Banner = () => {
  return (
    <div
      className="container relative w-full mb-3"
      style={{ aspectRatio: "820 / 312" }}
    >
      {/* Background image */}
      <div className="absolute rounded-md inset-0 w-full xl:h-88 bg-gray-400">
        <img
          src={bannerMid}
          alt="Banner"
          className="w-full rounded-lg h-full object-cover" // Use object-contain to maintain the full image within bounds
        />
      </div>
    </div>
  );
};

export default Banner;
