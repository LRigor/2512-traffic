import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { formatDate } from "@/utils/formatDate";
import newsData from "@/data/news/list.json";
import { getAllTools } from "@/lib/category-data";

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

export async function generateStaticParams() {
  const items = newsData as NewsItem[];
  return items.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const items = newsData as NewsItem[];
  const item = items.find((n) => n.slug === slug);

  if (!item) {
    return {
      title: "News Not Found",
    };
  }

  return {
    title: `${item.headline} - OpenTools News`,
    description: item.summary,
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
  const item = items.find((n) => n.slug === slug);

  if (!item) {
    notFound();
  }

  // Get related news (exclude current item, get first 20)
  const relatedNews = items
    .filter((n) => n.slug !== slug)
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
    const detailModule = await import(`@/data/news/${slug}.json`);
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
                      }`}
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
                    href={`/news?tag=${encodeURIComponent(tag)}`}
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
