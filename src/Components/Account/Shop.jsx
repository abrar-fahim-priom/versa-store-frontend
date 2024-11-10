import { Dialog } from "@headlessui/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { useApiWithAuth } from "../../hooks/useApiWithAuth";
import ButtonSecondary from "../../shared/Button/ButtonSecondary";
import {
  useDeleteProductMutation,
  useGetVendorProductsQuery,
} from "../../store/api/productApi";
import { useGetUserProfileQuery } from "../../store/api/userApi";
import SidebarFilters from "../Categories/SidebarFilters";
import ProductCard from "../Products/ProductCard";
import ProductEditForm from "../Products/ProductEditForm";
import ProductForm from "../Products/ProductForm";
import ShopHeader from "../Products/ShopHeader";
import LoaderGradient from "../ui/LoaderGradient";

export default function Shop() {
  useApiWithAuth();
  const {
    data: userProfile,
    error: userProfileError,
    isLoading: userProfileLoading,
  } = useGetUserProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const vendorId = userProfile?.profile?._id;
  console.log(userProfile?.profile?.user_type);

  const {
    data: vendorProductsData,
    isLoading: productsLoading,
    isError: productsError,
    error: productsErrorData,
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
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [deleteProduct] = useDeleteProductMutation();

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
    const productToDelete = filteredProducts.find((p) => p._id === productId);
    setProductToDelete(productToDelete);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      try {
        await deleteProduct(productToDelete._id).unwrap();
        refetch(); // Refetch the products list after deletion
        setIsDeleteDialogOpen(false);
        setProductToDelete(null);

        // Show success notification
        setIsNotificationVisible(true);

        // Hide notification after 3 seconds
        setTimeout(() => {
          setIsNotificationVisible(false);
        }, 3000);
      } catch (error) {
        console.error("Failed to delete product:", error);
        // Handle error (e.g., show an error message to the user)
      }
    }
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

  if (userProfileLoading || productsLoading) {
    return <LoaderGradient />;
  }

  if (userProfileError) {
    return <div>Error loading user profile: {userProfileError.message}</div>;
  }

  if (productsError) {
    return <div>Error loading products: {productsErrorData.message}</div>;
  }

  return (
    <div className="bg-neutral-100 dark:bg-gray min-h-screen dark:bg-gray-900">
      <div className="flex justify-center">
        {(userProfile?.profile?.user_type === "vendor" ||
          userProfile?.profile?.user_type === "admin") && (
          <ShopHeader shopData={userProfile?.profile} />
        )}
      </div>

      <div className="flex justify-center">
        {(userProfile?.profile?.user_type === "vendor" ||
          userProfile?.profile?.user_type === "admin") && (
          <ButtonSecondary onClick={handleAddProduct} className="w-32 mt-2">
            Add Product
          </ButtonSecondary>
        )}
        {userProfile?.profile?.user_type === "customer" && (
          <p className="text-xl lg:text-3xl font-medium text-black dark:text-white m-5">
            Create a Vendor Profile to start selling with your own shop !!
          </p>
        )}
      </div>
      <div className="container mx-auto px-4 py-8">
        {productAddField ? (
          <ProductForm refetch={() => refetch} onCancel={handleAddProduct} />
        ) : editingProduct ? (
          <ProductEditForm
            product={editingProduct}
            onCancel={handleCancelEdit}
            onSubmitSuccess={handleEditSuccess}
          />
        ) : (
          <div className="grid grid-cols-12 gap-6">
            {(userProfile?.profile?.user_type === "vendor" ||
              userProfile?.profile?.user_type === "admin") && (
              <div className=" md:col-span-5 lg:col-span-3">
                <SidebarFilters
                  products={initialProducts}
                  onFilterChange={handleFilterChange}
                />
              </div>
            )}

            <div className="col-span-12 md:col-span-12 lg:col-span-9">
              {filteredProducts.length > 0 ? (
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
                        <div className="absolute top-8 right-2 bg-white dark:bg-neutral-600 text-sm font-normal shadow-lg rounded-md w-32 menu-container z-20">
                          <ul className="text-black dark:text-white">
                            <li
                              className="px-4 py-2 hover:bg-blue-300 rounded-sm  cursor-pointer"
                              onClick={() => handleEditProduct(product._id)}
                            >
                              Edit Product
                            </li>
                            <li
                              className="px-4 py-2 hover:bg-red-300 rounded-sm  cursor-pointer"
                              onClick={() => handleDeleteProduct(product._id)}
                            >
                              Delete Product
                            </li>
                          </ul>
                        </div>
                      )}

                      {/* Product card */}
                      <ProductCard
                        className="w-full transition-all duration-300 ease-in-out hover:shadow-lg  hover:scale-[1.02]  h-full"
                        product={product}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                (userProfile?.profile?.user_type === "vendor" ||
                  userProfile?.profile?.user_type === "admin") && (
                  <div className="text-center text-gray-500 dark:text-gray-400 mt-4">
                    No products added yet in your shop.
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6 dark:bg-gray">
            <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
              Delete Product
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-sm text-gray-500 dark:text-white">
              Are you sure you want to delete this product? This action cannot
              be undone.
            </Dialog.Description>

            <p className="mt-4 text-sm text-gray-700 dark:text-white">
              Product: {productToDelete?.name}
            </p>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Success Notification Dialog */}
      <Dialog
        open={isNotificationVisible}
        onClose={() => setIsNotificationVisible(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm rounded bg-green-500 p-6 text-white">
            <Dialog.Title className="text-lg font-medium leading-6">
              Product Deleted
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-sm">
              The product has been successfully deleted.
            </Dialog.Description>

            <div className="mt-6 flex justify-end">
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-green-700 rounded-md hover:bg-green-800"
                onClick={() => setIsNotificationVisible(false)}
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
