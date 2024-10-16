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
  }),
});

export const {
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useGetVendorProductsQuery,
  useGetPopularProductsQuery, // Export the new hook
} = productApi;
