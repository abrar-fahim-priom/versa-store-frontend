import React from "react";
import Marquee from "react-fast-marquee";

const BrandShowcaseMarquee = () => {
  // Sample brand logos (replace with actual logos if needed)
  const brands = [
    {
      id: 1,
      name: "Brand 1",
      logo: "https://via.placeholder.com/150?text=Brand+1",
    },
    {
      id: 2,
      name: "Brand 2",
      logo: "https://via.placeholder.com/150?text=Brand+2",
    },
    {
      id: 3,
      name: "Brand 3",
      logo: "https://via.placeholder.com/150?text=Brand+3",
    },
    {
      id: 4,
      name: "Brand 4",
      logo: "https://via.placeholder.com/150?text=Brand+4",
    },
    {
      id: 5,
      name: "Brand 5",
      logo: "https://via.placeholder.com/150?text=Brand+5",
    },
    {
      id: 6,
      name: "Brand 6",
      logo: "https://via.placeholder.com/150?text=Brand+6",
    },
    {
      id: 7,
      name: "Brand 7",
      logo: "https://via.placeholder.com/150?text=Brand+7",
    },
  ];

  return (
    <div className="py-6 bg-gray-100">
      <Marquee
        gradient={false}
        speed={50}
        pauseOnHover={true}
        className="overflow-hidden"
      >
        {brands.map((brand) => (
          <div key={brand.id} className="flex items-center justify-center mx-6">
            <img
              src={brand.logo}
              alt={brand.name}
              className="w-32 h-32 object-contain rounded-lg shadow-md"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default BrandShowcaseMarquee;
