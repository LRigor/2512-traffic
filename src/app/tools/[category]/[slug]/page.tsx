import { notFound } from "next/navigation";
import AICardDetail from "@/components/shared/AICardDetail";
import aiAssistantData from "@/data/ai-assistant.json";
import contentCreationData from "@/data/content-creation.json";
import educationData from "@/data/education.json";

const categoryDataMap: Record<string, any> = {
  "ai-assistant": aiAssistantData,
  "content-creation": contentCreationData,
  "education": educationData,
};

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

  const tool = categoryData.data.find(
    (t: any) => t.slug === slug
  );

  if (!tool) {
    notFound();
  }

  // Get all tools for similar tools lookup
  const allTools = [
    ...aiAssistantData.data,
    ...contentCreationData.data,
    ...educationData.data,
  ];

  return <AICardDetail tool={tool} allTools={allTools} />;
}

