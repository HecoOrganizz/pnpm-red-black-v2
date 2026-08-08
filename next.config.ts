import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // GitHub Pages only serves static files, so build the site to ./out.
  output: "export",
  trailingSlash: true,
  basePath,
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ["*.space-z.ai", "*.chatglm.cn"],
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default withNextIntl(nextConfig);
