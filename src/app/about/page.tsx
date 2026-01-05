import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | OpenTools - Discover the Best AI Tools",
  description: "Learn about OpenTools, the leading AI tools directory helping millions discover, compare, and choose the best AI solutions for their needs.",
  keywords: ["about OpenTools", "AI tools directory", "AI tools comparison", "best AI tools", "AI discovery platform"],
  openGraph: {
    title: "About Us | OpenTools",
    description: "Learn about OpenTools, the leading AI tools directory helping millions discover and compare AI solutions.",
    type: "website",
    url: "https://opentools.ai/about",
  },
  twitter: {
    card: "summary",
    title: "About Us | OpenTools",
    description: "Learn about OpenTools, the leading AI tools directory helping millions discover and compare AI solutions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// 图标组件
const RocketIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const TargetIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

const ChartIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const HeartIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const LightbulbIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

// Section 组件
const Section = ({ 
  icon, 
  title, 
  children,
  className = ""
}: { 
  icon: React.ReactNode; 
  title: string; 
  children: React.ReactNode;
  className?: string;
}) => (
  <section className={`mb-8 p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 ${className}`}>
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-gradient-to-br from-[#e94560] to-[#c23a52] rounded-lg text-white">
        {icon}
      </div>
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
    </div>
    {children}
  </section>
);

// 统计卡片组件
const StatCard = ({ number, label, desc }: { number: string; label: string; desc: string }) => (
  <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100 hover:border-[#e94560] transition-all duration-300 hover:shadow-lg">
    <div className="text-4xl font-bold text-[#e94560] mb-2">{number}</div>
    <div className="text-lg font-semibold text-gray-900 mb-1">{label}</div>
    <div className="text-sm text-gray-600">{desc}</div>
  </div>
);

// 价值观卡片组件
const ValueCard = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 hover:border-[#e94560] transition-all duration-300 hover:shadow-lg">
    <div className="p-3 bg-gradient-to-br from-[#e94560] to-[#c23a52] rounded-lg text-white w-fit mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
  </div>
);

export default function AboutPage() {
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
          <RocketIcon />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About OpenTools</h1>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-lg">
          Your gateway to discovering, comparing, and choosing the best AI tools. 
          We help millions of users find the perfect AI solutions for their needs.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatCard 
          number="10,000+" 
          label="AI Tools" 
          desc="Curated and verified AI tools across all categories"
        />
        <StatCard 
          number="3M+" 
          label="Monthly Users" 
          desc="Professionals trusting our platform"
        />
        <StatCard 
          number="30,000+" 
          label="Reviews" 
          desc="Real user feedback and ratings"
        />
      </div>

      {/* Our Mission */}
      <Section icon={<TargetIcon />} title="Our Mission">
        <p className="text-gray-700 leading-relaxed mb-4">
          At OpenTools, our mission is to democratize access to AI technology by providing a comprehensive, 
          unbiased directory of the world&apos;s best AI tools. We believe that everyone should be able to 
          find and leverage AI solutions that enhance their productivity, creativity, and success.
        </p>
        <p className="text-gray-700 leading-relaxed">
          We curate, review, and rank thousands of AI tools across diverse categories—from AI assistants 
          and content creation to education and image generation. Our platform helps users make informed 
          decisions by providing detailed comparisons, user reviews, and expert insights.
        </p>
      </Section>

      {/* What We Offer */}
      <Section icon={<ChartIcon />} title="What We Offer">
        <div className="space-y-4 text-gray-700">
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex-shrink-0 w-8 h-8 bg-[#e94560] text-white rounded-full flex items-center justify-center font-semibold">
              1
            </div>
            <div>
              <strong className="text-gray-900">Comprehensive Directory:</strong> Browse over 10,000 AI tools 
              organized by category, use case, and features.
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex-shrink-0 w-8 h-8 bg-[#e94560] text-white rounded-full flex items-center justify-center font-semibold">
              2
            </div>
            <div>
              <strong className="text-gray-900">Detailed Comparisons:</strong> Compare pricing, features, 
              ratings, and user reviews to find the perfect fit.
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex-shrink-0 w-8 h-8 bg-[#e94560] text-white rounded-full flex items-center justify-center font-semibold">
              3
            </div>
            <div>
              <strong className="text-gray-900">Community-Driven:</strong> Real reviews and ratings from our 
              community of 3 million monthly users.
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex-shrink-0 w-8 h-8 bg-[#e94560] text-white rounded-full flex items-center justify-center font-semibold">
              4
            </div>
            <div>
              <strong className="text-gray-900">Daily Updates:</strong> Stay informed with daily launches, 
              trending tools, and featured recommendations.
            </div>
          </div>
        </div>
      </Section>

      {/* Our Values */}
      <Section icon={<HeartIcon />} title="Our Values">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ValueCard 
            icon={<TargetIcon />}
            title="Transparency"
            desc="We provide unbiased, honest reviews and comparisons to help you make informed decisions."
          />
          <ValueCard 
            icon={<UsersIcon />}
            title="Community First"
            desc="Our platform is built on real user feedback and experiences from millions of users worldwide."
          />
          <ValueCard 
            icon={<LightbulbIcon />}
            title="Innovation"
            desc="We constantly evolve to bring you the latest and most cutting-edge AI tools available."
          />
          <ValueCard 
            icon={<ChartIcon />}
            title="Quality"
            desc="Every tool is carefully vetted and categorized to ensure you get the best recommendations."
          />
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section icon={<LightbulbIcon />} title="Why Choose OpenTools?">
        <p className="text-gray-700 leading-relaxed mb-4">
          In a rapidly evolving AI landscape, finding the right tool can be overwhelming. OpenTools simplifies 
          this process by offering:
        </p>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3">
            <span className="text-[#e94560] mt-1">✓</span>
            <span><strong>Curated Selection:</strong> Only the best and most reliable AI tools make it to our directory</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#e94560] mt-1">✓</span>
            <span><strong>Time-Saving:</strong> Compare multiple tools in minutes instead of hours of research</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#e94560] mt-1">✓</span>
            <span><strong>Expert Insights:</strong> Detailed feature breakdowns, pricing analysis, and use case recommendations</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#e94560] mt-1">✓</span>
            <span><strong>Free Access:</strong> All our resources and comparisons are completely free to use</span>
          </li>
        </ul>
      </Section>

      {/* Join Our Community */}
      <div className="bg-gradient-to-br from-[#e94560] to-[#c23a52] rounded-2xl p-8 text-white text-center shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
        <p className="text-white/90 mb-6 max-w-2xl mx-auto">
          Become part of the world&apos;s largest AI tools community. Discover new tools daily, 
          share your experiences, and help others make better decisions.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link 
            href="/"
            className="px-6 py-3 bg-white text-[#e94560] rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Explore Tools
          </Link>
          <Link 
            href="/contact"
            className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/20"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
