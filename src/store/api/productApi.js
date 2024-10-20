import { apiSlice } from "./apiSlice";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({ url: "/categories", method: "GET" }),
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
    // New mutation for posting a product
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
    // New endpoint for fetching vendor-specific products
    getVendorProducts: builder.query({
      query: (vendorId) => ({
        url: `/products/vendor/${vendorId}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
    // New endpoint for fetching popular products
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
  }),
});

export const {
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
} = productApi;
