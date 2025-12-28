import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/ui/Breadcrumb";
import FavouriteButton from "@/components/FavouriteButton";
import Description from "@/components/Description";
import Features from "@/components/Features";
import FAQs from "@/components/FAQs";
import Pricing from "@/components/Pricing";
import Tags from "@/components/Tags";
import Reviews from "@/components/Reviews";
import UseCases from "@/components/UseCases";
import Alternatives from "@/components/Alternatives";
import Share from "@/components/Share";
import { formatDate } from "@/utils/formatDate";
import OpenToolsBadge from "@/components/OpenToolsBadge";
import StarRating from "@/components/StarRating";
import {
  getCategoryData,
  getCategoryName,
  getAllTools,
  getAllCategories,
} from "@/lib/category-data";
import type { Tool } from "@/types/tools";

export async function generateStaticParams() {
  const params: Array<{ category: string; slug: string }> = [];
  const categories = getAllCategories();

  for (const categoryItem of categories) {
    const categoryData = getCategoryData(categoryItem.id);

    if (categoryData?.data && Array.isArray(categoryData.data)) {
      for (const tool of categoryData.data) {
        if (tool.slug && typeof tool.slug === "string" && tool.slug.trim()) {
          params.push({
            category: categoryItem.id,
            slug: tool.slug.trim(),
          });
        }
      }
    }
  }

  return params;
}

interface ToolDetailPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ToolDetailPageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const categoryData = getCategoryData(category);

  if (!categoryData) {
    return {
      title: "Tool Not Found",
    };
  }

  const tool = categoryData.data.find((t) => t.slug === slug) as
    | Tool
    | undefined;

  if (!tool) {
    return {
      title: "Tool Not Found",
    };
  }

  return {
    title: `${tool.tool_name} - ${tool.headline}`,
    description: tool.headline || `Learn more about ${tool.tool_name}`,
  };
}

export default async function ToolDetailPage({ params }: ToolDetailPageProps) {
  const { category, slug } = await params;
  const categoryData = getCategoryData(category);

  if (!categoryData) {
    notFound();
  }

  const tool = categoryData.data.find((t) => t.slug === slug) as
    | Tool
    | undefined;

  if (!tool) {
    notFound();
  }

  const categoryName = getCategoryName(category) || category;
  const allTools = getAllTools();

  // Ensure tool has category_slug for breadcrumb
  const toolWithCategory = {
    ...tool,
    category_slug: tool.category_slug || category,
  };

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: categoryName, href: `/${category}` },
          { label: tool.slug.charAt(0).toUpperCase() + tool.slug.slice(1) },
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
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex gap-4">
                <h1 className="text-4xl font-bold text-black">
                  {tool.tool_name}
                </h1>
                <FavouriteButton favouriteCount={tool.favouriteCount} />
              </div>
              {tool.tool_url && (
                <Link
                  href={tool.tool_url}
                  className="px-6 py-2 rounded-md font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Check out {tool.tool_name}
                </Link>
              )}
            </div>
            <div className="flex items-center gap-4 mb-4">
              <OpenToolsBadge
                favouriteCount={tool.favouriteCount}
                slug={tool.slug}
              />
              <Link
                href="https://opentools.ai/friends/claim-tool?tool_id=669930dc46403d98189af85a"
                className="text-blue-600 hover:underline text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Claim Tool
              </Link>
            </div>
            {tool.last_updated && (
              <p className="text-sm text-gray-600 mb-4">
                Last updated: {formatDate(tool.last_updated, "long")}
              </p>
            )}
            <div className="flex items-center gap-2 mb-4">
              <StarRating rating={tool.average_rating ?? 0} />
              {tool.review_count !== undefined && (
                <span className="text-sm text-gray-600 ml-2">
                  {tool.review_count} reviews
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <Description tool={toolWithCategory} />
      <Features tool={toolWithCategory} />
      <FAQs tool={toolWithCategory} />
      <Pricing tool={toolWithCategory} />
      <Tags tool={toolWithCategory} />
      <Share />
      <Reviews />
      <Alternatives tool={toolWithCategory} allTools={allTools} />
      <UseCases tool={toolWithCategory} />
    </>
  );
}
