import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'yurigay-minio.pd8edx.easypanel.host',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
