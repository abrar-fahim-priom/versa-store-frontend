import React, { useState } from "react";
import EditProfileComponent from "./EditProfileComponent";

export default function ProfileInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    _id: "66d1af8ddc71d98e3a51c815",
    fullName: "Mr. Admin",
    email: "admin@gmail.com",
    phone: "+1 234 567 8900",
    loginMethod: "form",
    image:
      "https://res.cloudinary.com/hostingimagesservice/image/upload/v1725183648/versaShop/image-1725183646373_ouhavy.jpg",
    user_type: "admin",
    createdAt: "2024-08-30T10:35:35.060Z",
    updatedAt: "2024-09-05T12:57:07.417Z",
    imageKey: "versaShop/image-1725183646373_ouhavy",
  });

  const handleEditSubmit = async (formData) => {
    // Here you would typically make an API call to update the user profile
    // For now, we'll just update the local state
    const updatedUser = {
      ...user,
      fullName: formData.get("fullName"),
      phone: formData.get("phone"),
    };

    if (formData.get("image")) {
      // In a real app, you'd handle image upload here
      // updatedUser.image = URL.createObjectURL(formData.get('image'));
    }

    setUser(updatedUser);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <EditProfileComponent
        user={user}
        onCancel={() => setIsEditing(false)}
        onSubmit={handleEditSubmit}
      />
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-4 h-32">
        <button
          onClick={() => setIsEditing(true)}
          className="absolute top-4 right-4 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          Edit
        </button>
      </div>

      <div className="relative px-4 pb-8 -mt-16">
        <div className="flex flex-col items-center">
          <img
            src={user.image}
            alt={user.fullName}
            className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-lg object-cover"
          />
          <h2 className="mt-4 text-2xl font-bold text-gray-800 dark:text-white">
            {user.fullName}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
          <div className="mt-4 inline-block px-4 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm font-semibold">
            {user.user_type.charAt(0).toUpperCase() + user.user_type.slice(1)}
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
            <span className="text-gray-600 dark:text-gray-400">Phone</span>
            <span className="font-medium dark:text-white">{user.phone}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
            <span className="text-gray-600 dark:text-gray-400">
              Login Method
            </span>
            <span className="font-medium dark:text-white">
              {user.loginMethod}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
            <span className="text-gray-600 dark:text-gray-400">Joined</span>
            <span className="font-medium dark:text-white">
              {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
