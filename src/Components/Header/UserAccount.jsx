import { googleLogout } from "@react-oauth/google";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { RiLogoutBoxRLine, RiUser6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { userApi } from "../../store/api/userApi";

const ButtonPrimary = ({ children, className, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center gap-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-500 w-full ${className}`}
  >
    {children}
  </button>
);

const UserAccount = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { switchCart } = useCart();
  const [isVisible, setIsVisible] = useState(false);

  const logout = () => {
    Cookies.remove("_at");
    Cookies.remove("_rt");
    setAuth(null);
    dispatch(userApi.util.invalidateTags(["User"]));
    googleLogout();
    navigate("/");
  };

  const handleToggleMenu = () => {
    setIsVisible((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setIsVisible(false);
  };

  return (
    <div className="relative pt-1 font-medium">
      <button
        onClick={handleToggleMenu}
        className="flex bg-blue-500 rounded-full px-2 py-1 items-center gap-2 text-sm"
      >
        <RiUser6Line className="dark:text-white text-white" size={18} />
        {auth ? (
          <span className="dark:text-white text-white">
            {auth?.user?.fullName}
          </span>
        ) : (
          <span className="dark:text-white text-white">User Settings</span>
        )}
      </button>

      {/* Overlay */}
      {isVisible && (
        <div
          className="fixed inset-0 bg-neutral-600/20 z-40 transition-opacity"
          onClick={handleCloseMenu}
        />
      )}

      {/* Dropdown Menu */}
      {isVisible && (
        <div className="absolute right-0 mt-2 w-52 origin-top-right divide-y rounded-md bg-white shadow-lg ring-1 ring-black/5 z-50 dark:bg-neutral-900">
          <div className="flex flex-col p-6 space-y-2">
            {!auth ? (
              <>
                <Link to="/login" onClick={handleCloseMenu} className="w-full">
                  <ButtonPrimary>
                    <RiUser6Line color="white" size={18} />
                    <span>Log In</span>
                  </ButtonPrimary>
                </Link>
                <Link
                  to="/register"
                  onClick={handleCloseMenu}
                  className="text-center w-full"
                >
                  <span className="dark:text-white">Create Account</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  onClick={handleCloseMenu}
                  className="w-full"
                >
                  <ButtonPrimary className="bg-green-400 hover:bg-green-500">
                    <span>Profile</span>
                  </ButtonPrimary>
                </Link>
                <ButtonPrimary
                  onClick={() => {
                    logout();
                    handleCloseMenu();
                  }}
                  className="bg-red-600 hover:bg-red-500"
                >
                  <RiLogoutBoxRLine size={18} />
                  <span>Logout</span>
                </ButtonPrimary>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAccount;
