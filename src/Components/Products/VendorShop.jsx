import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetVendorProductsQuery } from "../../store/api/productApi";
import SidebarFilters from "../Categories/SidebarFilters";
import ProductCard from "../Products/ProductCard";
import ShopHeader from "../Products/ShopHeader";
import LoaderGradient from "../ui/LoaderGradient";

export default function VendorShop() {
  // console.log(shopData);
  const { id: vendorId } = useParams();

  const {
    data: vendorProductsData,
    isLoading: productsLoading,
    isError: productsError,
    error: productsErrorData,
    refetch,
  } = useGetVendorProductsQuery(vendorId);

  console.log(vendorProductsData);

  const initialProducts = useMemo(
    () => vendorProductsData?.products || [],
    [vendorProductsData]
  );

  const [filteredProducts, setFilteredProducts] = useState(initialProducts);

  const handleFilterChange = useCallback(
    (filters) => {
      setFilteredProducts(
        initialProducts.filter((product) => {
          const matchesBrand =
            filters.brands.length === 0 ||
            filters.brands.includes(product.brand);
          const matchesPrice =
            product.price >= filters.priceRange[0] &&
            product.price <= filters.priceRange[1];

          // Add other filter conditions as needed
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
    },
    [initialProducts]
  ); // Dependency on memoized initial products

  useEffect(() => {
    setFilteredProducts(initialProducts);
  }, [initialProducts]);

  if (productsError) {
    return <div>Error loading products: {productsErrorData.message}</div>;
  }

  if (productsLoading) {
    return <LoaderGradient />;
  }

  return (
    <div className="bg-neutral-100 dark:bg-gray min-h-screen dark:bg-gray-900">
      <div className="shadow "></div>

      <div className="flex mt-3 xl:mt-24 justify-center">
        <ShopHeader shopData={vendorProductsData?.products[0]?.addedBy} />
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-6">
          <div className=" md:col-span-5 lg:col-span-3">
            <SidebarFilters
              products={initialProducts}
              onFilterChange={handleFilterChange}
            />
          </div>

          <div className="col-span-12 md:col-span-12 lg:col-span-9">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {filteredProducts.map((product) => (
                <div key={product._id} className="w-full relative">
                  {/* Three-dot icon positioned in the top-right corner */}

                  {/* Product card */}
                  <ProductCard
                    className="w-full transition-all duration-300 ease-in-out hover:shadow-lg  hover:scale-[1.02]  h-full"
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
}
