"use client";

import Image from "next/image";
import Link from "next/link";
import StarRating from "@/components/StarRating";

interface CardProps {
  rank?: number;
  tool_name: string;
  headline: string;
  category: string;
  thumbnail_image: string;
  favouriteCount: number;
  average_rating: number;
  slug?: string;
  onClick?: () => void;
}

export default function Card({
  rank,
  tool_name,
  headline,
  category,
  thumbnail_image,
  favouriteCount,
  average_rating,
  slug,
  onClick,
}: CardProps) {
  const categorySlug = category.toLowerCase().replace(/\s+/g, "-");
  const detailUrl = slug ? `/${categorySlug}/${slug}` : "#";

  return (
    <Link href={detailUrl} onClick={onClick}>
      <div className="relative flex flex-col rounded-lg border border-gray-400 p-4 hover:border-gray-500 transition-colors cursor-pointer">
        {/* Ranking Badge */}
        {rank !== undefined && (
          <div className="absolute -left-1 top-2 bg-gray-200 px-2 py-1 text-xs font-medium rounded-r-lg">
            {rank}
          </div>
        )}
        {/* Image and Title */}
        <div className="flex items-start gap-3 mb-2">
          <Image
            alt={tool_name}
            src={thumbnail_image}
            width={48}
            height={48}
            className="h-12 w-12 rounded-lg object-cover"
            loading="lazy"
          />
          <div className="flex items-center gap-1 truncate">
            <h3 className="font-semibold text-sm truncate">{tool_name}</h3>
          </div>
        </div>

        {/* Description and Upvote */}
        <div className="flex justify-between align-center my-1.5">
          <div className="max-w-80">
            <p className="text-xs text-gray-600 line-clamp-3">{headline}</p>
          </div>
          <div className="min-w-20">
            <div className="flex items-center">
              <button
                className="flex items-center space-x-2 px-3 py-2 rounded-md transition-colors duration-200 bg-gray-100 text-gray-600 hover:bg-gray-200 animate-wiggle"
                aria-label="Upvote"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle upvote logic here
                }}
              >
                <Image
                  alt="Upvote"
                  src="/up-arrow-blank.svg"
                  width={16}
                  height={16}
                  loading="lazy"
                />
                <span className="font-medium">{favouriteCount}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Rating and Category */}
        <div className="flex items-center justify-between mt-auto">
          <StarRating rating={average_rating} />

          {/* Category Badge */}
          <div className="bg-green-100 text-green-800 px-2 py-1 text-xs font-medium rounded-full cursor-pointer hover:opacity-90 transition-opacity max-w-[120px] truncate">
            {category}
          </div>
        </div>
      </div>
    </Link>
  );
}
