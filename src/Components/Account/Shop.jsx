import { useCallback, useMemo, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import ButtonSecondary from "../../shared/Button/ButtonSecondary";
import CategoriesHeader from "../Categories/CategoriesHeader";
import SidebarFilters from "../Categories/SidebarFilters";
import ProductCard from "../Products/ProductCard";
import ProductForm from "../Products/ProductForm";

export default function Shop() {
  const CategoriesData = {
    success: true,
    products: [
      {
        slug: "ACER Business",
        _id: "66d5579baa242b27480f35f4",
        category: {
          _id: "66d486129891ab753aa56c0b",
          name: "computer",
          image:
            "https://res.cloudinary.com/hostingimagesservice/image/upload/v1725257626/versaShop/images-1725257624599_hjb9px.jpg",
          imageKey: "versaShop/image-1725203983524_seyqyt",
          createdAt: "2024-09-01T15:19:46.367Z",
          updatedAt: "2024-09-01T15:19:46.367Z",
          __v: 0,
        },
        name: "ACER Business Laptop Pro",
        description:
          "POWER FOR YOUR MOST PRODUCTIVE DAYS: Galaxy Book4 Pro models come with a new Intel Core Ultra 7 processor 155H or Intel Core Ultra 5 processor 125H with a higher-performance Intel ARC graphics & newly added AI neural processing unit (NPU)",
        currentPrice: 180000,
        discount: 15,
        images: [
          {
            url: "https://res.cloudinary.com/hostingimagesservice/image/upload/v1725257626/versaShop/images-1725257624599_hjb9px.jpg",
            publicId: "versaShop/images-1725257624597_alavb6",
            _id: "66d5579baa242b27480f35f5",
          },
          {
            url: "https://res.cloudinary.com/hostingimagesservice/image/upload/v1725257626/versaShop/images-1725257624598_kv3seh.jpg",
            publicId: "versaShop/images-1725257624598_kv3seh",
            _id: "66d5579baa242b27480f35f6",
          },
          {
            url: "https://res.cloudinary.com/hostingimagesservice/image/upload/v1725257626/versaShop/images-1725257624599_hjb9px.jpg",
            publicId: "versaShop/images-1725257624599_hjb9px",
            _id: "66d5579baa242b27480f35f7",
          },
        ],
        brand: "SAMSUNG",
        stock: 384,
        defaultType: "1 TB",
        variant: [
          {
            type: "512 GB",
            currentPrice: 120000,
            description:
              'POWERFUL. LIGHT. AMAZINGLY SLIM: Galaxy Book4 Pro is the epitome of portability and the lightest in our all-new Galaxy Book4 Series; 16” Thickness: 12.5mm, Weight: 3.44 lbs 14" Thickness: 11.6mm, Weight: 2.71 lbs',
            _id: "66d5579baa242b27480f35f8",
          },
        ],
        createdAt: "2024-09-02T06:13:47.413Z",
        updatedAt: "2024-09-06T14:22:19.485Z",
        __v: 0,
        addedBy: {
          _id: "66d1ae5915a70e31707a85d7",
          fullName: "Devdash Chokroborty",
          email: "devdash@gmail.com",
          image:
            "https://res.cloudinary.com/hostingimagesservice/image/upload/v1725181363/versaShop/image-1725181359932_fcyeyr.png",
          shopName: "Indian Express",
          shopLicenseNo: "0987656433",
          shopType: "Salon",
          shopPhoto:
            "https://res.cloudinary.com/hostingimagesservice/image/upload/v1725181046/versaShop/shopPhoto-1725181043740_oqevph.jpg",
          shopPhotoKey: "versaShop/shopPhoto-1725181043740_oqevph",
          shopAddress: "Dhanmondi",
          isBan: false,
          user_type: "vendor",
          createdAt: "2024-08-30T11:34:49.442Z",
          updatedAt: "2024-09-01T09:02:44.026Z",
          __v: 0,
          phone: "01508673831",
          imageKey: "versaShop/image-1725181359932_fcyeyr",
        },
        addedByModel: "Vendor",
        deliveryCharge: 50,
        sold: 10,
      },
      {
        slug: "ACER book",
        _id: "66d567003738a229607fb953",
        category: {
          _id: "66d486129891ab753aa56c0b",
          name: "computer",
          image:
            "https://res.cloudinary.com/hostingimagesservice/image/upload/v1725203985/versaShop/image-1725203983524_seyqyt.png",
          imageKey: "versaShop/image-1725203983524_seyqyt",
          createdAt: "2024-09-01T15:19:46.367Z",
          updatedAt: "2024-09-01T15:19:46.367Z",
          __v: 0,
        },
        name: "ACER Book4 Pro Business Laptop",
        description:
          "POWER FOR YOUR MOST PRODUCTIVE DAYS: Galaxy Book4 Pro models come with a new Intel Core Ultra 7 processor 155H or Intel Core Ultra 5 processor 125H with a higher-performance Intel ARC graphics & newly added AI neural processing unit (NPU)",
        currentPrice: 180000,
        discount: 15,
        images: [
          {
            url: "https://res.cloudinary.com/hostingimagesservice/image/upload/v1725261567/versaShop/images-1725261564593_ftna5t.jpg",
            publicId: "versaShop/images-1725261564593_ftna5t",
            _id: "66d567003738a229607fb954",
          },
        ],
        brand: "ACER",
        stock: 50,
        defaultType: "1 TB",
        variant: [
          {
            type: "512 GB",
            currentPrice: 120000,
            description:
              'POWERFUL. LIGHT. AMAZINGLY SLIM: Galaxy Book4 Pro is the epitome of portability and the lightest in our all-new Galaxy Book4 Series; 16” Thickness: 12.5mm, Weight: 3.44 lbs 14" Thickness: 11.6mm, Weight: 2.71 lbs',
            _id: "66d567003738a229607fb955",
          },
        ],
        createdAt: "2024-09-02T07:19:28.016Z",
        updatedAt: "2024-09-02T07:19:28.016Z",
        __v: 0,
        addedBy: {
          _id: "66d1ae5915a70e31707a85d7",
          fullName: "Devdash Chokroborty",
          email: "devdash@gmail.com",
          image:
            "https://res.cloudinary.com/hostingimagesservice/image/upload/v1725181363/versaShop/image-1725181359932_fcyeyr.png",
          shopName: "Indian Express",
          shopLicenseNo: "0987656433",
          shopType: "Salon",
          shopPhoto:
            "https://res.cloudinary.com/hostingimagesservice/image/upload/v1725181046/versaShop/shopPhoto-1725181043740_oqevph.jpg",
          shopPhotoKey: "versaShop/shopPhoto-1725181043740_oqevph",
          shopAddress: "Dhanmondi",
          isBan: false,
          user_type: "vendor",
          createdAt: "2024-08-30T11:34:49.442Z",
          updatedAt: "2024-09-01T09:02:44.026Z",
          __v: 0,
          phone: "01508673831",
          imageKey: "versaShop/image-1725181359932_fcyeyr",
        },
        addedByModel: "Vendor",
        deliveryCharge: 100,
        sold: 12,
      },
    ],
    id: "66d1ae5915a70e31707a85d7",
  };

  const initialProducts = useMemo(() => CategoriesData.products, []);

  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [activeMenu, setActiveMenu] = useState(null);
  const [productAddField, setProductAddField] = useState(false);

  const handleFilterChange = useCallback(
    (filters) => {
      setFilteredProducts(
        initialProducts.filter((product) => {
          const matchesBrand =
            filters.brands.length === 0 ||
            filters.brands.includes(product.brand);
          const matchesPrice =
            product.currentPrice >= filters.priceRange[0] &&
            product.currentPrice <= filters.priceRange[1];

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
    console.log(`Edit product with ID: ${productId}`);
  };

  const handleDeleteProduct = (productId) => {
    console.log(`Delete product with ID: ${productId}`);
  };

  return (
    <div className="bg-neutral-100 min-h-screen dark:bg-gray-900">
      <CategoriesHeader CategoriesData={CategoriesData} />

      <div className="flex justify-center">
        <ButtonSecondary onClick={handleAddProduct} className="w-32">
          Add Product
        </ButtonSecondary>
      </div>
      <div className="container mx-auto px-4 py-8">
        {productAddField ? (
          <ProductForm />
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
