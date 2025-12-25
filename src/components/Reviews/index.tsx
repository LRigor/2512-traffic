"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import StarRating from "@/components/StarRating";

export default function Reviews() {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const handleStarClick = (starValue: number) => {
    setRating(starValue);
  };

  return (
    <section className="mb-12 flex justify-center items-center">
      {/* Customer Reviews Section */}
      <div className="flex-1 max-w-3xl">
        <h2 className="text-2xl font-bold text-black mb-6">Customer Reviews</h2>

        {/* Review Form */}
        <div className="mb-8">
          <h3 className="font-semibold text-black mb-2">Share your thoughts</h3>
          <p className="text-sm text-gray-600 mb-4">
            If you&apos;ve used this product, share your thoughts with other
            customers
          </p>

          {/* Star Rating */}
          <div className="mb-4">
            <StarRating rating={rating} onRatingChange={handleStarClick} />
          </div>

          {/* Review Text Area */}
          <textarea
            placeholder="Write your review here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mb-4 min-h-[120px] resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          {/* Submit Button */}
          <Button variant="primary" className="w-full">
            Submit Review
          </Button>
        </div>
      </div>
    </section>
  );
}
