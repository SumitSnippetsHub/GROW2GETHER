import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  // Existing components are formatted as long lines. Prettier is still available
  // via `npm run lint`; production builds should not rewrite that source.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
