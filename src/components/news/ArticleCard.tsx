import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";
import type { NewsItem } from "@/types/news";

interface ArticleCardProps {
  item: NewsItem;
  priority?: boolean;
}

/**
 * ArticleCard component for displaying news articles in a grid layout.
 * Optimized with proper image loading, accessibility, and performance.
 */
export default function ArticleCard({ item, priority = false }: ArticleCardProps) {
  return (
    <article className="group flex flex-col rounded-lg overflow-hidden bg-white dark:bg-zinc-800 shadow-sm border border-zinc-200 dark:border-zinc-700 hover:shadow-md transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 dark:focus-within:ring-offset-zinc-900">
      <Link
        href={`/news/${item.slug}`}
        className="flex flex-col flex-1"
        aria-label={`Read article: ${item.headline}`}
      >
        <div className="relative h-48 bg-zinc-100 dark:bg-zinc-700 aspect-video overflow-hidden">
          <Image
            src={item.thumbnail_image}
            alt={item.headline}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            loading={priority ? "eager" : "lazy"}
            priority={priority}
          />
        </div>
        <div className="flex flex-col flex-1 p-4 space-y-3">
          <h2 className="text-lg font-semibold leading-snug text-black dark:text-zinc-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {item.headline}
          </h2>
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <time dateTime={item.last_updated} className="font-medium">
              {formatDate(item.last_updated, "long")}
            </time>
          </div>
          {item.summary && (
            <p className="text-sm text-zinc-600 dark:text-zinc-300 line-clamp-3 leading-relaxed">
              {item.summary}
            </p>
          )}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {item.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400"
                >
                  {tag}
                </span>
              ))}
              {item.tags.length > 2 && (
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  +{item.tags.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
