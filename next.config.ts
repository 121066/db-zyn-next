import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  assetPrefix: '/yn/',
  basePath: '/yn',
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    domains: ['dbyxs.top'], // 添加允许的主机名
  },
};

export default nextConfig;
