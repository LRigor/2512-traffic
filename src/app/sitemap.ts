import { MetadataRoute } from 'next';
import { getAllCategories, getCategoryData } from '@/lib/category-data';
import launchedTodayData from '@/data/launched-today.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://opentools.ai';
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/help`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Category pages
  const categories = getAllCategories();
  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/${category.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  // Tool detail pages
  const toolPages: MetadataRoute.Sitemap = [];
  
  categories.forEach((category) => {
    const categoryData = getCategoryData(category.id);
    
    if (categoryData?.data) {
      categoryData.data.forEach((tool) => {
        if (tool.slug) {
          toolPages.push({
            url: `${baseUrl}/${category.id}/${tool.slug}`,
            lastModified: tool.last_updated ? new Date(tool.last_updated) : new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
          });
        }
      });
    }
  });

  // Launched Today tool pages
  const launchedTodayPages: MetadataRoute.Sitemap = launchedTodayData.tools.map((tool) => ({
    url: `${baseUrl}/tool/${tool.slug}`,
    lastModified: tool.last_updated ? new Date(tool.last_updated) : new Date(),
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  // Combine all pages
  return [...staticPages, ...categoryPages, ...toolPages, ...launchedTodayPages];
}
