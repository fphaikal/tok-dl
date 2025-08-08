import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      // TikTok CDN hostnames
      {
        protocol: 'https',
        hostname: 'p16-sign-sg.tiktokcdn.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'p16-sign-va.tiktokcdn.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'p16-pu-sign-no.tiktokcdn-eu.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'p16-sign-no.tiktokcdn-eu.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'p19-sign.tiktokcdn-us.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'p16-sign.tiktokcdn-us.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'lf16-tiktok-common.tiktokcdn-us.com',
        pathname: '/**'
      },
      // Wildcard patterns for all TikTok CDN variations
      {
        protocol: 'https',
        hostname: '*.tiktokcdn.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: '*.tiktokcdn-eu.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: '*.tiktokcdn-us.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: '*.muscdn.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: '*.byteoversea.com',
        pathname: '/**'
      }
    ]
  }
};

export default nextConfig;
