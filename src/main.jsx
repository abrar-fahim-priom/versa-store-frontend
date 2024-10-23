import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import App from "./App.jsx";
import Admin from "./Components/Account/Admin.jsx";
import GuestRoute from "./Components/Account/GuestRoute.jsx";
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
import { store } from "./store/index.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <CartProvider>
          <DarkModeProvider>
            <Router>
              <Routes>
                <Route
                  path="/login"
                  element={
                    <GuestRoute>
                      <Login />
                    </GuestRoute>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <GuestRoute>
                      {" "}
                      <Registration />{" "}
                    </GuestRoute>
                  }
                />

                <Route element={<PrivateRoutes />}>
                  <Route path="profile" element={<ProfilePage />}>
                    <Route index element={<ProfileInfo />} />
                    <Route path="shop" element={<Shop />} />
                    <Route path="admin" element={<Admin />} />
                  </Route>
                </Route>

                <Route index element={<App />} />

                <Route path="/checkout" element={<Checkout />} />
                <Route path="/products/:id" element={<SingleProduct />} />
                <Route
                  path="/categories/:categoryId"
                  element={<Categories />}
                />
              </Routes>
            </Router>
          </DarkModeProvider>
        </CartProvider>
      </AuthProvider>
    </Provider>
  </StrictMode>
);
