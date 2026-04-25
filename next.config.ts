import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blogdobagada.com.br',
      },
      {
        protocol: 'http',
        hostname: 'blogdobagada.com.br',
      },
      {
        protocol: 'https',
        hostname: 'secureservercdn.net', // Adiciona este também por precaução
      }
    ],
  },
};

export default nextConfig;