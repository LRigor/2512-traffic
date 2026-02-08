import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import {
  TableOfContents,
  ArticleBody,
  RelatedNewsList,
  RecommendedToolsList,
  ArticleTagsList,
  ShareButtons,
  ArticleCard,
} from "@/components/news";
import { formatDate } from "@/utils/formatDate";
import { calculateReadingTime, formatReadingTime } from "@/utils/readingTime";
import newsData from "@/data/news/list.json";
import { getAllTools } from "@/lib/category-data";
import { getNewsTags } from "@/utils/getNewsTags";
import { tagToSlug, slugToTag } from "@/utils/news-tag-slug";
import type { NewsItem, NewsDetailContent } from "@/types/news";

const SITE_NAME = "OpenTools";
const SITE_URL = "https://aifinds.ai";
const RELATED_NEWS_LIMIT = 10;
const RECOMMENDED_TOOLS_LIMIT = 12;
const DEFAULT_SUBTITLE = "A Bold Move by Musk to Woo Content Creators";

interface NewsDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const items = newsData as NewsItem[];
  const articleSlugs = items.map((item) => ({ slug: item.slug }));
  const allTags = getNewsTags();
  const tagSlugs = allTags.map((tag) => ({ slug: tagToSlug(tag) }));
  return [...articleSlugs, ...tagSlugs];
}

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const items = newsData as NewsItem[];

  const item = items.find((n) => n.slug === slug);
  if (item) {
    const title = `${item.headline} - ${SITE_NAME} News`;
    const description = item.summary;
    const url = `${SITE_URL}/news/${slug}`;
    const image = item.thumbnail_image;

    // Load detail content for subtitle if available
    const detailContent = await loadDetailContent(slug);
    const subtitle = detailContent.subtitle ?? DEFAULT_SUBTITLE;

    return {
      title,
      description,
      alternates: { canonical: url },
      keywords: item.tags?.join(", "),
      openGraph: {
        title,
        description,
        url,
        siteName: SITE_NAME,
        type: "article",
        publishedTime: item.last_updated,
        modifiedTime: item.last_updated,
        authors: [SITE_NAME],
        tags: item.tags,
        images: image
          ? [
              {
                url: image,
                alt: item.headline,
                width: 1200,
                height: 630,
              },
            ]
          : undefined,
        ...(subtitle && { section: subtitle }),
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: image ? [image] : undefined,
        creator: `@${SITE_NAME.toLowerCase().replace(/\s+/g, "")}`,
      },
    };
  }

  const allTags = getNewsTags();
  const tagName = slugToTag(slug, allTags);
  if (tagName) {
    const filteredItems = items.filter(
      (i) => i.tags?.some((t) => t === tagName) ?? false
    );
    const title = `${tagName} - News - ${SITE_NAME}`;
    const description = `Latest news articles tagged with ${tagName}. ${filteredItems.length} article${filteredItems.length !== 1 ? "s" : ""} found.`;

    return {
      title,
      description,
      alternates: { canonical: `${SITE_URL}/news/${slug}` },
      openGraph: { title, description, type: "website" },
      twitter: { card: "summary", title, description },
    };
  }

  return {
    title: "News not found",
    description: "The requested news article or tag was not found.",
  };
}

async function loadDetailContent(slug: string): Promise<NewsDetailContent> {
  try {
    const mod = await import(`@/data/news/${slug}.json`);
    return (mod.default ?? mod) as NewsDetailContent;
  } catch {
    return {};
  }
}

/**
 * Builds structured data (JSON-LD) for a news article.
 * Enhances SEO and enables rich snippets in search results.
 */
function buildArticleJsonLd(
  item: NewsItem,
  subtitle: string,
  readingTime: number
) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: item.headline,
    description: item.summary,
    image: item.thumbnail_image,
    datePublished: item.last_updated,
    dateModified: item.last_updated,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo.webp`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/news/${item.slug}/`,
    },
    timeRequired: `PT${readingTime}M`,
    ...(subtitle && { alternativeHeadline: subtitle }),
    ...(item.tags && item.tags.length > 0 && { keywords: item.tags.join(", ") }),
  };
}

/**
 * Finds related news articles based on shared tags.
 * Falls back to latest articles if no tag matches are found.
 */
function getRelatedNews(
  currentItem: NewsItem,
  allItems: NewsItem[],
  limit: number
): NewsItem[] {
  if (!currentItem.tags || currentItem.tags.length === 0) {
    // Fallback to latest articles if no tags
    return allItems
      .filter((n) => n.slug !== currentItem.slug)
      .sort(
        (a, b) =>
          new Date(b.last_updated).getTime() -
          new Date(a.last_updated).getTime()
      )
      .slice(0, limit);
  }

  // Find articles with matching tags
  const relatedByTags = allItems
    .filter((n) => {
      if (n.slug === currentItem.slug) return false;
      if (!n.tags || n.tags.length === 0) return false;
      return n.tags.some((tag) => currentItem.tags?.includes(tag));
    })
    .sort(
      (a, b) =>
        new Date(b.last_updated).getTime() -
        new Date(a.last_updated).getTime()
    );

  // If we have enough related articles, return them
  if (relatedByTags.length >= limit) {
    return relatedByTags.slice(0, limit);
  }

  // Otherwise, fill with latest articles
  const latestArticles = allItems
    .filter(
      (n) =>
        n.slug !== currentItem.slug &&
        !relatedByTags.some((r) => r.slug === n.slug)
    )
    .sort(
      (a, b) =>
        new Date(b.last_updated).getTime() -
        new Date(a.last_updated).getTime()
    )
    .slice(0, limit - relatedByTags.length);

  return [...relatedByTags, ...latestArticles];
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const items = newsData as NewsItem[];

  const item = items.find((n) => n.slug === slug);
  if (item) {
    return await renderArticleDetail(item, items);
  }

  const allTags = getNewsTags();
  const tagName = slugToTag(slug, allTags);
  if (tagName) {
    return renderTagPage(tagName, items);
  }

  notFound();
}

