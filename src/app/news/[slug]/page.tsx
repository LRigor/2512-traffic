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
} from "@/components/news";
import { formatDate } from "@/utils/formatDate";
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
    const url = `${SITE_URL}/news/${slug}/`;
    const image = item.thumbnail_image;

    return {
      title,
      description,
      alternates: { canonical: url },
      openGraph: {
        title,
        description,
        url,
        siteName: SITE_NAME,
        type: "article",
        publishedTime: item.last_updated,
        images: image ? [{ url: image, alt: item.headline }] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: image ? [image] : undefined,
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
      alternates: { canonical: `${SITE_URL}/news/${slug}/` },
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

function buildArticleJsonLd(item: NewsItem, subtitle: string) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: item.headline,
    description: item.summary,
    image: item.thumbnail_image,
    datePublished: item.last_updated,
    dateModified: item.last_updated,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.webp` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/news/${item.slug}/`,
    },
    ...(subtitle && { alternativeHeadline: subtitle }),
  };
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
  const relatedNews = items
    .filter((n) => n.slug !== item.slug)
    .sort(
      (a, b) =>
        new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime()
    )
    .slice(0, RELATED_NEWS_LIMIT);

  const allTools = getAllTools();
  const recommendedTools = allTools.slice(0, RECOMMENDED_TOOLS_LIMIT);

  const detailContent = await loadDetailContent(item.slug);
  const subtitle = detailContent.subtitle ?? DEFAULT_SUBTITLE;
  const tableOfContents = detailContent.table_of_contents ?? [];
  const sections = detailContent.sections ?? [];

  const jsonLd = buildArticleJsonLd(item, subtitle);

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

      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <p className="text-red-600 dark:text-red-500 text-lg font-medium mb-2">
            {subtitle}
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

        <div className="mb-8">
          <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
            {item.summary}
          </p>
        </div>

        <TableOfContents items={tableOfContents} />

        <div className="mb-12">
          <div className="relative w-full rounded-lg overflow-hidden aspect-video bg-zinc-100 dark:bg-zinc-800">
            <Image
              src={item.thumbnail_image}
              alt=""
              width={1200}
              height={630}
              className="w-full h-full object-cover"
              priority
              sizes="(min-width: 1024px) 896px, 100vw"
            />
          </div>
        </div>

        <ArticleBody sections={sections} />

        <div className="mb-12">
          <RecommendedToolsList tools={recommendedTools} />
        </div>

        <div className="mb-12">
          <RelatedNewsList items={relatedNews} title="More news" />
        </div>

        <ArticleTagsList tags={item.tags ?? []} />
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
      <header className="space-y-4">
        <nav className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400" aria-label="Breadcrumb">
          <Link
            href="/news"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
          >
            News
          </Link>
          <span aria-hidden>/</span>
          <span className="text-zinc-900 dark:text-zinc-50 font-medium">
            {tagName}
          </span>
        </nav>
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
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            No articles found for this tag.
          </p>
          <Link
            href="/news"
            className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
          >
            ← Back to News
          </Link>
        </div>
      ) : (
        <section
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          aria-label={`Articles tagged ${tagName}`}
        >
          {filteredItems.map((article) => (
            <Link
              key={article._id}
              href={`/news/${article.slug}`}
              className="flex flex-col rounded-lg overflow-hidden bg-white dark:bg-zinc-900 shadow-sm border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900"
              aria-label={`Read: ${article.headline}`}
            >
              <div className="relative h-48 bg-zinc-100 dark:bg-zinc-800 aspect-video">
                <Image
                  src={article.thumbnail_image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col flex-1 p-4 space-y-3">
                <h2 className="text-lg font-semibold leading-snug text-black dark:text-zinc-50">
                  {article.headline}
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  <time dateTime={article.last_updated}>
                    {formatDate(article.last_updated, "long")}
                  </time>
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 line-clamp-3">
                  {article.summary}
                </p>
              </div>
            </Link>
          ))}
        </section>
      )}
    </div>
  );
}
