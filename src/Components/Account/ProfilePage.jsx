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
  } = useGetUserProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  console.log("User Profile Data:", userProfile);
  if (error) console.error("Error fetching user profile:", error);

  const isAdmin = userProfile?.profile?.user_type === "admin";

  return (
    <div className="bg-neutral-100 dark:bg-gray mx-auto p-4 lg:pb-6 z-50">
      <MainNav />
      <nav className="mb-4">
        <ul className="flex flex-wrap container space-x-4 mx-auto p-2 rounded-md bg-gray-100 md:space-x-6 lg:space-x-8">
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
              to="/profile/orders"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 dark:text-white hover:bg-gray-200"
                }`
              }
            >
              Orders
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
      <Outlet
        context={{
          userProfile: userProfile || null,
          isLoading,
          error: error || null,
          refetch: refetch || null,
        }}
        key={userProfile?.profile?._id || "loading"}
      />
    </div>
  );
}
