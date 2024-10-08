import { useContext } from "react";
import { AuthContext } from "../contexts/index.js";

export default function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
