import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/index.js";
import { api } from "../lib/axios/index.js";
import { getDecryptedCookie, setEncryptedCookie } from "../lib/cookieStore";
import { decodeToken } from "../lib/jwtDecodeLib";

export default function useAuth() {
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  if (!context)
    throw new Error("useAuth hook must be used within the AuthProvider");

  const { setAuth } = context;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkTokens = async () => {
      const accessToken = getDecryptedCookie("_at");
      const refreshToken = getDecryptedCookie("_rt");

      if (accessToken) {
        const userInfo = decodeToken(accessToken);
        setAuth({ ...userInfo, accessToken, refreshToken });
        setLoading(false);
      } else if (refreshToken) {
        try {
          const response = await api.post("/auth/refresh-token", {
            refreshToken,
          });
          const newAccessToken = response.data.accessToken;
          const newRefreshToken = response.data.refreshToken;

          setEncryptedCookie("_at", newAccessToken, 1 / 24);
          setEncryptedCookie("_rt", newRefreshToken, 1);

          const userInfo = decodeToken(newAccessToken);
          setAuth({
            ...userInfo,
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          });
        } catch (error) {
          console.error("Token refresh failed:", error);
          navigate("/login");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        if (location.pathname !== "/register") {
          navigate("/login");
        }
      }
    };

    checkTokens();
  }, [setAuth, navigate]);

  return { ...context, loading };
}
