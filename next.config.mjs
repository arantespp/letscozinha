import bundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Margem extra para o warm-up do cache de receitas no início do build
  // (o default de 60s derrubava as primeiras páginas em CMS lento)
  staticPageGenerationTimeout: 120,
  experimental: {
    staticGenerationMaxConcurrency: 4,
  },
  images: {
    unoptimized: true, // Disable Next.js image optimization
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
