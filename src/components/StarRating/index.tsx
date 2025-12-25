import Image from "next/image";

interface StarRatingProps {
  rating: number;
  className?: string;
}

export default function StarRating({ rating, className = "" }: StarRatingProps) {
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

