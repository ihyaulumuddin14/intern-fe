import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
