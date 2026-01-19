import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import TagsSection from "@/components/TagsSection";
import { formatDate } from "@/utils/formatDate";
import newsData from "@/data/news/list.json";
import { getAllTools } from "@/lib/category-data";
import { getNewsTags } from "@/utils/getNewsTags";

type NewsSection = {
  heading: string;
  paragraphs: string[];
};

type NewsDetailContent = {
  subtitle?: string;
  table_of_contents?: string[];
  sections?: NewsSection[];
};

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

interface NewsDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

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

// Helper function to convert tag slug back to tag name
function slugToTag(slug: string, allTags: string[]): string | null {
  const normalizedSlug = slug.toLowerCase().trim();
  return (
    allTags.find(
      (tag) =>
        tag
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .replace(/^-|-$/g, "") === normalizedSlug
    ) || null
  );
}

export async function generateStaticParams() {
  const items = newsData as NewsItem[];
  const articleSlugs = items.map((item) => ({
    slug: item.slug,
  }));

  // Also include tag slugs
  const allTags = getNewsTags();
  const tagSlugs = allTags.map((tag) => ({
    slug: tagToSlug(tag),
  }));

  return [...articleSlugs, ...tagSlugs];
}

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const items = newsData as NewsItem[];

  // Check if it's an article slug
  const item = items.find((n) => n.slug === slug);
  if (item) {
    return {
      title: `${item.headline} - OpenTools News`,
      description: item.summary,
    };
  }

  // Check if it's a tag slug
  const allTags = getNewsTags();
  const tagName = slugToTag(slug, allTags);

  if (tagName) {
    const filteredItems = items.filter(
      (item) => item.tags?.some((t) => t === tagName) || false
    );
    return {
      title: `${tagName} - News - OpenTools`,
      description: `Latest news articles tagged with ${tagName}. ${filteredItems.length} article${filteredItems.length !== 1 ? "s" : ""} found.`,
    };
  }

  return {
    title: "News Not Found",
    description: "The requested news article or tag was not found.",
  };
}

// Helper function to generate anchor from heading
function generateAnchor(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const items = newsData as NewsItem[];

  // Check if it's an article slug first
  const item = items.find((n) => n.slug === slug);

  // If it's an article, render article detail page
  if (item) {
    return await renderArticleDetail(item, items);
  }

  // Check if it's a tag slug
  const allTags = getNewsTags();
  const tagName = slugToTag(slug, allTags);

  if (tagName) {
    return renderTagPage(tagName, items, allTags);
  }

  // Neither article nor tag found
  notFound();
}

