import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'blogdobagada.com.br' },
      { protocol: 'http', hostname: 'blogdobagada.com.br' },
      { protocol: 'https', hostname: 'secureservercdn.net' },
      { protocol: 'https', hostname: 'blogdobagada.optmaize.com.br' },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/wp-content/:path*',
        destination: 'http://blogdobagada.com.br/wp-content/:path*',
      },
    ];
  },
};

export default nextConfig;