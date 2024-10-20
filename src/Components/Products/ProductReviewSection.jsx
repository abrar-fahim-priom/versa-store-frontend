import React, { useState } from "react";
import { FaStar, FaTimes, FaUser } from "react-icons/fa";
import { useApiWithAuth } from "../../hooks/useApiWithAuth";
import useAuth from "../../hooks/useAuth";
import {
  useDeleteProductReviewMutation,
  useGetProductReviewsQuery,
  usePostProductReviewMutation,
} from "../../store/api/productApi";

const StarRating = ({ rating, size, onRatingChange }) => (
  <div
    className={`flex items-center ${
      size === "sm" ? "text-sm" : size === "lg" ? "text-3xl" : "text-base"
    }`}
  >
    {[1, 2, 3, 4, 5].map((star) => (
      <FaStar
        key={star}
        className={`cursor-pointer ${
          star <= rating ? "text-yellow-400" : "text-slate-300"
        }`}
        onClick={() => onRatingChange(Number(star))}
      />
    ))}
  </div>
);

const ProductReviewSection = ({ productId }) => {
  const { auth } = useAuth();
  const loggedInUserId = auth?.user?._id;
  const {
    data: reviewsData,
    error: reviewsError,
    isLoading: reviewsLoading,
    refetch,
  } = useGetProductReviewsQuery(productId);
  const [postProductReview] = usePostProductReviewMutation();
  const [deleteProductReview] = useDeleteProductReviewMutation(); // Add delete mutation

  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  useApiWithAuth();

  const handleSubmitReview = async () => {
    try {
      const response = await postProductReview({
        productId,
        reviewData: {
          rating: Number(rating),
          review: reviewText,
        },
      });

      if (response?.data?.success) {
        alert("Review submitted successfully!");
        await refetch();
        setRating(0);
        setReviewText("");
      } else {
        alert(response?.data?.message || "Failed to submit review");
      }
    } catch (error) {
      alert(
        error?.data?.message || "Failed to submit review. Please try again."
      );
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      const response = await deleteProductReview(reviewId);

      if (response?.data?.success) {
        alert("Review deleted successfully!");
        await refetch(); // Refresh the reviews list
      } else {
        alert(response?.data?.message || "Failed to delete review");
      }
    } catch (error) {
      alert(
        error?.data?.message || "Failed to delete review. Please try again."
      );
    }
  };

  if (reviewsLoading) return <div>Loading reviews...</div>;
  if (reviewsError) return <div>Error loading reviews</div>;

  const reviews = reviewsData?.reviews || [];

  return (
    <div className="py-12 px-4 md:px-6 2xl:px-0 2xl:container 2xl:mx-auto">
      <div className="flex flex-col justify-start items-start w-full space-y-8">
        <h2 className="text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-white">
          Reviews
        </h2>

        <div className="w-full bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-medium text-gray-800 dark:text-white mb-4">
            Write a Review
          </h3>
          <StarRating rating={rating} size="lg" onRatingChange={setRating} />
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="w-full p-2 mt-4 border rounded-md dark:bg-gray-700 dark:text-white"
            placeholder="Write your review here..."
            rows={4}
          />
          <button
            onClick={handleSubmitReview}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Submit Review
          </button>
        </div>

        {reviews.map((review) => (
          <div
            key={review._id}
            className="w-full dark:bg-gray-800 py-3 rounded-lg"
          >
            {loggedInUserId === review.userId?._id && (
              <button
                onClick={() => handleDeleteReview(review._id)}
                className="ml-auto text-gray-400 bg-red-300 rounded-md text-xs text-white hover:text-red-500"
                aria-label="Delete review"
              >
                <div className="flex flex-row gap-2 items-center">
                  <FaTimes />
                  Delete Review
                </div>
              </button>
            )}
            <div className="flex items-center space-x-4 mb-4">
              {review.userId?.image ? (
                <img
                  src={review.userId.image}
                  alt="User avatar"
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <FaUser className="w-10 h-10 text-gray-400" />
              )}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {review.userId?.name || "Anonymous"}
                </h3>
                <StarRating rating={review.rating} size="sm" />
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400">{review.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviewSection;
