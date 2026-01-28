"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import homeData from '@/data/home.json';
import { LaunchedTodaySkeleton } from "@/components/ui/Skeleton";

const LaunchedToday = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { launchedToday } = homeData;

  useEffect(() => {
    // 模拟短暂的加载状态，确保骨架屏显示
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LaunchedTodaySkeleton />;
  }

  return (
    <section className="bg-white py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          {launchedToday.title}
        </h2>

        {/* Grid - responsive columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {launchedToday.items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="block border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex gap-4">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded-lg aspect-square object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-gray-900 truncate">
                      {item.name}
                    </h4>
                    <span className="flex-shrink-0 text-xs font-medium text-white bg-[#e94560] rounded px-3 py-1">
                      Today
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LaunchedToday;
