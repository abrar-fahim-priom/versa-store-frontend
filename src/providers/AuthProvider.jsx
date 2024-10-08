import axios from "axios";
import { useEffect, useState } from "react";
import { AuthContext } from "../contexts/index.js";
import { getDecryptedCookie, setEncryptedCookie } from "../lib/CookieStore.js";
import { decodeToken } from "../lib/jwtDecodeLib.js";

export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(auth);
  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = getDecryptedCookie("_at");
      const refreshToken = getDecryptedCookie("_rt");

      console.log("Access Token:", accessToken);
      console.log("Refresh Token:", refreshToken);

      if (accessToken) {
        try {
          const userInfo = decodeToken(accessToken);
          setAuth({ user: userInfo, accessToken, refreshToken });
          console.log("User authenticated:", userInfo);
        } catch (error) {
          console.error("Error decoding access token:", error);
        }
      } else if (refreshToken) {
        console.log("Refresh token: 28888", refreshToken);
        try {
          console.log(refreshToken);
          const response = await axios.post(
            "http://localhost:8080/api/v1/auth/refresh-token",
            { refreshToken },
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          );
          console.log(response.data);
          if (response.data.success) {
            const {
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
            } = response.data.tokens;
            console.log(response.data);
            setEncryptedCookie("_at", newAccessToken, 1 / 1440);
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
