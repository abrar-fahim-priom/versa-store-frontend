import { Dialog, Transition } from "@headlessui/react";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaIdCard,
  FaImage,
  FaMapMarkerAlt,
  FaPhone,
  FaStore,
  FaUser,
} from "react-icons/fa";
import Field from "../Common/Field";
import { ProfileImage } from "./ProfileInfo";

const EditProfileComponent = ({
  user,
  onCancel,
  onSubmit: onSubmitProp,
  currentUserData,
}) => {
  const [previewImage, setPreviewImage] = useState(user.image);
  const [previewShopPhoto, setPreviewShopPhoto] = useState(user.shopPhoto);
  const fileInputRef = useRef(null);
  const shopPhotoInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const isVendor = user.user_type === "vendor";

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    defaultValues: {
      fullName: user.fullName,
      phone: user.phone || "",
      shopName: user.shopName || "",
      shopLicenseNo: user.shopLicenseNo || "",
      shopType: user.shopType || "",
      shopAddress: user.shopAddress || "",
    },
  });

  const handleImageChange = (e, setPreviewFunc) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewFunc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    const formData = new FormData();

    // Only append changed fields
    if (dirtyFields.fullName && data.fullName !== currentUserData?.fullName) {
      formData.append("fullName", data.fullName);
    }
    if (dirtyFields.phone && data.phone !== currentUserData?.phone) {
      formData.append("phone", data.phone);
    }

    if (fileInputRef.current && fileInputRef.current.files[0]) {
      formData.append("image", fileInputRef.current.files[0]);
    }

    if (isVendor) {
      if (dirtyFields.shopName && data.shopName !== currentUserData?.shopName) {
        formData.append("shopName", data.shopName);
      }
      if (
        dirtyFields.shopLicenseNo &&
        data.shopLicenseNo !== currentUserData?.shopLicenseNo
      ) {
        formData.append("shopLicenseNo", data.shopLicenseNo);
      }
      if (dirtyFields.shopType && data.shopType !== currentUserData?.shopType) {
        formData.append("shopType", data.shopType);
      }
      if (
        dirtyFields.shopAddress &&
        data.shopAddress !== currentUserData?.shopAddress
      ) {
        formData.append("shopAddress", data.shopAddress);
      }
      if (shopPhotoInputRef.current && shopPhotoInputRef.current.files[0]) {
        formData.append("shopPhoto", shopPhotoInputRef.current.files[0]);
      }
    }

    try {
      // Submit only if there are changes
      if (Array.from(formData.entries()).length > 0) {
        await onSubmitProp(formData);
        setDialogMessage("Profile updated successfully!");
      } else {
        setDialogMessage("No changes made.");
      }
    } catch (error) {
      setDialogMessage("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
      setIsDialogOpen(true);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Edit Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <ProfileImage
              src={previewImage}
              alt="profile image"
              className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-lg object-cover"
            />
            <label
              htmlFor="image"
              className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors"
            >
              <FaImage className="w-5 h-5" />
              <input
                type="file"
                id="image"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => handleImageChange(e, setPreviewImage)}
              />
            </label>
          </div>
        </div>

        {/* Common Fields */}
        <Field
          label="Full Name"
          error={errors.fullName}
          icon={<FaUser className="text-gray-400" />}
        >
          <input
            type="text"
            {...register("fullName", { required: "Full name is required" })}
            className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </Field>

        <Field
          label="Phone"
          error={errors.phone}
          icon={<FaPhone className="text-gray-400" />}
        >
          <input
            type="tel"
            {...register("phone")}
            className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </Field>

        {/* Vendor-specific Fields */}
        {isVendor && (
          <>
            <Field
              label="Shop Name"
              error={errors.shopName}
              icon={<FaStore className="text-gray-400" />}
            >
              <input
                type="text"
                {...register("shopName", { required: "Shop name is required" })}
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </Field>

            <Field
              label="Shop License No"
              error={errors.shopLicenseNo}
              icon={<FaIdCard className="text-gray-400" />}
            >
              <input
                type="text"
                {...register("shopLicenseNo", {
                  required: "Shop license number is required",
                })}
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </Field>

            <Field
              label="Shop Type"
              error={errors.shopType}
              icon={<FaStore className="text-gray-400" />}
            >
              <input
                type="text"
                {...register("shopType", { required: "Shop type is required" })}
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </Field>

            <Field
              label="Shop Address"
              error={errors.shopAddress}
              icon={<FaMapMarkerAlt className="text-gray-400" />}
            >
              <input
                type="text"
                {...register("shopAddress", {
                  required: "Shop address is required",
                })}
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </Field>

            {/* Shop Photo */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <img
                  src={previewShopPhoto}
                  alt="Shop"
                  className="w-32 h-32 rounded-lg object-cover"
                />
                <label
                  htmlFor="shopPhoto"
                  className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors"
                >
                  <FaImage className="w-5 h-5" />
                  <input
                    type="file"
                    id="shopPhoto"
                    ref={shopPhotoInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, setPreviewShopPhoto)}
                  />
                </label>
              </div>
            </div>
          </>
        )}

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 dark:text-white text-gray-700 rounded hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 rounded transition-colors ${
              isLoading
                ? "bg-gray-400"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>

      {/* Success/Error Dialog */}
      <Transition show={isDialogOpen}>
        <Dialog
          onClose={() => setIsDialogOpen(false)}
          className="fixed z-10 inset-0 flex items-center justify-center"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <div className="relative bg-white dark:bg-neutral-900 rounded-lg p-6 max-w-sm mx-auto text-center shadow-lg">
            <Dialog.Title className="text-lg font-semibold dark:text-white">
              {dialogMessage}
            </Dialog.Title>
            <button
              onClick={() => setIsDialogOpen(false)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              OK
            </button>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default EditProfileComponent;
