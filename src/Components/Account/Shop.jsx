import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { useOutletContext } from "react-router-dom";
import ButtonSecondary from "../../shared/Button/ButtonSecondary";
import { useGetVendorProductsQuery } from "../../store/api/productApi";
import CategoriesHeader from "../Categories/CategoriesHeader";
import SidebarFilters from "../Categories/SidebarFilters";
import ProductCard from "../Products/ProductCard";
import ProductEditForm from "../Products/ProductEditForm";
import ProductForm from "../Products/ProductForm";

export default function Shop() {
  const { userProfile } = useOutletContext();
  const vendorId = userProfile?.profile?._id;

  const {
    data: vendorProductsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetVendorProductsQuery(vendorId, {
    skip: !vendorId, // Skip the query if vendorId is not available
  });

  const initialProducts = useMemo(
    () => vendorProductsData?.products || [],
    [vendorProductsData]
  );

  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [activeMenu, setActiveMenu] = useState(null);
  const [productAddField, setProductAddField] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

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
            (filters.stockStatus.includes("In Stock") && product.inStock) ||
            (filters.stockStatus.includes("Out of Stock") && !product.inStock);

          const matchesDiscount =
            filters.discount.length === 0 ||
            (filters.discount.includes("On Sale") && product.isOnSale) ||
            (filters.discount.includes("Regular Price") && !product.isOnSale);

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

  const handleAddProduct = () => {
    setProductAddField((prev) => !prev);
  };

  const handleMenuToggle = (productId) => {
    setActiveMenu(activeMenu === productId ? null : productId);
  };

  // Edit and Delete handlers
  const handleEditProduct = (productId) => {
    const productToEdit = filteredProducts.find((p) => p._id === productId);
    setEditingProduct(productToEdit);
    setProductAddField(false);
  };

  const handleDeleteProduct = (productId) => {
    console.log(`Delete product with ID: ${productId}`);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  const handleEditSuccess = () => {
    setEditingProduct(null);
    refetch(); // Assuming you have a refetch function from the useGetVendorProductsQuery hook
  };

  useEffect(() => {
    setFilteredProducts(initialProducts);
  }, [initialProducts]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="bg-neutral-100 min-h-screen dark:bg-gray-900">
      <CategoriesHeader CategoriesData={vendorProductsData} />

      <div className="flex justify-center">
        <ButtonSecondary onClick={handleAddProduct} className="w-32">
          Add Product
        </ButtonSecondary>
      </div>
      <div className="container mx-auto px-4 py-8">
        {productAddField ? (
          <ProductForm />
        ) : editingProduct ? (
          <ProductEditForm
            product={editingProduct}
            onCancel={handleCancelEdit}
            onSubmitSuccess={handleEditSuccess}
          />
        ) : (
          <div className="grid grid-cols-12 gap-6">
            <div className="hidden lg:block md:col-span-5 lg:col-span-3">
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
                    <div
                      className="absolute top-2 right-2 z-10 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevents triggering the global click listener
                        handleMenuToggle(product._id);
                      }}
                    >
                      <FiMoreVertical />
                    </div>

                    {/* Dropdown menu for edit and delete */}
                    {activeMenu === product._id && (
                      <div className="absolute top-8 right-2 bg-white dark:bg-gray-800 shadow-lg rounded-md w-32 menu-container z-20">
                        <ul className="text-gray-700 dark:text-gray-200">
                          <li
                            className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                            onClick={() => handleEditProduct(product._id)}
                          >
                            Edit Product
                          </li>
                          <li
                            className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                            onClick={() => handleDeleteProduct(product._id)}
                          >
                            Delete Product
                          </li>
                        </ul>
                      </div>
                    )}

                    {/* Product card */}
                    <ProductCard
                      className="w-full hover:border-indigo-400 hover:rounded hover:border h-full transition-shadow duration-300 ease-in-out shadow-sm hover:shadow-md"
                      product={product}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
