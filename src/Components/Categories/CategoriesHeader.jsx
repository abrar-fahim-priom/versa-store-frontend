import React from "react";

const GamingCategoriesData = {
  _id: "66e4442c4789de26196ffe8c",
  name: "gaming",
  image:
    "https://res.cloudinary.com/hostingimagesservice/image/upload/v1726235691/versaShop/image-1726235687800_ixszni.webp",
  imageKey: "versaShop/image-1726235687800_ixszni",
  createdAt: "2024-09-13T13:54:52.413Z",
  updatedAt: "2024-09-13T13:54:52.413Z",
  __v: 0,
};

export default function CategoriesHeader() {
  const { name, image } = GamingCategoriesData;

  return (
    <div className="container pb-9">
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
