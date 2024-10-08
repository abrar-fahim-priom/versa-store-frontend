import { Menu, Transition } from "@headlessui/react";
import Cookies from "js-cookie";
import React, { Fragment } from "react";
import { RiLogoutBoxRLine, RiUser6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth"; // Add this import

import { useNavigate } from "react-router-dom";

// You can replace this with your button component or use a regular button
const ButtonPrimary = ({ href, children }) => (
  <a
    href={href}
    className="flex items-center justify-center gap-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-500"
  >
    {children}
  </a>
);

const UserAccount = () => {
  const { auth, setAuth } = useAuth(); // Add this line to get the user
  console.log(auth);
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove("_at");
    Cookies.remove("_rt");
    setAuth(null);
    navigate("/");
  };

  return (
    <div className="pt-1 font-medium">
      <Menu as="div" className="relative inline-block">
        <Menu.Button className="flex items-center gap-2 text-sm">
          <span className="flex items-center justify-center">
            <RiUser6Line className="dark:text-white text-black" size={18} />
          </span>
          {auth && <span>{auth?.user?.fullName}</span>}{" "}
          {/* Add this line to display the user's name */}
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
            <div className="flex flex-col p-6">
              <Link to={`/login`}>
                <ButtonPrimary>
                  <RiUser6Line color="white" size={18} />
                  <span>Log In</span>
                </ButtonPrimary>
              </Link>
              <a href="/account/signup" className="mt-2 text-center">
                <Link to={`/register`}>
                  <span>Create Account</span>
                </Link>
              </a>

              <Link to={`/profile`}>
                <ButtonPrimary className="bg-green-400">
                  <span>Profile</span>
                </ButtonPrimary>
              </Link>
              {auth && (
                <button
                  onClick={logout}
                  className="mt-2 flex items-center justify-center gap-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-500"
                >
                  <RiLogoutBoxRLine size={18} />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default UserAccount;
