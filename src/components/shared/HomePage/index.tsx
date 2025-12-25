import AICard from "../AICard";
import categoriesData from "@/data/categories.json";
import aiAssistantData from "@/data/ai-assistant.json";
import contentCreationData from "@/data/content-creation.json";
import educationData from "@/data/education.json";

interface Tool {
  id: string;
  tool_name: string;
  headline: string;
  category: string;
  thumbnail_image: string;
  favouriteCount: number;
  average_rating: number;
  slug?: string;
}

interface CategoryData {
  data: Tool[];
}

// Map category names to their data files
const categoryDataMap: Record<string, CategoryData> = {
  "AI Assistant": aiAssistantData as CategoryData,
  "Content Creation": contentCreationData as CategoryData,
  "Education": educationData as CategoryData,
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-4">
            AI Tools Directory
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Discover the best AI tools organized by category
          </p>
        </div>

        {/* Category Sections */}
        {categoriesData.map((categoryItem) => {
          const categoryData = categoryDataMap[categoryItem.category];
          const tools = categoryData?.data || [];

          return (
            <section key={categoryItem.category} className="mb-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-black dark:text-zinc-50">
                  {categoryItem.category}
                </h2>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  {categoryItem.count} tools
                </span>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {tools.slice(0, 10).map((tool: Tool, index: number) => (
                  <AICard
                    key={tool.id}
                    rank={index + 1}
                    tool_name={tool.tool_name}
                    headline={tool.headline}
                    category={tool.category}
                    thumbnail_image={tool.thumbnail_image}
                    favouriteCount={tool.favouriteCount}
                    average_rating={tool.average_rating}
                    slug={tool.slug}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}

