"use client";

import Image from "next/image";

interface StarRatingProps {
  rating: number;
  className?: string;
  onRatingChange?: (rating: number) => void;
}

export default function StarRating({
  rating,
  className = "",
  onRatingChange,
}: StarRatingProps) {
  if (onRatingChange) {
    return (
      <div className={`flex gap-1 ${className}`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className="focus:outline-none"
            aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
          >
            <Image
              src={star <= rating ? "/star.svg" : "/star-empty.svg"}
              alt={star <= rating ? "Filled star" : "Empty star"}
              width={24}
              height={24}
              className="h-6 w-6"
            />
          </button>
        ))}
      </div>
    );
  }

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`flex items-center ${className}`}>
      {/* Full Stars */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <Image
          key={`full-${i}`}
          src="/star.svg"
          alt="Full star"
          width={20}
          height={20}
          className="h-5 w-5"
          aria-hidden="true"
        />
      ))}

      {/* Half Star */}
      {hasHalfStar && (
        <Image
          src="/star-half.svg"
          alt="Half star"
          width={20}
          height={20}
          className="h-5 w-5"
          aria-hidden="true"
        />
      )}

      {/* Empty Stars */}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Image
          key={`empty-${i}`}
          src="/star-empty.svg"
          alt="Empty star"
          width={20}
          height={20}
          className="h-5 w-5"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
