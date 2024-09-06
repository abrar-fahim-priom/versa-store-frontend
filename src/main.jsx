import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Checkout from "./pages/Checkout.jsx";
import SingleProduct from "./pages/SingleProduct.jsx";
import CartProvider from "./providers/CartProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/products/:slug" element={<SingleProduct />} />
        </Routes>
      </Router>
    </CartProvider>
  </StrictMode>
);
