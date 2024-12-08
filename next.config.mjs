import bundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    cssChunking: 'loose',
  },
  images: {
    remotePatterns: [
      {
        hostname: 'cdn.lets.rocks',
      },
    ],
  },
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(nextConfig);
