import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import useAxios from "../../hooks/useAxios";
import { setEncryptedCookie } from "../../lib/CookieStore.js";

export default function ContinueWithGoogle({
  setError,
  setLoading,
  text = "continue_with",
}) {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const { api } = useAxios();

  const handleSuccess = async (response) => {
    setLoading(true);
    console.log(response);

    const { email, name, picture } = jwtDecode(response.credential);
    const userInfo = {
      email,
      name,
      picture,
    };

    console.log(userInfo);

    try {
      const ServerResponse = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/google`,
        userInfo,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const { user, tokens } = ServerResponse.data;

      if (ServerResponse.data?.success) {
        const { accessToken, refreshToken } = tokens;
        setAuth({ user, accessToken, refreshToken });
        setEncryptedCookie("_at", accessToken, 3 / 1440);
        setEncryptedCookie("_rt", refreshToken, 1);
        navigate("/");
      } else {
        setError("root.serverError", {
          type: "manual",
          message: ServerResponse.data.message || "Login failed",
        });
      }
    } catch (error) {
      if (
        error.response?.data?.message?.includes("E11000 duplicate key error")
      ) {
        setError("root.serverError", {
          type: "manual",
          message:
            "An account with this email already exists. Please use a different email or login with your existing account.",
        });
      } else {
        setError("root.serverError", {
          type: "manual",
          message:
            error.response?.data?.message ||
            "An unexpected error occurred during Google login",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFailure = (error) => {
    setError("root.serverError", {
      type: "manual",
      message: "Google login failed. Please try again.",
    });
    console.error("Google login error:", error);
  };

  return (
    <GoogleLogin
      text={text}
      auto_select
      useOneTap
      onSuccess={handleSuccess}
      onError={handleFailure}
    />
  );
}
