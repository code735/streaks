import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  reactStrictMode: true,
  transpilePackages: ["react-native", "react-native-web"],
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      "react-native$": "react-native-web",
    };
    config.resolve.extensions = [
      ".web.tsx",
      ".web.ts",
      ".web.js",
      ...(config.resolve.extensions ?? []),
    ];
    return config;
  },
};

export default nextConfig;
