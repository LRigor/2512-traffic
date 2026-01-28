import React from "react";

interface SkeletonProps {
  className?: string;
}

/**
 * 基础骨架屏组件
 */
export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
      aria-label="Loading..."
    />
  );
}

/**
 * Featured 卡片骨架屏
 */
export function FeaturedCardSkeleton() {
  return (
    <div className="block border border-gray-200 rounded-xl p-4">
      <div className="flex gap-4">
        {/* Icon Skeleton */}
        <div className="flex-shrink-0">
          <Skeleton className="w-[60px] h-[60px] rounded-lg" />
        </div>

        {/* Content Skeleton */}
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-16" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="flex items-center justify-between mt-4">
        {/* Stars */}
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="w-4 h-4 rounded-sm" />
          ))}
        </div>

        {/* Votes */}
        <Skeleton className="h-8 w-16 rounded-lg" />
      </div>
    </div>
  );
}

/**
 * LaunchedToday 卡片骨架屏
 */
export function LaunchedTodayCardSkeleton() {
  return (
    <div className="block border border-gray-200 rounded-xl p-4">
      <div className="flex gap-4">
        {/* Icon Skeleton */}
        <div className="flex-shrink-0">
          <Skeleton className="w-[60px] h-[60px] rounded-lg" />
        </div>

        {/* Content Skeleton */}
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-6 w-16 rounded" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    </div>
  );
}

/**
 * Featured 列表骨架屏
 */
export function FeaturedSkeleton() {
  return (
    <section className="bg-white px-6 -mt-12">
      <div className="max-w-7xl mx-auto">
        {/* Title Skeleton */}
        <Skeleton className="h-8 w-48 mb-8" />

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <FeaturedCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * LaunchedToday 列表骨架屏
 */
export function LaunchedTodaySkeleton() {
  return (
    <section className="bg-white py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Title Skeleton */}
        <Skeleton className="h-8 w-48 mb-8" />

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(6)].map((_, i) => (
            <LaunchedTodayCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * 通用卡片骨架屏（用于其他列表页）
 */
export function CardSkeleton() {
  return (
    <div className="relative flex flex-col rounded-lg border border-gray-400 p-4">
      {/* Image and Title */}
      <div className="flex items-start gap-3 mb-2">
        <Skeleton className="h-12 w-12 rounded-lg" />
        <Skeleton className="h-5 w-32" />
      </div>

      {/* Description */}
      <div className="space-y-2 my-1.5">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-3 w-4/6" />
      </div>

      {/* Rating and Category */}
      <div className="flex items-center justify-between mt-auto pt-2">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="w-4 h-4 rounded-sm" />
          ))}
        </div>
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
    </div>
  );
}

/**
 * 列表骨架屏（通用）
 */
export function ListSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * 排行榜卡片骨架屏
 */
export function RankingCardSkeleton({ index }: { index: number }) {
  return (
    <div className="flex items-center gap-4 p-6 bg-white dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700">
      {/* Rank Badge */}
      <Skeleton className={`shrink-0 ${index < 3 ? 'w-20 h-20' : 'w-14 h-14'} rounded-xl`} />

      {/* Tool Image */}
      <Skeleton className="w-16 h-16 rounded-lg" />

      {/* Content */}
      <div className="flex-1 space-y-2">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-full max-w-md" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>

      {/* Votes */}
      <div className="flex flex-col items-end gap-2">
        <Skeleton className="h-10 w-24 rounded-lg" />
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="w-4 h-4 rounded-sm" />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * 排行榜列表骨架屏
 */
export function RankingsListSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {[...Array(count)].map((_, i) => (
        <RankingCardSkeleton key={i} index={i} />
      ))}
    </div>
  );
}
