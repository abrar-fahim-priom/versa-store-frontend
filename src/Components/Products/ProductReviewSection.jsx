import { useState } from "react";
import { FaStar, FaTimes, FaUser } from "react-icons/fa";
import { useApiWithAuth } from "../../hooks/useApiWithAuth";
import useAuth from "../../hooks/useAuth";
import AlertNotification from "../ui/AlertNotification";

import {
  useDeleteProductReviewMutation,
  useGetProductReviewsQuery,
  usePostProductReviewMutation,
} from "../../store/api/productApi";
import { ProfileImage } from "../Account/ProfileInfo";

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
        onClick={() => onRatingChange?.(Number(star))}
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
  const [deleteProductReview] = useDeleteProductReviewMutation();

  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    message: "",
    type: "info",
  });

  useApiWithAuth();

  const showNotification = (message, type = "info") => {
    setAlertConfig({ message, type });
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleSubmitReview = async () => {
    // Validation
    if (rating === 0) {
      showNotification("Please select a rating", "warning");
      return;
    }
    if (!reviewText.trim()) {
      showNotification("Please write a review", "warning");
      return;
    }

    try {
      const response = await postProductReview({
        productId,
        reviewData: {
          rating: Number(rating),
          review: reviewText,
        },
      });

      if (response?.data?.success) {
        showNotification("Review submitted successfully!", "success");
        await refetch();
        setRating(0);
        setReviewText("");
      } else {
        showNotification(
          response?.data?.message || "Failed to submit review",
          "error"
        );
      }
    } catch (error) {
      showNotification(
        error?.data?.message || "Failed to submit review. Please try again.",
        "error"
      );
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      const response = await deleteProductReview(reviewId);

      if (response?.data?.success) {
        showNotification("Review deleted successfully!", "success");
        await refetch();
      } else {
        showNotification(
          response?.data?.message || "Failed to delete review",
          "error"
        );
      }
    } catch (error) {
      showNotification(
        error?.data?.message || "Failed to delete review. Please try again.",
        "error"
      );
    }
  };

  if (reviewsLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (reviewsError) {
    return (
      <div className="py-12 text-center text-red-500">
        Error loading reviews. Please try again later.
      </div>
    );
  }

  const reviews = reviewsData?.reviews || [];

  return (
    <>
      <AlertNotification
        show={showAlert}
        message={alertConfig.message}
        type={alertConfig.type}
      />

      <div className="py-12 px-4 max-w-screen-md md:px-6 2xl:px-0 2xl:container 2xl:mx-auto">
        <div className="flex flex-col justify-start items-start w-full space-y-8">
          <h2 className="text-neutral-500 text-lg md:text-xl font-bold dark:text-neutral-300">
            Reviews
          </h2>

          {loggedInUserId ? (
            <div className="w-full bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <h3 className="text-neutral-500 text-lg md:text-xl font-bold dark:text-neutral-300 mb-4">
                Write a Review
              </h3>
              <StarRating
                rating={rating}
                size="lg"
                onRatingChange={setRating}
              />
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full p-2 mt-4 border rounded-md dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Write your review here..."
                rows={4}
              />
              <button
                onClick={handleSubmitReview}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Submit Review
              </button>
            </div>
          ) : (
            <div className="w-full p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
              <p className="text-gray-500 dark:text-white text-lg">
                Please log in to add a review for this product.
              </p>
            </div>
          )}

          <div className="w-full space-y-4">
            {reviews.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-white py-4">
                No reviews yet. Be the first to review this product!
              </p>
            ) : (
              reviews.map((review) => (
                <div
                  key={review._id}
                  className="w-full border border-neutral-300 border-opacity-50 dark:border-opacity-35 dark:border-neutral-50 p-4 dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    {review.userId?.image ? (
                      <ProfileImage
                        src={review.userId.image}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <FaUser className="text-gray-400" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {review.userId?.fullName || "Anonymous User"}
                      </h3>
                      <StarRating rating={review.rating} size="sm" />
                    </div>
                  </div>

                  <div className="flex flex-row gap-2 justify-between items-start">
                    <p className="text-gray-600 dark:text-white text-lg flex-grow">
                      {review.review}
                    </p>

                    {loggedInUserId &&
                      loggedInUserId === review.userId?._id && (
                        <button
                          onClick={() => handleDeleteReview(review._id)}
                          className="ml-2 p-2 text-white bg-red-400 rounded-md hover:bg-red-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                          aria-label="Delete review"
                        >
                          <div className="flex items-center gap-2">
                            <FaTimes />
                            <span className="text-xs">Delete</span>
                          </div>
                        </button>
                      )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductReviewSection;
