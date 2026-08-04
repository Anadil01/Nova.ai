/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@nova/db', '@nova/config'],
  images: {
    domains: ['pub-r2.dev'],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
}

module.exports = nextConfig
