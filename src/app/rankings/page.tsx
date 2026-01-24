import type { Metadata } from "next";
import Link from "next/link";
import RankingsList from "@/components/RankingsList";

export const metadata: Metadata = {
  title: "Top AI Tools Rankings 2026 | Best AI Tools List",
  description: "Discover the top-ranked AI tools of 2026. Browse rankings by popularity, category, and user ratings. Find the best AI tools for your needs.",
  keywords: ["AI tools rankings", "best AI tools", "top AI tools 2026", "AI tool ratings", "popular AI tools"],
  openGraph: {
    title: "Top AI Tools Rankings 2026 | OpenTools",
    description: "Discover the top-ranked AI tools of 2026. Browse rankings by popularity, category, and user ratings.",
    type: "website",
  },
};

export default function RankingsPage() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 border-b border-gray-200 dark:border-zinc-800 mb-8 overflow-hidden">
        {/* 装饰背景 */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#e94560]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-20">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 mb-6">
            {/* 左侧图标 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#e94560] to-[#c23a52] rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-[#e94560] to-[#c23a52] rounded-2xl flex items-center justify-center shadow-2xl shadow-[#e94560]/30 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-11 h-11 md:w-14 md:h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                {/* 脉冲光晕 */}
                <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse"></div>
              </div>
            </div>
            
            {/* 中间内容 */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h1 className="text-5xl md:text-6xl font-black text-black dark:text-zinc-50 tracking-tight">
                  AI Tools Rankings
                </h1>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#e94560]/10 border border-[#e94560]/30 rounded-full">
                  <div className="w-2 h-2 bg-[#e94560] rounded-full animate-pulse"></div>
                  <span className="text-sm font-bold text-[#e94560]">LIVE</span>
                </div>
              </div>
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mb-4 leading-relaxed">
                Discover the best AI tools ranked by popularity, user ratings, and usage.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold">Updated Daily</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  <span className="font-semibold">1000+ Tools</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-semibold">Verified Reviews</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold">2026 Latest</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mb-12">
        {/* Ranking Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            <Link
              href="/rankings"
              className="px-6 py-3 rounded-lg font-medium transition-all bg-[#e94560] text-white shadow-lg"
            >
              🏆 All Time
            </Link>
            <Link
              href="/rankings/this-month"
              className="px-6 py-3 rounded-lg font-medium transition-all bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-zinc-700 hover:border-[#e94560] hover:text-[#e94560]"
            >
              📅 This Month
            </Link>
            <Link
              href="/rankings/this-week"
              className="px-6 py-3 rounded-lg font-medium transition-all bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-zinc-700 hover:border-[#e94560] hover:text-[#e94560]"
            >
              🔥 This Week
            </Link>
            <Link
              href="/rankings/free"
              className="px-6 py-3 rounded-lg font-medium transition-all bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-zinc-700 hover:border-[#e94560] hover:text-[#e94560]"
            >
              🆓 Free Tools
            </Link>
            <Link
              href="/rankings/paid"
              className="px-6 py-3 rounded-lg font-medium transition-all bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-zinc-700 hover:border-[#e94560] hover:text-[#e94560]"
            >
              💎 Paid Tools
            </Link>
          </div>
        </div>

        <RankingsList period="all-time" />
      </div>
    </>
  );
}
