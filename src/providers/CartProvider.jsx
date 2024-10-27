import React, { useCallback, useEffect, useState } from "react";
import { CartContext } from "../contexts/index.js";
import useAuth from "../hooks/useAuth";

const CartProvider = ({ children }) => {
  const { auth } = useAuth();

  const getCartFromStorage = useCallback(() => {
    const userId = auth?.user?._id;
    if (!userId) return [];
    const storedCart = JSON.parse(
      localStorage.getItem(`cart_${userId}`) || "[]"
    );
    return storedCart;
  }, [auth]);

  const [cart, setCart] = useState(getCartFromStorage);

  useEffect(() => {
    if (auth) {
      const storedCart = getCartFromStorage();
      setCart(storedCart);
    } else {
      setCart([]);
    }
  }, [auth, getCartFromStorage]);

  const saveCart = useCallback(
    (newCart) => {
      const userId = auth?.user?._id;
      if (userId) {
        localStorage.setItem(`cart_${userId}`, JSON.stringify(newCart));
      }
    },
    [auth]
  );

  const updateCart = useCallback(
    (newCart) => {
      setCart(newCart);
      saveCart(newCart);
    },
    [saveCart]
  );

  const addToCart = (product, quantity = 1) => {
    const newCart = [...cart];
    const existingProductIndex = newCart.findIndex(
      (item) =>
        item._id === product._id && item.selectedType === product.selectedType
    );

    if (existingProductIndex !== -1) {
      newCart[existingProductIndex].quantity += quantity;
    } else {
      newCart.push({ ...product, quantity });
    }
    updateCart(newCart);
  };

  const removeFromCart = (_id, selectedType) => {
    const newCart = cart.filter(
      (item) => !(item._id === _id && item.selectedType === selectedType)
    );
    updateCart(newCart);
  };

  const incrementQuantity = (_id, selectedType) => {
    const newCart = cart.map((item) =>
      item._id === _id && item.selectedType === selectedType
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    updateCart(newCart);
  };

  const decrementQuantity = (_id, selectedType) => {
    const newCart = cart.map((item) =>
      item._id === _id &&
      item.selectedType === selectedType &&
      item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    updateCart(newCart);
  };

  // New function to clear the entire cart
  const clearCart = useCallback(() => {
    updateCart([]);
  }, [updateCart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        clearCart, // Added to the context
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
