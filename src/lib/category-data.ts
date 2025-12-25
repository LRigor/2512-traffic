import categoriesData from "@/data/categories.json";
import aiAssistantData from "@/data/ai-assistant.json";
import contentCreationData from "@/data/content-creation.json";
import educationData from "@/data/education.json";
import type { CategoryData, CategoryItem } from "@/types/tools";

// Map category names to their data files
const categoryNameToData: Record<string, CategoryData> = {
  "AI Assistant": aiAssistantData as CategoryData,
  "Content Creation": contentCreationData as CategoryData,
  Education: educationData as CategoryData,
};

// Create mapping from slug (id) to category name
export const categorySlugToName: Record<string, string> = (
  categoriesData as CategoryItem[]
).reduce(
  (acc, item) => {
    acc[item.id] = item.category;
    return acc;
  },
  {} as Record<string, string>
);

// Create mapping from slug (id) to data
export const categoryDataMap: Record<string, CategoryData> = (
  categoriesData as CategoryItem[]
).reduce(
  (acc, item) => {
    acc[item.id] = categoryNameToData[item.category];
    return acc;
  },
  {} as Record<string, CategoryData>
);

// Get all categories
export const getAllCategories = (): CategoryItem[] => {
  return categoriesData as CategoryItem[];
};

// Get category name by slug
export const getCategoryName = (slug: string): string | undefined => {
  return categorySlugToName[slug];
};

// Get category description by slug
export const getCategoryDescription = (slug: string): string | undefined => {
  const categoryItem = (categoriesData as CategoryItem[]).find(
    (item) => item.id === slug
  );
  return categoryItem?.description;
};

// Get category data by slug
export const getCategoryData = (slug: string): CategoryData | undefined => {
  return categoryDataMap[slug];
};

// Get all tools from all categories
export const getAllTools = (): CategoryData["data"] => {
  return Object.values(categoryDataMap).flatMap((categoryData) => categoryData.data);
};

// Get category data by category name (e.g., "AI Assistant")
export const getCategoryDataByName = (categoryName: string): CategoryData | undefined => {
  return categoryNameToData[categoryName];
};

