"use client";

import { usePathname } from "next/navigation";
import Banner from "@/components/Banner";

export default function BannerWrapper() {
  const pathname = usePathname();
  const isCategoryPage = pathname !== "/" && pathname.split("/").length > 1;

  if (isCategoryPage) {
    return null;
  }

  return <Banner />;
}
