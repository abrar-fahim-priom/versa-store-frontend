import { GoogleOAuthProvider } from "@react-oauth/google";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import About from "./Components/AboutUs/About.jsx";
import Admin from "./Components/Account/Admin.jsx";
import GuestRoute from "./Components/Account/GuestRoute.jsx";
import Orders from "./Components/Account/Orders.jsx";
import PrivateRoutes from "./Components/Account/PrivateRoutes.jsx";
import ProfileInfo from "./Components/Account/ProfileInfo.jsx";
import ProfilePage from "./Components/Account/ProfilePage.jsx";
import Shop from "./Components/Account/Shop.jsx";
import Layout from "./Components/Layout.jsx";
import AddCategoryForm from "./Components/Products/AddCategoryForm.jsx";
import VendorShop from "./Components/Products/VendorShop.jsx";
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />}>
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route path="/about" element={<About />} />
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
          <Route path="addCategory" element={<AddCategoryForm />} />
          <Route path="profile" element={<ProfilePage />}>
            <Route index element={<ProfileInfo />} />
            <Route path="shop" element={<Shop />} />
            <Route path="admin" element={<Admin />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Route>

        <Route index element={<App />} />

        <Route path="/checkout" element={<Checkout />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/vendorShop/:id" element={<VendorShop />} />
        <Route path="/categories/:categoryId" element={<Categories />} />
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <AuthProvider>
          <CartProvider>
            <DarkModeProvider>
              <RouterProvider router={router} />
            </DarkModeProvider>
          </CartProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>
);
