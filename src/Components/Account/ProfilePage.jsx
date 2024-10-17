import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useApiWithAuth } from "../../hooks/useApiWithAuth";
import { useGetUserProfileQuery } from "../../store/api/userApi";
import MainNav from "../Header/MainNav";

export default function ProfilePage() {
  useApiWithAuth();
  const {
    data: userProfile,
    error,
    isLoading,
    refetch,
  } = useGetUserProfileQuery();

  console.log("User Profile Data:", userProfile);
  if (error) console.error("Error fetching user profile:", error);

  const isAdmin = userProfile?.profile?.user_type === "admin";

  return (
    <div className="bg-neutral-100 z-50 dark:bg-gray mx-auto p-4">
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
          {isAdmin && (
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
          )}
        </ul>
      </nav>
      <Outlet context={{ userProfile, isLoading, error, refetch }} />
    </div>
  );
}