async function renderArticleDetail(item: NewsItem, items: NewsItem[]) {
  // Get related news (exclude current item, get first 20)
  const relatedNews = items
    .filter((n) => n.slug !== item.slug)
    .slice(0, 20)
    .sort(
      (a, b) =>
        new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime()
    );

  // Get recommended tools (first 12 tools)
  const allTools = getAllTools();
  const recommendedTools = allTools.slice(0, 12);

  // Get detail content from slug-named JSON file
  let detailContent: NewsDetailContent = {};
  try {
    // Dynamically import the detail file based on slug
    const detailModule = await import(`@/data/news/${item.slug}.json`);
    detailContent = detailModule.default || detailModule;
  } catch {
    // File doesn't exist for this slug, use empty object
    // This is expected for articles without detail content
  }

  // Get subtitle, table of contents, and sections from detail content
  const subtitle =
    detailContent.subtitle || "A Bold Move by Musk to Woo Content Creators";
  const tableOfContents = detailContent.table_of_contents || [];
  const sections = detailContent.sections || [];

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "News", href: "/news" },
          { label: item.headline },
        ]}
        className="mb-6"
      />

      <article className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <p className="text-red-600 dark:text-red-500 text-lg font-medium mb-2">
            {subtitle || "A Bold Move by Musk to Woo Content Creators"}
          </p>
          <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-4">
            {item.headline}
          </h1>
          <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400 mb-6">
            <time dateTime={item.last_updated}>
              Last updated: {formatDate(item.last_updated, "short")}
            </time>
          </div>
        </header>

        {/* Introduction Paragraph */}
        <div className="mb-8">
          <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
            {item.summary}
          </p>
        </div>

        {/* Table of Contents */}
        <div className="mb-12 rounded-lg p-6">
          <h2 className="text-xl font-bold text-black dark:text-zinc-50 mb-4">
            Table of Contents
          </h2>
          {tableOfContents.length > 0 ? (
            <ul className="space-y-2">
              {tableOfContents.map((tocItem, index) => {
                const anchor = generateAnchor(tocItem);
                return (
                  <li key={index}>
                    <a
                      href={`#${anchor}`}
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline"
                    >
                      • {tocItem}
                    </a>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-zinc-500 dark:text-zinc-400">
              No table of contents available.
            </p>
          )}
        </div>

        {/* Featured Image */}
        <div className="mb-12">
          <div className="relative w-full rounded-lg overflow-hidden">
            <Image
              src={item.thumbnail_image}
              alt={item.headline}
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>

        {/* Content Sections */}
        {sections.length > 0 && (
          <div className="prose prose-lg max-w-none dark:prose-invert mb-12">
            {sections.map((section, index) => {
              const anchor = generateAnchor(section.heading);
              return (
                <section key={index} id={anchor} className="mb-8 scroll-mt-20">
                  <h2 className="text-2xl font-bold text-black dark:text-zinc-50 mb-4">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className={`text-zinc-700 dark:text-zinc-300 leading-relaxed ${
                        pIndex < section.paragraphs.length - 1 ? "mb-4" : ""
                      } [&_a]:text-blue-600 [&_a]:hover:text-blue-700 [&_a]:dark:text-blue-400 [&_a]:dark:hover:text-blue-300 [&_a]:hover:underline [&_a]:underline-offset-2`}
                      dangerouslySetInnerHTML={{
                        __html: paragraph,
                      }}
                    />
                  ))}
                </section>
              );
            })}
          </div>
        )}

        {/* Recommended Tools Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-black dark:text-zinc-50 mb-6">
            Recommended Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendedTools.map((tool) => (
              <Link
                key={tool.id}
                href={`/${tool.category_slug || "ai-assistant"}/${tool.slug}`}
                className="block bg-white dark:bg-zinc-800 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700 hover:shadow-md transition-shadow"
              >
                <h3 className="font-bold text-black dark:text-zinc-50 mb-2 line-clamp-2">
                  {tool.tool_name}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 mb-3">
                  {tool.headline}
                </p>
                <span className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
                  Learn More
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Related News Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-black dark:text-zinc-50 mb-6">
            News
          </h2>
          <div className="space-y-3">
            {relatedNews.map((newsItem) => (
              <Link
                key={newsItem._id}
                href={`/news/${newsItem.slug}`}
                className="block text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline"
              >
                <span className="text-zinc-500 dark:text-zinc-400">
                  [{formatDate(newsItem.last_updated, "short")}]{" "}
                </span>
                {newsItem.headline}
              </Link>
            ))}
          </div>
        </div>

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="mb-8 pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <h3 className="text-xl font-bold text-black dark:text-zinc-50 mb-4">
              Tags
            </h3>
            <ul className="list-disc list-inside space-y-1">
              {item.tags.map((tag, index) => (
                <li key={index}>
                  <Link
                    href={`/news/${tagToSlug(tag)}`}
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline"
                  >
                    {tag}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>
    </>
  );
}

function renderTagPage(tagName: string, items: NewsItem[], allTags: string[]) {
  // Filter news items by tag
  const filteredItems = items
    .filter((item) => item.tags?.some((t) => t === tagName) || false)
    .sort((a, b) => {
      const dateA = new Date(a.last_updated).getTime();
      const dateB = new Date(b.last_updated).getTime();
      return dateB - dateA;
    });

  return (
    <div className="space-y-12 pb-20">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <Link
            href="/news"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            News
          </Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-50">{tagName}</span>
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-black dark:text-zinc-50">
            News: {tagName}
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            {filteredItems.length} article
            {filteredItems.length !== 1 ? "s" : ""} found
          </p>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            No articles found for this tag.
          </p>
          <Link
            href="/news"
            className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to News
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <Link
              key={item._id}
              href={`/news/${item.slug}`}
              className="flex flex-col rounded-lg overflow-hidden bg-white dark:bg-zinc-900 shadow-sm border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-shadow"
            >
              <div className="relative h-48 bg-zinc-100 dark:bg-zinc-800">
                <Image
                  src={item.thumbnail_image}
                  alt={item.headline}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
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
      )}
    </div>
  );
}
