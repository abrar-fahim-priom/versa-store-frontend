import React, { useState } from "react";
import CategoriesHeader from "../Components/Categories/CategoriesHeader";
import SidebarFilters from "../Components/Categories/SidebarFilters";
import NavBar from "../Components/Header/NavBar";
import ProductCard from "../Components/Products/ProductCard";
import { products } from "../data/content";

const Categories = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);

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

  const handleFilterChange = (filters) => {
    const filtered = products.filter((product) => {
      const matchesBrand =
        filters.brands.length === 0 || filters.brands.includes(product.brand);
      const matchesPrice =
        product.currentPrice >= filters.priceRange[0] &&
        product.currentPrice <= filters.priceRange[1];
      const matchesStock =
        filters.stockStatus.length === 0 ||
        (filters.stockStatus.includes("In Stock") && product.stock > 0) ||
        (filters.stockStatus.includes("Out of Stock") && product.stock === 0);
      const matchesDiscount =
        filters.discount.length === 0 ||
        (filters.discount.includes("On Sale") && product.onSale) ||
        (filters.discount.includes("Regular Price") && !product.onSale);
      const matchesRating =
        filters.rating.length === 0 ||
        filters.rating.includes(Math.floor(product.rating));

      return (
        matchesBrand &&
        matchesPrice &&
        matchesStock &&
        matchesDiscount &&
        matchesRating
      );
    });

    setFilteredProducts(filtered);
  };

  return (
    <div className="bg-neutral-100 min-h-screen dark:bg-gray-900">
      <NavBar />
      <CategoriesHeader CategoriesData={GamingCategoriesData} />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-6">
          <div className="hidden lg:block md:col-span-5 lg:col-span-3">
            <SidebarFilters
              products={products}
              onFilterChange={handleFilterChange}
            />
          </div>

          <div className="col-span-12 md:col-span-12 lg:col-span-9">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {filteredProducts.map((product) => (
                <div key={product.slug} className="w-full">
                  <ProductCard
                    className="w-full hover:border-indigo-400 hover:rounded hover:border h-full transition-shadow duration-300 ease-in-out shadow-sm hover:shadow-md"
                    product={product}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
