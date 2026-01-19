"use client";

import { useState } from "react";
import Link from "next/link";

// Helper function to convert tag name to URL-friendly slug
function tagToSlug(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

interface TagsSectionProps {
  allTags: string[];
  activeTag?: string;
}

export default function TagsSection({ allTags, activeTag }: TagsSectionProps) {
  const [visibleTagsCount, setVisibleTagsCount] = useState(10);

  const visibleTags = allTags.slice(0, visibleTagsCount);
  const hasMoreTags = visibleTagsCount < allTags.length;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-black dark:text-zinc-50">
        Explore News by Tags
      </h2>
      <div className="flex flex-wrap justify-center gap-2.5">
        {visibleTags.map((tag) => {
          const isActive = tag === activeTag;
          return (
            <Link
              key={tag}
              href={`/news/${tagToSlug(tag)}`}
              className={`group relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 border backdrop-blur-sm ${
                isActive
                  ? "bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white border-blue-600 dark:border-blue-500 shadow-md shadow-blue-500/30"
                  : "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 text-blue-700 dark:text-blue-300 border-blue-200/60 dark:border-blue-800/60 hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/50 dark:hover:to-indigo-900/50 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md hover:shadow-blue-200/50 dark:hover:shadow-blue-900/30 hover:-translate-y-0.5"
              }`}
            >
              {tag}
            </Link>
          );
        })}
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
            <span className="relative z-10">Load More Tags</span>
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
          </button>
        </div>
      )}
    </div>
  );
}
