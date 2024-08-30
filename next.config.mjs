/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'cdn.lets.rocks',
      },
    ],
  },
};

export default nextConfig;
