import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { useApiWithAuth } from "../../hooks/useApiWithAuth";
import { useAddCategoryMutation } from "../../store/api/productApi"; // Adjust path as needed

const AddCategoryForm = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState(""); // Message state for better user feedback
  useApiWithAuth();

  const [addCategory, { isLoading, isSuccess, isError }] =
    useAddCategoryMutation();

  const handleNameChange = (e) => setName(e.target.value);
  const handleImageChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    try {
      const response = await addCategory(formData).unwrap();
      console.log("Add Category Response:", response);

      if (response?.success) {
        setMessage(
          "Category added successfully! Return to shop to add or edit products."
        );
      } else {
        setMessage("An error occurred while adding the category.");
      }
    } catch (error) {
      console.error("Failed to add category:", error);
      setMessage("Error adding category. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-neutral-600 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">
          Add New Category
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block font-semibold text-black dark:text-white"
            >
              Category Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              className="border rounded px-4 py-2 w-full bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              required
            />
          </div>
          <div>
            <label
              htmlFor="image"
              className="block font-semibold  text-black dark:text-white"
            >
              Category Image
            </label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              className="border rounded px-4 py-2 w-full bg-white dark:bg-white  text-black dark:text-black"
              accept="image/*"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-500"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Category"}
          </button>

          {message && (
            <div className="mt-4">
              <p
                className={`text-sm ${
                  isSuccess ? "text-green-500" : "text-red-500"
                } dark:${isSuccess ? "text-green-400" : "text-red-400"}`}
              >
                {message}
              </p>
              {isSuccess && (
                <Link
                  to="/profile/shop"
                  className="text-blue-500 dark:text-blue-400 underline mt-2 block"
                >
                  Return to shop to add or edit products
                </Link>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddCategoryForm;
