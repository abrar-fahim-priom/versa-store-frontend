import React, { useState } from "react";
import { FaStar, FaUser } from "react-icons/fa";

const ProductReviewSection = () => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([
    {
      _id: "66db32da0f77063e8f3c8d15",
      rating: 5,
      review:
        "Very good device to ruin my social life. Like it 100%, and also recommended",
      userId: {
        _id: "66dacdbe0b8226d306337c43",
        fullName: "Sharif Md. Minhazur Rahaman",
        image: "https://randomuser.me/api/portraits/lego/5.jpg",
      },
      createdAt: "2024-09-06T16:50:35.003Z",
    },
    {
      _id: "66db344137252198267551a5",
      rating: 4,
      review:
        "Good, but not the best. Loved the steel finishing. Performance is low when using memory intensive works",
      userId: {
        _id: "66d1b061805629e9cc686317",
        fullName: "Sharif Md. Minhaz",
        image:
          "https://res.cloudinary.com/hostingimagesservice/image/upload/v1725180126/versaShop/image-1725180123597_sfdiqp.png",
      },
      createdAt: "2024-09-06T16:56:33.123Z",
    },
  ]);

  const handleSubmitReview = () => {
    const newReview = {
      _id: Date.now().toString(),
      rating,
      review: reviewText,
      userId: {
        _id: Date.now().toString(),
        fullName: "John Doe",
        image: "/api/placeholder/32/32",
      },
      createdAt: new Date().toISOString(),
    };
    setReviews([newReview, ...reviews]);
    setRating(0);
    setReviewText("");
  };

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
          onClick={() => onRatingChange(star)}
        />
      ))}
    </div>
  );

  return (
    <div className="py-12 px-4 md:px-6 2xl:px-0 2xl:container 2xl:mx-auto">
      <div className="flex flex-col justify-start items-start w-full space-y-8">
        <h2 className="text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-white">
          Reviews
        </h2>

        {/* Review Input Section */}
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

        {/* Review Display Section */}
        {reviews.map((review) => (
          <div
            key={review._id}
            className="w-full  dark:bg-gray-800 py-3 rounded-lg "
          >
            <div className="flex items-center space-x-4 mb-4">
              {review.userId.image ? (
                <img
                  src={review.userId.image}
                  alt="User avatar"
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <FaUser className="w-10 h-10 text-gray-400" />
              )}
              <div>
                <p className="font-medium text-gray-800 dark:text-white">
                  {review.userId.fullName}
                </p>
                <p className="text-sm text-gray-600 dark:text-white">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <StarRating
              rating={review.rating}
              size="sm"
              onRatingChange={() => {}}
            />
            <p className="mt-2 text-gray-600 dark:text-white">
              {review.review}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviewSection;
