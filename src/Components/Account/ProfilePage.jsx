import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import MainNav from "../Header/MainNav";

export default function ProfilePage() {
  return (
    <div className=" bg-neutral-100 z-50 dark:bg-gray mx-auto p-4">
      <MainNav />
      <nav className="mb-4">
        <ul className="flex container space-x-4 mx-10 bg-gray-100 p-2 rounded-md">
          <li>
            <NavLink
              to="/profile"
              end
              className={({ isActive }) =>
                `px-3 py-2 rounded-md ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 dark:text-white hover:bg-gray-200"
                }`
              }
            >
              Profile Info
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile/shop"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 dark:text-white hover:bg-gray-200"
                }`
              }
            >
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile/admin"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 dark:text-white hover:bg-gray-200"
                }`
              }
            >
              Admin
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
