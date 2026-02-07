export type NewsSection = {
  heading: string;
  paragraphs: string[];
};

export type NewsDetailContent = {
  subtitle?: string;
  table_of_contents?: string[];
  sections?: NewsSection[];
};

export type NewsItem = {
  _id: string;
  slug: string;
  headline: string;
  thumbnail_image: string;
  summary: string;
  last_updated: string;
  category?: string;
  tags?: string[];
};
