import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Card from "@/components/Card";
import Breadcrumb from "@/components/ui/Breadcrumb";
import {
  getAllCategories,
  getCategoryName,
  getCategoryData,
  getCategoryDescription,
} from "@/lib/category-data";

export async function generateStaticParams() {
  try {
    const categories = getAllCategories();
    // Ensure we return valid params for static export
    if (!categories || categories.length === 0) {
      return [];
    }
    const params = categories
      .filter((item) => item.id && typeof item.id === "string" && item.id.trim() !== "")
      .map((item) => ({
        category: item.id.trim(),
      }));
    
    // Ensure we always return an array
    return params.length > 0 ? params : [];
  } catch (error) {
    console.error("Error generating static params for categories:", error);
    return [];
  }
}

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryName = getCategoryName(category);

  if (!categoryName) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${categoryName} - AI Tools Directory`,
    description: `Browse ${categoryName.toLowerCase()} tools in our directory`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryData = getCategoryData(category);

  if (!categoryData) {
    notFound();
  }

  const categoryName = getCategoryName(category) || category;
  const categoryDescription = getCategoryDescription(category);
  const tools = categoryData.data || [];

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: categoryName, href: `/${category}` },
        ]}
        className="mb-6"
      />
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-4">
          {categoryName}
        </h1>
        {categoryDescription && (
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-2">
            {categoryDescription}
          </p>
        )}
      </div>

      {/* Cards Grid */}
      {tools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tools.map((tool, index) => (
            <Card
              key={tool.id}
              rank={index + 1}
              tool_name={tool.tool_name}
              headline={tool.headline}
              category={tool.category}
              thumbnail_image={tool.thumbnail_image}
              favouriteCount={tool.favouriteCount}
              average_rating={tool.average_rating ?? 0}
              slug={tool.slug}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No tools found in this category.
          </p>
        </div>
      )}
    </>
  );
}
