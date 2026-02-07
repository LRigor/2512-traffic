import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import newsData from "@/data/news/list.json";
import { formatDate } from "@/utils/formatDate";
import { getNewsTags } from "@/utils/getNewsTags";
import TagsSection from "@/components/TagsSection";
import type { NewsItem } from "@/types/news";

const SITE_NAME = "OpenTools";

function getSortedNewsItems(): NewsItem[] {
  const items = newsData as NewsItem[];
  return [...items].sort((a, b) => {
    return (
      new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime()
    );
  });
}

export const metadata: Metadata = {
  title: `News - ${SITE_NAME}`,
  description:
    "Stay updated with the latest AI and tech news, product updates, and industry insights.",
  openGraph: {
    title: `News - ${SITE_NAME}`,
    description:
      "Stay updated with the latest AI and tech news, product updates, and industry insights.",
    type: "website",
  },
};

export default function NewsPage() {
  const allTags = getNewsTags();
  const items = getSortedNewsItems();

  return (
    <div className="space-y-12 pb-20">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold text-black dark:text-zinc-50">
          News
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Stay updated with the latest AI and tech news.
        </p>
      </header>

      <TagsSection allTags={allTags} />

      <section
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        aria-label="News articles"
      >
        {items.map((item) => (
          <ArticleCard key={item._id} item={item} />
        ))}
      </section>
    </div>
  );
}

function ArticleCard({ item }: { item: NewsItem }) {
  return (
    <Link
      href={`/news/${item.slug}`}
      className="flex flex-col rounded-lg overflow-hidden bg-white dark:bg-zinc-800 shadow-sm border border-zinc-200 dark:border-zinc-700 hover:shadow-md transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900"
      aria-label={`Read: ${item.headline}`}
    >
      <div className="relative h-48 bg-zinc-100 dark:bg-zinc-700 aspect-video">
        <Image
          src={item.thumbnail_image}
          alt=""
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col flex-1 p-4 space-y-3">
        <h2 className="text-lg font-semibold leading-snug text-black dark:text-zinc-50">
          {item.headline}
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          <time dateTime={item.last_updated}>
            {formatDate(item.last_updated, "long")}
          </time>
        </p>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 line-clamp-3">
          {item.summary}
        </p>
      </div>
    </Link>
  );
}
