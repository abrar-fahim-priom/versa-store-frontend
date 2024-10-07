import React from "react";

export default function CategoriesHeader({ CategoriesData }) {
  const { name, image } = CategoriesData;

  return (
    <div className="container mt-4 pb-8">
      <div className="relative overflow-hidden rounded-md p-6 lg:px-20 lg:py-10">
        <div className="relative z-10">
          <h1 className="mb-4 text-4xl font-semibold capitalize  text-black">
            {name}
          </h1>
          <p className="text-slate-600 lg:w-1/3">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt,
            asperiores recusandae hic fugit numquam.
          </p>
        </div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-blue-400 opacity-10"></div>
        </div>
      </div>
    </div>
  );
}
