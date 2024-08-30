/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'cdn.lets.rocks',
      },
    ],
  },
};

export default nextConfig;
