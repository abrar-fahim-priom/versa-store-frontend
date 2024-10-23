import { apiSlice } from "./apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ({ url: "/orders", method: "GET" }),
      providesTags: ["Order"],
    }),
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/order",
        method: "POST",
        data: orderData,
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const { useGetOrdersQuery, useCreateOrderMutation } = orderApi;
