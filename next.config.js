/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-images.toolify.ai',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'k.kakaocdn.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
