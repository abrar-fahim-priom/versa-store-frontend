import axios from "axios";
import { useEffect, useState } from "react";
import { AuthContext } from "../contexts/index.js";
import { getDecryptedCookie, setEncryptedCookie } from "../lib/CookieStore.js";
import { decodeToken } from "../lib/jwtDecodeLib.js";

export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = getDecryptedCookie("_at");
      const refreshToken = getDecryptedCookie("_rt");

      if (accessToken) {
        try {
          const userInfo = decodeToken(accessToken);
          setAuth({ user: userInfo, accessToken, refreshToken });
        } catch (error) {
          console.error("Error decoding access token:", error);
        }
      } else if (refreshToken) {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`,
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

            setEncryptedCookie("_at", newAccessToken, 1 / 24);
            setEncryptedCookie("_rt", newRefreshToken, 1);

            const userInfo = decodeToken(newAccessToken);
            setAuth({
              user: userInfo,
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
            });
          } else {
            console.log(response);
            throw new Error("Invalid response from refresh token endpoint");
          }
        } catch (error) {
          console.error(
            "Token refresh failed:",
            error.response?.data || error.message
          );
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
