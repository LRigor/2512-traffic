const fs = require('fs');
const path = require('path');

const baseUrl = 'https://opentools.ai';

// Read all categories
const categoriesPath = path.join(__dirname, '../src/data/categories.json');
const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));

// Read launched today data
const launchedTodayPath = path.join(__dirname, '../src/data/launched-today.json');
const launchedTodayData = JSON.parse(fs.readFileSync(launchedTodayPath, 'utf8'));

const currentDate = new Date().toISOString();

// Static pages
const staticPages = [
  { url: baseUrl, priority: '1.0', changefreq: 'daily' },
  { url: `${baseUrl}/rankings`, priority: '0.95', changefreq: 'daily' },
  { url: `${baseUrl}/rankings/this-month`, priority: '0.9', changefreq: 'daily' },
  { url: `${baseUrl}/rankings/this-week`, priority: '0.9', changefreq: 'daily' },
  { url: `${baseUrl}/rankings/free`, priority: '0.9', changefreq: 'daily' },
  { url: `${baseUrl}/rankings/paid`, priority: '0.9', changefreq: 'daily' },
  { url: `${baseUrl}/news`, priority: '0.9', changefreq: 'daily' },
  { url: `${baseUrl}/about`, priority: '0.8', changefreq: 'monthly' },
  { url: `${baseUrl}/contact`, priority: '0.7', changefreq: 'monthly' },
  { url: `${baseUrl}/faq`, priority: '0.7', changefreq: 'monthly' },
  { url: `${baseUrl}/help`, priority: '0.7', changefreq: 'monthly' },
  { url: `${baseUrl}/privacy`, priority: '0.3', changefreq: 'yearly' },
  { url: `${baseUrl}/terms`, priority: '0.3', changefreq: 'yearly' },
];

// Category pages
const categoryPages = categories.map(category => ({
  url: `${baseUrl}/${category.id}`,
  priority: '0.9',
  changefreq: 'daily'
}));

// Tool detail pages
const toolPages = [];

categories.forEach(category => {
  const categoryDataPath = path.join(__dirname, `../src/data/${category.id}.json`);
  
  if (fs.existsSync(categoryDataPath)) {
    const categoryData = JSON.parse(fs.readFileSync(categoryDataPath, 'utf8'));
    
    if (categoryData.data) {
      categoryData.data.forEach(tool => {
        if (tool.slug) {
          toolPages.push({
            url: `${baseUrl}/${category.id}/${tool.slug}`,
            priority: '0.8',
            changefreq: 'weekly',
            lastmod: tool.last_updated || currentDate
          });
        }
      });
    }
  }
});

// Launched Today tool pages
const launchedTodayPages = launchedTodayData.tools.map(tool => ({
  url: `${baseUrl}/tool/${tool.slug}`,
  priority: '0.9',
  changefreq: 'daily',
  lastmod: tool.last_updated || currentDate
}));

// News pages
const newsPath = path.join(__dirname, '../src/data/news');
const newsList = JSON.parse(fs.readFileSync(path.join(newsPath, 'list.json'), 'utf8'));

// Combine all pages
const allPages = [...staticPages, ...categoryPages, ...toolPages, ...launchedTodayPages];

// Generate XML
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

allPages.forEach(page => {
  xml += '  <url>\n';
  xml += `    <loc>${page.url}</loc>\n`;
  xml += `    <lastmod>${page.lastmod || currentDate}</lastmod>\n`;
  xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
  xml += `    <priority>${page.priority}</priority>\n`;
  xml += '  </url>\n';
});

xml += '</urlset>';

// Write to public directory
const outputPath = path.join(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outputPath, xml, 'utf8');

console.log(`✅ Sitemap generated successfully at ${outputPath}`);
console.log(`📊 Total URLs: ${allPages.length}`);
