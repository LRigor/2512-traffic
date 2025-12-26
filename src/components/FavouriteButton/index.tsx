"use client";

import ImageButton from "../ui/ImageButton";

interface FavouriteButtonProps {
  favouriteCount: number;
}

export default function FavouriteButton({
  favouriteCount,
}: FavouriteButtonProps) {
  return (
    <div className="animate-wiggle">
      <ImageButton
        imagePath="/up-arrow-blank.svg"
        text={favouriteCount}
        variant="secondary"
        className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
        imageAlt="Upvote"
      />
    </div>
  );
}
