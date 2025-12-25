export interface PricingPlan {
  title: string;
  price: number;
  currency: string;
  cost_frequency: string;
  features: string[];
  _id: string;
}

export interface Tool {
  id: string;
  tool_name: string;
  headline: string;
  category: string;
  thumbnail_image: string;
  category_slug?: string;
  slug: string;
  average_rating: number | null;
  review_count?: number;
  favouriteCount: number;
  features?: string[];
  pricing_plans?: PricingPlan[];
  last_updated?: string;
  tags?: string[];
  similar_tools?: Array<{ id: string; tool_name: string }>;
  faqs?: Array<{ question: string; answer: string; _id: string }>;
  description?: string;
}

export interface CategoryData {
  data: Tool[];
}

export interface CategoryItem {
  id: string;
  category: string;
  count?: number;
  description?: string;
}

