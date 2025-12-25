import Link from "next/link";
import Card from "@/components/Card";
import { getAllCategories, getCategoryDataByName } from "@/lib/category-data";
import type { Tool } from "@/types/tools";

export default function Home() {
  const categories = getAllCategories();

  return (
    <>
      {/* Category Sections */}
      {categories.map((categoryItem) => {
        const categoryData = getCategoryDataByName(categoryItem.category);
        const tools = categoryData?.data || [];

        return (
          <section key={categoryItem.id} className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <Link href={`/${categoryItem.id}`}>
                <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 hover:text-gray-600 dark:hover:text-gray-400 transition-colors cursor-pointer">
                  {categoryItem.category}
                </h2>
              </Link>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {tools
                .slice(0, 10)
                .map(
                  (
                    tool: Tool & { average_rating?: number | null },
                    index: number
                  ) => (
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
                  )
                )}
            </div>
          </section>
        );
      })}
    </>
  );
}
