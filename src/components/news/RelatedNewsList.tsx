import Link from "next/link";
import { formatDate } from "@/utils/formatDate";
import type { NewsItem } from "@/types/news";

interface RelatedNewsListProps {
  items: NewsItem[];
  title?: string;
}

export default function RelatedNewsList({
  items,
  title = "More news",
}: RelatedNewsListProps) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="related-news-heading">
      <h2
        id="related-news-heading"
        className="text-2xl font-bold text-black dark:text-zinc-50 mb-6"
      >
        {title}
      </h2>
      <ul className="space-y-3" role="list">
        {items.map((newsItem) => (
          <li key={newsItem._id}>
            <Link
              href={`/news/${newsItem.slug}`}
              className="block text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded"
            >
              <span className="text-zinc-500 dark:text-zinc-400 font-medium">
                <time dateTime={newsItem.last_updated}>
                  {formatDate(newsItem.last_updated, "short")}
                </time>
                {" — "}
              </span>
              {newsItem.headline}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
