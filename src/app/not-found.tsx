"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import homeData from "@/data/home.json";
import { trackEvent } from "@/utils/umami";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  const { featured } = homeData;

  useEffect(() => {
    setMounted(true);
    // 追踪 404 页面访问
    trackEvent("404_page_view", {
      path: window.location.pathname,
    });
  }, []);

  const handleLinkClick = (linkName: string, linkUrl: string) => {
    trackEvent("404_link_click", {
      link_name: linkName,
      link_url: linkUrl,
    });
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-12">
      {/* 404 插图区域 */}
      <div className="text-center mb-12">
        {/* 大号 404 */}
        <div className="relative mb-8">
          <h1 className="text-[150px] md:text-[200px] font-black text-gray-100 dark:text-zinc-800 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl md:text-7xl animate-bounce">🔍</div>
          </div>
        </div>

        {/* 错误信息 */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* 操作按钮 */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <Link
            href="/"
            onClick={() => handleLinkClick("Back to Home", "/")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#e94560] text-white font-semibold rounded-lg hover:bg-[#d63850] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Back to Home
          </Link>

          <Link
            href="/rankings"
            onClick={() => handleLinkClick("View Rankings", "/rankings")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-300 font-semibold rounded-lg border-2 border-gray-200 dark:border-zinc-700 hover:border-[#e94560] hover:text-[#e94560] transition-all duration-300"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
            View Rankings
          </Link>
        </div>
      </div>

      {/* 推荐内容 */}
      {mounted && featured && featured.items && (
        <div className="max-w-6xl w-full">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Explore Popular AI Tools
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Check out these trending tools instead
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.items.slice(0, 4).map((item: any) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() =>
                  handleLinkClick(`Featured Tool: ${item.name}`, item.href)
                }
                className="group block border border-gray-200 dark:border-zinc-700 rounded-xl p-4 hover:shadow-lg hover:border-[#e94560] transition-all duration-300 bg-white dark:bg-zinc-800"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="shrink-0 relative">
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={48}
                      height={48}
                      className="rounded-lg"
                    />
                    <div className="absolute inset-0 bg-[#e94560]/0 group-hover:bg-[#e94560]/10 rounded-lg transition-colors duration-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 dark:text-white truncate group-hover:text-[#e94560] transition-colors">
                      {item.name}
                    </h4>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 帮助链接 */}
      <div className="mt-12 text-center">
        <p className="text-gray-500 dark:text-gray-400 mb-4">Need help?</p>
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
          <Link
            href="/help"
            onClick={() => handleLinkClick("Help Center", "/help")}
            className="text-gray-600 dark:text-gray-400 hover:text-[#e94560] transition-colors"
          >
            Help Center
          </Link>
          <Link
            href="/contact"
            onClick={() => handleLinkClick("Contact Us", "/contact")}
            className="text-gray-600 dark:text-gray-400 hover:text-[#e94560] transition-colors"
          >
            Contact Us
          </Link>
          <Link
            href="/faq"
            onClick={() => handleLinkClick("FAQ", "/faq")}
            className="text-gray-600 dark:text-gray-400 hover:text-[#e94560] transition-colors"
          >
            FAQ
          </Link>
        </div>
      </div>
    </div>
  );
}

