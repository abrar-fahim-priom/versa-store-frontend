// Layout.jsx
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer.jsx";
import NavBar from "./Header/NavBar.jsx";

export default function Layout() {
  return (
    <>
      <NavBar />
      <Outlet /> {/* Renders the current page content */}
      <Footer /> {/* Footer appears on every page */}
    </>
  );
}
