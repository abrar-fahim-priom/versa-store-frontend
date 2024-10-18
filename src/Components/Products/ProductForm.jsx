import { Combobox } from "@headlessui/react";
import React, { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  FaBox,
  FaBoxOpen,
  FaChevronDown,
  FaDollarSign,
  FaFileAlt,
  FaImage,
  FaPalette,
  FaPercent,
  FaTags,
} from "react-icons/fa";
// import { useApiWithAuth } from "../../hooks/useApiWithAuth";
import {
  useCreateProductMutation,
  useGetCategoriesQuery,
} from "../../store/api/productApi";
import Field from "../Common/Field";

export default function ProductForm() {
  // useApiWithAuth();
  const {
    data,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useGetCategoriesQuery();

  const [
    createProduct,
    { isLoading: isCreating, isError: createError, isSuccess: createSuccess },
  ] = useCreateProductMutation();

  // Extract categories from the response
  const categories = data?.categories || [];

  const [query, setQuery] = useState("");
  const [variants, setVariants] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      discount: "",
      brand: "",
      stock: "",
      category: null, // Change this to null initially
      type: "",
      variants: [],
      defaultType: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const watchVariants = watch("variants");
  const watchType = watch("type");
  const watchDefaultType = watch("defaultType");

  const filteredCategories =
    query === ""
      ? categories
      : categories.filter((category) =>
          category.name.toLowerCase().includes(query.toLowerCase())
        );

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + selectedImages.length > 5) {
      alert(
        "You can only select up to 5 images. Only the first 5 will be kept."
      );
      const combinedFiles = [...selectedImages, ...files];
      setSelectedImages(combinedFiles.slice(0, 5));
    } else {
      setSelectedImages((prev) => [...prev, ...files]);
    }
  };

  const removeImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const addVariant = () => {
    append({ type: "", price: "", description: "" });
  };

  const removeVariant = (index) => {
    remove(index);
    if (watchVariants.length === 1) {
      setValue("defaultType", "");
    }
  };

  const [serverErrors, setServerErrors] = useState({});

  const onError = (errors) => {
    console.log("Form validation failed!");
    console.log("Validation errors:", errors);
  };

  const inputClasses =
    "w-full rounded-sm h-12 pl-10 pr-4 py-3 border-2 border-blue-100 bg-transparent placeholder:text-neutral-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200";
  const iconClasses =
    "absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500";

  const onSubmit = async (data) => {
    console.log("Raw form data:", data);

    const formData = new FormData();

    // Append basic product information
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("discount", data.discount.toString());
    formData.append("brand", data.brand);
    formData.append("stock", data.stock.toString());
    formData.append("category", data.category);
    formData.append("type", data.type);

    // Handle variants
    if (data.variants && data.variants.length > 0) {
      formData.append("variant", JSON.stringify(data.variants));
      formData.append("defaultType", data.defaultType);
    } else {
      formData.append("defaultType", data.type);
    }

    // Append images
    selectedImages.forEach((image, index) => {
      formData.append("images", image);
    });

    // Log FormData contents
    console.log("FormData contents:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value instanceof File ? value.name : value}`);
    }

    try {
      const response = await createProduct(formData).unwrap();
      console.log("Product created successfully:", response);
    } catch (err) {
      console.error("Failed to create product:", err);
      console.error("Error details:", JSON.stringify(err, null, 2));
      if (err.data && err.data.errors) {
        const errors = {};
        err.data.errors.forEach((error) => {
          errors[error.path] = error.msg;
        });
        setServerErrors(errors);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="max-w-2xl mx-auto p-6"
    >
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Add New Product</h2>

      <Field
        label="Product Name"
        error={errors.name || serverErrors.name}
        htmlFor="name"
      >
        <div className="relative">
          <FaBox className={iconClasses} />
          <input
            {...register("name", { required: "Product name is required" })}
            type="text"
            id="name"
            placeholder="Enter product name"
            className={inputClasses}
          />
        </div>
      </Field>

      <Field
        label="Description"
        error={errors.description || serverErrors.description}
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
            placeholder="Enter product description"
            className={`${inputClasses} h-auto pt-3`}
          />
        </div>
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field
          label="Price"
          error={errors.price || serverErrors.price}
          htmlFor="price"
        >
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
              placeholder="0.00"
              className={inputClasses}
            />
          </div>
        </Field>

        <Field
          label="Discount (%)"
          error={errors.discount || serverErrors.discount}
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
              placeholder="0.00"
              className={inputClasses}
            />
          </div>
        </Field>
      </div>

      <Field
        label="Category"
        error={errors.category || serverErrors.category}
        htmlFor="category"
      >
        <Controller
          control={control}
          name="category"
          rules={{ required: "Category is required" }}
          render={({ field }) => (
            <Combobox
              value={categories.find((cat) => cat._id === field.value) || null}
              onChange={(selectedCategory) => {
                field.onChange(selectedCategory._id);
                setQuery(""); // Clear the query after selection
              }}
            >
              <div className="relative">
                <FaTags className={iconClasses} />
                <Combobox.Input
                  className={`${inputClasses} pr-10`}
                  displayValue={(category) => category?.name || ""}
                  onChange={(event) => setQuery(event.target.value)}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <FaChevronDown
                    className="h-5 w-5 text-blue-500"
                    aria-hidden="true"
                  />
                </Combobox.Button>
                <Combobox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {categoriesLoading ? (
                    <div className="px-4 py-2 text-gray-700">
                      Loading categories...
                    </div>
                  ) : categoriesError ? (
                    <div className="px-4 py-2 text-red-500">
                      Error loading categories
                    </div>
                  ) : filteredCategories.length === 0 ? (
                    <div className="px-4 py-2 text-gray-700">
                      No categories found
                    </div>
                  ) : (
                    filteredCategories.map((category) => (
                      <Combobox.Option
                        key={category._id}
                        value={category}
                        className={({ active }) =>
                          `${
                            active ? "text-white bg-blue-600" : "text-gray-900"
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
                    ))
                  )}
                </Combobox.Options>
              </div>
            </Combobox>
          )}
        />
      </Field>

      <Field
        label="Images"
        error={errors.images || serverErrors.images}
        htmlFor="images"
      >
        <div className="relative">
          <FaImage className={iconClasses} />
          <input
            type="file"
            id="images"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className={`${inputClasses} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100`}
          />
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedImages.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(image)}
                alt={`Selected ${index + 1}`}
                className="w-20 h-20 object-cover rounded"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </Field>

      <Field
        label="Brand"
        error={errors.brand || serverErrors.brand}
        htmlFor="brand"
      >
        <div className="relative">
          <FaTags className={iconClasses} />
          <input
            {...register("brand", { required: "Brand is required" })}
            type="text"
            id="brand"
            placeholder="Enter brand name"
            className={inputClasses}
          />
        </div>
      </Field>

      <Field
        label="Stock"
        error={errors.stock || serverErrors.stock}
        htmlFor="stock"
      >
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
            placeholder="Enter stock quantity"
            className={inputClasses}
          />
        </div>
      </Field>

      <Field
        label="Type"
        error={errors.type || serverErrors.type}
        htmlFor="type"
      >
        <div className="relative">
          <FaPalette className={iconClasses} />
          <input
            {...register("type", { required: "Type is required" })}
            type="text"
            id="type"
            placeholder="Enter product type"
            className={inputClasses}
          />
        </div>
      </Field>

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
                onClick={() => removeVariant(index)}
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
                    placeholder="e.g., White"
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
                    placeholder="0.00"
                    className={inputClasses}
                  />
                </div>
              </Field>
            </div>
            <Field label="Description" htmlFor={`variant-description-${index}`}>
              <div className="relative">
                <FaFileAlt className="absolute left-3 top-3 text-blue-500" />
                <textarea
                  {...register(`variants.${index}.description`, {
                    required: "Description is required",
                  })}
                  id={`variant-description-${index}`}
                  rows={3}
                  placeholder="Enter variant description"
                  className={`${inputClasses} h-auto pt-3`}
                />
              </div>
            </Field>
          </div>
        ))}
        <button
          type="button"
          onClick={addVariant}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Add Variant
        </button>
      </div>

      {watchVariants.length > 0 && (
        <Field
          label="Select Default Type"
          error={errors.defaultType || serverErrors.defaultType}
        >
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
      )}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition-colors"
        disabled={isCreating}
      >
        {isCreating ? "Creating Product..." : "Add Product"}
      </button>

      {createSuccess && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded">
          Product created successfully!
        </div>
      )}

      {createError && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          Error creating product. Please check the form and try again.
        </div>
      )}

      {/* Debug section */}
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h3 className="font-bold mb-2">Debug Info:</h3>
        <pre className="whitespace-pre-wrap">
          {JSON.stringify({ errors, watchVariants, serverErrors }, null, 2)}
        </pre>
      </div>
    </form>
  );
}
