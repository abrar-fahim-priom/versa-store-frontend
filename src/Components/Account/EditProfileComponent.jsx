import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaImage, FaPhone, FaUser } from "react-icons/fa";
import Field from "../Common/Field";

const EditProfileComponent = ({ user, onCancel, onSubmit: onSubmitProp }) => {
  const [previewImage, setPreviewImage] = useState(user.image);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: user.fullName,
      phone: user.phone || "",
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("phone", data.phone);
    if (data.image[0]) {
      formData.append("image", data.image[0]);
    }
    onSubmitProp(formData);
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Edit Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              src={previewImage}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover"
            />
            <label
              htmlFor="image"
              className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors"
            >
              <FaImage className="w-5 h-5" />
              <input
                type="file"
                id="image"
                className="hidden"
                accept="image/*"
                {...register("image")}
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>

        <Field label="Full Name" error={errors.fullName} htmlFor="fullName">
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              {...register("fullName", {
                required: "Full name is required",
              })}
              type="text"
              id="fullName"
              className="w-full rounded-sm h-12 pl-10 pr-4 py-3 dark:text-white border-neutral-300 dark:border-neutral-600 bg-transparent placeholder:text-neutral-500 focus:border-primary dark:placeholder:text-neutral-300 dark:focus:border-neutral-500"
            />
          </div>
        </Field>

        <Field label="Phone Number" error={errors.phone} htmlFor="phone">
          <div className="relative">
            <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              {...register("phone", {
                pattern: {
                  value: /^[0-9+\-\s()]*$/,
                  message: "Invalid phone number",
                },
              })}
              type="tel"
              id="phone"
              className="w-full rounded-sm h-12 pl-10 pr-4 py-3 dark:text-white border-neutral-300 dark:border-neutral-600 bg-transparent placeholder:text-neutral-500 focus:border-primary dark:placeholder:text-neutral-300 dark:focus:border-neutral-500"
            />
          </div>
        </Field>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileComponent;
