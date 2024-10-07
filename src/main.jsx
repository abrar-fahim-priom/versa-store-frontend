import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import App from "./App.jsx";
import Admin from "./Components/Account/Admin.jsx";
import PrivateRoutes from "./Components/Account/PrivateRoutes.jsx";
import ProfileInfo from "./Components/Account/ProfileInfo.jsx";
import ProfilePage from "./Components/Account/ProfilePage.jsx";
import Shop from "./Components/Account/Shop.jsx";
import "./index.css";
import Categories from "./pages/Categories.jsx";
import Checkout from "./pages/Checkout.jsx";
import Login from "./pages/Login.jsx";
import Registration from "./pages/Registration.jsx";
import SingleProduct from "./pages/SingleProduct.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import CartProvider from "./providers/CartProvider.jsx";
import { DarkModeProvider } from "./providers/DarkModeProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <DarkModeProvider>
          <Router>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />

              <Route element={<PrivateRoutes />}>
                <Route path="profile" element={<ProfilePage />}>
                  <Route index element={<ProfileInfo />} />
                  <Route path="shop" element={<Shop />} />
                  <Route path="admin" element={<Admin />} />
                </Route>
              </Route>

              <Route path="/checkout" element={<Checkout />} />
              <Route path="/products/:slug" element={<SingleProduct />} />
              <Route
                path="/categories/:category_name"
                element={<Categories />}
              />
            </Routes>
          </Router>
        </DarkModeProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);
