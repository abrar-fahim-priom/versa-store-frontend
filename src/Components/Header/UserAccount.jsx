import { Menu, Transition } from "@headlessui/react";
import Cookies from "js-cookie";
import React, { Fragment } from "react";
import { RiLogoutBoxRLine, RiUser6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { userApi } from "../../store/api/userApi";

// Modified ButtonPrimary component
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

  const logout = () => {
    Cookies.remove("_at");
    Cookies.remove("_rt");
    setAuth(null);
    dispatch(userApi.util.invalidateTags(["User"]));
    navigate("/");
  };

  return (
    <div className="pt-1 font-medium">
      <Menu as="div" className="relative inline-block">
        <Menu.Button className="flex items-center gap-2 text-sm">
          <span className="flex items-center justify-center">
            <RiUser6Line className="dark:text-white text-black" size={18} />
          </span>
          {auth && <span>{auth?.user?.fullName}</span>}
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="divide-gray-100 z-20 absolute right-0 mt-2 w-52 origin-top-right divide-y rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none dark:bg-neutral-900">
            <div className="flex flex-col p-6 space-y-2">
              {!auth ? (
                <>
                  <Link to="/login" className="w-full">
                    <ButtonPrimary>
                      <RiUser6Line color="white" size={18} />
                      <span>Log In</span>
                    </ButtonPrimary>
                  </Link>
                  <Link to="/register" className="text-center w-full">
                    <span>Create Account</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/profile" className="w-full">
                    <ButtonPrimary className="bg-green-400 hover:bg-green-500">
                      <span>Profile</span>
                    </ButtonPrimary>
                  </Link>
                  <ButtonPrimary
                    onClick={logout}
                    className="bg-red-600 hover:bg-red-500"
                  >
                    <RiLogoutBoxRLine size={18} />
                    <span>Logout</span>
                  </ButtonPrimary>
                </>
              )}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default UserAccount;
