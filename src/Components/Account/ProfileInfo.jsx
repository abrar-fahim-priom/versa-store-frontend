import React, { useMemo, useState } from "react";
import { FaIdCard, FaMapMarkerAlt, FaStore } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";
import { useUpdateUserProfileMutation } from "../../store/api/userApi";
import ProductCard from "../Products/ProductCard";
import { ProductSkeleton } from "../ui/SkeletonLoaders";
import EditProfileComponent from "./EditProfileComponent";

export default function ProfileInfo() {
  const { userProfile, isLoading, error, refetch } = useOutletContext();
  const [isEditing, setIsEditing] = useState(false);
  const [updateUserProfile] = useUpdateUserProfileMutation();

  if (isLoading) {
    return <ProductSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-4 text-red-500">
        Error loading profile. Please try again later.
      </div>
    );
  }

  if (!userProfile || !userProfile.profile) {
    return (
      <div className="text-center text-xl text-black dark:text-white flex items-center justify-center py-4">
        No user profile data available
      </div>
    );
  }

  const { profile } = userProfile;
  console.log(profile.image);
  const isVendor = profile.user_type === "vendor";

  const handleEditSubmit = async (formData) => {
    try {
      if (Array.from(formData.entries()).length === 0) {
        setIsEditing(false);
        return;
      }
      await updateUserProfile(formData).unwrap();
      setIsEditing(false);
      refetch();
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  if (isEditing) {
    return (
      <EditProfileComponent
        user={{ ...profile, user_type: profile.user_type }}
        onCancel={() => setIsEditing(false)}
        onSubmit={handleEditSubmit}
        currentUserData={userProfile?.profile}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Profile Section */}
        <div className="lg:col-span-4">
          <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg overflow-hidden">
            <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-4 h-32">
              <button
                onClick={() => setIsEditing(true)}
                className="absolute top-4 right-4 hover:text-blue-500 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Edit Profile
              </button>
            </div>

            <div className="relative px-4 pb-8 -mt-16">
              <div className="flex flex-col items-center">
                <ProfileImage
                  src={profile.image}
                  alt={profile.fullName}
                  className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-lg object-cover"
                />
                <h2 className="mt-4 text-2xl font-bold text-gray-800 dark:text-white">
                  {profile.fullName}
                </h2>
                <p className="text-gray-600 dark:text-white">{profile.email}</p>
                <div className="mt-4 inline-block px-4 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm font-semibold">
                  {profile.user_type.charAt(0).toUpperCase() +
                    profile.user_type.slice(1)}
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-200">
                  <span className="text-gray-600 dark:text-white">Phone</span>
                  <span className="font-medium dark:text-white">
                    {profile.phone || "Not provided"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-200">
                  <span className="text-gray-600 dark:text-white">Joined</span>
                  <span className="font-medium dark:text-white">
                    {new Date(profile.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {isVendor && (
                  <>
                    <h3 className="text-xl font-semibold mt-6 mb-4 dark:text-white">
                      Shop Information
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-200">
                        <span className="text-gray-600 dark:text-white flex items-center">
                          <FaStore className="mr-2" /> Shop Name
                        </span>
                        <span className="font-medium dark:text-white">
                          {profile.shopName || "Not provided"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-200">
                        <span className="text-gray-600 dark:text-white flex items-center">
                          <FaIdCard className="mr-2" /> License No
                        </span>
                        <span className="font-medium dark:text-white">
                          {profile.shopLicenseNo || "Not provided"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-200">
                        <span className="text-gray-600 dark:text-white flex items-center">
                          <FaMapMarkerAlt className="mr-2" /> Address
                        </span>
                        <span className="font-medium dark:text-white">
                          {profile.shopAddress || "Not provided"}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Favorites Section */}
        <div className="lg:col-span-8">
          <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">
              Favorite Items
            </h2>
            {profile?.bookmarks?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {profile?.bookmarks?.map((product) => (
                  <div key={product._id} className="w-full">
                    <ProductCard
                      className="w-full h-full transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.02] rounded-lg overflow-hidden"
                      product={product}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-black py-8 bg-gray-50 dark:text-white rounded-lg">
                <p className="text-lg">No favorite items yet</p>
                <p className="text-sm mt-2">
                  Items you bookmark will appear here
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const ProfileImage = ({ src, alt, className }) => {
  const [imageError, setImageError] = useState(false);

  // Process Google Image URL with updated pattern matching
  const processedImageUrl = useMemo(() => {
    if (!src) return null;

    // Check if it's a Google profile image URL
    if (src.includes("googleusercontent.com")) {
      // Handle the new format: remove size constraint and =s96-c
      const baseUrl = src.split("=")[0]; // Get the URL part before the parameters
      return `${baseUrl}`;
    }

    return src;
  }, [src]);

  // Fallback initials generator
  const getInitials = () => {
    if (!alt) return "?";
    return alt
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (imageError || !processedImageUrl) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white text-2xl font-bold ${className}`}
        role="img"
        aria-label={alt}
      >
        {getInitials()}
      </div>
    );
  }

  return (
    <img
      src={processedImageUrl}
      alt={alt}
      className={className}
      onError={() => setImageError(true)}
      loading="lazy"
      referrerPolicy="no-referrer"
    />
  );
};
