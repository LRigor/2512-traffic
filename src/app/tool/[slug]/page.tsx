import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/ui/Breadcrumb";
import FavouriteButton from "@/components/FavouriteButton";
import StarRating from "@/components/StarRating";
import Share from "@/components/Share";
import { formatDate } from "@/utils/formatDate";
import OpenToolsBadge from "@/components/OpenToolsBadge";
import launchedTodayData from "@/data/launched-today.json";

export async function generateStaticParams() {
  return launchedTodayData.tools.map((tool) => ({
    slug: tool.slug,
  }));
}

interface LaunchedToolPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: LaunchedToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = launchedTodayData.tools.find((t) => t.slug === slug);

  if (!tool) {
    return {
      title: "Tool Not Found",
    };
  }

  return {
    title: `${tool.tool_name} - ${tool.headline}`,
    description: tool.headline,
    keywords: tool.tags?.join(", "),
    openGraph: {
      title: `${tool.tool_name} - ${tool.headline}`,
      description: tool.headline,
      images: [tool.thumbnail_image],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${tool.tool_name} - ${tool.headline}`,
      description: tool.headline,
      images: [tool.thumbnail_image],
    },
  };
}

export default async function LaunchedToolPage({ params }: LaunchedToolPageProps) {
  const { slug } = await params;
  const tool = launchedTodayData.tools.find((t) => t.slug === slug);

  if (!tool) {
    notFound();
  }

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Launched Today", href: "/" },
          { label: tool.tool_name },
        ]}
        className="mb-6"
      />

      {/* Tool Image Section */}
      <div className="mb-8">
        <div className="relative w-full rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={tool.thumbnail_image}
            alt={tool.tool_name}
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      </div>

      {/* Tool Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            {/* Title and Favorite */}
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-4xl font-bold text-black dark:text-zinc-50">
                {tool.tool_name}
              </h1>
              <FavouriteButton favouriteCount={tool.favouriteCount} />
            </div>
            
            {/* Headline */}
            {tool.headline && (
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                {tool.headline}
              </p>
            )}
            
            {/* CTA Button */}
            {tool.tool_url && (
              <Link
                href={tool.tool_url}
                className="inline-block px-6 py-3 rounded-lg font-semibold transition-colors bg-blue-600 text-white hover:bg-blue-700 mb-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                Check out {tool.tool_name}
              </Link>
            )}
            
            {/* Badges and Links */}
            <div className="flex items-center gap-4 mb-4">
              <OpenToolsBadge
                favouriteCount={tool.favouriteCount}
                slug={tool.slug}
              />
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#e94560] text-white">
                Launched Today
              </span>
            </div>
            
            {/* Last Updated */}
            {tool.last_updated && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Last updated: {formatDate(tool.last_updated, "long")}
              </p>
            )}
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <StarRating rating={tool.average_rating ?? 0} />
              {tool.review_count !== undefined && (
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                  {tool.review_count} reviews
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-black dark:text-zinc-50 mb-6">
          What is {tool.tool_name}?
        </h2>
        <div className="prose max-w-none">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base mb-6">
            {tool.description}
          </p>
        </div>
        
        {/* Category Link */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-black dark:text-zinc-50 mb-3">Category</h3>
          <Link 
            href={`/${tool.category_slug}`}
            className="inline-block bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            {tool.category}
          </Link>
        </div>
      </section>

      {/* Features Section */}
      {tool.features && tool.features.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-black dark:text-zinc-50 mb-6">
            {tool.tool_name}&apos;s Top Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tool.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="bg-green-500 rounded-full p-1 mt-0.5">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Pricing Section */}
      {tool.pricing && tool.pricing.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-black dark:text-zinc-50 mb-6">
            {tool.tool_name}&apos;s Pricing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tool.pricing.map((plan, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-zinc-800 rounded-xl p-6 hover:shadow-lg transition-shadow bg-white dark:bg-zinc-900"
              >
                <h3 className="text-xl font-bold text-black dark:text-zinc-50 mb-2">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-[#e94560]">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">/{plan.period}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <svg
                        className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <polyline points="20 6 9 17 4 12" strokeWidth="2"></polyline>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                {tool.tool_url && (
                  <Link
                    href={tool.tool_url}
                    className="block w-full text-center px-4 py-2 rounded-lg font-medium transition-colors bg-[#e94560] text-white hover:bg-[#c23a52]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Started
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tags Section */}
      {tool.tags && tool.tags.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-black dark:text-zinc-50 mb-6">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {tool.tags.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Share Section */}
      <Share />

      {/* Use Cases Section */}
      {tool.use_cases && tool.use_cases.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-black dark:text-zinc-50 mb-6">Use Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tool.use_cases.map((useCase, index) => (
              <div
                key={index}
                className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="font-semibold text-lg text-black dark:text-zinc-50 mb-2">
                  {useCase.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
