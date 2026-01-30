"use client";

import { useEffect } from "react";
import { handleInsertUmamiScript } from "@/utils/umami";

/**
 * Umami Analytics Component
 * 自动根据域名插入对应的 Umami 统计代码
 */
export default function UmamiAnalytics() {
  useEffect(() => {
    // 在客户端挂载后插入 Umami 脚本
    handleInsertUmamiScript();
  }, []);

  return null;
}
