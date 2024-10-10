import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../lib/axios/index.js";

const axiosBaseQuery = () => async (args) => {
  const { url, method, data, params } = args;
  try {
    const result = await api({ url, method, data, params });
    return { data: result.data };
  } catch (axiosError) {
    return {
      error: {
        status: axiosError.response?.status,
        data: axiosError.response?.data || axiosError.message,
      },
    };
  }
};

export const apiSlice = createApi({
  baseQuery: axiosBaseQuery(),
  baseUrl: import.meta.env.VITE_SERVER_BASE_URL,
  endpoints: (builder) => ({}),
  tagTypes: ["Product", "Category", "User", "Order"],
});
