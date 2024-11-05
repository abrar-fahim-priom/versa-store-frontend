import React from "react";
import Marquee from "react-fast-marquee";

const ProductShowcaseMarquee = () => {
  // Sample product data (replace with your actual products)
  const products = [
    {
      id: 1,
      name: "Product 1",
      image: "https://via.placeholder.com/150",
      price: "$99",
    },
    {
      id: 2,
      name: "Product 2",
      image: "https://via.placeholder.com/150",
      price: "$199",
    },
    {
      id: 3,
      name: "Product 3",
      image: "https://via.placeholder.com/150",
      price: "$299",
    },
    {
      id: 4,
      name: "Product 4",
      image: "https://via.placeholder.com/150",
      price: "$399",
    },
    {
      id: 5,
      name: "Product 5",
      image: "https://via.placeholder.com/150",
      price: "$499",
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
        {products.map((product) => (
          <div key={product.id} className="flex flex-col items-center mx-6">
            <img
              src={product.image}
              alt={product.name}
              className="w-36 h-36 object-cover rounded-lg shadow-md mb-2"
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-blue-500 font-bold">{product.price}</p>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default ProductShowcaseMarquee;
