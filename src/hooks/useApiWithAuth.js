import { useEffect } from "react";
import { apiSlice } from "../store/api/apiSlice";
import useAxios from "./useAxios";

export const useApiWithAuth = () => {
  const { api } = useAxios();

  useEffect(() => {
    // Update the axiosBaseQuery to use the latest api instance
    apiSlice.injectEndpoints({
      overrideExisting: true,
      endpoints: () => ({}),
    });
  }, [api]);

  return apiSlice;
};
