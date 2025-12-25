import { notFound } from "next/navigation";
import OpenAiToolsCard from "@/components/OpenAiToolsCard";
import aiAssistantData from "@/data/ai-assistant.json";
import contentCreationData from "@/data/content-creation.json";
import educationData from "@/data/education.json";
import Breadcrumb from "@/components/ui/Breadcrumb";

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

// Map category slugs to category names and data
const categorySlugToName: Record<string, string> = {
  "ai-assistant": "AI Assistant",
  "content-creation": "Content Creation",
  education: "Education",
};

const categoryDataMap: Record<string, CategoryData> = {
  "ai-assistant": aiAssistantData as CategoryData,
  "content-creation": contentCreationData as CategoryData,
  education: educationData as CategoryData,
};

export async function generateStaticParams() {
  return Object.keys(categoryDataMap).map((category) => ({
    category,
  }));
}

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const categoryData = categoryDataMap[category];

  if (!categoryData) {
    notFound();
  }

  const categoryName = categorySlugToName[category] || category;
  const tools = categoryData.data || [];

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumb
          items={[
            { label: "home", href: "/" },
            { label: category, href: `/${category}` },
          ]}
          className="mb-6"
        />
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-4">
            {categoryName}
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            {tools.length} tools in this category
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tools.map(
            (
              tool: Tool & { average_rating?: number | null },
              index: number
            ) => (
              <OpenAiToolsCard
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
      </main>
    </div>
  );
}
