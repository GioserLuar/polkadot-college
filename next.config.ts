import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Static HTML export — generates /out directory.
   * No Node.js server required — pure HTML/CSS/JS.
   */
  output: 'export',

  /**
   * GitHub Pages serves from /polkadot-college/ subdirectory.
   * basePath prefixes all routes, assetPrefix prefixes all static assets.
   * Remove both when deploying to a custom domain (polkadotcollege.com).
   */
  basePath: '/polkadot-college',
  assetPrefix: '/polkadot-college/',

  /**
   * Disable Next/Image optimization — no Node.js server
   * for on-the-fly processing. Images already optimized as WebP.
   */
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
