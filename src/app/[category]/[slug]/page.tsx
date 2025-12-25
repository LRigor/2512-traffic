import { notFound } from "next/navigation";
import OpenAiToolsDetail from "@/components/OpenAiToolsDetail";
import aiAssistantData from "@/data/ai-assistant.json";
import contentCreationData from "@/data/content-creation.json";
import educationData from "@/data/education.json";

interface CategoryData {
  data: Array<{ slug?: string; [key: string]: unknown }>;
}

const categoryDataMap: Record<string, CategoryData> = {
  "ai-assistant": aiAssistantData as CategoryData,
  "content-creation": contentCreationData as CategoryData,
  education: educationData as CategoryData,
};

export async function generateStaticParams() {
  const params: Array<{ category: string; slug: string }> = [];

  // Iterate through each category
  for (const [category, categoryData] of Object.entries(categoryDataMap)) {
    // Get all tools for this category and generate params for each slug
    if (categoryData?.data && Array.isArray(categoryData.data)) {
      for (const tool of categoryData.data) {
        const slug = tool?.slug;
        if (slug && typeof slug === "string" && slug.trim().length > 0) {
          params.push({
            category: category,
            slug: slug.trim(),
          });
        }
      }
    }
  }

  return params;
}

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export default async function ToolDetailPage({ params }: PageProps) {
  const { category, slug } = await params;
  const categoryData = categoryDataMap[category];

  if (!categoryData) {
    notFound();
  }

  const tool = categoryData.data.find((t) => t.slug === slug);

  if (!tool) {
    notFound();
  }

  // Get all tools for similar tools lookup
  const allTools = [
    ...aiAssistantData.data,
    ...contentCreationData.data,
    ...educationData.data,
  ];

  return (
    <OpenAiToolsDetail
      tool={tool as unknown as Parameters<typeof OpenAiToolsDetail>[0]["tool"]}
      allTools={
        allTools as unknown as Parameters<
          typeof OpenAiToolsDetail
        >[0]["allTools"]
      }
    />
  );
}
