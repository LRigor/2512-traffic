import newsData from "@/data/news/list.json";

type NewsItem = {
  _id: string;
  slug: string;
  headline: string;
  thumbnail_image: string;
  summary: string;
  last_updated: string;
  category?: string;
  tags?: string[];
};

/**
 * Extracts all unique tags from news/list.json
 * @returns Sorted array of unique tag strings
 */
export function getNewsTags(): string[] {
  const items = newsData as NewsItem[];
  return Array.from(
    new Set(
      items.flatMap((item) => item.tags || []).filter((tag) => tag.trim())
    )
  ).sort();
}

