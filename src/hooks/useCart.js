import { useContext } from "react";
import { CartContext } from "../contexts/index";

export const useCart = () => {
  return useContext(CartContext);
};
