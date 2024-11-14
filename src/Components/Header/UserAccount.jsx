import { googleLogout } from "@react-oauth/google";
import Cookies from "js-cookie";
import React, { useEffect, useRef, useState } from "react";
import { RiLogoutBoxRLine, RiUser6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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

const Tooltip = ({ message, visible }) => {
  if (!visible) return null;

  return (
    <div className="absolute top-12 right-0 w-72 bg-blue-600 text-white text-sm py-3 px-4 rounded-md shadow-lg z-50 transition-all duration-300 ease-in-out hidden md:block">
      <div className="relative">
        <div className="absolute -top-6 right-3 text-blue-600">
          <svg
            width="24"
            height="12"
            viewBox="0 0 24 12"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.2426 1.75736C11.0232 0.976311 12.0768 0.976311 12.8574 1.75736L24 12H0L10.2426 1.75736Z" />
          </svg>
        </div>
        <p className="relative z-10 font-medium leading-tight">{message}</p>
      </div>
    </div>
  );
};

const UserAccount = ({ onClickClose }) => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { switchCart } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipTimeoutRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    // Only show vendor tooltip, don't affect menu visibility
    if (auth?.user?.user_type === "vendor") {
      setShowTooltip(true);
      if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);

      tooltipTimeoutRef.current = setTimeout(() => {
        setShowTooltip(false);
      }, 5000);
    }

    // Close menu when clicking outside
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsVisible(false);
        if (onClickClose) onClickClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [auth, onClickClose]);

  const logout = () => {
    Cookies.remove("_at");
    Cookies.remove("_rt");
    setAuth(null);
    dispatch(userApi.util.invalidateTags(["User"]));
    googleLogout();
    setIsVisible(false);
    navigate("/");
    if (onClickClose) onClickClose();
  };

  const handleToggleMenu = (e) => {
    e.stopPropagation();
    if (!auth) {
      navigate("/login");
      if (onClickClose) onClickClose();
      return;
    }
    setIsVisible((prev) => !prev);
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setIsVisible(false);
    if (onClickClose) onClickClose();
  };

  return (
    <div className="relative pt-1 font-medium" ref={menuRef}>
      <button
        onClick={handleToggleMenu}
        className="flex bg-blue-500 rounded-full px-2 py-1 items-center gap-2 text-sm"
      >
        <RiUser6Line className="dark:text-white text-white" size={18} />
        {auth ? (
          <span className="dark:text-white text-white">
            {auth?.user?.fullName?.split(" ")[0]}
          </span>
        ) : (
          <span className="dark:text-white text-white">Login</span>
        )}
      </button>

      {/* Overlay */}
      {isVisible && auth && (
        <div
          className="fixed inset-0 bg-neutral-600/20 z-40 transition-opacity"
          onClick={() => {
            setIsVisible(false);
            if (onClickClose) onClickClose();
          }}
        />
      )}

      {/* Dropdown Menu */}
      {isVisible && auth && (
        <div className="absolute right-0 mt-2 w-52 origin-top-right divide-y rounded-md bg-white shadow-lg ring-1 ring-black/5 z-50 dark:bg-neutral-900">
          <div className="flex flex-col p-6 space-y-2">
            <button onClick={handleProfileClick} className="w-full">
              <ButtonPrimary className="bg-green-400 hover:bg-green-500">
                <span>Profile</span>
              </ButtonPrimary>
            </button>
            <ButtonPrimary
              onClick={logout}
              className="bg-red-600 hover:bg-red-500"
            >
              <RiLogoutBoxRLine size={18} />
              <span>Logout</span>
            </ButtonPrimary>
          </div>
        </div>
      )}

      {/* Vendor Tooltip */}
      <Tooltip
        message="Find your shop settings, product addition, and management inside Profile"
        visible={showTooltip}
      />
    </div>
  );
};

export default UserAccount;
