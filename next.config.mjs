import bundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 31536000, // 1 year
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
