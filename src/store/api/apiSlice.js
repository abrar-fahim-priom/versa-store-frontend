import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../lib/axios/index.js";

const axiosBaseQuery = () => async (args) => {
  const { url, method, data, params } = args;
  console.log("axiosBaseQuery received:", { url, method, data, params });

  try {
    const config = {
      url,
      method,
      params,
      data,
      headers:
        data instanceof FormData
          ? { "Content-Type": "multipart/form-data" }
          : {},
    };
    console.log("Axios config:", config);
    const result = await api(config);
    console.log("axiosBaseQuery response:", result);
    return { data: result.data };
  } catch (axiosError) {
    console.error("axiosBaseQuery error:", axiosError);
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
