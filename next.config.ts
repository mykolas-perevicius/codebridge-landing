import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages
  output: 'export',

  // No basePath needed - landing page will be at repo root
  // which is already served at /Education_Playground/ by GitHub Pages

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Trailing slash for GitHub Pages compatibility
  trailingSlash: true,
};

export default nextConfig;
