import type { Metadata } from "next";
import newsData from "@/data/news/list.json";
import { getNewsTags } from "@/utils/getNewsTags";
import TagsSection from "@/components/TagsSection";
import { ArticleCard } from "@/components/news";
import type { NewsItem } from "@/types/news";

const SITE_NAME = "OpenTools";
const SITE_URL = "https://aifinds.ai";

/**
 * Sorts news items by last updated date (newest first).
 * Creates a new array to avoid mutating the original data.
 */
function getSortedNewsItems(): NewsItem[] {
  const items = newsData as NewsItem[];
  return [...items].sort((a, b) => {
    return (
      new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime()
    );
  });
}

/**
 * Generates structured data for the news list page.
 */
function buildNewsListJsonLd(items: NewsItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "News",
    description: "Latest AI and tech news, product updates, and industry insights.",
    url: `${SITE_URL}/news`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.slice(0, 10).map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "NewsArticle",
          headline: item.headline,
          url: `${SITE_URL}/news/${item.slug}`,
          datePublished: item.last_updated,
          image: item.thumbnail_image,
        },
      })),
    },
  };
}

export const metadata: Metadata = {
  title: `News - ${SITE_NAME}`,
  description:
    "Stay updated with the latest AI and tech news, product updates, and industry insights.",
  alternates: {
    canonical: `${SITE_URL}/news`,
  },
  openGraph: {
    title: `News - ${SITE_NAME}`,
    description:
      "Stay updated with the latest AI and tech news, product updates, and industry insights.",
    type: "website",
    url: `${SITE_URL}/news`,
  },
  twitter: {
    card: "summary_large_image",
    title: `News - ${SITE_NAME}`,
    description:
      "Stay updated with the latest AI and tech news, product updates, and industry insights.",
  },
};

export default function NewsPage() {
  const allTags = getNewsTags();
  const items = getSortedNewsItems();
  const jsonLd = buildNewsListJsonLd(items);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="space-y-12 pb-20">
        <header className="space-y-2">
          <h1 className="text-4xl font-bold text-black dark:text-zinc-50">
            News
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Stay updated with the latest AI and tech news, product updates, and
            industry insights.
          </p>
        </header>

        <TagsSection allTags={allTags} />

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              No news articles available at the moment.
            </p>
          </div>
        ) : (
          <section
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            aria-label="News articles"
          >
            {items.map((item, index) => (
              <ArticleCard
                key={item._id}
                item={item}
                priority={index < 4}
              />
            ))}
          </section>
        )}
      </div>
    </>
  );
}
