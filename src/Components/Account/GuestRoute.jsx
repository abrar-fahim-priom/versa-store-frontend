import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function GuestRoute({ children }) {
  const { auth, loading } = useAuth();

  console.log("Auth state in GuestRoute:", auth);
  console.log("Loading state in GuestRoute:", loading);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (auth) return <Navigate to="/" replace />;

  return children;
}
