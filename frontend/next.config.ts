import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // devIndicators: {
  //   buildActivity: false,
  // },
  devIndicators: false,
  images: {
    domains: ["storage.googleapis.com", "via.placeholder.com"],
  },
};

export default nextConfig;
