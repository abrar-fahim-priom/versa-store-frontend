import { Combobox } from "@headlessui/react";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  FaBox,
  FaBoxOpen,
  FaDollarSign,
  FaFileAlt,
  FaImage,
  FaPalette,
  FaPercent,
  FaTags,
  FaTrash,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import {
  useDeleteProductImageMutation,
  useEditProductMutation,
  useGetCategoriesQuery,
} from "../../store/api/productApi";
import Field from "../Common/Field";

const iconClasses =
  "absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500";
const inputClasses =
  "w-full pl-10 pr-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50";

const ProductEditForm = ({ product, onCancel, onSubmitSuccess }) => {
  const [editProduct, { isLoading: isEditing }] = useEditProductMutation();
  const { data: categoriesData } = useGetCategoriesQuery();
  const categories = categoriesData?.categories || [];

  const [previewImages, setPreviewImages] = useState(product?.images || []);
  const fileInputRef = useRef(null);
  const [query, setQuery] = useState("");

  const [deleteProductImage] = useDeleteProductImageMutation();

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors, dirtyFields },
  } = useForm({
    defaultValues: product
      ? {
          ...product,
          category:
            categories.find((cat) => cat._id === product.category._id) || null,
        }
      : {},
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const watchVariants = watch("variants") || [];
  const watchType = watch("defaultType");

  useEffect(() => {
    if (product && categories.length > 0) {
      reset({
        name: product.name,
        description: product.description,
        price: product.price,
        discount: product.discount,
        brand: product.brand,
        stock: product.stock,
        category: product.category._id,
        defaultType: product.defaultType,
        variants: product.variant || [],
      });
      setPreviewImages(product.images || []);
      console.log("Product data for editing:", product);
    }
  }, [product, categories, reset]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setPreviewImages((prev) => [...prev, ...files].slice(0, 5));
  };

  const removeImage = async (index) => {
    const image = previewImages[index];
    if (typeof image === "string" || image.url) {
      // This is an existing image, so we need to remove it from the server
      try {
        const imageId = image._id || image.split("/").pop();
        await deleteProductImage({ productId: product._id, imageId }).unwrap();
        console.log("Image deleted successfully");
      } catch (err) {
        console.error("Failed to delete image:", err);
      }
    }
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Append only the necessary fields
    const fieldsToSend = [
      "name",
      "description",
      "price",
      "discount",
      "brand",
      "stock",
      "category",
      "defaultType",
    ];

    fieldsToSend.forEach((key) => {
      if (data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });

    // Handle variants
    if (data.variants && data.variants.length > 0) {
      formData.append("variant", JSON.stringify(data.variants));
    }

    // Handle images
    previewImages.forEach((image, index) => {
      if (image instanceof File) {
        formData.append("images", image);
      } else if (typeof image === "string" || image.url) {
        formData.append("existingImages", image.url || image);
      }
    });

    try {
      console.log("Sending data to editProduct:", Object.fromEntries(formData));
      await editProduct({ id: product._id, formData }).unwrap();
      onSubmitSuccess();
    } catch (err) {
      console.error("Failed to edit product:", err);
    }
  };

  const filteredCategories =
    query === ""
      ? categories
      : categories.filter((category) =>
          category.name.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Edit Product</h2>

      {product ? (
        <>
          {/* Product Name */}
          <Field label="Product Name" error={errors.name} htmlFor="name">
            <div className="relative">
              <FaBox className={iconClasses} />
              <input
                {...register("name", { required: "Product name is required" })}
                type="text"
                id="name"
                className={inputClasses}
              />
            </div>
          </Field>

          {/* Description */}
          <Field
            label="Description"
            error={errors.description}
            htmlFor="description"
          >
            <div className="relative">
              <FaFileAlt className="absolute left-3 top-3 text-blue-500" />
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                id="description"
                rows={4}
                className={`${inputClasses} h-auto pt-3`}
              />
            </div>
          </Field>

          {/* Price and Discount */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Price" error={errors.price} htmlFor="price">
              <div className="relative">
                <FaDollarSign className={iconClasses} />
                <input
                  {...register("price", {
                    required: "Price is required",
                    pattern: {
                      value: /^\d+(\.\d{1,2})?$/,
                      message: "Please enter a valid price",
                    },
                  })}
                  type="number"
                  step="0.01"
                  id="price"
                  className={inputClasses}
                />
              </div>
            </Field>

            <Field
              label="Discount (%)"
              error={errors.discount}
              htmlFor="discount"
            >
              <div className="relative">
                <FaPercent className={iconClasses} />
                <input
                  {...register("discount", {
                    pattern: {
                      value: /^\d+(\.\d{1,2})?$/,
                      message: "Please enter a valid discount",
                    },
                  })}
                  type="number"
                  step="0.01"
                  id="discount"
                  className={inputClasses}
                />
              </div>
            </Field>
          </div>

          {/* Category */}
          <Field label="Category" error={errors.category} htmlFor="category">
            <Controller
              control={control}
              name="category"
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <Combobox
                  value={
                    categories.find((cat) => cat._id === field.value) || null
                  }
                  onChange={(selectedCategory) => {
                    field.onChange(selectedCategory._id);
                    setQuery("");
                  }}
                >
                  <div className="relative">
                    <FaTags className={iconClasses} />
                    <Combobox.Input
                      className={`${inputClasses} pr-10`}
                      displayValue={(category) => category?.name || ""}
                      onChange={(event) => setQuery(event.target.value)}
                    />
                    <Combobox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {filteredCategories.map((category) => (
                        <Combobox.Option
                          key={category._id}
                          value={category}
                          className={({ active }) =>
                            `${
                              active
                                ? "text-white bg-blue-600"
                                : "text-gray-900"
                            } cursor-default select-none relative py-2 pl-10 pr-4`
                          }
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {category.name}
                              </span>
                              {selected && (
                                <span
                                  className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                    active ? "text-white" : "text-blue-600"
                                  }`}
                                >
                                  <FaTags
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              )}
                            </>
                          )}
                        </Combobox.Option>
                      ))}
                    </Combobox.Options>
                  </div>
                </Combobox>
              )}
            />
          </Field>

          <div className="px-4 py-2  text-black dark:text-white rounded ">
            Not seeing your desired category here ?
            <Link to="/addCategory" className="text-sky-600 underline">
              Add Category
            </Link>
          </div>

          {/* Images */}
          <Field label="Images" error={errors.images} htmlFor="images">
            <div className="relative">
              <FaImage className={iconClasses} />
              <input
                type="file"
                id="images"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                className={`${inputClasses} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100`}
              />
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {previewImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={
                      image instanceof File
                        ? URL.createObjectURL(image)
                        : image.url || image
                    }
                    alt={`Selected ${index + 1}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                    data-tooltip-id={`remove-image-${index}`}
                    data-tooltip-content="Remove image"
                  >
                    <FaTrash className="w-3 h-3" />
                  </button>
                  <Tooltip id={`remove-image-${index}`} />
                </div>
              ))}
            </div>
          </Field>

          {/* Brand */}
          <Field label="Brand" error={errors.brand} htmlFor="brand">
            <div className="relative">
              <FaTags className={iconClasses} />
              <input
                {...register("brand", { required: "Brand is required" })}
                type="text"
                id="brand"
                className={inputClasses}
              />
            </div>
          </Field>

          {/* Stock */}
          <Field label="Stock" error={errors.stock} htmlFor="stock">
            <div className="relative">
              <FaBoxOpen className={iconClasses} />
              <input
                {...register("stock", {
                  required: "Stock is required",
                  pattern: {
                    value: /^\d+$/,
                    message: "Please enter a valid number",
                  },
                })}
                type="number"
                id="stock"
                className={inputClasses}
              />
            </div>
          </Field>

          {/* Default Type */}
          <Field
            label="Default Type"
            error={errors.defaultType}
            htmlFor="defaultType"
          >
            <div className="relative">
              <FaPalette className={iconClasses} />
              <input
                {...register("defaultType", {
                  required: "Default Type is required",
                })}
                type="text"
                id="defaultType"
                className={inputClasses}
              />
            </div>
          </Field>

          {/* Variants */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-blue-600">
              Variants
            </label>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="mb-4 p-4 border-2 border-blue-100 rounded relative"
              >
                <div className="flex justify-between mb-2">
                  <h4 className="text-blue-600">Variant {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Type" htmlFor={`variant-type-${index}`}>
                    <div className="relative">
                      <FaPalette className={iconClasses} />
                      <input
                        {...register(`variants.${index}.type`, {
                          required: "Type is required",
                        })}
                        type="text"
                        id={`variant-type-${index}`}
                        className={inputClasses}
                      />
                    </div>
                  </Field>
                  <Field label="Price" htmlFor={`variant-price-${index}`}>
                    <div className="relative">
                      <FaDollarSign className={iconClasses} />
                      <input
                        {...register(`variants.${index}.price`, {
                          required: "Price is required",
                          pattern: {
                            value: /^\d+(\.\d{1,2})?$/,
                            message: "Please enter a valid price",
                          },
                        })}
                        type="number"
                        step="0.01"
                        id={`variant-price-${index}`}
                        className={inputClasses}
                      />
                    </div>
                  </Field>
                </div>
                <Field
                  label="Description"
                  htmlFor={`variant-description-${index}`}
                >
                  <div className="relative">
                    <FaFileAlt className="absolute left-3 top-3 text-blue-500" />
                    <textarea
                      {...register(`variants.${index}.description`, {
                        required: "Description is required",
                      })}
                      id={`variant-description-${index}`}
                      rows={3}
                      className={`${inputClasses} h-auto pt-3`}
                    />
                  </div>
                </Field>
              </div>
            ))}
            <button
              type="button"
              onClick={() => append({ type: "", price: "", description: "" })}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Add Variant
            </button>
          </div>

          {/* Select Default Type */}
          <Field label="Select Default Type" error={errors.defaultType}>
            <div className="space-y-2">
              <div>
                <input
                  type="radio"
                  id="mainType"
                  value={watchType}
                  {...register("defaultType", {
                    required: "Default type is required",
                  })}
                  className="mr-2"
                />
                <label htmlFor="mainType">{watchType}</label>
              </div>
              {watchVariants.map((variant, index) => (
                <div key={index}>
                  <input
                    type="radio"
                    id={`variantType${index}`}
                    value={variant.type}
                    {...register("defaultType", {
                      required: "Default type is required",
                    })}
                    className="mr-2"
                  />
                  <label htmlFor={`variantType${index}`}>{variant.type}</label>
                </div>
              ))}
            </div>
          </Field>
        </>
      ) : (
        <div>Loading product data...</div>
      )}

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          disabled={isEditing || !product}
        >
          {isEditing ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default ProductEditForm;
