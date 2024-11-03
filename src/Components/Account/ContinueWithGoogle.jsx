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

    try {
      const { email, name, picture } = jwtDecode(response.credential);

      const ServerResponse = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/google`,
        { email, name, picture },
        { headers: { "Content-Type": "application/json" } }
      );

      const { user, tokens, success, message } = ServerResponse.data;

      if (success) {
        if (user.loginMethod === "form") {
          setError("root.serverError", {
            type: "manual",
            message:
              "This email is already registered with password. Please login with your password instead.",
          });
          return;
        }

        const { accessToken, refreshToken } = tokens;

        setAuth({ user, accessToken, refreshToken });
        setEncryptedCookie("_at", accessToken, 3 / 1440); // 3 minutes
        setEncryptedCookie("_rt", refreshToken, 1); // 1 day

        navigate("/");
      } else {
        setError("root.serverError", {
          type: "manual",
          message: message || "Login failed",
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "";
      setError("root.serverError", {
        type: "manual",
        message:
          errorMessage ||
          "An unexpected error occurred during Google login. Please try again.",
      });
      console.error("Google login error:", error);
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
      onSuccess={handleSuccess}
      onError={handleFailure}
      useOneTap // Enables one-tap login for returning users
      auto_select // Automatically selects the account if there's only one
    />
  );
}
