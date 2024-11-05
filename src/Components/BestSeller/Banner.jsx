import React from "react";

const Banner = () => {
  return (
    <div className="w-full h-[50vh] md:h-[70vh] lg:h-[80vh] bg-gray-400 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gray-400 bg-cover bg-center"></div>{" "}
      {/* Dummy background */}
      <div className="relative z-10 text-center text-white px-6 md:px-12">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
          Welcome to Our Store
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-6">
          Discover the best products curated just for you!
        </p>
        <button className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
          Shop Now
        </button>
      </div>
      <div className="absolute inset-0 bg-black opacity-40"></div>{" "}
      {/* Dark overlay for text contrast */}
    </div>
  );
};

export default Banner;
