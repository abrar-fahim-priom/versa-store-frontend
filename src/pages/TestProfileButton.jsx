import React from "react";
import { useApiWithAuth } from "../hooks/useApiWithAuth";
import { useGetUserProfileQuery } from "../store/api/userApi";

const TestProfileButton = () => {
  const {
    data: userProfile,
    error,
    isLoading,
    refetch,
  } = useGetUserProfileQuery();

  useApiWithAuth();

  console.log("User Profile Data:", userProfile);
  console.log("Error:", error);
  console.log("Is Loading:", isLoading);

  const handleClick = () => {
    refetch();
  };

  if (isLoading) {
    return <div>Loading user profile...</div>;
  }

  if (error) {
    return <div>Error loading profile: {JSON.stringify(error, null, 2)}</div>;
  }

  return (
    <div>
      <button
        onClick={handleClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Refresh User Profile
      </button>
      {userProfile ? (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">User Profile</h2>
          <p>
            <strong>Name:</strong> {userProfile?.profile?.fullName || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {userProfile?.profile?.email || "N/A"}
          </p>
          <p>
            <strong>User Type:</strong>{" "}
            {userProfile?.profile?.user_type || "N/A"}
          </p>
          <pre>{JSON.stringify(userProfile, null, 2)}</pre>
        </div>
      ) : (
        <div>No user profile data available</div>
      )}
    </div>
  );
};

export default TestProfileButton;
