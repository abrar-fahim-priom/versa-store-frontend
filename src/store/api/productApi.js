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
  }),
});

export const {
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetProductByIdQuery,
} = productApi;
