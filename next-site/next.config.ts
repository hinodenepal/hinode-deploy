import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    /** Cache optimized images for 24 hours to prevent repeated upstream fetches */
    minimumCacheTTL: 86400,
    /** Serve modern formats — browser auto-negotiates the best one */
    formats: ["image/avif", "image/webp"],
    /** Responsive breakpoints matching common viewport widths */
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
