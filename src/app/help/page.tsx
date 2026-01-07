import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Help Center | OpenTools - Get Support & Learn More",
  description: "Get help with OpenTools. Browse our guides, tutorials, and support resources to make the most of our AI tools directory.",
  keywords: ["help center", "support", "tutorials", "guides", "OpenTools help", "AI tools support"],
  openGraph: {
    title: "Help Center | OpenTools",
    description: "Get help with OpenTools. Browse our guides, tutorials, and support resources.",
    type: "website",
    url: "https://opentools.ai/help",
  },
  twitter: {
    card: "summary",
    title: "Help Center | OpenTools",
    description: "Get help with OpenTools. Browse our guides, tutorials, and support resources.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// 图标组件
const LifebuoyIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const BookIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const VideoIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const QuestionIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const ChatIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const LightbulbIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const RocketIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

// Help Category Card 组件
const HelpCard = ({ 
  icon, 
  title, 
  description, 
  link 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  link: string;
}) => (
  <Link
    href={link}
    className="block p-6 bg-white rounded-xl border border-gray-200 hover:border-[#e94560] hover:shadow-lg transition-all duration-300 group"
  >
    <div className="p-3 bg-gradient-to-br from-[#e94560] to-[#c23a52] rounded-lg text-white w-fit mb-4 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#e94560] transition-colors">
      {title}
    </h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
    <div className="mt-4 inline-flex items-center gap-2 text-[#e94560] font-medium">
      Learn more
      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </Link>
);

// Guide Item 组件
const GuideItem = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
}) => (
  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
    <div className="flex-shrink-0 p-2 bg-white rounded-lg text-[#e94560] border border-gray-200">
      {icon}
    </div>
    <div>
      <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  </div>
);

export default function HelpPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Back Link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-[#e94560] hover:text-[#c23a52] mb-8 group transition-colors"
      >
        <svg 
          className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="font-medium">Back to Home</span>
      </Link>

      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex p-4 bg-gradient-to-br from-[#e94560] to-[#c23a52] rounded-2xl text-white mb-6 shadow-lg">
          <LifebuoyIcon />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-lg">
          Welcome to the OpenTools Help Center. Find guides, tutorials, and answers 
          to help you discover and use AI tools effectively.
        </p>
      </div>

      {/* Main Help Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <HelpCard
          icon={<BookIcon />}
          title="Getting Started Guide"
          description="New to OpenTools? Learn how to navigate our directory, search for tools, and make the most of our features."
          link="/faq"
        />
        <HelpCard
          icon={<SearchIcon />}
          title="Finding the Right Tool"
          description="Discover how to use filters, categories, and comparisons to find the perfect AI tool for your needs."
          link="/faq"
        />
        <HelpCard
          icon={<QuestionIcon />}
          title="Frequently Asked Questions"
          description="Browse our comprehensive FAQ section for quick answers to common questions about OpenTools."
          link="/faq"
        />
        <HelpCard
          icon={<ChatIcon />}
          title="Contact Support"
          description="Can't find what you're looking for? Our support team is ready to help you with any questions."
          link="/contact"
        />
      </div>

      {/* Popular Topics */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-[#e94560] to-[#c23a52] rounded-lg text-white">
            <LightbulbIcon />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">Popular Topics</h2>
        </div>
        <div className="space-y-3">
          <GuideItem
            icon={<SearchIcon />}
            title="How to Search for AI Tools"
            description="Learn how to use our search and filter features to quickly find tools that match your requirements."
          />
          <GuideItem
            icon={<BookIcon />}
            title="Understanding Tool Ratings"
            description="Discover how our rating system works and how to interpret user reviews and ratings."
          />
          <GuideItem
            icon={<VideoIcon />}
            title="Comparing Multiple Tools"
            description="Find out how to compare features, pricing, and reviews across different AI tools."
          />
          <GuideItem
            icon={<RocketIcon />}
            title="Using Categories Effectively"
            description="Navigate through our categories to discover tools organized by use case and functionality."
          />
        </div>
      </section>

      {/* Quick Tips */}
      <section className="mb-12">
        <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-[#e94560] to-[#c23a52] rounded-lg text-white">
              <LightbulbIcon />
            </div>
            Quick Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <span className="text-[#e94560] mt-1 flex-shrink-0">✓</span>
              <p className="text-gray-700"><strong>Use Filters:</strong> Narrow down results by pricing, rating, or features</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#e94560] mt-1 flex-shrink-0">✓</span>
              <p className="text-gray-700"><strong>Read Reviews:</strong> Check user experiences before trying a tool</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#e94560] mt-1 flex-shrink-0">✓</span>
              <p className="text-gray-700"><strong>Save Favorites:</strong> Click the heart icon to bookmark tools you like</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#e94560] mt-1 flex-shrink-0">✓</span>
              <p className="text-gray-700"><strong>Check Alternatives:</strong> Explore similar tools for better options</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#e94560] mt-1 flex-shrink-0">✓</span>
              <p className="text-gray-700"><strong>Try Free Versions:</strong> Many tools offer free trials or tiers</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#e94560] mt-1 flex-shrink-0">✓</span>
              <p className="text-gray-700"><strong>Stay Updated:</strong> Check "Launched Today" for newest tools</p>
            </div>
          </div>
        </div>
      </section>

      {/* Support Resources */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-[#e94560] to-[#c23a52] rounded-lg text-white">
            <BookIcon />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">Support Resources</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white rounded-xl border border-gray-200 hover:border-[#e94560] transition-colors">
            <div className="inline-flex p-3 bg-gray-100 rounded-full text-[#e94560] mb-4">
              <BookIcon />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Documentation</h3>
            <p className="text-sm text-gray-600">Detailed guides and documentation</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl border border-gray-200 hover:border-[#e94560] transition-colors">
            <div className="inline-flex p-3 bg-gray-100 rounded-full text-[#e94560] mb-4">
              <VideoIcon />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Video Tutorials</h3>
            <p className="text-sm text-gray-600">Step-by-step video guides</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl border border-gray-200 hover:border-[#e94560] transition-colors">
            <div className="inline-flex p-3 bg-gray-100 rounded-full text-[#e94560] mb-4">
              <ChatIcon />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Community Forum</h3>
            <p className="text-sm text-gray-600">Connect with other users</p>
          </div>
        </div>
      </section>

      {/* Contact Support CTA */}
      <div className="bg-gradient-to-br from-[#e94560] to-[#c23a52] rounded-2xl p-8 text-white text-center shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
        <p className="text-white/90 mb-6 max-w-2xl mx-auto">
          Our support team is here to assist you. Get in touch and we&apos;ll help you find 
          the answers you need.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link 
            href="/faq"
            className="px-6 py-3 bg-white text-[#e94560] rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Browse FAQs
          </Link>
          <Link 
            href="/contact"
            className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/20"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
