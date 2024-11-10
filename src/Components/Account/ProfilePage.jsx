import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useApiWithAuth } from "../../hooks/useApiWithAuth";
import { useGetUserProfileQuery } from "../../store/api/userApi";

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

  if (error) console.error("Error fetching user profile:", error);

  const isAdmin = userProfile?.profile?.user_type === "admin";

  const NavButton = ({ to, end = false, children }) => (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `px-3 py-2 rounded-md transition-all duration-300 transform hover:scale-105 
        ${
          isActive
            ? "bg-blue-500 text-white shadow-lg animate-navPop"
            : "text-gray-700 dark:text-white hover:bg-gray-200 hover:shadow-md"
        }
        active:scale-95 relative group overflow-hidden`
      }
    >
      {children}
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </NavLink>
  );

  return (
    <div className="bg-neutral-100 dark:bg-gray mx-auto p-4 mt-3 xl:mt-24 lg:pb-6 z-50">
      <nav className="mb-4">
        <ul className="flex flex-wrap container space-x-4 mx-auto p-2 rounded-md bg-gray-100 md:space-x-6 lg:space-x-8  transition-all duration-300 ">
          <li className="transform transition-transform duration-300 hover:-translate-y-0.5">
            <NavButton to="/profile" end>
              Profile Info
            </NavButton>
          </li>
          <li className="transform transition-transform duration-300 hover:-translate-y-0.5">
            <NavButton to="/profile/shop">Shop</NavButton>
          </li>
          <li className="transform transition-transform duration-300 hover:-translate-y-0.5">
            <NavButton to="/profile/orders">Orders</NavButton>
          </li>
          {isAdmin && (
            <li className="transform transition-transform duration-300 hover:-translate-y-0.5">
              <NavButton to="/profile/admin">Admin</NavButton>
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
