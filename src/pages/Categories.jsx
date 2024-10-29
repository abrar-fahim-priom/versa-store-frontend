import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoriesHeader from "../Components/Categories/CategoriesHeader";
import SidebarFilters from "../Components/Categories/SidebarFilters";
import NavBar from "../Components/Header/NavBar";
import ProductCard from "../Components/Products/ProductCard";
import {
  useGetProductsQuery,
  useGetSingleCategoryQuery,
} from "../store/api/productApi.js";

const Categories = () => {
  const { categoryId } = useParams();
  const [queryParams, setQueryParams] = useState({
    category: categoryId,
    page: 1,
    limit: 10,
  });

  const { data, isLoading, error } = useGetProductsQuery(queryParams);

  const {
    data: SingleCategoryData,
    isLoading: SingleCategoryLoading,
    error: SingleCategoryError,
  } = useGetSingleCategoryQuery(categoryId);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // console.log(SingleCategoryData);

  useEffect(() => {
    setQueryParams((prev) => ({ ...prev, category: categoryId }));
  }, [categoryId]);

  useEffect(() => {
    if (data && data.data && data.data.products) {
      setFilteredProducts(data.data.products);
    }
  }, [data]);

  const handleFilterChange = useCallback(
    (filters) => {
      if (data && data.data && data.data.products) {
        setFilteredProducts(
          data.data.products.filter((product) => {
            const matchesBrand =
              filters.brands.length === 0 ||
              filters.brands.includes(product.brand);
            const matchesPrice =
              product.price >= filters.priceRange[0] &&
              product.price <= filters.priceRange[1];
            const matchesStockStatus =
              filters.stockStatus.length === 0 ||
              (filters.stockStatus.includes("In Stock") && product.stock > 0) ||
              (filters.stockStatus.includes("Out of Stock") &&
                product.stock === 0);
            const matchesDiscount =
              filters.discount.length === 0 ||
              (filters.discount.includes("On Sale") && product.discount > 0) ||
              (filters.discount.includes("Regular Price") &&
                product.discount === 0);
            const matchesRating =
              filters.rating.length === 0 ||
              filters.rating.includes(Math.floor(product.rating));

            return (
              matchesBrand &&
              matchesPrice &&
              matchesStockStatus &&
              matchesDiscount &&
              matchesRating
            );
          })
        );
      }
    },
    [data]
  );

  const handlePageChange = (newPage) => {
    setQueryParams((prev) => ({ ...prev, page: newPage }));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="bg-neutral-100 dark:bg-gray min-h-screen dark:bg-gray-900">
      <NavBar />
      <CategoriesHeader
        CategoriesData={{
          SingleCategoryData,
          SingleCategoryLoading,
          SingleCategoryError,
        }}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-6">
          <div className="hidden lg:block md:col-span-5 lg:col-span-3">
            <SidebarFilters
              products={data?.data?.products || []}
              onFilterChange={handleFilterChange}
            />
          </div>

          <div className="col-span-12 md:col-span-12 lg:col-span-9">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {filteredProducts.map((product) => (
                  <div key={product._id} className="w-full">
                    <ProductCard
                      className="w-full hover:border-indigo-400 hover:rounded hover:border h-full transition-shadow duration-300 ease-in-out shadow-sm hover:shadow-md"
                      product={product}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 mt-8">
                End of product list
              </div>
            )}
            <div className="flex justify-center mt-4">
              <button
                className="mx-2 px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                onClick={() => handlePageChange(queryParams.page - 1)}
                disabled={queryParams.page === 1}
              >
                Previous
              </button>
              {filteredProducts.length > 0 && (
                <button
                  className="mx-2 px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                  onClick={() => handlePageChange(queryParams.page + 1)}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
