import { apiSlice } from "./apiSlice";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({ url: "/categories", method: "GET" }),
      providesTags: ["Categories"],
    }),

    getSingleCategory: builder.query({
      query: (cateogoryId) => ({
        url: `/categories/find/${cateogoryId}`,
        method: "GET",
      }),
      providesTags: ["Category"],
    }),

    getProducts: builder.query({
      query: (params) => ({ url: "/products", method: "GET", params }),
      providesTags: ["Product"],
    }),

    getProductById: builder.query({
      query: (id) => ({ url: `/products/${id}`, method: "GET" }),
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    createProduct: builder.mutation({
      query: (formData) => {
        console.log("createProduct received:", formData);
        return {
          url: "/products",
          method: "POST",
          data: formData,
        };
      },
      invalidatesTags: ["Product"],
    }),

    editProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        data: formData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Product", id }],
    }),

    getVendorProducts: builder.query({
      query: (vendorId) => ({
        url: `/products/vendor/${vendorId}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    getPopularProducts: builder.query({
      query: () => ({
        url: "/products/popular",
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    deleteProductImage: builder.mutation({
      query: ({ productId, imageId }) => ({
        url: `/products/${productId}/images/${imageId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "Product", id: productId },
      ],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/products/single/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    getProductReviews: builder.query({
      query: (productId) => ({
        url: `/review/${productId}`,
        method: "GET",
      }),
      providesTags: ["Review"],
    }),

    postProductReview: builder.mutation({
      query: ({ productId, reviewData }) => ({
        url: `/review/${productId}`,
        method: "POST",
        data: reviewData,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Review"],
    }),

    // New mutation for deleting a review
    deleteProductReview: builder.mutation({
      query: (reviewId) => ({
        url: `/review/${reviewId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Review"],
    }),

    searchProducts: builder.query({
      query: (searchTerm) => ({
        url: "/products/search",
        method: "GET",
        params: { term: searchTerm || "" }, // Use `data` for the request body
      }),
      transformResponse: (response) => {
        // Handle the success and products structure from the response
        return response.success ? response.products : [];
      },
    }),

    toggleBookmark: builder.mutation({
      query: (productId) => ({
        url: `/products/bookmark/${productId}`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, productId) => [
        { type: "Product", id: productId },
        "Bookmarks",
      ],
    }),

    addCategory: builder.mutation({
      query: (formData) => ({
        url: "/categories",
        method: "POST",
        data: formData, // Send FormData directly
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: ["Categories"], // Invalidate the cache for categories
    }),
  }),
});

export const {
  useSearchProductsQuery,
  useAddCategoryMutation,
  useToggleBookmarkMutation,
  useGetSingleCategoryQuery,
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useEditProductMutation,
  useCreateProductMutation,
  useGetVendorProductsQuery,
  useGetPopularProductsQuery,
  useDeleteProductImageMutation,
  useDeleteProductMutation,
  useGetSingleProductQuery,
  useGetProductReviewsQuery,
  usePostProductReviewMutation,
  useDeleteProductReviewMutation,
} = productApi;
