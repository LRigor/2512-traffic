"use client";

import Image from "next/image";
import Link from "next/link";
import newsData from "@/data/news/list.json";
import { formatDate } from "@/utils/formatDate";
import { getNewsTags } from "@/utils/getNewsTags";
import TagsSection from "@/components/TagsSection";

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

export default function NewsPage() {
  const allTags = getNewsTags();
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
      <TagsSection allTags={allTags} />

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
