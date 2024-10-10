import axios from "axios";
import { useEffect } from "react";
import { api } from "../lib/axios/index.js";
import { setEncryptedCookie } from "../lib/CookieStore.js";
import { decodeToken } from "../lib/jwtDecodeLib.js";
import useAuth from "./useAuth";

const useAxios = () => {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        if (auth?.accessToken) {
          config.headers.Authorization = `Bearer ${auth.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = auth?.refreshToken;
            const response = await axios.post(
              "http://localhost:8080/api/v1/auth/refresh-token",
              { refreshToken },
              {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
              }
            );

            if (response.data.success) {
              const {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
              } = response.data.tokens;

              setEncryptedCookie("_at", newAccessToken, 1 / 1440);
              setEncryptedCookie("_rt", newRefreshToken, 1);

              const userInfo = decodeToken(newAccessToken);
              setAuth({
                user: userInfo,
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
              });

              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              return api(originalRequest);
            } else {
              throw new Error("Invalid response from refresh token endpoint");
            }
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            setAuth(null);
            // Optionally, redirect to login page here
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [auth, setAuth]);

  return { api };
};

export default useAxios;
