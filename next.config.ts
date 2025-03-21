import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'static-maps.yandex.ru',
      'api-maps.yandex.ru',
      'core-renderer-tiles.maps.yandex.net',
      'yastatic.net'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static-maps.yandex.ru',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api-maps.yandex.ru',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'core-renderer-tiles.maps.yandex.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'yastatic.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
