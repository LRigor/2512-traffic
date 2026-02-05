"use client";

import dynamic from "next/dynamic";

const Footer = dynamic(() => import("./index"), {
  ssr: false,
  loading: () => (
    <footer className="bg-[#1a1625] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12" />
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4" />
      </div>
    </footer>
  ),
});

export default function LazyFooter() {
  return <Footer />;
}

