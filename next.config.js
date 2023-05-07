
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@Prisma/client']
  },
};

module.exports = nextConfig;