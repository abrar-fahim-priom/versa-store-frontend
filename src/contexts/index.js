import { createContext } from "react";

// Create the Cart context
const CartContext = createContext();
const DarkModeContext = createContext();

const AuthContext = createContext();

export { AuthContext, CartContext, DarkModeContext };