async function renderArticleDetail(item: NewsItem, items: NewsItem[]) {
  const relatedNews = getRelatedNews(item, items, RELATED_NEWS_LIMIT);

  const allTools = getAllTools();
  const recommendedTools = allTools.slice(0, RECOMMENDED_TOOLS_LIMIT);

  const detailContent = await loadDetailContent(item.slug);
  const subtitle = detailContent.subtitle ?? DEFAULT_SUBTITLE;
  const tableOfContents = detailContent.table_of_contents ?? [];
  const sections = detailContent.sections ?? [];

  // Calculate reading time from article content
  const articleText = [
    item.summary,
    ...sections.flatMap((s) => [s.heading, ...s.paragraphs]),
  ]
    .filter(Boolean)
    .join(" ");
  const readingTime = calculateReadingTime(articleText);

  const articleUrl = `${SITE_URL}/news/${item.slug}`;
  const jsonLd = buildArticleJsonLd(item, subtitle, readingTime);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "News", href: "/news" },
          { label: item.headline },
        ]}
        className="mb-6"
      />

      <article className="max-w-4xl mx-auto" itemScope itemType="https://schema.org/NewsArticle">
        <header className="mb-8">
          {subtitle && (
            <p className="text-red-600 dark:text-red-500 text-lg font-medium mb-2">
              {subtitle}
            </p>
          )}
          <h1
            className="text-4xl font-bold text-black dark:text-zinc-50 mb-4"
            itemProp="headline"
          >
            {item.headline}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400 mb-6">
            <time dateTime={item.last_updated} itemProp="datePublished">
              {formatDate(item.last_updated, "long")}
            </time>
            <span aria-hidden="true">•</span>
            <span>{formatReadingTime(readingTime)}</span>
          </div>
        </header>

        <div className="mb-8">
          <p
            className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300"
            itemProp="description"
          >
            {item.summary}
          </p>
        </div>

        {tableOfContents.length > 0 && (
          <div className="mb-8">
            <TableOfContents items={tableOfContents} />
          </div>
        )}

        <div className="mb-12">
          <div className="relative w-full rounded-lg overflow-hidden aspect-video bg-zinc-100 dark:bg-zinc-800 shadow-lg">
            <Image
              src={item.thumbnail_image}
              alt={item.headline}
              width={1200}
              height={630}
              className="w-full h-full object-cover"
              priority
              sizes="(min-width: 1024px) 896px, 100vw"
              itemProp="image"
            />
          </div>
        </div>

        {sections.length > 0 && (
          <div className="mb-12" itemProp="articleBody">
            <ArticleBody sections={sections} />
          </div>
        )}

        <div className="mb-12">
          <ShareButtons
            url={articleUrl}
            title={item.headline}
            description={item.summary}
          />
        </div>

        {recommendedTools.length > 0 && (
          <div className="mb-12">
            <RecommendedToolsList tools={recommendedTools} />
          </div>
        )}

        {relatedNews.length > 0 && (
          <div className="mb-12">
            <RelatedNewsList items={relatedNews} title="Related articles" />
          </div>
        )}

        {item.tags && item.tags.length > 0 && (
          <ArticleTagsList tags={item.tags} />
        )}
      </article>
    </>
  );
}

function renderTagPage(tagName: string, items: NewsItem[]) {
  const filteredItems = items
    .filter((i) => i.tags?.some((t) => t === tagName) ?? false)
    .sort(
      (a, b) =>
        new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime()
    );

  return (
    <div className="space-y-12 pb-20">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "News", href: "/news" },
          { label: tagName },
        ]}
        className="mb-6"
      />

      <header className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-black dark:text-zinc-50">
            News: {tagName}
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            {filteredItems.length} article
            {filteredItems.length !== 1 ? "s" : ""} found
          </p>
        </div>
      </header>

      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-4">
            No articles found for this tag.
          </p>
          <Link
            href="/news"
            className="inline-block text-blue-600 dark:text-blue-400 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-4 py-2"
          >
            ← Back to News
          </Link>
        </div>
      ) : (
        <section
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          aria-label={`Articles tagged ${tagName}`}
        >
          {filteredItems.map((article, index) => (
            <ArticleCard
              key={article._id}
              item={article}
              priority={index < 4}
            />
          ))}
        </section>
      )}
    </div>
  );
}
