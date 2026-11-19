import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  async redirects() {
    return [
      { source: "/services/websites", destination: "/website-development", permanent: true },
      { source: "/services/shops", destination: "/ecommerce-development", permanent: true },
      { source: "/services/apps", destination: "/web-application-development", permanent: true },
      { source: "/services/automations", destination: "/business-automation", permanent: true },
    ];
  },
  // Existing components are formatted as long lines. Prettier is still available
  // via `npm run lint`; production builds should not rewrite that source.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
