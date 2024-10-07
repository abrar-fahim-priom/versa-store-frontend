import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { AuthContext } from "../contexts/index.js";
import { getDecryptedCookie } from "../lib/CookieStore.js";
import { decodeToken } from "../lib/jwtDecodeLib.js";

export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const initializeAuth = () => {
      const accessToken = getDecryptedCookie("_at");
      const refreshToken = getDecryptedCookie("_rt");

      if (accessToken) {
        const userInfo = decodeToken(accessToken);
        setAuth({ ...userInfo, refreshToken, accessToken });
      } else {
        setAuth(null);
      }
    };

    initializeAuth();
  }, []);

  const logout = () => {
    Cookies.remove("_at");
    Cookies.remove("_rt");
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
