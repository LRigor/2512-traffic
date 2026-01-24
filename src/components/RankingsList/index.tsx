"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getAllCategories, getCategoryData } from "@/lib/category-data";
import type { Tool } from "@/types/tools";

interface RankingsListProps {
  period: "all-time" | "this-month" | "this-week" | "free" | "paid";
}

export default function RankingsList({ period }: RankingsListProps) {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 获取所有工具
    const categories = getAllCategories();
    const allTools: Tool[] = [];

    categories.forEach((category) => {
      const categoryData = getCategoryData(category.id);
      if (categoryData?.data) {
        allTools.push(...categoryData.data);
      }
    });

    // 根据不同排行榜类型排序
    let sortedTools: Tool[] = [];

    switch (period) {
      case "all-time":
        sortedTools = [...allTools].sort((a, b) => (b.favouriteCount || 0) - (a.favouriteCount || 0));
        break;
      case "this-month":
        sortedTools = [...allTools].sort((a, b) => (b.monthFavourites || 0) - (a.monthFavourites || 0));
        break;
      case "this-week":
        sortedTools = [...allTools].sort((a, b) => (b.todayFavourites || 0) - (a.todayFavourites || 0));
        break;
      case "free":
        sortedTools = [...allTools]
          .filter((tool) => {
            if (!tool.pricing_plans || tool.pricing_plans.length === 0) {
              return true;
            }
            const hasFreePrice = tool.pricing_plans.some((plan) => plan.price === 0 || plan.price === null);
            return hasFreePrice;
          })
          .sort((a, b) => (b.favouriteCount || 0) - (a.favouriteCount || 0));
        break;
      case "paid":
        sortedTools = [...allTools]
          .filter((tool) => {
            if (!tool.pricing_plans || tool.pricing_plans.length === 0) {
              return false;
            }
            const hasPaidPrice = tool.pricing_plans.some((plan) => plan.price !== null && plan.price > 0);
            return hasPaidPrice;
          })
          .sort((a, b) => (b.favouriteCount || 0) - (a.favouriteCount || 0));
        break;
    }

    setTools(sortedTools.slice(0, period === "all-time" ? 20 : period === "free" || period === "paid" ? 15 : 10));
    setLoading(false);
  }, [period]);

  const getTitle = () => {
    switch (period) {
      case "all-time":
        return "All-Time Top AI Tools";
      case "this-month":
        return "Top AI Tools This Month";
      case "this-week":
        return "Top AI Tools This Week";
      case "free":
        return "Top Free AI Tools";
      case "paid":
        return "Top Paid AI Tools";
    }
  };

  const getDescription = () => {
    switch (period) {
      case "all-time":
        return "The most popular AI tools of all time, ranked by total favorites";
      case "this-month":
        return "Trending AI tools this month, ranked by monthly favorites";
      case "this-week":
        return "Hot AI tools this week, ranked by recent activity";
      case "free":
        return "Best free AI tools available, ranked by popularity";
      case "paid":
        return "Best paid AI tools worth investing in, ranked by popularity";
    }
  };

  // 获取信息框样式（不同页面不同颜色）
  const getInfoBoxStyle = () => {
    switch (period) {
      case "all-time":
        return "bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-l-4 border-purple-500";
      case "this-month":
        return "bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-l-4 border-blue-500";
      case "this-week":
        return "bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-l-4 border-orange-500";
      case "free":
        return "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-l-4 border-green-500";
      case "paid":
        return "bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border-l-4 border-amber-500";
    }
  };

  // 获取排名徽章样式（5种完全不同的风格）
  const getRankBadgeStyle = (index: number) => {
    const baseStyle = "shrink-0 flex items-center justify-center font-bold shadow-lg";
    const pulseClass = index < 3 ? "animate-badge-pulse" : ""; // 前三名添加脉冲动画
    
    switch (period) {
      case "all-time":
        // All-Time: 经典圆角方形，金银铜渐变 + 大数字
        if (index === 0) return `${baseStyle} ${pulseClass} w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 text-white text-2xl md:text-4xl`;
        if (index === 1) return `${baseStyle} ${pulseClass} w-14 h-14 md:w-18 md:h-18 rounded-2xl bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 text-white text-xl md:text-3xl`;
        if (index === 2) return `${baseStyle} ${pulseClass} w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 text-white text-xl md:text-3xl`;
        return `${baseStyle} w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-800 dark:to-purple-900 text-purple-700 dark:text-purple-300 text-lg md:text-2xl border-2 border-purple-300 dark:border-purple-700`;
      
      case "this-month":
        // This Month: 大圆形徽章，蓝色系 + 超大数字
        if (index === 0) return `${baseStyle} ${pulseClass} w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white text-3xl md:text-5xl ring-4 md:ring-6 ring-blue-200 dark:ring-blue-800`;
        if (index === 1) return `${baseStyle} ${pulseClass} w-18 h-18 md:w-22 md:h-22 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 text-white text-2xl md:text-4xl ring-4 ring-cyan-200 dark:ring-cyan-800`;
        if (index === 2) return `${baseStyle} ${pulseClass} w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 text-white text-2xl md:text-3xl ring-4 ring-sky-200 dark:ring-sky-800`;
        return `${baseStyle} w-12 h-12 md:w-16 md:h-16 rounded-full bg-white dark:bg-zinc-800 text-blue-700 dark:text-blue-300 text-lg md:text-2xl border-2 border-blue-300 dark:border-blue-700 font-extrabold`;
      
      case "this-week":
        // This Week: 六边形旋转风格，火焰色系 + 旋转数字
        if (index === 0) return `${baseStyle} ${pulseClass} w-20 h-20 md:w-24 md:h-24 rounded-2xl rotate-45 bg-gradient-to-br from-red-500 via-orange-500 to-pink-600 text-white text-3xl md:text-5xl`;
        if (index === 1) return `${baseStyle} ${pulseClass} w-18 h-18 md:w-22 md:h-22 rounded-2xl rotate-45 bg-gradient-to-br from-orange-500 via-red-500 to-yellow-600 text-white text-2xl md:text-4xl`;
        if (index === 2) return `${baseStyle} ${pulseClass} w-16 h-16 md:w-20 md:h-20 rounded-2xl rotate-45 bg-gradient-to-br from-yellow-500 via-orange-500 to-red-600 text-white text-2xl md:text-3xl`;
        return `${baseStyle} w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-800 dark:to-red-800 text-orange-700 dark:text-orange-300 text-lg md:text-2xl`;
      
      case "free":
        // Free: 圆角正方形，绿色清新 + 边框数字
        if (index === 0) return `${baseStyle} ${pulseClass} w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 text-white text-2xl md:text-4xl shadow-green-500/50 border-4 border-green-200`;
        if (index === 1) return `${baseStyle} ${pulseClass} w-14 h-14 md:w-18 md:h-18 rounded-xl bg-gradient-to-br from-teal-400 to-green-600 text-white text-xl md:text-3xl shadow-teal-500/50 border-4 border-teal-200`;
        if (index === 2) return `${baseStyle} ${pulseClass} w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-lime-400 to-green-600 text-white text-xl md:text-3xl shadow-lime-500/50 border-4 border-lime-200`;
        return `${baseStyle} w-12 h-12 md:w-14 md:h-14 rounded-lg bg-white dark:bg-green-900/30 text-green-700 dark:text-green-300 text-lg md:text-2xl border-2 border-green-400 dark:border-green-600`;
      
      case "paid":
        // Paid: 豪华钻石形状，金色奢华 + 超大数字 + 强阴影
        if (index === 0) return `${baseStyle} ${pulseClass} w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 text-white text-3xl md:text-6xl shadow-2xl shadow-amber-500/60 border-[3px] border-yellow-300`;
        if (index === 1) return `${baseStyle} ${pulseClass} w-18 h-18 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 text-white text-2xl md:text-5xl shadow-xl shadow-yellow-500/50 border-[3px] border-amber-300`;
        if (index === 2) return `${baseStyle} ${pulseClass} w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-orange-300 via-amber-400 to-orange-500 text-white text-2xl md:text-4xl shadow-lg shadow-orange-500/40 border-[3px] border-orange-300`;
        return `${baseStyle} w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-amber-50 to-yellow-100 dark:from-amber-900/40 dark:to-yellow-900/40 text-amber-700 dark:text-amber-300 text-lg md:text-2xl border-2 border-amber-400 dark:border-amber-600`;
    }
  };

  // 获取排名数字的容器样式（用于旋转的this-week）
  const getRankNumberStyle = (index: number) => {
    if (period === "this-week" && index < 3) {
      return "-rotate-45"; // 反向旋转文字
    }
    return "";
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block w-8 h-8 border-4 border-[#e94560] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 dark:text-gray-400 mt-4">Loading rankings...</p>
      </div>
    );
  }

  return (
    <>
      {/* Current Ranking Info - 5种完全不同的设计 */}
      {period === "all-time" && (
        <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-purple-50 via-indigo-50 to-purple-50 dark:from-purple-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 border-l-8 border-purple-500 p-8">
          {/* 装饰 */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-4 -right-4 text-purple-200/20 dark:text-purple-800/20">
            <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 bg-purple-500/20 rounded-full">
              <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">LEGENDARY</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-3 text-gray-900 dark:text-white tracking-tight">
              {getTitle()}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-2 max-w-3xl">
              {getDescription()}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              📊 Showing top {tools.length} tools
            </p>
          </div>
        </div>
      )}

      {period === "this-month" && (
        <div className="relative mb-10 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-100 via-cyan-50 to-sky-100 dark:from-blue-900/30 dark:via-cyan-900/20 dark:to-sky-900/30 border-4 border-blue-400 dark:border-blue-600 p-10 text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-400/20 rounded-full blur-3xl" />
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-blue-500 rounded-2xl shadow-lg shadow-blue-500/50">
              <svg className="w-9 h-9 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold mb-4 text-blue-900 dark:text-blue-100 tracking-tight">
              {getTitle()}
            </h2>
            <p className="text-xl text-blue-800 dark:text-blue-200 mb-3 max-w-2xl mx-auto leading-relaxed">
              {getDescription()}
            </p>
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-blue-500 text-white rounded-full font-bold text-sm">
              <span>📈</span>
              <span>Top {tools.length} trending this month</span>
            </div>
          </div>
        </div>
      )}

      {period === "this-week" && (
        <div className="relative mb-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 opacity-10 dark:opacity-20 animate-pulse" />
          <div className="relative bg-gradient-to-tr from-orange-50 via-red-50 to-yellow-50 dark:from-orange-900/20 dark:via-red-900/20 dark:to-yellow-900/20 border-2 border-dashed border-orange-500 dark:border-orange-600 rounded-xl p-6 transform hover:scale-[1.01] transition-transform">
            <div className="flex items-start gap-4">
              <div className="shrink-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-orange-500 rounded-2xl blur-xl opacity-50 animate-pulse" />
                  <div className="relative flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl shadow-xl">
                    <svg className="w-11 h-11 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded uppercase tracking-wide animate-pulse">
                    🔥 HOT
                  </span>
                  <span className="text-xs text-orange-700 dark:text-orange-300 font-semibold">This Week</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black mb-2 text-gray-900 dark:text-white">
                  {getTitle()}
                </h2>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-2">
                  {getDescription()}
                </p>
                <p className="text-sm text-orange-700 dark:text-orange-400 font-bold">
                  ⚡ {tools.length} hottest tools right now
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {period === "free" && (
        <div className="relative mb-8 overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 border-2 border-green-300 dark:border-green-700 shadow-lg shadow-green-500/20">
          <div className="absolute inset-0 bg-gradient-to-r from-green-50/80 to-emerald-50/80 dark:from-green-900/10 dark:to-emerald-900/10" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6 p-8">
            <div className="shrink-0 flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-3xl shadow-xl shadow-green-500/40 transform -rotate-6">
              <svg className="w-14 h-14 text-white transform rotate-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-3 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-600 rounded-lg">
                <span className="text-2xl">🎁</span>
                <span className="text-sm font-bold text-green-700 dark:text-green-300">100% FREE</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-2 text-gray-900 dark:text-white">
                {getTitle()}
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
                {getDescription()}
              </p>
              <p className="text-sm text-green-700 dark:text-green-400 font-semibold">
                ✨ {tools.length} completely free tools available
              </p>
            </div>
          </div>
        </div>
      )}

      {period === "paid" && (
        <div className="relative mb-10 overflow-hidden rounded-3xl bg-gradient-to-br from-amber-100 via-yellow-100 to-orange-100 dark:from-amber-900/30 dark:via-yellow-900/20 dark:to-orange-900/30 border-[4px] border-amber-500 dark:border-amber-600 shadow-2xl shadow-amber-500/50 p-12">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl" />
          <div className="absolute -top-2 -right-2 w-24 h-24 bg-yellow-300/30 rounded-full blur-2xl animate-pulse" />
          <div className="absolute -bottom-2 -left-2 w-32 h-32 bg-orange-300/30 rounded-full blur-2xl animate-pulse" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 rounded-2xl shadow-lg shadow-amber-500/60 transform rotate-12">
                <svg className="w-8 h-8 text-white transform -rotate-12" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-full shadow-lg">
                <span className="text-2xl">💎</span>
                <span className="text-sm font-black uppercase tracking-wide">PREMIUM</span>
              </div>
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-3 bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-700 bg-clip-text text-transparent dark:from-amber-400 dark:via-yellow-300 dark:to-amber-400">
              {getTitle()}
            </h2>
            <p className="text-xl text-amber-900 dark:text-amber-200 mb-3 max-w-3xl font-medium">
              {getDescription()}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-3xl">👑</span>
              <p className="text-base text-amber-800 dark:text-amber-300 font-bold">
                {tools.length} premium tools • Best investment for professionals
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 统计数据卡片 - 5种完全不同的设计 */}
      {period === "all-time" && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl p-6 md:p-8 border border-blue-200 dark:border-blue-700 relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 dark:to-transparent" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/20 dark:bg-black/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
            <div className="relative z-10">
              <div className="mb-3">
                <span className="text-3xl md:text-4xl">👥</span>
              </div>
              <div className="text-4xl md:text-5xl font-black mb-2 text-blue-900 dark:text-blue-100">
                {tools.length}
              </div>
              <div className="text-sm md:text-base font-bold text-blue-700 dark:text-blue-300 opacity-80">
                Total Tools
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-2xl p-6 md:p-8 border border-purple-200 dark:border-purple-700 relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 dark:to-transparent" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/20 dark:bg-black/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
            <div className="relative z-10">
              <div className="mb-3">
                <span className="text-3xl md:text-4xl">⭐</span>
              </div>
              <div className="text-4xl md:text-5xl font-black mb-2 text-purple-900 dark:text-purple-100">
                {tools.length > 0 ? (tools.reduce((sum, tool) => sum + (tool.average_rating || 0), 0) / tools.length).toFixed(1) : '0.0'}
              </div>
              <div className="text-sm md:text-base font-bold text-purple-700 dark:text-purple-300 opacity-80">
                Avg Rating
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/30 dark:to-pink-800/30 rounded-2xl p-6 md:p-8 border border-pink-200 dark:border-pink-700 relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 dark:to-transparent" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/20 dark:bg-black/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
            <div className="relative z-10">
              <div className="mb-3">
                <span className="text-3xl md:text-4xl">❤️</span>
              </div>
              <div className="text-4xl md:text-5xl font-black mb-2 text-pink-900 dark:text-pink-100">
                {tools.reduce((sum, tool) => sum + (tool.favouriteCount || 0), 0).toLocaleString()}
              </div>
              <div className="text-sm md:text-base font-bold text-pink-700 dark:text-pink-300 opacity-80">
                Total Likes
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30 rounded-2xl p-6 md:p-8 border border-amber-200 dark:border-amber-700 relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 dark:to-transparent" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/20 dark:bg-black/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
            <div className="relative z-10">
              <div className="mb-3">
                <span className="text-3xl md:text-4xl">📈</span>
              </div>
              <div className="text-4xl md:text-5xl font-black mb-2 text-amber-900 dark:text-amber-100">
                {new Set(tools.map(t => t.category)).size}
              </div>
              <div className="text-sm md:text-base font-bold text-amber-700 dark:text-amber-300 opacity-80">
                Categories
              </div>
            </div>
          </div>
        </div>
      )}

      {period === "this-month" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7 mb-10">
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 rounded-3xl p-8 md:p-10 border-3 border-blue-400 dark:border-blue-600 relative overflow-hidden transition-all duration-500 hover:scale-110 hover:-translate-y-2 hover:shadow-2xl group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/30 dark:bg-black/30 rounded-full blur-3xl group-hover:scale-150 transition-all duration-500" />
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-blue-500/20 group-hover:rotate-12 transition-transform duration-300">
                <span className="text-4xl">👥</span>
              </div>
              <div className="text-5xl md:text-6xl font-black mb-3 text-blue-900 dark:text-blue-100 tracking-tight">
                {tools.length}
              </div>
              <div className="text-base md:text-lg font-bold text-blue-800 dark:text-blue-200 opacity-90 uppercase tracking-wide">
                Total Tools
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/40 rounded-3xl p-8 md:p-10 border-3 border-purple-400 dark:border-purple-600 relative overflow-hidden transition-all duration-500 hover:scale-110 hover:-translate-y-2 hover:shadow-2xl group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/30 dark:bg-black/30 rounded-full blur-3xl group-hover:scale-150 transition-all duration-500" />
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-purple-500/20 group-hover:rotate-12 transition-transform duration-300">
                <span className="text-4xl">⭐</span>
              </div>
              <div className="text-5xl md:text-6xl font-black mb-3 text-purple-900 dark:text-purple-100 tracking-tight">
                {tools.length > 0 ? (tools.reduce((sum, tool) => sum + (tool.average_rating || 0), 0) / tools.length).toFixed(1) : '0.0'}
              </div>
              <div className="text-base md:text-lg font-bold text-purple-800 dark:text-purple-200 opacity-90 uppercase tracking-wide">
                Avg Rating
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900/40 dark:to-pink-800/40 rounded-3xl p-8 md:p-10 border-3 border-pink-400 dark:border-pink-600 relative overflow-hidden transition-all duration-500 hover:scale-110 hover:-translate-y-2 hover:shadow-2xl group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/30 dark:bg-black/30 rounded-full blur-3xl group-hover:scale-150 transition-all duration-500" />
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-pink-500/20 group-hover:rotate-12 transition-transform duration-300">
                <span className="text-4xl">❤️</span>
              </div>
              <div className="text-5xl md:text-6xl font-black mb-3 text-pink-900 dark:text-pink-100 tracking-tight">
                {tools.reduce((sum, tool) => sum + (tool.favouriteCount || 0), 0).toLocaleString()}
              </div>
              <div className="text-base md:text-lg font-bold text-pink-800 dark:text-pink-200 opacity-90 uppercase tracking-wide">
                Total Likes
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/40 dark:to-amber-800/40 rounded-3xl p-8 md:p-10 border-3 border-amber-400 dark:border-amber-600 relative overflow-hidden transition-all duration-500 hover:scale-110 hover:-translate-y-2 hover:shadow-2xl group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/30 dark:bg-black/30 rounded-full blur-3xl group-hover:scale-150 transition-all duration-500" />
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-amber-500/20 group-hover:rotate-12 transition-transform duration-300">
                <span className="text-4xl">📈</span>
              </div>
              <div className="text-5xl md:text-6xl font-black mb-3 text-amber-900 dark:text-amber-100 tracking-tight">
                {new Set(tools.map(t => t.category)).size}
              </div>
              <div className="text-base md:text-lg font-bold text-amber-800 dark:text-amber-200 opacity-90 uppercase tracking-wide">
                Categories
              </div>
            </div>
          </div>
        </div>
      )}

      {period === "this-week" && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
          <div className="bg-gradient-to-tr from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg p-4 md:p-6 border-2 border-dashed border-blue-400 dark:border-blue-600 relative overflow-hidden transition-all duration-300 hover:scale-[1.08] hover:rotate-2 hover:shadow-xl group">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-transparent animate-pulse" />
            <div className="relative z-10 flex items-center gap-3">
              <div className="shrink-0 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl bg-blue-500/20 group-hover:scale-110 transition-transform">
                <span className="text-2xl md:text-3xl">👥</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-2xl md:text-4xl font-black text-blue-900 dark:text-blue-100 mb-1">
                  {tools.length}
                </div>
                <div className="text-xs md:text-sm font-bold text-blue-700 dark:text-blue-300 opacity-80 uppercase">
                  Total Tools
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-tr from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-lg p-4 md:p-6 border-2 border-dashed border-purple-400 dark:border-purple-600 relative overflow-hidden transition-all duration-300 hover:scale-[1.08] hover:rotate-2 hover:shadow-xl group">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-transparent animate-pulse" />
            <div className="relative z-10 flex items-center gap-3">
              <div className="shrink-0 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl bg-purple-500/20 group-hover:scale-110 transition-transform">
                <span className="text-2xl md:text-3xl">⭐</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-2xl md:text-4xl font-black text-purple-900 dark:text-purple-100 mb-1">
                  {tools.length > 0 ? (tools.reduce((sum, tool) => sum + (tool.average_rating || 0), 0) / tools.length).toFixed(1) : '0.0'}
                </div>
                <div className="text-xs md:text-sm font-bold text-purple-700 dark:text-purple-300 opacity-80 uppercase">
                  Avg Rating
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-tr from-pink-50 to-pink-100 dark:from-pink-900/30 dark:to-pink-800/30 rounded-lg p-4 md:p-6 border-2 border-dashed border-pink-400 dark:border-pink-600 relative overflow-hidden transition-all duration-300 hover:scale-[1.08] hover:rotate-2 hover:shadow-xl group">
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/5 to-transparent animate-pulse" />
            <div className="relative z-10 flex items-center gap-3">
              <div className="shrink-0 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl bg-pink-500/20 group-hover:scale-110 transition-transform">
                <span className="text-2xl md:text-3xl">❤️</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-2xl md:text-4xl font-black text-pink-900 dark:text-pink-100 mb-1">
                  {tools.reduce((sum, tool) => sum + (tool.favouriteCount || 0), 0).toLocaleString()}
                </div>
                <div className="text-xs md:text-sm font-bold text-pink-700 dark:text-pink-300 opacity-80 uppercase">
                  Total Likes
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-tr from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30 rounded-lg p-4 md:p-6 border-2 border-dashed border-amber-400 dark:border-amber-600 relative overflow-hidden transition-all duration-300 hover:scale-[1.08] hover:rotate-2 hover:shadow-xl group">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 to-transparent animate-pulse" />
            <div className="relative z-10 flex items-center gap-3">
              <div className="shrink-0 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl bg-amber-500/20 group-hover:scale-110 transition-transform">
                <span className="text-2xl md:text-3xl">📈</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-2xl md:text-4xl font-black text-amber-900 dark:text-amber-100 mb-1">
                  {new Set(tools.map(t => t.category)).size}
                </div>
                <div className="text-xs md:text-sm font-bold text-amber-700 dark:text-amber-300 opacity-80 uppercase">
                  Categories
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {period === "free" && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-8">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 md:p-7 border-2 border-blue-300 dark:border-blue-700 relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl md:text-3xl">👥</span>
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              </div>
              <div className="text-sm md:text-base font-semibold text-blue-700 dark:text-blue-300 opacity-75 mb-2">
                Total Tools
              </div>
              <div className="text-3xl md:text-5xl font-bold text-blue-900 dark:text-blue-100">
                {tools.length}
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 md:p-7 border-2 border-purple-300 dark:border-purple-700 relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl md:text-3xl">⭐</span>
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              </div>
              <div className="text-sm md:text-base font-semibold text-purple-700 dark:text-purple-300 opacity-75 mb-2">
                Avg Rating
              </div>
              <div className="text-3xl md:text-5xl font-bold text-purple-900 dark:text-purple-100">
                {tools.length > 0 ? (tools.reduce((sum, tool) => sum + (tool.average_rating || 0), 0) / tools.length).toFixed(1) : '0.0'}
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 md:p-7 border-2 border-pink-300 dark:border-pink-700 relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-transparent" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl md:text-3xl">❤️</span>
                <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
              </div>
              <div className="text-sm md:text-base font-semibold text-pink-700 dark:text-pink-300 opacity-75 mb-2">
                Total Likes
              </div>
              <div className="text-3xl md:text-5xl font-bold text-pink-900 dark:text-pink-100">
                {tools.reduce((sum, tool) => sum + (tool.favouriteCount || 0), 0).toLocaleString()}
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 md:p-7 border-2 border-green-300 dark:border-green-700 relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-transparent" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl md:text-3xl">📈</span>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>
              <div className="text-sm md:text-base font-semibold text-green-700 dark:text-green-300 opacity-75 mb-2">
                Categories
              </div>
              <div className="text-3xl md:text-5xl font-bold text-green-900 dark:text-green-100">
                {new Set(tools.map(t => t.category)).size}
              </div>
            </div>
          </div>
        </div>
      )}

      {period === "paid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-10">
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 rounded-3xl p-7 md:p-10 border-[3px] border-blue-400 dark:border-blue-600 relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-3xl group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/20 dark:bg-black/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-500" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/30 to-blue-500/10 shadow-lg group-hover:rotate-12 transition-transform">
                  <span className="text-3xl">👥</span>
                </div>
                <div className="px-2 py-1 bg-blue-500/20 rounded-lg">
                  <span className="text-xs font-black text-blue-900 dark:text-blue-100 uppercase">PRO</span>
                </div>
              </div>
              <div className="text-sm md:text-base font-bold text-blue-800 dark:text-blue-200 opacity-80 mb-2 uppercase tracking-wide">
                Total Tools
              </div>
              <div className="text-4xl md:text-6xl font-black text-blue-900 dark:text-blue-100 tracking-tight">
                {tools.length}
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/40 rounded-3xl p-7 md:p-10 border-[3px] border-purple-400 dark:border-purple-600 relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-3xl group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/20 dark:bg-black/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-500" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/30 to-purple-500/10 shadow-lg group-hover:rotate-12 transition-transform">
                  <span className="text-3xl">⭐</span>
                </div>
                <div className="px-2 py-1 bg-purple-500/20 rounded-lg">
                  <span className="text-xs font-black text-purple-900 dark:text-purple-100 uppercase">PRO</span>
                </div>
              </div>
              <div className="text-sm md:text-base font-bold text-purple-800 dark:text-purple-200 opacity-80 mb-2 uppercase tracking-wide">
                Avg Rating
              </div>
              <div className="text-4xl md:text-6xl font-black text-purple-900 dark:text-purple-100 tracking-tight">
                {tools.length > 0 ? (tools.reduce((sum, tool) => sum + (tool.average_rating || 0), 0) / tools.length).toFixed(1) : '0.0'}
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900/40 dark:to-pink-800/40 rounded-3xl p-7 md:p-10 border-[3px] border-pink-400 dark:border-pink-600 relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-3xl group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/20 dark:bg-black/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-500" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl" />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/30 to-pink-500/10 shadow-lg group-hover:rotate-12 transition-transform">
                  <span className="text-3xl">❤️</span>
                </div>
                <div className="px-2 py-1 bg-pink-500/20 rounded-lg">
                  <span className="text-xs font-black text-pink-900 dark:text-pink-100 uppercase">PRO</span>
                </div>
              </div>
              <div className="text-sm md:text-base font-bold text-pink-800 dark:text-pink-200 opacity-80 mb-2 uppercase tracking-wide">
                Total Likes
              </div>
              <div className="text-4xl md:text-6xl font-black text-pink-900 dark:text-pink-100 tracking-tight">
                {tools.reduce((sum, tool) => sum + (tool.favouriteCount || 0), 0).toLocaleString()}
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/40 dark:to-amber-800/40 rounded-3xl p-7 md:p-10 border-[3px] border-amber-400 dark:border-amber-600 relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-3xl group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/20 dark:bg-black/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-500" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/30 to-amber-500/10 shadow-lg group-hover:rotate-12 transition-transform">
                  <span className="text-3xl">📈</span>
                </div>
                <div className="px-2 py-1 bg-amber-500/20 rounded-lg">
                  <span className="text-xs font-black text-amber-900 dark:text-amber-100 uppercase">PRO</span>
                </div>
              </div>
              <div className="text-sm md:text-base font-bold text-amber-800 dark:text-amber-200 opacity-80 mb-2 uppercase tracking-wide">
                Categories
              </div>
              <div className="text-4xl md:text-6xl font-black text-amber-900 dark:text-amber-100 tracking-tight">
                {new Set(tools.map(t => t.category)).size}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rankings List */}
      <div className={`${
        period === "all-time" ? "space-y-4 md:space-y-6" :
        period === "this-month" ? "space-y-6 md:space-y-8 max-w-5xl mx-auto" :
        period === "this-week" ? "space-y-3 md:space-y-5" :
        period === "free" ? "space-y-4 md:space-y-5 max-w-6xl mx-auto" :
        "space-y-5 md:space-y-7"
      }`}>
        {tools.map((tool, index) => {
          // 不同分类使用不同的卡片样式
          let cardBaseClass = "";
          let cardHoverClass = "";
          let cardPadding = "";
          let layoutClass = "";
          
          if (period === "all-time") {
            // All-Time: 经典卡片，大阴影，横向布局
            cardBaseClass = `block relative overflow-hidden rounded-xl md:rounded-2xl transition-all duration-300 group animate-fade-in-up ${
              index === 0 ? 'bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-2 border-yellow-400 dark:border-yellow-600 shadow-xl shadow-yellow-500/30' :
              index === 1 ? 'bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 border-2 border-gray-400 dark:border-gray-600 shadow-xl shadow-gray-500/30' :
              index === 2 ? 'bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-2 border-orange-400 dark:border-orange-600 shadow-xl shadow-orange-500/30' :
              'bg-gradient-to-r from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-800 border border-gray-200 dark:border-zinc-700 shadow-md'
            }`;
            cardHoverClass = "hover:shadow-2xl hover:scale-[1.02] hover:border-[#e94560]";
            cardPadding = "p-4 md:p-6";
            layoutClass = "flex items-start gap-3 md:gap-6";
          } else if (period === "this-month") {
            // This Month: 超大圆角卡片，蓝色主题，竖向布局
            cardBaseClass = `block relative overflow-hidden rounded-3xl transition-all duration-500 group animate-fade-in-up ${
              index === 0 ? 'bg-gradient-to-br from-blue-100 via-cyan-50 to-blue-100 dark:from-blue-900/30 dark:via-cyan-900/20 dark:to-blue-900/30 border-3 border-blue-500 dark:border-blue-600 shadow-2xl shadow-blue-500/40' :
              index === 1 ? 'bg-gradient-to-br from-cyan-50 to-sky-100 dark:from-cyan-900/20 dark:to-sky-900/30 border-3 border-cyan-400 dark:border-cyan-600 shadow-xl shadow-cyan-500/30' :
              index === 2 ? 'bg-gradient-to-br from-sky-50 to-indigo-100 dark:from-sky-900/20 dark:to-indigo-900/30 border-3 border-sky-400 dark:border-sky-600 shadow-xl shadow-sky-500/30' :
              'bg-white dark:bg-zinc-900 border-2 border-blue-200 dark:border-blue-800 shadow-lg'
            }`;
            cardHoverClass = "hover:shadow-2xl hover:scale-105 hover:-translate-y-2";
            cardPadding = "p-6 md:p-8";
            layoutClass = "flex flex-col md:flex-row items-start gap-4 md:gap-6";
          } else if (period === "this-week") {
            // This Week: 倾斜卡片，火焰效果，紧凑布局
            cardBaseClass = `block relative overflow-hidden rounded-lg md:rounded-xl transition-all duration-300 group animate-fade-in-up ${
              index === 0 ? 'bg-gradient-to-tr from-red-100 via-orange-100 to-yellow-100 dark:from-red-900/30 dark:via-orange-900/20 dark:to-yellow-900/30 border-2 border-red-500 dark:border-red-600 shadow-2xl shadow-red-500/40' :
              index === 1 ? 'bg-gradient-to-tr from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 border-2 border-orange-500 dark:border-orange-600 shadow-xl shadow-orange-500/40' :
              index === 2 ? 'bg-gradient-to-tr from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 border-2 border-yellow-500 dark:border-yellow-600 shadow-xl shadow-yellow-500/30' :
              'bg-gradient-to-r from-white to-orange-50 dark:from-zinc-900 dark:to-orange-900/10 border border-orange-200 dark:border-orange-800 shadow-md'
            }`;
            cardHoverClass = "hover:shadow-2xl hover:scale-[1.03] hover:rotate-1";
            cardPadding = "p-3 md:p-5";
            layoutClass = "flex items-start gap-2 md:gap-4";
          } else if (period === "free") {
            // Free: 简洁卡片，绿色清新，宽松布局
            cardBaseClass = `block relative overflow-hidden rounded-2xl transition-all duration-300 group animate-fade-in-up ${
              index === 0 ? 'bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-teal-900/20 border-2 border-green-500 dark:border-green-600 shadow-xl shadow-green-500/30' :
              index === 1 ? 'bg-gradient-to-r from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/30 border-2 border-emerald-400 dark:border-emerald-600 shadow-lg shadow-emerald-500/20' :
              index === 2 ? 'bg-gradient-to-r from-teal-50 to-emerald-100 dark:from-teal-900/20 dark:to-emerald-900/30 border-2 border-teal-400 dark:border-teal-600 shadow-lg shadow-teal-500/20' :
              'bg-white dark:bg-zinc-900 border border-green-200 dark:border-green-800 shadow-sm'
            }`;
            cardHoverClass = "hover:shadow-xl hover:scale-[1.01] hover:border-green-500";
            cardPadding = "p-5 md:p-7";
            layoutClass = "flex items-center gap-4 md:gap-6";
          } else {
            // Paid: 豪华卡片，金色奢华，超宽松布局
            cardBaseClass = `block relative overflow-hidden rounded-2xl md:rounded-3xl transition-all duration-300 group animate-fade-in-up ${
              index === 0 ? 'bg-gradient-to-br from-amber-100 via-yellow-100 to-orange-100 dark:from-amber-900/30 dark:via-yellow-900/20 dark:to-orange-900/30 border-[3px] border-amber-500 dark:border-amber-600 shadow-2xl shadow-amber-500/50' :
              index === 1 ? 'bg-gradient-to-br from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30 border-[3px] border-yellow-500 dark:border-yellow-600 shadow-xl shadow-yellow-500/40' :
              index === 2 ? 'bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 border-[3px] border-orange-400 dark:border-orange-600 shadow-xl shadow-orange-500/30' :
              'bg-gradient-to-br from-white to-amber-50 dark:from-zinc-900 dark:to-amber-900/10 border-2 border-amber-200 dark:border-amber-800 shadow-lg'
            }`;
            cardHoverClass = "hover:shadow-3xl hover:scale-[1.03] hover:border-amber-400 hover:shadow-amber-500/60";
            cardPadding = "p-6 md:p-10";
            layoutClass = "flex items-start gap-5 md:gap-8";
          }

          return (
            <Link
              key={tool.id}
              href={`/${tool.category_slug}/${tool.slug}`}
              className={`${cardBaseClass} ${cardHoverClass} ${cardPadding}`}
              style={{
                animationDelay: `${index * 50}ms`,
                animationFillMode: 'both'
              }}
            >
              {/* 装饰性背景元素 - 不同分类不同位置和颜色 */}
              {period === "all-time" && (
                <>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#e94560]/5 to-transparent rounded-full blur-3xl -z-10"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-500/5 to-transparent rounded-full blur-2xl -z-10"></div>
                </>
              )}
              {period === "this-month" && (
                <>
                  <div className="absolute -top-10 -right-10 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-3xl -z-10"></div>
                  <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-gradient-to-tr from-cyan-400/10 to-transparent rounded-full blur-3xl -z-10"></div>
                </>
              )}
              {period === "this-week" && (
                <>
                  <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-orange-400/10 to-transparent rounded-full blur-3xl -z-10 animate-pulse"></div>
                </>
              )}
              {period === "free" && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-50/50 to-transparent dark:from-green-900/5 -z-10"></div>
                </>
              )}
              {period === "paid" && (
                <>
                  <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-300/15 to-transparent rounded-full blur-3xl -z-10"></div>
                  <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-yellow-300/10 to-transparent rounded-full blur-3xl -z-10"></div>
                </>
              )}
              <div className={layoutClass}>
              {/* Rank Number */}
              <div className={getRankBadgeStyle(index)}>
                <span className={getRankNumberStyle(index)}>{index + 1}</span>
              </div>

              {/* Tool Icon - 隐藏在移动端 */}
              <div className="hidden sm:block shrink-0">
                <Image
                  src={tool.thumbnail_image}
                  alt={tool.tool_name}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                />
              </div>

              {/* Tool Info */}
              <div className="flex-1 min-w-0 relative">
                {/* 前三名标签 - 移动端优化 */}
                {index < 3 && (
                  <div className="inline-block mb-2">
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold text-white shadow-md ${
                      index === 0 ? 'bg-gradient-to-r from-yellow-500 to-amber-600' :
                      index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-600' :
                      'bg-gradient-to-r from-orange-500 to-red-600'
                    }`}>
                      {index === 0 ? '🏆 Champion' : index === 1 ? '🥈 2nd' : '🥉 3rd'}
                    </div>
                  </div>
                )}
                
                <div className="flex items-start justify-between mb-2 gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-xl font-bold text-black dark:text-zinc-50 group-hover:text-[#e94560] transition-colors line-clamp-2 mb-2">
                      {tool.tool_name}
                    </h3>
                    {/* 工具类型标签 - 移动端简化 */}
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 md:px-3 md:py-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium border border-purple-200 dark:border-purple-800">
                        <svg className="w-3 h-3 hidden md:inline" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" clipRule="evenodd" />
                        </svg>
                        {tool.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    {/* Favorites */}
                    <div className="flex items-center gap-1 group/fav hover:scale-110 transition-transform cursor-pointer">
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-[#e94560] group-hover/fav:animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                      </svg>
                      <span className="text-xs md:text-sm font-bold text-[#e94560]">{tool.favouriteCount || 0}</span>
                    </div>

                    {/* Rating - 移动端显示 */}
                    {tool.average_rating && (
                      <div className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300">
                          {tool.average_rating.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-2 md:mb-3 line-clamp-2 leading-relaxed">{tool.headline}</p>

                <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
                  {/* Stats */}
                  {period === "this-month" && tool.monthFavourites && tool.monthFavourites > 0 && (
                    <div className="inline-flex items-center gap-1 px-2 py-1 md:px-3 md:py-1.5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-400 rounded-lg text-xs font-semibold border border-green-200 dark:border-green-800">
                      <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                      </svg>
                      <span className="hidden sm:inline">+{tool.monthFavourites} this month</span>
                      <span className="sm:hidden">+{tool.monthFavourites}</span>
                    </div>
                  )}
                  {period === "this-week" && tool.todayFavourites && tool.todayFavourites > 0 && (
                    <div className="inline-flex items-center gap-1 px-2 py-1 md:px-3 md:py-1.5 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/30 dark:to-red-900/30 text-orange-700 dark:text-orange-400 rounded-lg text-xs font-semibold border border-orange-200 dark:border-orange-800">
                      <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                      </svg>
                      <span className="hidden sm:inline">+{tool.todayFavourites} this week</span>
                      <span className="sm:hidden">+{tool.todayFavourites}</span>
                    </div>
                  )}

                  {/* Reviews - 移动端隐藏 */}
                  {tool.review_count !== undefined && tool.review_count > 0 && (
                    <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-400 rounded-lg text-xs font-medium border border-blue-200 dark:border-blue-800">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                        <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                      </svg>
                      {tool.review_count} reviews
                    </div>
                  )}
                </div>
              </div>

              {/* Arrow - 移动端隐藏 */}
              <div className="hidden md:block shrink-0">
                <svg
                  className="w-6 h-6 text-gray-400 group-hover:text-[#e94560] group-hover:translate-x-1 transition-all"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            </Link>
          );
        })}
      </div>

      {/* Empty State */}
      {tools.length === 0 && (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <p className="text-gray-600 dark:text-gray-400 text-lg">No tools found for this ranking</p>
        </div>
      )}

      {/* Info Box */}
      <div className="mt-12 space-y-6">
        {/* 排名方法说明 - 不同分类不同样式 */}
        <div className={`rounded-2xl p-8 border relative overflow-hidden ${
          period === "all-time" ? "bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 border-indigo-200 dark:border-indigo-800" :
          period === "this-month" ? "bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800" :
          period === "this-week" ? "bg-gradient-to-tr from-orange-50 via-red-50 to-pink-50 dark:from-orange-900/20 dark:via-red-900/20 dark:to-pink-900/20 border-orange-200 dark:border-orange-800" :
          period === "free" ? "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800" :
          "bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-amber-900/20 dark:via-yellow-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800"
        }`}>
          {/* 装饰性背景 */}
          <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-30 ${
            period === "all-time" ? "bg-purple-400" :
            period === "this-month" ? "bg-blue-400" :
            period === "this-week" ? "bg-orange-400" :
            period === "free" ? "bg-green-400" :
            "bg-amber-400"
          }`} />
          
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className={`p-3 rounded-xl ${
              period === "all-time" ? "bg-indigo-600 dark:bg-indigo-500" :
              period === "this-month" ? "bg-blue-600 dark:bg-blue-500" :
              period === "this-week" ? "bg-orange-600 dark:bg-orange-500" :
              period === "free" ? "bg-green-600 dark:bg-green-500" :
              "bg-amber-600 dark:bg-amber-500"
            }`}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-black dark:text-zinc-50">Ranking Methodology</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">How we calculate the rankings</p>
            </div>
          </div>
          
          <div className={`grid gap-6 relative z-10 ${
            period === "this-month" ? "md:grid-cols-1 lg:grid-cols-2" :
            period === "free" ? "grid-cols-1 md:grid-cols-2" :
            "md:grid-cols-2"
          }`}>
            <div className="bg-white/50 dark:bg-zinc-900/50 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-zinc-50 mb-2">All Time Rankings</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Based on cumulative user favorites since tool launch. Reflects overall popularity and long-term trust.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/50 dark:bg-zinc-900/50 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-zinc-50 mb-2">Monthly & Weekly</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Trending tools based on recent activity. Perfect for discovering what's hot right now.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/50 dark:bg-zinc-900/50 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-zinc-50 mb-2">Free Tools</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Best tools with free plans or tiers. Start exploring AI without any upfront investment.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/50 dark:bg-zinc-900/50 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                  <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-zinc-50 mb-2">Premium Tools</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Professional-grade tools worth the investment. Ranked by user satisfaction and value.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 更新频率说明 - 不同分类不同样式 */}
        <div className={`rounded-2xl p-8 border relative overflow-hidden ${
          period === "all-time" ? "bg-gradient-to-br from-gray-50 to-white dark:from-zinc-900 dark:to-zinc-800 border-gray-200 dark:border-zinc-800" :
          period === "this-month" ? "bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 border-cyan-200 dark:border-cyan-800" :
          period === "this-week" ? "bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-red-200 dark:border-red-800" :
          period === "free" ? "bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-200 dark:border-emerald-800" :
          "bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-yellow-200 dark:border-amber-800"
        }`}>
          {/* 装饰性背景 */}
          <div className={`absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-3xl opacity-20 ${
            period === "all-time" ? "bg-[#e94560]" :
            period === "this-month" ? "bg-cyan-400" :
            period === "this-week" ? "bg-red-400" :
            period === "free" ? "bg-emerald-400" :
            "bg-yellow-400"
          }`} />
          
          <div className="flex items-start justify-between mb-6 relative z-10">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl ${
                period === "all-time" ? "bg-[#e94560]" :
                period === "this-month" ? "bg-cyan-600 dark:bg-cyan-500" :
                period === "this-week" ? "bg-red-600 dark:bg-red-500" :
                period === "free" ? "bg-emerald-600 dark:bg-emerald-500" :
                "bg-yellow-600 dark:bg-yellow-500"
              }`}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-black dark:text-zinc-50">Real-Time Updates</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Fresh data, daily refresh</p>
              </div>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
              period === "all-time" ? "bg-green-100 dark:bg-green-900/30" :
              period === "this-month" ? "bg-blue-100 dark:bg-blue-900/30" :
              period === "this-week" ? "bg-orange-100 dark:bg-orange-900/30" :
              period === "free" ? "bg-emerald-100 dark:bg-emerald-900/30" :
              "bg-amber-100 dark:bg-amber-900/30"
            }`}>
              <div className={`w-2 h-2 rounded-full animate-pulse ${
                period === "all-time" ? "bg-green-500" :
                period === "this-month" ? "bg-blue-500" :
                period === "this-week" ? "bg-orange-500" :
                period === "free" ? "bg-emerald-500" :
                "bg-amber-500"
              }`}></div>
              <span className={`text-sm font-medium ${
                period === "all-time" ? "text-green-700 dark:text-green-400" :
                period === "this-month" ? "text-blue-700 dark:text-blue-400" :
                period === "this-week" ? "text-orange-700 dark:text-orange-400" :
                period === "free" ? "text-emerald-700 dark:text-emerald-400" :
                "text-amber-700 dark:text-amber-400"
              }`}>Live</span>
            </div>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 relative z-10">
            Our rankings are updated daily to reflect the latest user activity and preferences in the AI tools ecosystem. 
            We track favorites, ratings, and user engagement to ensure you're always seeing the most relevant and trusted tools.
          </p>
          
          <div className={`flex flex-wrap gap-3 mt-6 relative z-10 ${
            period === "this-week" ? "justify-center" : ""
          }`}>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Daily Updates</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300">User Verified</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-pink-50 dark:bg-pink-900/20 rounded-lg border border-pink-200 dark:border-pink-800">
              <svg className="w-4 h-4 text-pink-600 dark:text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-pink-700 dark:text-pink-300">Community Driven</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
