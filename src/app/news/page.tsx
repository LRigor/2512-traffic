"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import newsData from "@/data/news/list.json";
import { formatDate } from "@/utils/formatDate";
import { getNewsTags } from "@/utils/getNewsTags";

type NewsItem = {
  _id: string;
  slug: string;
  headline: string;
  thumbnail_image: string;
  summary: string;
  last_updated: string;
  category?: string;
  tags?: string[];
};

// Helper function to convert tag name to URL-friendly slug
function tagToSlug(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
}

export default function NewsPage() {
  const allTags = getNewsTags();
  const [visibleTagsCount, setVisibleTagsCount] = useState(10);

  const visibleTags = allTags.slice(0, visibleTagsCount);
  const hasMoreTags = visibleTagsCount < allTags.length;
  const items = (newsData as NewsItem[]).slice().sort((a, b) => {
    const dateA = new Date(a.last_updated).getTime();
    const dateB = new Date(b.last_updated).getTime();
    return dateB - dateA;
  });

  return (
    <div className="space-y-12 pb-20">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-black dark:text-zinc-50">
          News
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Stay updated with the latest AI and tech news.
        </p>
      </div>

      {/* Explore News by Tags Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center text-black dark:text-zinc-50">
          Explore News by Tags
        </h2>
        <div className="flex flex-wrap justify-center gap-2.5">
          {visibleTags.map((tag) => (
            <Link
              key={tag}
              href={`/news/${tagToSlug(tag)}`}
              className="group relative px-4 py-2 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 text-blue-700 dark:text-blue-300 font-medium text-sm hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/50 dark:hover:to-indigo-900/50 transition-all duration-300 border border-blue-200/60 dark:border-blue-800/60 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md hover:shadow-blue-200/50 dark:hover:shadow-blue-900/30 hover:-translate-y-0.5 backdrop-blur-sm"
            >
              {tag}
            </Link>
          ))}
        </div>
        {hasMoreTags && (
          <div className="text-center mt-8">
            <button
              type="button"
              onClick={() =>
                setVisibleTagsCount((prev) =>
                  Math.min(prev + 10, allTags.length)
                )
              }
              className="group relative px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white font-semibold text-base hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-600 dark:hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/50 dark:hover:shadow-blue-500/30 hover:-translate-y-1 active:translate-y-0"
            >
              <span className="relative z-10">Load More</span>
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <Link
            key={item._id}
            href={`/news/${item.slug}`}
            className="flex flex-col rounded-lg overflow-hidden bg-white dark:bg-zinc-800 shadow-sm border border-zinc-200 dark:border-zinc-700 hover:shadow-md transition-shadow"
          >
            <div className="relative h-48 bg-zinc-100 dark:bg-zinc-700">
              <Image
                src={item.thumbnail_image}
                alt={item.headline}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                priority
              />
            </div>
            <div className="flex flex-col flex-1 p-4 space-y-3">
              <h2 className="text-lg font-semibold leading-snug text-black dark:text-zinc-50">
                {item.headline}
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {formatDate(item.last_updated, "long")}
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 line-clamp-3">
                {item.summary}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
