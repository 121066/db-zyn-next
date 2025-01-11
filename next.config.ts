import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  assetPrefix: '/yn/',
  basePath: '/yn',
  typescript: {
    ignoreBuildErrors: true
  }
};

export default nextConfig;
