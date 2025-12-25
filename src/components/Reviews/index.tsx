"use client";

import Image from "next/image";

interface Review {
  name: string;
  avatar: string;
  rating: number;
}

const reviews: Review[] = [
  { name: "Michalka Amalia Deich", avatar: "M", rating: 5 },
  { name: "Pradeep Pradeep", avatar: "P", rating: 5 },
  { name: "Manikandan V", avatar: "MV", rating: 5 },
  { name: "LaRon Scott", avatar: "L", rating: 5 },
  { name: "Nagraj Rao", avatar: "N", rating: 5 },
];

const getAvatarColor = (letter: string) => {
  const colors = [
    "bg-orange-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-pink-500",
    "bg-purple-500",
    "bg-yellow-500",
    "bg-indigo-500",
    "bg-red-500",
  ];
  return colors[letter.charCodeAt(0) % colors.length];
};

export default function Reviews() {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-black">Customer Reviews</h2>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Share</span>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300">
              <span className="text-xs font-bold">f</span>
            </button>
            <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300">
              <span className="text-xs font-bold">in</span>
            </button>
            <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300">
              <span className="text-xs font-bold">X</span>
            </button>
            <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300">
              <span className="text-xs">W</span>
            </button>
          </div>
        </div>
      </div>

      {/* Review Form */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h3 className="font-semibold text-gray-900 mb-2">
          Share your thoughts
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          If you&apos;ve used this product, share your thoughts with other
          customers
        </p>
        <div className="flex gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Image
              key={star}
              src="/star-empty.svg"
              alt="Star"
              width={24}
              height={24}
              className="h-6 w-6"
            />
          ))}
        </div>
        <textarea
          placeholder="Write your review here..."
          className="w-full p-3 border border-gray-300 rounded-md mb-4 min-h-[100px]"
        />
        <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
          Submit Review
        </button>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="flex items-start gap-4 pb-4 border-b border-gray-200"
          >
            <div
              className={`${getAvatarColor(review.avatar)} w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0`}
            >
              {review.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900">
                  {review.name}
                </span>
                <div className="flex items-center">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Image
                      key={i}
                      src="/star.svg"
                      alt="Star"
                      width={20}
                      height={20}
                      className="h-5 w-5"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

