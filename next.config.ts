import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Static HTML export for Hostinger shared hosting.
   * Generates a fully static site in /out directory.
   * No Node.js server required — pure HTML/CSS/JS.
   */
  output: 'export',

  /**
   * Disable Next/Image optimization since Hostinger
   * doesn't run a Node.js server for on-the-fly processing.
   * Our images are already optimized as WebP via sharp.
   */
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
