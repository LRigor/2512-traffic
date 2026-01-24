import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Enable trailing slash for static export compatibility
  trailingSlash: true,
};

export default nextConfig;
