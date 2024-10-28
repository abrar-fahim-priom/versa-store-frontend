import { apiSlice } from "./apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserOrders: builder.query({
      query: () => ({ url: "/order/orders", method: "GET" }),
      providesTags: ["Orders"],
    }),

    getAllOrders: builder.query({
      query: () => ({ url: "/order/all-orders", method: "GET" }),
      providesTags: ["AllOrders"],
    }),
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/order",
        method: "POST",
        data: orderData,
      }),
      invalidatesTags: ["Order"],
    }),

    // New endpoint for accepting orders
    acceptOrder: builder.mutation({
      query: (orderId) => ({
        url: `/order/accept/${orderId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Order", "AllOrders"],
    }),

    rejectOrder: builder.mutation({
      query: (orderId) => ({
        url: `/order/reject/${orderId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Order", "AllOrders"],
    }),
  }),
});

export const {
  useRejectOrderMutation,
  useGetAllOrdersQuery,
  useGetUserOrdersQuery,
  useCreateOrderMutation,
  useAcceptOrderMutation, // New hook export
} = orderApi;
